// TMNT: Splintered Fate - Supabase Auth & Cloud Sync
// Discord OAuth login, cloud persistence for permanent upgrades

import { on, upgradeState, artifactUpgrades, inspirationUpgrades, applyCloudState, clearBuild } from './state.js';

// ---- Configuration ----
const SUPABASE_URL = 'https://xpohaehzmszydlhxyylt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhwb2hhZWh6bXN6eWRsaHh5eWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5ODk5MjcsImV4cCI6MjA4NjU2NTkyN30.MPcbZVkKgYVEbCa0hqh-wjqjcYXnJhMu9k-G8OmlWJ8';

const SAVE_DEBOUNCE_MS = 500;

// ---- Module State ----
let supabaseClient = null;
let currentSession = null;
let saveTimer = null;
let syncListeners = [];
let suppressCloudSave = false;

// ---- Auth Event System (uses app's on/emit pattern) ----
const authListeners = new Set();

function emitAuthChanged() {
  for (const fn of authListeners) fn();
}

export function onAuthChanged(fn) {
  authListeners.add(fn);
  return () => authListeners.delete(fn);
}

// ---- Public API ----

export function isLoggedIn() {
  return supabaseClient !== null && currentSession !== null;
}

export function getUser() {
  return currentSession?.user || null;
}

export function getSession() {
  return currentSession;
}

export async function loginWithDiscord() {
  if (!supabaseClient) return;

  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: window.location.origin
    }
  });

  if (error) {
    console.warn('Discord login failed:', error.message);
  }
}

export async function logout() {
  console.log('Logout: starting...');
  if (!supabaseClient) {
    console.warn('Logout: supabaseClient is null, aborting');
    return;
  }

  // signOut() can hang if session token is expired — race with a timeout
  try {
    console.log('Logout: calling signOut...');
    const signOutPromise = supabaseClient.auth.signOut({ scope: 'local' });
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('signOut timed out after 3s')), 3000)
    );

    const { error } = await Promise.race([signOutPromise, timeoutPromise]);
    if (error) {
      console.warn('Logout: signOut returned error:', error.message);
    } else {
      console.log('Logout: signOut succeeded');
    }
  } catch (err) {
    console.warn('Logout: signOut failed/timed out:', err.message);
  }

  // Always force local cleanup regardless of signOut result
  currentSession = null;
  stopCloudSync();

  // Nuke Supabase's stored auth tokens so a page refresh doesn't auto-restore
  // the session. The SDK stores them under a key like sb-<ref>-auth-token.
  try {
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith('sb-') && key.endsWith('-auth-token')) {
        localStorage.removeItem(key);
        console.log('Logout: removed stored token:', key);
      }
    }
  } catch (e) {
    console.warn('Logout: failed to clear stored tokens:', e.message);
  }

  // Reset all upgrades and build to defaults (suppress cloud save so we don't
  // push empty data to the cloud — the user's cloud data stays intact for next login)
  suppressCloudSave = true;
  applyCloudState({}, {}, {});  // clears upgradeState, artifactUpgrades, inspirationUpgrades
  clearBuild();                  // clears powers, masteries, inspirations, artifact, tool
  suppressCloudSave = false;

  emitAuthChanged();
  console.log('Logout: local cleanup complete (state reset to defaults)');
}

// ---- Cloud Save (Debounced) ----

function debouncedCloudSave() {
  if (suppressCloudSave) return;
  if (!isLoggedIn()) {
    console.warn('Cloud save skipped: not logged in');
    return;
  }

  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    try {
      await saveUpgradesToCloud();
    } catch (err) {
      console.warn('Cloud save failed (data safe in localStorage):', err.message);
    }
  }, SAVE_DEBOUNCE_MS);
}

function flushPendingSave() {
  if (!saveTimer) return;
  clearTimeout(saveTimer);
  saveTimer = null;
  saveUpgradesToCloud().catch(err =>
    console.warn('Cloud save flush failed:', err.message)
  );
}

function onPageHide() {
  if (document.hidden) flushPendingSave();
}

function onBeforeUnload() {
  flushPendingSave();
}

async function saveUpgradesToCloud() {
  if (!supabaseClient || !currentSession) return;

  const userId = currentSession.user.id;
  console.log('Cloud save starting for user:', userId);
  console.log('Saving upgrade_state:', JSON.stringify(upgradeState));

  const { data, error, status, statusText, count } = await supabaseClient
    .from('user_upgrades')
    .upsert({
      user_id: userId,
      upgrade_state: { ...upgradeState },
      artifact_upgrades: { ...artifactUpgrades },
      inspiration_upgrades: { ...inspirationUpgrades }
    }, {
      onConflict: 'user_id'
    })
    .select();

  if (error) {
    console.error('Cloud save error:', { error, status, statusText });
    throw error;
  }

  console.log('Cloud save response:', { status, statusText, count, data });

  if (!data || data.length === 0) {
    console.error('Cloud save SILENTLY BLOCKED — RLS policy likely rejecting write');
  }

  // Verify: read back to confirm persistence
  const verify = await supabaseClient
    .from('user_upgrades')
    .select('upgrade_state')
    .eq('user_id', userId)
    .single();

  if (verify.error) {
    console.warn('Cloud save verify-read failed:', verify.error);
  } else {
    console.log('Cloud save verified in DB:', verify.data?.upgrade_state);
  }
}

// ---- Cloud Load ----

async function loadUpgradesFromCloud() {
  if (!supabaseClient || !currentSession) return null;

  console.log('Cloud load starting for user:', currentSession.user.id);

  const { data, error } = await supabaseClient
    .from('user_upgrades')
    .select('upgrade_state, artifact_upgrades, inspiration_upgrades')
    .eq('user_id', currentSession.user.id)
    .single();

  // PGRST116 = no rows found (new user)
  if (error && error.code === 'PGRST116') {
    console.log('Cloud load: no data found (new user)');
    return null;
  }
  if (error) throw error;

  console.log('Cloud load result:', data);
  return data;
}

// ---- Sync Lifecycle ----

function startCloudSync() {
  // Listen to upgrade change events and sync to cloud
  syncListeners.push(
    on('upgrades-changed', debouncedCloudSave),
    on('artifact-upgrades-changed', debouncedCloudSave),
    on('inspiration-upgrades-changed', debouncedCloudSave)
  );

  // Flush pending saves on tab hide / page close
  document.addEventListener('visibilitychange', onPageHide);
  window.addEventListener('beforeunload', onBeforeUnload);
}

function stopCloudSync() {
  // Remove all sync event listeners
  for (const unsub of syncListeners) unsub();
  syncListeners = [];

  if (saveTimer) {
    clearTimeout(saveTimer);
    saveTimer = null;
  }

  document.removeEventListener('visibilitychange', onPageHide);
  window.removeEventListener('beforeunload', onBeforeUnload);
}

// ---- Merge Prompt ----

function hasLocalUpgrades() {
  const hasUpgrades = Object.values(upgradeState).some(v => v > 0);
  const hasArtifacts = Object.keys(artifactUpgrades).length > 0;
  const hasInspirations = Object.keys(inspirationUpgrades).length > 0;
  return hasUpgrades || hasArtifacts || hasInspirations;
}

function showMergePrompt() {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay open';
    overlay.innerHTML = `
      <div class="modal" style="max-width: 480px;">
        <div class="modal-header">
          <h2>Welcome Back</h2>
        </div>
        <div class="modal-body">
          <p style="color: var(--foreground); margin-bottom: var(--sp-2);">
            You have upgrades set locally. Would you like to keep your current upgrades or load your saved data from the cloud?
          </p>
          <div class="modal-actions" style="justify-content: flex-end;">
            <button class="btn btn-small btn-ghost" id="merge-keep-local">Keep Current</button>
            <button class="btn btn-small" id="merge-use-cloud" style="background: var(--primary); color: var(--primary-foreground);">Load Cloud Data</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('merge-keep-local').addEventListener('click', () => {
      overlay.remove();
      resolve('local');
    });

    document.getElementById('merge-use-cloud').addEventListener('click', () => {
      overlay.remove();
      resolve('cloud');
    });
  });
}

// ---- Auth State Handler ----

async function handleAuthChange(event, session) {
  const wasLoggedIn = currentSession !== null;
  currentSession = session;

  // Emit immediately so the auth button updates before cloud sync
  emitAuthChanged();

  if (session && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION')) {
    try {
      const cloudData = await loadUpgradesFromCloud();

      if (cloudData) {
        // Both cloud and local data exist on fresh sign-in — ask user
        if (hasLocalUpgrades() && event === 'SIGNED_IN') {
          const choice = await showMergePrompt();
          if (choice === 'cloud') {
            suppressCloudSave = true;
            applyCloudState(
              cloudData.upgrade_state || {},
              cloudData.artifact_upgrades || {},
              cloudData.inspiration_upgrades || {}
            );
            suppressCloudSave = false;
          } else {
            // Keep local — upload to cloud
            await saveUpgradesToCloud();
          }
        } else {
          // Returning session or no local upgrades — cloud wins silently
          suppressCloudSave = true;
          applyCloudState(
            cloudData.upgrade_state || {},
            cloudData.artifact_upgrades || {},
            cloudData.inspiration_upgrades || {}
          );
          suppressCloudSave = false;
        }
      } else {
        // No cloud data — upload current localStorage state (first login)
        await saveUpgradesToCloud();
      }
    } catch (err) {
      console.warn('Cloud sync on login failed (using localStorage):', err.message);
    }

    startCloudSync();
  } else if (event === 'SIGNED_OUT') {
    console.log('Auth state: SIGNED_OUT');
    stopCloudSync();
  }
}

// ---- Initialization ----

export async function initSupabase() {
  // Guard: if CDN failed to load, skip all cloud features
  if (typeof window.supabase === 'undefined') {
    console.warn('Supabase SDK not loaded. Cloud sync disabled.');
    emitAuthChanged(); // Still emit so UI renders login button (disabled)
    return;
  }

  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Listen for auth state changes
  supabaseClient.auth.onAuthStateChange(handleAuthChange);

  // onAuthStateChange fires INITIAL_SESSION on init (even if logged out),
  // which sets currentSession and emits auth change after cloud sync.
  // No need to call getSession() or emitAuthChanged() here — the callback
  // is the single source of truth to avoid timing races.
}

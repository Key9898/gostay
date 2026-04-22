/**
 * Auth0 Post-Login Action for GoStay.
 *
 * Place this in Auth0 Dashboard → Actions → Flows → Login → Custom.
 * Secrets needed: GOSTAY_API_URL, GOSTAY_ACTION_TOKEN
 *
 * On every successful login it pings the GoStay API so we can upsert
 * the user document (Auth0 sub → Mongo _id mapping) and optionally
 * send a welcome email for first-time sign-ups.
 */
exports.onExecutePostLogin = async (event, api) => {
  const apiUrl = event.secrets.GOSTAY_API_URL
  const token = event.secrets.GOSTAY_ACTION_TOKEN
  if (!apiUrl || !token) return

  try {
    await fetch(`${apiUrl}/api/auth/action-sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Action-Token': token,
      },
      body: JSON.stringify({
        auth0Id: event.user.user_id,
        email: event.user.email,
        displayName: event.user.name ?? event.user.nickname ?? event.user.email,
        photoURL: event.user.picture,
        isNewUser: event.stats.logins_count === 1,
      }),
    })
  } catch (err) {
    console.error('GoStay sync failed', err)
  }
}

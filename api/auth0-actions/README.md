# Auth0 Actions for GoStay

## Post-Login (`post-login.js`)

Hooks into Auth0's Login flow to sync a user into our MongoDB on every sign-in
and trigger a welcome email on first login.

### Setup

1. **Auth0 Dashboard** → Actions → Library → Build Custom → paste `post-login.js`.
2. Add secrets:
   - `GOSTAY_API_URL` = `https://api.gostay.app` (or your Railway URL)
   - `GOSTAY_ACTION_TOKEN` = long random string; set the same value on the API as `ACTION_TOKEN` env var.
3. Deploy the action, then drag it into the **Login flow** after the default "Authenticate" step.

### API side

The API exposes `POST /api/auth/action-sync` guarded by the `X-Action-Token` header.
Handler upserts the User document. On `isNewUser: true`, it calls
`createNotification({ type: 'system', title: 'Welcome to GoStay', ... })` which
queues an in-app notification and (if `RESEND_API_KEY` is set) an email via
`api/src/services/mailer.ts`.

## Email delivery

The backend uses **Resend** (HTTP API, no SDK dep). Set these on Railway:

- `RESEND_API_KEY` — API key from resend.com
- `MAIL_FROM` — e.g. `GoStay <noreply@gostay.app>` (domain must be verified in Resend)

If `RESEND_API_KEY` is unset, `sendMail` logs and no-ops — useful for local dev.

## Events that send email today

| Trigger                             | Recipient            | Type       |
| ----------------------------------- | -------------------- | ---------- |
| `POST /api/merchants/:id/orders`    | Merchant owner       | `order`    |
| `POST /api/manage/invoices`         | Tenant (if user)     | `invoice`  |
| First login (Auth0 Action → sync)   | New user             | `system`   |

Users can disable email via the `emailNotifications` flag on the User doc
(schema default: `true`).

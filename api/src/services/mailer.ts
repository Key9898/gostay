interface SendMailParams {
  to: string
  subject: string
  html: string
  text?: string
}

const FROM = process.env.MAIL_FROM ?? 'GoStay <noreply@gostay.app>'
const RESEND_KEY = process.env.RESEND_API_KEY

export async function sendMail({ to, subject, html, text }: SendMailParams): Promise<boolean> {
  if (!RESEND_KEY) {
    if (process.env.NODE_ENV !== 'test') {
      console.info('[mailer] RESEND_API_KEY not set; skipping email to', to, '-', subject)
    }
    return false
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [to],
        subject,
        html,
        text: text ?? html.replace(/<[^>]+>/g, ''),
      }),
    })
    if (!res.ok) {
      console.error('[mailer] Resend error', res.status, await res.text())
      return false
    }
    return true
  } catch (err) {
    console.error('[mailer] send failed', err)
    return false
  }
}

export function renderNotificationEmail(title: string, body: string, link?: string): string {
  const linkBlock = link
    ? `<p style="margin-top:24px"><a href="${link}" style="background:#C2573A;color:#fff;padding:10px 20px;border-radius:999px;text-decoration:none;font-weight:600">Open GoStay</a></p>`
    : ''
  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#1F1A17">
      <h1 style="font-size:22px;margin:0 0 12px">${title}</h1>
      <p style="line-height:1.6;color:#3D3430">${body}</p>
      ${linkBlock}
      <hr style="margin-top:32px;border:none;border-top:1px solid #E8DDC9" />
      <p style="font-size:12px;color:#8A7F73;margin-top:12px">GoStay · Myanmar & Thailand</p>
    </div>
  `
}

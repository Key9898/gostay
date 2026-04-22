import { Notification } from '../models/Notification'
import { User } from '../models/User'
import { sendMail, renderNotificationEmail } from './mailer'

export interface CreateNotificationParams {
  userId: string
  type: 'system' | 'listing' | 'community' | 'order' | 'invoice' | 'maintenance'
  title: string
  body: string
  link?: string
  sendEmail?: boolean
}

export async function createNotification(params: CreateNotificationParams): Promise<void> {
  const { userId, type, title, body, link, sendEmail: doEmail = true } = params

  const notif = await Notification.create({ userId, type, title, body, link, read: false })

  if (!doEmail) return

  try {
    const user = await User.findById(userId).select('email emailNotifications').lean()
    if (!user?.email) return
    if (user.emailNotifications === false) return

    await sendMail({
      to: user.email,
      subject: title,
      html: renderNotificationEmail(title, body, link),
    })
  } catch (err) {
    console.error('[notify] email failed for notification', notif._id, err)
  }
}

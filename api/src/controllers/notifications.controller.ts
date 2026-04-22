import { Request, Response, NextFunction } from 'express'
import { Notification } from '../models/Notification'
import { User } from '../models/User'

async function findUserId(req: Request): Promise<string | null> {
  const auth0Id = req.auth?.payload?.sub
  if (!auth0Id) return null
  const user = await User.findOne({ auth0Id })
  return user ? String(user._id) : null
}

export async function getNotifications(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = await findUserId(req)
    if (!userId) {
      res.json({ notifications: [], total: 0, unread: 0 })
      return
    }
    const [notifications, unread] = await Promise.all([
      Notification.find({ userId }).sort({ createdAt: -1 }).limit(50),
      Notification.countDocuments({ userId, read: false }),
    ])
    res.json({ notifications, total: notifications.length, unread })
  } catch (err) {
    next(err)
  }
}

export async function markRead(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = await findUserId(req)
    const notif = await Notification.findOneAndUpdate({ _id: req.params.id, userId }, { read: true }, { new: true })
    if (!notif) {
      res.status(404).json({ error: 'Notification not found' })
      return
    }
    res.json(notif)
  } catch (err) {
    next(err)
  }
}

export async function markAllRead(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = await findUserId(req)
    if (!userId) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    await Notification.updateMany({ userId, read: false }, { read: true })
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
}

import { Request, Response, NextFunction } from 'express'
import { User } from '../models/User'
import { createNotification } from '../services/notify'

export async function getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const auth0Id = req.auth?.payload?.sub
    if (!auth0Id) { res.status(401).json({ error: 'Unauthorized' }); return }

    const user = await User.findOne({ auth0Id })
    if (!user) { res.status(404).json({ error: 'User not found' }); return }

    res.json(user)
  } catch (err) {
    next(err)
  }
}

export async function actionSync(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const token = req.header('X-Action-Token')
    if (!process.env.ACTION_TOKEN || token !== process.env.ACTION_TOKEN) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const { auth0Id, email, displayName, photoURL, isNewUser } = req.body
    if (!auth0Id || !email) { res.status(400).json({ error: 'auth0Id and email required' }); return }

    const user = await User.findOneAndUpdate(
      { auth0Id },
      { $set: { email, displayName, photoURL }, $setOnInsert: { auth0Id } },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    )

    if (isNewUser) {
      await createNotification({
        userId: String(user._id),
        type: 'system',
        title: 'Welcome to GoStay',
        body: 'Find rentals, roommates, and home kitchens across Myanmar and Thailand.',
        link: '/',
      })
    }

    res.json({ ok: true, userId: user._id })
  } catch (err) {
    next(err)
  }
}

export async function syncUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const auth0Id = req.auth?.payload?.sub
    if (!auth0Id) { res.status(401).json({ error: 'Unauthorized' }); return }

    const { email, displayName, photoURL } = req.body

    const user = await User.findOneAndUpdate(
      { auth0Id },
      { $setOnInsert: { auth0Id, email, displayName, photoURL } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    res.json(user)
  } catch (err) {
    next(err)
  }
}

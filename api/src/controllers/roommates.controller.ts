import { Request, Response, NextFunction } from 'express'
import { RoommatePost } from '../models/RoommatePost'
import { User } from '../models/User'

async function findUserId(req: Request): Promise<string | null> {
  const auth0Id = req.auth?.payload?.sub
  if (!auth0Id) return null
  const user = await User.findOne({ auth0Id })
  return user ? String(user._id) : null
}

export async function getRoommates(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { status = 'looking', page = 1, limit = 12 } = req.query
    const filter: Record<string, unknown> = { status }

    const skip = (Number(page) - 1) * Number(limit)
    const [posts, total] = await Promise.all([
      RoommatePost.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      RoommatePost.countDocuments(filter),
    ])

    res.json({ posts, total, page: Number(page), limit: Number(limit) })
  } catch (err) {
    next(err)
  }
}

export async function getRoommate(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const post = await RoommatePost.findById(req.params.id)
    if (!post) {
      res.status(404).json({ error: 'Roommate post not found' })
      return
    }
    res.json(post)
  } catch (err) {
    next(err)
  }
}

export async function createRoommate(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = await findUserId(req)
    if (!userId) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    const post = await RoommatePost.create({ ...req.body, userId })
    res.status(201).json(post)
  } catch (err) {
    next(err)
  }
}

export async function updateRoommate(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = await findUserId(req)
    const post = await RoommatePost.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true },
    )
    if (!post) {
      res.status(404).json({ error: 'Roommate post not found' })
      return
    }
    res.json(post)
  } catch (err) {
    next(err)
  }
}

export async function deleteRoommate(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = await findUserId(req)
    const post = await RoommatePost.findOneAndDelete({ _id: req.params.id, userId })
    if (!post) {
      res.status(404).json({ error: 'Roommate post not found' })
      return
    }
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

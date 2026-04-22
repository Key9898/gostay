import { Request, Response, NextFunction } from 'express'
import { Post } from '../models/Post'
import { Comment } from '../models/Comment'
import { User } from '../models/User'

async function findUserId(req: Request): Promise<string | null> {
  const auth0Id = req.auth?.payload?.sub
  if (!auth0Id) return null
  const user = await User.findOne({ auth0Id })
  return user ? String(user._id) : null
}

export async function getPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category, page = 1, limit = 20 } = req.query
    const filter: Record<string, unknown> = { status: 'active' }
    if (category) filter.category = category

    const skip = (Number(page) - 1) * Number(limit)
    const [posts, total] = await Promise.all([
      Post.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Post.countDocuments(filter),
    ])

    res.json({ posts, total, page: Number(page), limit: Number(limit) })
  } catch (err) {
    next(err)
  }
}

export async function getPost(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      res.status(404).json({ error: 'Post not found' })
      return
    }
    res.json(post)
  } catch (err) {
    next(err)
  }
}

export async function createPost(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = await findUserId(req)
    if (!userId) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    const post = await Post.create({ ...req.body, userId })
    res.status(201).json(post)
  } catch (err) {
    next(err)
  }
}

export async function updatePost(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = await findUserId(req)
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true },
    )
    if (!post) {
      res.status(404).json({ error: 'Post not found' })
      return
    }
    res.json(post)
  } catch (err) {
    next(err)
  }
}

export async function deletePost(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = await findUserId(req)
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, userId },
      { status: 'removed' },
      { new: true },
    )
    if (!post) {
      res.status(404).json({ error: 'Post not found' })
      return
    }
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

export async function votePost(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { direction } = req.body as { direction: 'up' | 'down' }
    const field = direction === 'up' ? 'upvotes' : 'downvotes'
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { [field]: 1 } },
      { new: true },
    )
    if (!post) {
      res.status(404).json({ error: 'Post not found' })
      return
    }
    res.json(post)
  } catch (err) {
    next(err)
  }
}

export async function getComments(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const comments = await Comment.find({ postId: req.params.id }).sort({ createdAt: 1 })
    res.json({ comments })
  } catch (err) {
    next(err)
  }
}

export async function createComment(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = await findUserId(req)
    if (!userId) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    const comment = await Comment.create({
      ...req.body,
      postId: req.params.id,
      userId,
    })
    await Post.findByIdAndUpdate(req.params.id, { $inc: { commentCount: 1 } })
    res.status(201).json(comment)
  } catch (err) {
    next(err)
  }
}

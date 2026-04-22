import { Schema, model, Document, Types } from 'mongoose'
import type { PostCategory, PostStatus } from '../types'

export interface IPost extends Document {
  userId: Types.ObjectId
  title: string
  content: string
  category: PostCategory
  isAnonymous: boolean
  upvotes: number
  downvotes: number
  commentCount: number
  status: PostStatus
  createdAt: Date
  updatedAt: Date
}

const postSchema = new Schema<IPost>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, enum: ['general', 'market', 'tips', 'qa'], required: true, index: true },
    isAnonymous: { type: Boolean, default: false },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'hidden', 'removed'], default: 'active', index: true },
  },
  { timestamps: true }
)

export const Post = model<IPost>('Post', postSchema)

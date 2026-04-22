import { Schema, model, Document, Types } from 'mongoose'

export interface IComment extends Document {
  postId: Types.ObjectId
  userId: Types.ObjectId
  content: string
  isAnonymous: boolean
  parentId?: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const commentSchema = new Schema<IComment>(
  {
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    content: { type: String, required: true },
    isAnonymous: { type: Boolean, default: false },
    parentId: { type: Schema.Types.ObjectId, ref: 'Comment' },
  },
  { timestamps: true },
)

export const Comment = model<IComment>('Comment', commentSchema)

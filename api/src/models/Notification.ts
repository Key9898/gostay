import { Schema, model, Document, Types } from 'mongoose'

export interface INotification extends Document {
  userId: Types.ObjectId
  type: 'system' | 'listing' | 'community' | 'order' | 'invoice' | 'maintenance'
  title: string
  body: string
  link?: string
  read: boolean
  createdAt: Date
  updatedAt: Date
}

const notificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: {
      type: String,
      enum: ['system', 'listing', 'community', 'order', 'invoice', 'maintenance'],
      default: 'system',
    },
    title: { type: String, required: true },
    body: { type: String, required: true },
    link: String,
    read: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
)

export const Notification = model<INotification>('Notification', notificationSchema)

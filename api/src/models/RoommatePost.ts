import { Schema, model, Document, Types } from 'mongoose'

export interface IRoommatePost extends Document {
  userId: Types.ObjectId
  title: string
  description: string
  budget: { min: number; max: number }
  currency: string
  preferredLocations: string[]
  moveInDate: Date
  duration: string
  preferences: {
    gender?: 'male' | 'female' | 'any'
    smoking?: boolean
    pets?: boolean
  }
  status: 'looking' | 'found' | 'closed'
  createdAt: Date
  updatedAt: Date
}

const roommatePostSchema = new Schema<IRoommatePost>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    budget: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    currency: { type: String, default: 'MMK' },
    preferredLocations: [String],
    moveInDate: Date,
    duration: String,
    preferences: {
      gender: { type: String, enum: ['male', 'female', 'any'] },
      smoking: Boolean,
      pets: Boolean,
    },
    status: { type: String, enum: ['looking', 'found', 'closed'], default: 'looking', index: true },
  },
  { timestamps: true }
)

export const RoommatePost = model<IRoommatePost>('RoommatePost', roommatePostSchema)

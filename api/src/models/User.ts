import { Schema, model, Document } from 'mongoose'
import type { UserRole, UserStatus, Language } from '../types'

export interface IUser extends Document {
  auth0Id: string
  email: string
  displayName: string
  photoURL?: string
  phone?: string
  role: UserRole
  status: UserStatus
  language: Language
  emailNotifications?: boolean
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    auth0Id: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    photoURL: String,
    phone: String,
    role: { type: String, enum: ['user', 'owner', 'agent', 'admin'], default: 'user' },
    status: { type: String, enum: ['active', 'suspended'], default: 'active' },
    language: { type: String, enum: ['en', 'my', 'th'], default: 'en' },
    emailNotifications: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export const User = model<IUser>('User', userSchema)

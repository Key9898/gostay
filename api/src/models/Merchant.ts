import { Schema, model, Document, Types } from 'mongoose'

export interface IMerchant extends Document {
  userId: Types.ObjectId
  name: string
  description: string
  cuisine: string
  city: string
  country: 'Myanmar' | 'Thailand'
  address: string
  phone?: string
  image?: string
  rating: number
  status: 'active' | 'closed' | 'draft'
  createdAt: Date
  updatedAt: Date
}

const merchantSchema = new Schema<IMerchant>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    cuisine: { type: String, required: true },
    city: { type: String, required: true, index: true },
    country: { type: String, enum: ['Myanmar', 'Thailand'], required: true },
    address: { type: String, required: true },
    phone: String,
    image: String,
    rating: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'closed', 'draft'], default: 'draft', index: true },
  },
  { timestamps: true },
)

export const Merchant = model<IMerchant>('Merchant', merchantSchema)

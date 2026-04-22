import { Schema, model, Document, Types } from 'mongoose'

export interface IMenuItem extends Document {
  merchantId: Types.ObjectId
  name: string
  description: string
  price: number
  currency: string
  image?: string
  available: boolean
  createdAt: Date
  updatedAt: Date
}

const menuItemSchema = new Schema<IMenuItem>(
  {
    merchantId: { type: Schema.Types.ObjectId, ref: 'Merchant', required: true, index: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    currency: { type: String, default: 'MMK' },
    image: String,
    available: { type: Boolean, default: true },
  },
  { timestamps: true },
)

export const MenuItem = model<IMenuItem>('MenuItem', menuItemSchema)

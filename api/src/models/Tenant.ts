import { Schema, model, Document, Types } from 'mongoose'

export interface ITenant extends Document {
  ownerId: Types.ObjectId
  listingId: Types.ObjectId
  name: string
  email?: string
  phone?: string
  rent: number
  currency: string
  leaseStart: Date
  leaseEnd: Date
  status: 'active' | 'ended'
  createdAt: Date
  updatedAt: Date
}

const tenantSchema = new Schema<ITenant>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    listingId: { type: Schema.Types.ObjectId, ref: 'Listing', required: true, index: true },
    name: { type: String, required: true },
    email: String,
    phone: String,
    rent: { type: Number, required: true },
    currency: { type: String, default: 'MMK' },
    leaseStart: { type: Date, required: true },
    leaseEnd: { type: Date, required: true },
    status: { type: String, enum: ['active', 'ended'], default: 'active', index: true },
  },
  { timestamps: true },
)

export const Tenant = model<ITenant>('Tenant', tenantSchema)

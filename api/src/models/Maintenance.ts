import { Schema, model, Document, Types } from 'mongoose'

export interface IMaintenance extends Document {
  ownerId: Types.ObjectId
  tenantId?: Types.ObjectId
  listingId: Types.ObjectId
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  status: 'open' | 'in_progress' | 'resolved' | 'cancelled'
  images: string[]
  createdAt: Date
  updatedAt: Date
}

const maintenanceSchema = new Schema<IMaintenance>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant' },
    listingId: { type: Schema.Types.ObjectId, ref: 'Listing', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    status: { type: String, enum: ['open', 'in_progress', 'resolved', 'cancelled'], default: 'open', index: true },
    images: [String],
  },
  { timestamps: true },
)

export const Maintenance = model<IMaintenance>('Maintenance', maintenanceSchema)

import { Schema, model, Document, Types } from 'mongoose'

export interface IInvoice extends Document {
  ownerId: Types.ObjectId
  tenantId: Types.ObjectId
  amount: number
  currency: string
  dueDate: Date
  paidAt?: Date
  status: 'pending' | 'paid' | 'overdue' | 'cancelled'
  note?: string
  createdAt: Date
  updatedAt: Date
}

const invoiceSchema = new Schema<IInvoice>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'MMK' },
    dueDate: { type: Date, required: true },
    paidAt: Date,
    status: { type: String, enum: ['pending', 'paid', 'overdue', 'cancelled'], default: 'pending', index: true },
    note: String,
  },
  { timestamps: true },
)

export const Invoice = model<IInvoice>('Invoice', invoiceSchema)

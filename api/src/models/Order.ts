import { Schema, model, Document, Types } from 'mongoose'

export interface IOrderItem {
  menuItemId: Types.ObjectId
  name: string
  price: number
  quantity: number
}

export interface IOrder extends Document {
  merchantId: Types.ObjectId
  customerId: Types.ObjectId
  items: IOrderItem[]
  subtotal: number
  currency: string
  mode: 'pickup' | 'delivery'
  address?: string
  phone?: string
  status: 'pending' | 'accepted' | 'ready' | 'completed' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}

const orderSchema = new Schema<IOrder>(
  {
    merchantId: { type: Schema.Types.ObjectId, ref: 'Merchant', required: true, index: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    items: [
      {
        menuItemId: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
        name: String,
        price: Number,
        quantity: { type: Number, default: 1 },
      },
    ],
    subtotal: { type: Number, required: true },
    currency: { type: String, default: 'MMK' },
    mode: { type: String, enum: ['pickup', 'delivery'], default: 'pickup' },
    address: String,
    phone: String,
    status: {
      type: String,
      enum: ['pending', 'accepted', 'ready', 'completed', 'cancelled'],
      default: 'pending',
      index: true,
    },
  },
  { timestamps: true },
)

export const Order = model<IOrder>('Order', orderSchema)

import { Schema, model, Document, Types } from 'mongoose'
import type { ListingType, ListingStatus, Country } from '../types'

export interface IListing extends Document {
  userId: Types.ObjectId
  title: string
  description: string
  type: ListingType
  priceMonthly: number
  priceDaily?: number
  currency: string
  location: {
    address: string
    city: string
    country: Country
    coordinates?: { lat: number; lng: number }
  }
  images: string[]
  amenities: string[]
  bedrooms: number
  bathrooms: number
  area: number
  status: ListingStatus
  createdAt: Date
  updatedAt: Date
}

const listingSchema = new Schema<IListing>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['apartment', 'condo', 'house', 'room'], required: true },
    priceMonthly: { type: Number, required: true },
    priceDaily: Number,
    currency: { type: String, default: 'MMK' },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true, index: true },
      country: { type: String, enum: ['Myanmar', 'Thailand'], required: true },
      coordinates: { lat: Number, lng: Number },
    },
    images: [String],
    amenities: [String],
    bedrooms: { type: Number, default: 1 },
    bathrooms: { type: Number, default: 1 },
    area: { type: Number, default: 0 },
    status: { type: String, enum: ['available', 'rented', 'draft'], default: 'draft', index: true },
  },
  { timestamps: true }
)

export const Listing = model<IListing>('Listing', listingSchema)

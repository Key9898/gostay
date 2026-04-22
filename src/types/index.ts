export interface User {
  id: string
  email: string
  displayName: string
  photoURL?: string
  phoneNumber?: string
  language: 'my' | 'en' | 'th'
  currency: 'MMK' | 'THB' | 'USD'
  createdAt: Date
  updatedAt: Date
}

export interface Listing {
  id: string
  userId: string
  title: string
  description: string
  price: number
  currency: 'MMK' | 'THB' | 'USD'
  priceType: 'monthly' | 'daily'
  location: {
    address: string
    city: string
    country: string
    lat?: number
    lng?: number
  }
  bedrooms: number
  bathrooms: number
  area: number
  amenities: string[]
  images: string[]
  status: 'active' | 'inactive' | 'rented'
  createdAt: Date
  updatedAt: Date
}

export interface RoommatePost {
  id: string
  userId: string
  type: 'looking' | 'offering'
  title: string
  description: string
  budget: {
    min: number
    max: number
    currency: 'MMK' | 'THB' | 'USD'
  }
  preferences: {
    gender?: 'male' | 'female' | 'any'
    smoking?: boolean
    pets?: boolean
  }
  moveInDate: Date
  duration: string
  location: {
    city: string
    country: string
  }
  images: string[]
  status: 'active' | 'inactive' | 'found'
  createdAt: Date
  updatedAt: Date
}

export interface Post {
  id: string
  userId: string
  category: 'general' | 'market' | 'tips' | 'qa'
  title: string
  content: string
  images: string[]
  upvotes: number
  downvotes: number
  commentCount: number
  status: 'active' | 'hidden' | 'deleted'
  createdAt: Date
  updatedAt: Date
}

export interface Comment {
  id: string
  postId: string
  userId: string
  content: string
  parentId?: string
  upvotes: number
  downvotes: number
  status: 'active' | 'hidden' | 'deleted'
  createdAt: Date
  updatedAt: Date
}

export interface SavedItem {
  id: string
  userId: string
  itemType: 'listing' | 'roommate' | 'post'
  itemId: string
  createdAt: Date
}

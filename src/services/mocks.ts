import type { Listing, RoommatePost, Post, Comment } from '@types'

type Json = Record<string, unknown>

const now = () => new Date().toISOString()

const mockListings: Listing[] = [
  {
    id: 'mock-l-1',
    userId: 'mock-u-1',
    title: 'Sunlit studio near Inya Lake',
    description:
      'A calm, light-filled studio with lake breeze and good wifi. Walk to cafés and shops.',
    price: 450000,
    currency: 'MMK',
    priceType: 'monthly',
    location: {
      address: '12 University Ave',
      city: 'Yangon',
      country: 'Myanmar',
      lat: 16.8409,
      lng: 96.1735,
    },
    bedrooms: 1,
    bathrooms: 1,
    area: 420,
    amenities: ['Wifi', 'Air conditioning', 'Lift'],
    images: [],
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'mock-l-2',
    userId: 'mock-u-2',
    title: 'Ari condo, 2BR with rooftop',
    description: 'Bright Ari condo steps from the BTS. Pool, gym, and rooftop garden.',
    price: 24000,
    currency: 'THB',
    priceType: 'monthly',
    location: {
      address: 'Soi Ari 4',
      city: 'Bangkok',
      country: 'Thailand',
      lat: 13.7806,
      lng: 100.5444,
    },
    bedrooms: 2,
    bathrooms: 2,
    area: 720,
    amenities: ['Pool', 'Gym', 'Wifi', 'Parking'],
    images: [],
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'mock-l-3',
    userId: 'mock-u-3',
    title: 'Nimman sunlit loft',
    description: 'Walkable to cafés in Nimman. Quiet street, fast fibre, workspace desk.',
    price: 18000,
    currency: 'THB',
    priceType: 'monthly',
    location: {
      address: 'Nimmanhaemin Rd',
      city: 'Chiang Mai',
      country: 'Thailand',
      lat: 18.7963,
      lng: 98.9675,
    },
    bedrooms: 1,
    bathrooms: 1,
    area: 540,
    amenities: ['Wifi', 'Workspace', 'Kitchen'],
    images: [],
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const mockRoommates: RoommatePost[] = [
  {
    id: 'mock-r-1',
    userId: 'mock-u-1',
    type: 'looking',
    title: 'Quiet grad student looking to share 2BR',
    description: 'Non-smoker, early riser, looking for a clean flatmate near downtown Yangon.',
    budget: { min: 200000, max: 300000, currency: 'MMK' },
    preferences: { gender: 'any', smoking: false, pets: false },
    moveInDate: new Date(),
    duration: '6 months',
    location: { city: 'Yangon', country: 'Myanmar' },
    images: [],
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const mockPosts: Post[] = [
  {
    id: 'mock-p-1',
    userId: 'mock-u-1',
    category: 'tips',
    title: 'Deposit disputes — what worked for me',
    content: 'Three things that made getting my deposit back painless…',
    images: [],
    upvotes: 42,
    downvotes: 1,
    commentCount: 6,
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'mock-p-2',
    userId: 'mock-u-2',
    category: 'market',
    title: 'Bangkok vs Yangon monthly cost comparison 2026',
    content: 'I tracked groceries, transport, and rent for six months in both cities…',
    images: [],
    upvotes: 28,
    downvotes: 0,
    commentCount: 12,
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const mockComments: Comment[] = []
const mockMerchants = [
  {
    id: 'mock-m-1',
    name: 'Shwe Cafe',
    cuisine: 'Burmese',
    city: 'Yangon',
    rating: 4.7,
    image: '',
    description: 'Traditional Burmese tea shop classics.',
  },
  {
    id: 'mock-m-2',
    name: 'Lanna Kitchen',
    cuisine: 'Northern Thai',
    city: 'Chiang Mai',
    rating: 4.8,
    image: '',
    description: 'Khao soi and sai ua.',
  },
]
const mockTenants = [
  {
    id: 'mock-t-1',
    name: 'U Aung',
    listingId: 'mock-l-1',
    rent: 450000,
    currency: 'MMK',
    leaseStart: '2026-01-01',
    leaseEnd: '2026-12-31',
  },
]
const mockInvoices = [
  {
    id: 'mock-i-1',
    tenantId: 'mock-t-1',
    amount: 450000,
    currency: 'MMK',
    dueDate: '2026-05-01',
    status: 'pending',
  },
]

function paged<T>(items: T[], page = 1, limit = 20) {
  const start = (page - 1) * limit
  return { items: items.slice(start, start + limit), total: items.length }
}

function match(pathname: string, pattern: RegExp) {
  return pattern.exec(pathname)
}

export function mockFetch<T>(path: string, method: string, body?: unknown): T | null {
  const [pathname, query = ''] = path.split('?')
  const qs = new URLSearchParams(query)
  const page = Number(qs.get('page') ?? 1)
  const limit = Number(qs.get('limit') ?? 20)

  // Listings
  if (pathname === '/api/listings' && method === 'GET') {
    let list = [...mockListings]
    const city = qs.get('city')
    const bedrooms = qs.get('bedrooms')
    const priceMin = qs.get('priceMin')
    const priceMax = qs.get('priceMax')
    if (city) list = list.filter((l) => l.location.city === city)
    if (bedrooms) list = list.filter((l) => l.bedrooms >= Number(bedrooms))
    if (priceMin) list = list.filter((l) => l.price >= Number(priceMin))
    if (priceMax) list = list.filter((l) => l.price <= Number(priceMax))
    const { items, total } = paged(list, page, limit)
    return { listings: items, total, page, limit } as unknown as T
  }
  const listingMatch = match(pathname, /^\/api\/listings\/([\w-]+)$/)
  if (listingMatch && method === 'GET') {
    const found = mockListings.find((l) => l.id === listingMatch[1])
    return (found ?? null) as unknown as T
  }

  // Posts
  if (pathname === '/api/posts' && method === 'GET') {
    let list = [...mockPosts]
    const cat = qs.get('category')
    if (cat) list = list.filter((p) => p.category === cat)
    const { items, total } = paged(list, page, limit)
    return { posts: items, total, page, limit } as unknown as T
  }
  if (pathname === '/api/posts' && method === 'POST') {
    const b = (body ?? {}) as Json
    const post: Post = {
      id: `mock-p-${Date.now()}`,
      userId: 'mock-me',
      category: (b.category as Post['category']) ?? 'general',
      title: String(b.title ?? ''),
      content: String(b.content ?? ''),
      images: [],
      upvotes: 0,
      downvotes: 0,
      commentCount: 0,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    mockPosts.unshift(post)
    return post as unknown as T
  }
  const voteMatch = match(pathname, /^\/api\/posts\/([\w-]+)\/vote$/)
  if (voteMatch && method === 'POST') {
    const p = mockPosts.find((x) => x.id === voteMatch[1])
    if (p) {
      const dir = (body as Json | undefined)?.direction
      if (dir === 'up') p.upvotes += 1
      if (dir === 'down') p.downvotes += 1
    }
    return p as unknown as T
  }
  const commentsMatch = match(pathname, /^\/api\/posts\/([\w-]+)\/comments$/)
  if (commentsMatch && method === 'GET') {
    const list = mockComments.filter((c) => c.postId === commentsMatch[1])
    return { comments: list, total: list.length } as unknown as T
  }

  // Roommates
  if (pathname === '/api/roommates' && method === 'GET') {
    const { items, total } = paged(mockRoommates, page, limit)
    return { posts: items, total, page, limit } as unknown as T
  }

  // Kitchen (merchants)
  if (pathname === '/api/merchants' && method === 'GET') {
    return { merchants: mockMerchants, total: mockMerchants.length } as unknown as T
  }

  // Manage (tenants + invoices)
  if (pathname === '/api/tenants' && method === 'GET') {
    return { tenants: mockTenants, total: mockTenants.length } as unknown as T
  }
  if (pathname === '/api/invoices' && method === 'GET') {
    return { invoices: mockInvoices, total: mockInvoices.length } as unknown as T
  }

  // Notifications
  if (pathname === '/api/notifications' && method === 'GET') {
    return {
      notifications: [
        {
          id: 'mock-n-1',
          title: 'Welcome to GoStay',
          body: 'Browse listings or post your own.',
          read: false,
          createdAt: now(),
        },
      ],
      total: 1,
    } as unknown as T
  }

  return null
}

import { Request, Response, NextFunction } from 'express'
import { Listing } from '../models/Listing'
import { User } from '../models/User'

export async function getListings(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { city, type, status = 'available', bedrooms, priceMin, priceMax, q, page = 1, limit = 12 } = req.query
    const filter: Record<string, unknown> = { status }
    if (city) filter['location.city'] = city
    if (type) filter.type = type
    if (bedrooms) filter.bedrooms = { $gte: Number(bedrooms) }
    if (priceMin || priceMax) {
      const priceRange: Record<string, number> = {}
      if (priceMin) priceRange.$gte = Number(priceMin)
      if (priceMax) priceRange.$lte = Number(priceMax)
      filter.priceMonthly = priceRange
    }
    if (q) {
      const rx = new RegExp(String(q), 'i')
      filter.$or = [{ title: rx }, { description: rx }, { 'location.address': rx }]
    }

    const skip = (Number(page) - 1) * Number(limit)
    const [listings, total] = await Promise.all([
      Listing.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Listing.countDocuments(filter),
    ])

    res.json({ listings, total, page: Number(page), limit: Number(limit) })
  } catch (err) {
    next(err)
  }
}

export async function getListing(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const listing = await Listing.findById(req.params.id)
    if (!listing) { res.status(404).json({ error: 'Listing not found' }); return }
    res.json(listing)
  } catch (err) {
    next(err)
  }
}

export async function createListing(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const auth0Id = req.auth?.payload?.sub
    const dbUser = await User.findOne({ auth0Id })
    if (!dbUser) { res.status(404).json({ error: 'User not found' }); return }

    const listing = await Listing.create({ ...req.body, userId: dbUser._id })
    res.status(201).json(listing)
  } catch (err) {
    next(err)
  }
}

export async function updateListing(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const auth0Id = req.auth?.payload?.sub
    const dbUser = await User.findOne({ auth0Id })
    const listing = await Listing.findOneAndUpdate(
      { _id: req.params.id, userId: dbUser?._id },
      req.body,
      { new: true }
    )
    if (!listing) { res.status(404).json({ error: 'Listing not found' }); return }
    res.json(listing)
  } catch (err) {
    next(err)
  }
}

export async function deleteListing(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const auth0Id = req.auth?.payload?.sub
    const dbUser = await User.findOne({ auth0Id })
    const listing = await Listing.findOneAndDelete({ _id: req.params.id, userId: dbUser?._id })
    if (!listing) { res.status(404).json({ error: 'Listing not found' }); return }
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

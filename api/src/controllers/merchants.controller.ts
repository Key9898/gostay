import { Request, Response, NextFunction } from 'express'
import { Merchant } from '../models/Merchant'
import { MenuItem } from '../models/MenuItem'
import { Order } from '../models/Order'
import { User } from '../models/User'
import { createNotification } from '../services/notify'

async function findUserId(req: Request): Promise<string | null> {
  const auth0Id = req.auth?.payload?.sub
  if (!auth0Id) return null
  const user = await User.findOne({ auth0Id })
  return user ? String(user._id) : null
}

export async function getMerchants(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { city, cuisine, status = 'active', page = 1, limit = 20 } = req.query
    const filter: Record<string, unknown> = { status }
    if (city) filter.city = city
    if (cuisine) filter.cuisine = cuisine

    const skip = (Number(page) - 1) * Number(limit)
    const [merchants, total] = await Promise.all([
      Merchant.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Merchant.countDocuments(filter),
    ])
    res.json({ merchants, total, page: Number(page), limit: Number(limit) })
  } catch (err) {
    next(err)
  }
}

export async function getMerchant(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const merchant = await Merchant.findById(req.params.id)
    if (!merchant) {
      res.status(404).json({ error: 'Merchant not found' })
      return
    }
    res.json(merchant)
  } catch (err) {
    next(err)
  }
}

export async function createMerchant(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = await findUserId(req)
    if (!userId) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    const merchant = await Merchant.create({ ...req.body, userId })
    res.status(201).json(merchant)
  } catch (err) {
    next(err)
  }
}

export async function updateMerchant(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = await findUserId(req)
    const merchant = await Merchant.findOneAndUpdate({ _id: req.params.id, userId }, req.body, { new: true })
    if (!merchant) {
      res.status(404).json({ error: 'Merchant not found' })
      return
    }
    res.json(merchant)
  } catch (err) {
    next(err)
  }
}

export async function deleteMerchant(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = await findUserId(req)
    const merchant = await Merchant.findOneAndDelete({ _id: req.params.id, userId })
    if (!merchant) {
      res.status(404).json({ error: 'Merchant not found' })
      return
    }
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

export async function getMenuItems(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const items = await MenuItem.find({ merchantId: req.params.id }).sort({ createdAt: -1 })
    res.json({ items, total: items.length })
  } catch (err) {
    next(err)
  }
}

export async function createMenuItem(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = await findUserId(req)
    const merchant = await Merchant.findOne({ _id: req.params.id, userId })
    if (!merchant) {
      res.status(403).json({ error: 'Not your merchant' })
      return
    }
    const item = await MenuItem.create({ ...req.body, merchantId: merchant._id })
    res.status(201).json(item)
  } catch (err) {
    next(err)
  }
}

export async function createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = await findUserId(req)
    if (!userId) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    const order = await Order.create({ ...req.body, customerId: userId })

    const merchant = await Merchant.findById(order.merchantId).select('userId name').lean()
    if (merchant?.userId) {
      await createNotification({
        userId: String(merchant.userId),
        type: 'order',
        title: 'New order received',
        body: `You have a new order for ${order.currency} ${order.subtotal}.`,
        link: `/kitchen/merchant/orders/${order._id}`,
      })
    }

    res.status(201).json(order)
  } catch (err) {
    next(err)
  }
}

export async function getMyOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = await findUserId(req)
    if (!userId) {
      res.json({ orders: [], total: 0 })
      return
    }
    const orders = await Order.find({ customerId: userId }).sort({ createdAt: -1 })
    res.json({ orders, total: orders.length })
  } catch (err) {
    next(err)
  }
}

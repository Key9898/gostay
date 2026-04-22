import { Request, Response, NextFunction } from 'express'
import { Tenant } from '../models/Tenant'
import { Invoice } from '../models/Invoice'
import { Maintenance } from '../models/Maintenance'
import { User } from '../models/User'
import { createNotification } from '../services/notify'

async function findUserId(req: Request): Promise<string | null> {
  const auth0Id = req.auth?.payload?.sub
  if (!auth0Id) return null
  const user = await User.findOne({ auth0Id })
  return user ? String(user._id) : null
}

// Tenants
export async function getTenants(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const ownerId = await findUserId(req)
    if (!ownerId) {
      res.json({ tenants: [], total: 0 })
      return
    }
    const tenants = await Tenant.find({ ownerId }).sort({ createdAt: -1 })
    res.json({ tenants, total: tenants.length })
  } catch (err) {
    next(err)
  }
}

export async function createTenant(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const ownerId = await findUserId(req)
    if (!ownerId) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    const tenant = await Tenant.create({ ...req.body, ownerId })
    res.status(201).json(tenant)
  } catch (err) {
    next(err)
  }
}

export async function updateTenant(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const ownerId = await findUserId(req)
    const tenant = await Tenant.findOneAndUpdate({ _id: req.params.id, ownerId }, req.body, { new: true })
    if (!tenant) {
      res.status(404).json({ error: 'Tenant not found' })
      return
    }
    res.json(tenant)
  } catch (err) {
    next(err)
  }
}

export async function deleteTenant(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const ownerId = await findUserId(req)
    const tenant = await Tenant.findOneAndDelete({ _id: req.params.id, ownerId })
    if (!tenant) {
      res.status(404).json({ error: 'Tenant not found' })
      return
    }
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

// Invoices
export async function getInvoices(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const ownerId = await findUserId(req)
    if (!ownerId) {
      res.json({ invoices: [], total: 0 })
      return
    }
    const { status, tenantId } = req.query
    const filter: Record<string, unknown> = { ownerId }
    if (status) filter.status = status
    if (tenantId) filter.tenantId = tenantId
    const invoices = await Invoice.find(filter).sort({ dueDate: -1 })
    res.json({ invoices, total: invoices.length })
  } catch (err) {
    next(err)
  }
}

export async function createInvoice(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const ownerId = await findUserId(req)
    if (!ownerId) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    const invoice = await Invoice.create({ ...req.body, ownerId })

    const tenant = await Tenant.findById(invoice.tenantId).select('name email').lean()
    const tenantUser = tenant?.email ? await User.findOne({ email: tenant.email }).select('_id').lean() : null
    if (tenantUser?._id) {
      await createNotification({
        userId: String(tenantUser._id),
        type: 'invoice',
        title: 'New invoice issued',
        body: `Invoice for ${invoice.currency} ${invoice.amount} is due ${new Date(invoice.dueDate).toDateString()}.`,
        link: `/manage/invoices/${invoice._id}`,
      })
    }

    res.status(201).json(invoice)
  } catch (err) {
    next(err)
  }
}

export async function updateInvoice(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const ownerId = await findUserId(req)
    const payload = { ...req.body }
    if (payload.status === 'paid' && !payload.paidAt) payload.paidAt = new Date()
    const invoice = await Invoice.findOneAndUpdate({ _id: req.params.id, ownerId }, payload, { new: true })
    if (!invoice) {
      res.status(404).json({ error: 'Invoice not found' })
      return
    }
    res.json(invoice)
  } catch (err) {
    next(err)
  }
}

// Maintenance
export async function getMaintenance(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const ownerId = await findUserId(req)
    if (!ownerId) {
      res.json({ requests: [], total: 0 })
      return
    }
    const { status } = req.query
    const filter: Record<string, unknown> = { ownerId }
    if (status) filter.status = status
    const requests = await Maintenance.find(filter).sort({ createdAt: -1 })
    res.json({ requests, total: requests.length })
  } catch (err) {
    next(err)
  }
}

export async function createMaintenance(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const ownerId = await findUserId(req)
    if (!ownerId) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    const request = await Maintenance.create({ ...req.body, ownerId })
    res.status(201).json(request)
  } catch (err) {
    next(err)
  }
}

export async function updateMaintenance(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const ownerId = await findUserId(req)
    const request = await Maintenance.findOneAndUpdate({ _id: req.params.id, ownerId }, req.body, { new: true })
    if (!request) {
      res.status(404).json({ error: 'Maintenance request not found' })
      return
    }
    res.json(request)
  } catch (err) {
    next(err)
  }
}

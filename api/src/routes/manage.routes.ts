import { Router } from 'express'
import { requireAuth } from '../middleware/auth'
import {
  getTenants,
  createTenant,
  updateTenant,
  deleteTenant,
  getInvoices,
  createInvoice,
  updateInvoice,
  getMaintenance,
  createMaintenance,
  updateMaintenance,
} from '../controllers/manage.controller'

const router = Router()

router.get('/tenants', requireAuth, getTenants)
router.post('/tenants', requireAuth, createTenant)
router.patch('/tenants/:id', requireAuth, updateTenant)
router.delete('/tenants/:id', requireAuth, deleteTenant)

router.get('/invoices', requireAuth, getInvoices)
router.post('/invoices', requireAuth, createInvoice)
router.patch('/invoices/:id', requireAuth, updateInvoice)

router.get('/maintenance', requireAuth, getMaintenance)
router.post('/maintenance', requireAuth, createMaintenance)
router.patch('/maintenance/:id', requireAuth, updateMaintenance)

export default router

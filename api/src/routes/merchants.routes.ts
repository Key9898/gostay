import { Router } from 'express'
import { requireAuth } from '../middleware/auth'
import {
  getMerchants,
  getMerchant,
  createMerchant,
  updateMerchant,
  deleteMerchant,
  getMenuItems,
  createMenuItem,
  createOrder,
  getMyOrders,
} from '../controllers/merchants.controller'

const router = Router()

router.get('/', getMerchants)
router.get('/orders/me', requireAuth, getMyOrders)
router.get('/:id', getMerchant)
router.post('/', requireAuth, createMerchant)
router.patch('/:id', requireAuth, updateMerchant)
router.delete('/:id', requireAuth, deleteMerchant)
router.get('/:id/menu', getMenuItems)
router.post('/:id/menu', requireAuth, createMenuItem)
router.post('/:id/orders', requireAuth, createOrder)

export default router

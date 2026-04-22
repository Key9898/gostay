import { Router } from 'express'
import { requireAuth } from '../middleware/auth'
import {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
} from '../controllers/listings.controller'

const router = Router()

router.get('/', getListings)
router.get('/:id', getListing)
router.post('/', requireAuth, createListing)
router.patch('/:id', requireAuth, updateListing)
router.delete('/:id', requireAuth, deleteListing)

export default router

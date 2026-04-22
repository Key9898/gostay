import { Router } from 'express'
import { requireAuth } from '../middleware/auth'
import {
  getRoommates,
  getRoommate,
  createRoommate,
  updateRoommate,
  deleteRoommate,
} from '../controllers/roommates.controller'

const router = Router()

router.get('/', getRoommates)
router.get('/:id', getRoommate)
router.post('/', requireAuth, createRoommate)
router.patch('/:id', requireAuth, updateRoommate)
router.delete('/:id', requireAuth, deleteRoommate)

export default router

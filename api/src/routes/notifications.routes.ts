import { Router } from 'express'
import { requireAuth } from '../middleware/auth'
import { getNotifications, markRead, markAllRead } from '../controllers/notifications.controller'

const router = Router()

router.get('/', requireAuth, getNotifications)
router.patch('/:id/read', requireAuth, markRead)
router.post('/read-all', requireAuth, markAllRead)

export default router

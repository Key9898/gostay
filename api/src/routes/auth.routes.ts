import { Router } from 'express'
import { requireAuth } from '../middleware/auth'
import { getMe, syncUser, actionSync } from '../controllers/auth.controller'

const router = Router()

router.get('/me', requireAuth, getMe)
router.post('/sync', requireAuth, syncUser)
router.post('/action-sync', actionSync)

export default router

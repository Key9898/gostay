import { Router } from 'express'
import { requireAuth } from '../middleware/auth'
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  votePost,
  getComments,
  createComment,
} from '../controllers/posts.controller'

const router = Router()

router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/', requireAuth, createPost)
router.patch('/:id', requireAuth, updatePost)
router.delete('/:id', requireAuth, deletePost)
router.post('/:id/vote', requireAuth, votePost)

router.get('/:id/comments', getComments)
router.post('/:id/comments', requireAuth, createComment)

export default router

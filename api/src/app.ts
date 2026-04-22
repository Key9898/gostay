import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import * as Sentry from '@sentry/node'
import { initSentry } from './config/sentry'
import { initCloudinary } from './config/cloudinary'
import { errorHandler } from './middleware/errorHandler'
import authRoutes from './routes/auth.routes'
import listingsRoutes from './routes/listings.routes'
import postsRoutes from './routes/posts.routes'
import roommatesRoutes from './routes/roommates.routes'
import merchantsRoutes from './routes/merchants.routes'
import manageRoutes from './routes/manage.routes'
import notificationsRoutes from './routes/notifications.routes'

initSentry()
initCloudinary()

const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(morgan('dev'))
app.use(express.json())

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.use('/api/auth', authRoutes)
app.use('/api/listings', listingsRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/roommates', roommatesRoutes)
app.use('/api/merchants', merchantsRoutes)
app.use('/api/manage', manageRoutes)
app.use('/api/notifications', notificationsRoutes)

Sentry.setupExpressErrorHandler(app)
app.use(errorHandler)

export default app

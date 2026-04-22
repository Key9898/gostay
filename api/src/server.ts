import 'dotenv/config'
import app from './app'
import { connectDB } from './config/db'

const PORT = Number(process.env.PORT) || 4000

async function start(): Promise<void> {
  await connectDB()
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

start().catch(console.error)

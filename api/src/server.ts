import 'dotenv/config'
import app from './app'
import { connectDB } from './config/db'

const PORT = Number(process.env.PORT) || 4000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  connectDB().catch((err) => {
    console.error('MongoDB connection failed:', err)
    process.exit(1)
  })
})

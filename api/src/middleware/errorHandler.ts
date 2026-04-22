import { Request, Response, NextFunction } from 'express'
import { Sentry } from '../config/sentry'

export interface AppError extends Error {
  statusCode?: number
}

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  Sentry.captureException(err)

  const statusCode = err.statusCode ?? 500
  const message = statusCode === 500 ? 'Internal server error' : err.message

  res.status(statusCode).json({ error: message })
}

import { auth } from 'express-oauth2-jwt-bearer'
import type { Request, Response, NextFunction } from 'express'

let _middleware: ReturnType<typeof auth> | null = null

function getMiddleware(): ReturnType<typeof auth> {
  if (!_middleware) {
    _middleware = auth({
      audience: process.env.AUTH0_AUDIENCE,
      issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
      tokenSigningAlg: 'RS256',
    })
  }
  return _middleware
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  getMiddleware()(req, res, next)
}

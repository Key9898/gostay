import type { ReactNode } from 'react'
import { cn } from '@utils'
import Skeleton from '../Skeleton'

interface CardProps {
  children?: ReactNode
  className?: string
  image?: string
  title?: string
  isLoading?: boolean
  onClick?: () => void
  footer?: ReactNode
  badgeContent?: string
  badgeVariant?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'ghost'
    | 'outline'
    | 'error'
    | 'success'
    | 'warning'
    | 'info'
}

export default function Card({
  children,
  className,
  image,
  title,
  isLoading,
  onClick,
  footer,
  badgeContent,
  badgeVariant = 'secondary',
}: CardProps) {
  if (isLoading) {
    return (
      <div className={cn('warm-card overflow-hidden', className)}>
        <Skeleton className="h-56 w-full rounded-none" />
        <div className="p-5 space-y-3">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="mt-4 flex items-center justify-between">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        'warm-card group overflow-hidden',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {image && (
        <figure className="relative h-56 overflow-hidden bg-base-200">
          <img
            src={image}
            alt={title || 'Card image'}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {badgeContent && (
            <div
              className={cn(
                'absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur',
                badgeVariant === 'primary'
                  ? 'bg-primary/95 text-primary-content'
                  : badgeVariant === 'accent'
                  ? 'bg-accent/95 text-accent-content'
                  : 'bg-base-100/90 text-base-content ring-1 ring-base-300'
              )}
            >
              {badgeContent}
            </div>
          )}
        </figure>
      )}
      <div className="p-5">
        {title && (
          <h3 className="font-serif text-xl font-semibold leading-snug text-base-content transition-colors group-hover:text-primary">
            {title}
          </h3>
        )}
        {children}
        {footer && (
          <div className="mt-5 flex items-center justify-between border-t border-base-300/70 pt-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

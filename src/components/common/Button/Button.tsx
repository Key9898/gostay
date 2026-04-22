import type { ButtonHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { cn } from '@utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'ghost'
    | 'outline'
    | 'link'
    | 'error'
    | 'success'
    | 'warning'
    | 'info'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  isLoading?: boolean
  isFullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading,
      isFullWidth,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      accent: 'btn-accent',
      ghost: 'btn-ghost',
      outline: 'btn-outline',
      link: 'btn-link text-primary hover:text-primary-focus no-underline hover:underline',
      error: 'btn-error',
      success: 'btn-success',
      warning: 'btn-warning',
      info: 'btn-info',
    }

    const sizeClasses = {
      xs: 'btn-xs',
      sm: 'btn-sm',
      md: 'btn-md',
      lg: 'btn-lg',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'btn transition-all duration-300 ease-in-out',
          'hover:scale-[1.02] active:scale-[0.98]',
          variantClasses[variant],
          sizeClasses[size],
          isFullWidth && 'w-full',
          isLoading && 'loading',
          className
        )}
        {...props}
      >
        {!isLoading && children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button

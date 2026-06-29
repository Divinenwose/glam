import { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '../../utils/helpers'

export const Modal = ({ isOpen, onClose, title, children, size = 'md', showClose = true }) => {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    full: 'max-w-full mx-4',
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`relative w-full ${sizes[size]} bg-white dark:bg-secondary-900 rounded-2xl shadow-xl`}
            >
              {title && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-secondary-200 dark:border-secondary-800">
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">{title}</h3>
                  {showClose && (
                    <button
                      onClick={onClose}
                      className="p-2 rounded-lg text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              )}
              {!title && showClose && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-lg text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <div className="p-6">{children}</div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

export const Input = forwardRef(({ className, error, label, ...props }, ref) => {
  return (
    <div>
      {label && <label className="label">{label}</label>}
      <input
        ref={ref}
        className={cn('input', error && 'input-error', className)}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-error-600 dark:text-error-400">{error}</p>}
    </div>
  )
})

export const Textarea = forwardRef(({ className, error, label, ...props }, ref) => {
  return (
    <div>
      {label && <label className="label">{label}</label>}
      <textarea
        ref={ref}
        className={cn('input min-h-[100px] resize-y', error && 'input-error', className)}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-error-600 dark:text-error-400">{error}</p>}
    </div>
  )
})

export const Select = forwardRef(({ className, error, label, options, placeholder, ...props }, ref) => {
  return (
    <div>
      {label && <label className="label">{label}</label>}
      <select ref={ref} className={cn('input cursor-pointer', error && 'input-error', className)} {...props}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-error-600 dark:text-error-400">{error}</p>}
    </div>
  )
})

export const Checkbox = forwardRef(({ className, label, error, ...props }, ref) => {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        ref={ref}
        className={cn(
          'mt-1 w-4 h-4 rounded border-secondary-300 dark:border-secondary-600 text-primary-600 focus:ring-primary-500 cursor-pointer',
          className
        )}
        {...props}
      />
      <div>
        <span className="text-sm text-secondary-700 dark:text-secondary-300">{label}</span>
        {error && <p className="mt-1 text-sm text-error-600 dark:text-error-400">{error}</p>}
      </div>
    </label>
  )
})

export const Button = forwardRef(({ children, variant = 'primary', size = 'md', loading, disabled, className, ...props }, ref) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
    accent: 'btn-accent',
    success: 'btn-success',
    error: 'btn-error',
  }

  const sizes = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
    icon: 'btn-icon',
  }

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(variants[variant], sizes[size], className)}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        children
      )}
    </button>
  )
})

export const Badge = ({ children, variant = 'default', className, ...props }) => {
  const variants = {
    default: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-800 dark:text-secondary-300',
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
  }

  return (
    <span className={cn('badge', variants[variant], className)} {...props}>
      {children}
    </span>
  )
}

export const Card = forwardRef(({ children, className, hover, ...props }, ref) => {
  return (
    <div ref={ref} className={cn(hover ? 'card-hover' : 'card', className)} {...props}>
      {children}
    </div>
  )
})

export const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {Icon && (
        <div className="p-4 rounded-full bg-secondary-100 dark:bg-secondary-800 mb-4">
          <Icon className="w-8 h-8 text-secondary-400" />
        </div>
      )}
      <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">{title}</h3>
      {description && (
        <p className="text-secondary-600 dark:text-secondary-400 max-w-sm mb-6">{description}</p>
      )}
      {action}
    </div>
  )
}

export const Skeleton = ({ className, ...props }) => {
  return <div className={cn('skeleton', className)} {...props} />
}

export const LoadingSpinner = ({ size = 'md', className }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div className={cn('animate-spin text-primary-600', sizes[size], className)}>
      <svg fill="none" viewBox="0 0 24 24" className="w-full h-full">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  )
}

export const Avatar = ({ src, alt, size = 'md', className }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  }

  const initials = alt
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className={cn('rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center font-medium text-primary-700 dark:text-primary-300 overflow-hidden', sizes[size], className)}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span>{initials || 'U'}</span>
      )}
    </div>
  )
}

export const StarRating = ({ rating, maxRating = 5, className }) => {
  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {[...Array(maxRating)].map((_, i) => (
        <svg
          key={i}
          className={cn(
            'w-4 h-4',
            i < rating ? 'text-warning-500 fill-warning-500' : 'text-secondary-300 dark:text-secondary-600'
          )}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default Modal;

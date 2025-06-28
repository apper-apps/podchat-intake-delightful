import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white focus:ring-primary-500 shadow-sm hover:shadow-md',
    secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300 focus:ring-gray-500 shadow-sm hover:shadow-md',
    accent: 'bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-700 hover:to-accent-600 text-white focus:ring-accent-500 shadow-sm hover:shadow-md',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-gradient-to-r from-error-600 to-error-500 hover:from-error-700 hover:to-error-600 text-white focus:ring-error-500 shadow-sm hover:shadow-md'
  }
  
  const sizes = {
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-pill',
    lg: 'px-8 py-4 text-lg rounded-pill',
  }
  
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e)
    }
  }

  return (
    <motion.button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      onClick={handleClick}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      {...props}
    >
      {loading && (
        <motion.div
          className="mr-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <ApperIcon name="Loader2" className={iconSizes[size]} />
        </motion.div>
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <ApperIcon 
          name={icon} 
          className={`${iconSizes[size]} ${children ? 'mr-2' : ''}`} 
        />
      )}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' && (
        <ApperIcon 
          name={icon} 
          className={`${iconSizes[size]} ${children ? 'ml-2' : ''}`} 
        />
      )}
    </motion.button>
  )
}

export default Button
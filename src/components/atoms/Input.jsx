import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Input = ({ 
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onKeyPress,
  error,
  disabled = false,
  required = false,
  icon,
  iconPosition = 'left',
  className = '',
  rows = 3,
  ...props 
}) => {
  const inputClasses = `
    w-full px-4 py-3 border rounded-pill transition-all duration-200 ease-out
    focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500
    disabled:bg-gray-50 disabled:cursor-not-allowed
    ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-100' : 'border-gray-200'}
    ${icon ? (iconPosition === 'left' ? 'pl-12' : 'pr-12') : ''}
    ${className}
  `

  const textareaClasses = `
    w-full px-4 py-3 border rounded-2xl transition-all duration-200 ease-out
    focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500
    disabled:bg-gray-50 disabled:cursor-not-allowed resize-none
    ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-100' : 'border-gray-200'}
    ${className}
  `

  const InputComponent = type === 'textarea' ? 'textarea' : 'input'
  const inputProps = type === 'textarea' ? { rows } : { type }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className={`absolute top-1/2 transform -translate-y-1/2 ${
            iconPosition === 'left' ? 'left-4' : 'right-4'
          }`}>
            <ApperIcon 
              name={icon} 
              className="w-5 h-5 text-gray-400" 
            />
          </div>
        )}
        
        <InputComponent
          className={type === 'textarea' ? textareaClasses : inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          disabled={disabled}
          required={required}
          {...inputProps}
          {...props}
        />
      </div>
      
      {error && (
        <motion.p
          className="text-sm text-error-600 flex items-center space-x-1"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ApperIcon name="AlertCircle" className="w-4 h-4" />
          <span>{error}</span>
        </motion.p>
      )}
    </div>
  )
}

export default Input
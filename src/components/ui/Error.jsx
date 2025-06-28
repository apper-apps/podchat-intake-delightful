import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ 
  message = "Something went wrong", 
  onRetry, 
  title = "Oops!" 
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[400px] space-y-6 p-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-16 h-16 bg-gradient-to-r from-error-500 to-error-600 rounded-full flex items-center justify-center shadow-lg"
        animate={{
          rotate: [0, -10, 10, -10, 0],
        }}
        transition={{
          duration: 0.5,
          delay: 0.2,
        }}
      >
        <ApperIcon 
          name="AlertCircle" 
          className="w-8 h-8 text-white" 
        />
      </motion.div>
      
      <div className="text-center space-y-2">
        <motion.h3
          className="text-2xl font-bold text-gray-800 font-display"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {title}
        </motion.h3>
        
        <motion.p
          className="text-gray-600 max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {message}
        </motion.p>
      </div>
      
      {onRetry && (
        <motion.button
          onClick={onRetry}
          className="btn-primary flex items-center space-x-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="RefreshCw" className="w-4 h-4" />
          <span>Try Again</span>
        </motion.button>
      )}
    </motion.div>
  )
}

export default Error
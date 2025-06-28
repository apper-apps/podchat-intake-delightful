import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "Nothing here yet", 
  message = "Get started by taking your first action.",
  actionText = "Get Started",
  onAction,
  icon = "Coffee"
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[400px] space-y-6 p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-20 h-20 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full flex items-center justify-center shadow-sm"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ApperIcon 
          name={icon} 
          className="w-10 h-10 text-primary-600" 
        />
      </motion.div>
      
      <div className="text-center space-y-3">
        <motion.h3
          className="text-2xl font-bold text-gray-800 font-display"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {title}
        </motion.h3>
        
        <motion.p
          className="text-gray-600 max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {message}
        </motion.p>
      </div>
      
      {onAction && (
        <motion.button
          onClick={onAction}
          className="btn-primary flex items-center space-x-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="Sparkles" className="w-4 h-4" />
          <span>{actionText}</span>
        </motion.button>
      )}
    </motion.div>
  )
}

export default Empty
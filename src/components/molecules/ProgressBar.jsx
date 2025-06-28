import React from 'react'
import { motion } from 'framer-motion'

const ProgressBar = ({ current, total, className = '' }) => {
  const percentage = Math.round((current / total) * 100)
  
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">
          Question {current} of {total}
        </span>
        <span className="text-sm font-medium text-primary-600">
          {percentage}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full progress-gradient rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ 
            duration: 0.5, 
            ease: "easeOut",
            type: "spring",
            stiffness: 100
          }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
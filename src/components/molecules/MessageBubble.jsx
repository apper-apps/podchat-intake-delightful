import React from 'react'
import { motion } from 'framer-motion'

const MessageBubble = ({ message, isHost = false, isTyping = false }) => {
  const bubbleVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    }
  }

  if (isTyping) {
    return (
      <motion.div
        className="flex items-start space-x-3 mb-6"
        variants={bubbleVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-medium">H</span>
        </div>
        <div className="message-bubble message-host px-4 py-3 max-w-md">
          <div className="flex space-x-1">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`flex items-start space-x-3 mb-6 ${isHost ? '' : 'flex-row-reverse space-x-reverse'}`}
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isHost 
          ? 'bg-gradient-to-r from-primary-600 to-primary-500' 
          : 'bg-gradient-to-r from-gray-400 to-gray-500'
      }`}>
        <span className="text-white text-sm font-medium">
          {isHost ? 'H' : 'G'}
        </span>
      </div>
      
      <div className={`message-bubble px-4 py-3 max-w-md ${
        isHost ? 'message-host' : 'message-guest'
      }`}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message}
        </p>
      </div>
    </motion.div>
  )
}

export default MessageBubble
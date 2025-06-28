import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MessageBubble from '@/components/molecules/MessageBubble'

const ChatContainer = ({ messages, isTyping = false }) => {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'end'
    })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  return (
    <div className="flex-1 overflow-y-auto chat-scroll px-4 py-6 space-y-1">
      <AnimatePresence mode="wait">
        {messages.map((message, index) => (
          <motion.div key={`${message.id}-${index}`}>
            <MessageBubble
              message={message.content}
              isHost={message.type === 'host'}
            />
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div
            key="typing-indicator"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <MessageBubble isTyping={true} isHost={true} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatContainer
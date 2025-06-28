import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'

const MessageInput = ({ 
  onSend, 
  disabled = false, 
  placeholder = "Type your message...",
  multiline = false,
  value,
  onChange,
  error
}) => {
  const [localValue, setLocalValue] = useState('')
  
  const inputValue = value !== undefined ? value : localValue
  const handleChange = onChange || ((e) => setLocalValue(e.target.value))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim() && onSend) {
      onSend(inputValue.trim())
      if (value === undefined) {
        setLocalValue('')
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !multiline) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex items-end space-x-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-1">
        <Input
          type={multiline ? 'textarea' : 'text'}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          error={error}
          rows={multiline ? 3 : undefined}
          className="bg-white"
        />
      </div>
      
      <Button
        type="submit"
        variant="primary"
        icon="Send"
        disabled={disabled || !inputValue.trim()}
        className="flex-shrink-0"
      />
    </motion.form>
  )
}

export default MessageInput
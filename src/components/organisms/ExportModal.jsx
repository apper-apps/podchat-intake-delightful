import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const ExportModal = ({ isOpen, onClose, guestInfo }) => {
  const [exportFormat, setExportFormat] = useState('formatted')

  const formatData = (format) => {
    switch (format) {
      case 'json':
        return JSON.stringify(guestInfo, null, 2)
      
      case 'formatted':
        return `PODCAST GUEST INTAKE FORM
Generated: ${new Date().toLocaleDateString()}

NAME: ${guestInfo.name || 'Not provided'}
EMAIL: ${guestInfo.email || 'Not provided'}

BIO:
${guestInfo.bio || 'Not provided'}

EXPERTISE:
${guestInfo.expertise || 'Not provided'}

DISCUSSION TOPICS:
${guestInfo.topics || 'Not provided'}

SOCIAL LINKS:
${guestInfo.socialLinks || 'Not provided'}

AVAILABILITY:
${guestInfo.availability || 'Not provided'}
`

      case 'csv':
        return `Name,Email,Bio,Expertise,Topics,Social Links,Availability
"${guestInfo.name || ''}","${guestInfo.email || ''}","${(guestInfo.bio || '').replace(/"/g, '""')}","${guestInfo.expertise || ''}","${(guestInfo.topics || '').replace(/"/g, '""')}","${guestInfo.socialLinks || ''}","${(guestInfo.availability || '').replace(/"/g, '""')}"`

      default:
        return JSON.stringify(guestInfo, null, 2)
    }
  }

  const copyToClipboard = async () => {
    try {
      const formattedData = formatData(exportFormat)
      await navigator.clipboard.writeText(formattedData)
      toast.success('Copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const downloadFile = () => {
    const formattedData = formatData(exportFormat)
    const fileExtension = exportFormat === 'formatted' ? 'txt' : exportFormat
    const filename = `guest-intake-${guestInfo.name?.replace(/\s+/g, '-').toLowerCase() || 'unknown'}-${Date.now()}.${fileExtension}`
    
    const blob = new Blob([formattedData], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    toast.success('File downloaded!')
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: 20,
      transition: { duration: 0.2 }
    }
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        />
        
        <motion.div
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white font-display">
                Export Guest Information
              </h3>
              <button
                onClick={onClose}
                className="text-white hover:text-primary-100 transition-colors"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Format Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Export Format
              </label>
              <div className="space-y-2">
                {[
                  { value: 'formatted', label: 'Formatted Text', description: 'Human-readable format' },
                  { value: 'json', label: 'JSON', description: 'Structured data format' },
                  { value: 'csv', label: 'CSV', description: 'Spreadsheet compatible' }
                ].map((format) => (
                  <label key={format.value} className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="exportFormat"
                      value={format.value}
                      checked={exportFormat === format.value}
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="mt-1 text-primary-600 focus:ring-primary-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{format.label}</div>
                      <div className="text-sm text-gray-500">{format.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Preview
              </label>
              <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto text-xs font-mono">
                <pre className="whitespace-pre-wrap">
                  {formatData(exportFormat).substring(0, 300)}
                  {formatData(exportFormat).length > 300 && '...'}
                </pre>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <Button
                variant="secondary"
                icon="Copy"
                onClick={copyToClipboard}
                className="flex-1"
              >
                Copy to Clipboard
              </Button>
              <Button
                variant="primary"
                icon="Download"
                onClick={downloadFile}
                className="flex-1"
              >
                Download File
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default ExportModal
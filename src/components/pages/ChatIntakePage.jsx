import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import ChatContainer from "@/components/organisms/ChatContainer";
import ExportModal from "@/components/organisms/ExportModal";
import Button from "@/components/atoms/Button";
import MessageInput from "@/components/molecules/MessageInput";
import ProgressBar from "@/components/molecules/ProgressBar";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import useLocalStorage from "@/hooks/useLocalStorage";
import questionService from "@/services/api/questionService";

const ChatIntakePage = () => {
  // State management
  const [messages, setMessages] = useLocalStorage('podChatMessages', [])
  const [guestInfo, setGuestInfo] = useLocalStorage('podChatGuestInfo', {})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useLocalStorage('podChatProgress', 0)
  const [currentInput, setCurrentInput] = useState('')
  const [inputError, setInputError] = useState('')
  
  // UI State
  const [isTyping, setIsTyping] = useState(false)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  // Load questions on component mount
  useEffect(() => {
    loadQuestions()
  }, [])

  // Check if conversation has started
  useEffect(() => {
    setHasStarted(messages.length > 0 || currentQuestionIndex > 0)
  }, [messages, currentQuestionIndex])

  // Check if intake is complete
  useEffect(() => {
    setIsComplete(currentQuestionIndex >= questions.length && questions.length > 0)
  }, [currentQuestionIndex, questions])

  const loadQuestions = async () => {
    try {
      setLoading(true)
      setError('')
      const questionsData = await questionService.getAll()
      setQuestions(questionsData)
    } catch (err) {
      setError('Failed to load questions. Please try again.')
      console.error('Error loading questions:', err)
    } finally {
      setLoading(false)
    }
  }

  const startConversation = async () => {
    if (questions.length === 0) return
    
const welcomeMessage = {
      id: Date.now(),
      type: 'host',
      content: 'Welcome to Innovabuzz Intake! I\'m here to learn more about you as a potential podcast guest. This will be a friendly conversation - just answer each question as we go. Let\'s start with the basics - what\'s your name?',
      timestamp: new Date()
    }
    setMessages([welcomeMessage])
    
    // Show typing indicator then first question
    setTimeout(() => {
      setIsTyping(true)
      setTimeout(() => {
        askNextQuestion()
        setIsTyping(false)
      }, 1500)
    }, 1000)
  }

  const askNextQuestion = () => {
    if (currentQuestionIndex >= questions.length) {
      completeIntake()
      return
    }

    const question = questions[currentQuestionIndex]
    const questionMessage = {
      id: Date.now(),
      type: 'host',
      content: question.text,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, questionMessage])
  }

  const handleSendMessage = async (message) => {
    if (currentQuestionIndex >= questions.length) return

    const currentQuestion = questions[currentQuestionIndex]
    
    // Validate the answer
    const validation = questionService.validateAnswer(currentQuestion, message)
    if (!validation.isValid) {
      setInputError(validation.message)
      return
    }

    setInputError('')
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'guest',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setCurrentInput('')

    // Store the answer
    setGuestInfo(prev => ({
      ...prev,
      [currentQuestion.field]: message
    }))

    // Move to next question
    const nextIndex = currentQuestionIndex + 1
    setCurrentQuestionIndex(nextIndex)

    // Show typing indicator then next question or completion
    setTimeout(() => {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        if (nextIndex < questions.length) {
          askNextQuestion()
        } else {
          completeIntake()
        }
      }, 1500)
    }, 1000)
  }

const completeIntake = () => {
    const completionMessage = {
      id: Date.now(),
      type: 'host',
      content: `Perfect! Thank you ${guestInfo.name || 'there'} for taking the time to share your information. I have everything I need to prepare for our Innovabuzz Podcast conversation. You can export your responses using the button below, and I'll be in touch soon!`,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, completionMessage])
    toast.success('Intake completed! 🎉')
  }

  const resetConversation = () => {
    if (window.confirm('Are you sure you want to start over? All progress will be lost.')) {
      setMessages([])
      setGuestInfo({})
      setCurrentQuestionIndex(0)
      setCurrentInput('')
      setInputError('')
      setIsComplete(false)
      setHasStarted(false)
      toast.info('Conversation reset')
    }
  }

  const getCurrentQuestion = () => {
    if (currentQuestionIndex >= questions.length) return null
    return questions[currentQuestionIndex]
  }

  const isMultilineQuestion = () => {
    const question = getCurrentQuestion()
    return question && (question.type === 'textarea' || question.field === 'bio' || question.field === 'topics' || question.field === 'availability')
  }
if (loading) {
    return <Loading message="Preparing your conversation..." />
  }

  if (error) {
    return <Error message={error} onRetry={loadQuestions} />
  }

  if (questions.length === 0) {
    return (
      <Empty
        title="No Questions Available"
        message="We couldn't load the conversation questions. Please try refreshing the page."
        actionText="Refresh"
        onAction={() => window.location.reload()}
        icon="MessageCircle"
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        className="bg-white shadow-sm border-b"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-accent-500 rounded-full flex items-center justify-center">
                <ApperIcon name="Mic" className="w-6 h-6 text-white" />
              </div>
<div>
                <h1 className="text-xl font-bold text-gray-900 font-display">
                  Innovabuzz Intake
                </h1>
                <p className="text-sm text-gray-600">
                  Innovabuzz Podcast guest onboarding
                </p>
              </div>
            </div>

            {hasStarted && (
              <div className="flex items-center space-x-3">
                {isComplete && (
                  <Button
                    variant="accent"
                    icon="Download"
                    onClick={() => setShowExportModal(true)}
                    size="sm"
                  >
                    Export
                  </Button>
                )}
                <Button
                  variant="ghost"
                  icon="RotateCcw"
                  onClick={resetConversation}
                  size="sm"
                >
                  Reset
                </Button>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          {hasStarted && !isComplete && (
            <div className="mt-4">
              <ProgressBar
                current={currentQuestionIndex}
                total={questions.length}
              />
            </div>
          )}
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col">
        {!hasStarted ? (
          /* Welcome Screen */
          <motion.div
            className="flex-1 flex items-center justify-center p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-center space-y-8 max-w-2xl">
              <motion.div
                className="w-24 h-24 bg-gradient-to-r from-primary-600 to-accent-500 rounded-full flex items-center justify-center mx-auto shadow-lg"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <ApperIcon name="MessageCircle" className="w-12 h-12 text-white" />
              </motion.div>

<div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-900 font-display">
                  Ready to share your story?
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Let's have a friendly conversation about your background, expertise, and what you'd love to discuss on the podcast. This will help me prepare the perfect questions for our conversation.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Clock" className="w-4 h-4 text-primary-600" />
                    <span>5-7 minutes</span>
                  </div>
<div className="flex items-center space-x-2">
                    <ApperIcon name="MessageSquare" className="w-4 h-4 text-primary-600" />
                    <span>6 questions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Download" className="w-4 h-4 text-primary-600" />
                    <span>Exportable results</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  icon="Play"
                  onClick={startConversation}
                  size="lg"
                  className="w-full"
                >
                  Start the Conversation
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Chat Interface */
          <>
            <ChatContainer messages={messages} isTyping={isTyping} />
            
            {/* Input Area */}
            {!isComplete && (
              <motion.div
                className="border-t bg-white px-4 py-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <MessageInput
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onSend={handleSendMessage}
                  disabled={isTyping}
                  placeholder={isTyping ? "Host is typing..." : "Type your response..."}
                  multiline={isMultilineQuestion()}
                  error={inputError}
                />
              </motion.div>
            )}

            {/* Completion Actions */}
            {isComplete && (
              <motion.div
                className="border-t bg-white px-4 py-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-center space-x-4">
                  <Button
                    variant="primary"
                    icon="Download"
                    onClick={() => setShowExportModal(true)}
                    size="lg"
                  >
                    Export Your Information
                  </Button>
                  <Button
                    variant="secondary"
                    icon="RotateCcw"
                    onClick={resetConversation}
                    size="lg"
                  >
                    Start New Intake
                  </Button>
                </div>
              </motion.div>
            )}
          </>
        )}
      </main>

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        guestInfo={guestInfo}
      />
    </div>
  )
}

export default ChatIntakePage
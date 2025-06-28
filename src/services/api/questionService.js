import questionsData from '@/services/mockData/questions.json'

class QuestionService {
  constructor() {
    this.questions = [...questionsData]
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...this.questions].sort((a, b) => a.order - b.order)
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const question = this.questions.find(q => q.Id === parseInt(id))
    if (!question) {
      throw new Error(`Question with ID ${id} not found`)
    }
    return { ...question }
  }

  async getByOrder(order) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const question = this.questions.find(q => q.order === parseInt(order))
    if (!question) {
      throw new Error(`Question with order ${order} not found`)
    }
    return { ...question }
  }

  async getTotalCount() {
    await new Promise(resolve => setTimeout(resolve, 100))
    return this.questions.length
  }

  validateAnswer(question, answer) {
    const validation = question.validation
    
    if (validation.required && (!answer || answer.trim().length === 0)) {
      return { isValid: false, message: "This field is required." }
    }

    if (validation.minLength && answer.length < validation.minLength) {
      return { 
        isValid: false, 
        message: `Please provide at least ${validation.minLength} characters.` 
      }
    }

    if (validation.maxLength && answer.length > validation.maxLength) {
      return { 
        isValid: false, 
        message: `Please keep your response under ${validation.maxLength} characters.` 
      }
    }

    if (validation.pattern && !new RegExp(validation.pattern).test(answer)) {
      if (question.type === 'email') {
        return { isValid: false, message: "Please enter a valid email address." }
      }
      return { isValid: false, message: "Please enter a valid format." }
    }

    return { isValid: true, message: "" }
  }
}

export default new QuestionService()
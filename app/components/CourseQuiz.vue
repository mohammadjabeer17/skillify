<template>
  <div class="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mt-6 sm:mt-8">
    <div class="text-center mb-6">
      <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
        Course Assessment Quiz
      </h2>
      <p class="text-sm sm:text-base text-gray-600">
        Test your knowledge and earn your certificate!
      </p>
    </div>

    <!-- Quiz Status -->
    <div v-if="!quizStarted && !quizCompleted" class="text-center mb-8">
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
        <div class="flex items-center justify-center mb-4">
          <svg class="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Ready to Test Your Knowledge?</h3>
        <p class="text-gray-600 mb-4">
          Complete this 5-question quiz to earn your certificate for "{{ course.title }}"
        </p>
        <button
          @click="startQuiz"
          :disabled="generatingQuestions"
          class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="generatingQuestions" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Questions...
          </span>
          <span v-else>Start Quiz</span>
        </button>
      </div>
    </div>

    <!-- Quiz In Progress -->
    <div v-if="quizStarted && !quizCompleted" class="max-w-2xl mx-auto">
      <!-- Progress Bar -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm font-medium text-gray-700">Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}</span>
          <span class="text-sm text-gray-500">{{ Math.round(((currentQuestionIndex + 1) / questions.length) * 100) }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-blue-600 h-2 rounded-full transition-all duration-300"
            :style="{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Current Question -->
      <div v-if="currentQuestion" class="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          {{ currentQuestion.question }}
        </h3>

        <!-- Options -->
        <div class="space-y-3">
          <button
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            @click="selectAnswer(option)"
            :disabled="answerSelected"
            class="w-full text-left p-4 rounded-lg border-2 transition-all duration-200 disabled:cursor-not-allowed"
            :class="getOptionClass(option)"
          >
            <div class="flex items-center">
              <span class="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3 text-sm font-medium">
                {{ String.fromCharCode(65 + index) }}
              </span>
              <span class="text-gray-700">{{ option }}</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Next Button -->
      <div v-if="answerSelected" class="text-center">
        <button
          @click="nextQuestion"
          class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300"
        >
          {{ currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Quiz' }}
        </button>
      </div>
    </div>

    <!-- Quiz Results -->
    <div v-if="quizCompleted" class="max-w-2xl mx-auto text-center">
      <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-8 mb-6">
        <div class="flex items-center justify-center mb-4">
          <svg v-if="quizPassed" class="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <svg v-else class="w-16 h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>

        <h3 class="text-2xl font-bold text-gray-900 mb-2">
          {{ quizPassed ? 'Congratulations!' : 'Quiz Completed' }}
        </h3>

        <p class="text-gray-600 mb-4">
          You scored {{ correctAnswers }} out of {{ questions.length }} questions
        </p>

        <div class="bg-white rounded-lg p-4 mb-6">
          <div class="text-3xl font-bold text-gray-900 mb-1">
            {{ Math.round((correctAnswers / questions.length) * 100) }}%
          </div>
          <div class="text-sm text-gray-600">Overall Score</div>
        </div>

        <div v-if="quizPassed" class="space-y-4">
          <p class="text-green-700 font-medium">
            🎉 You've successfully completed the course and earned your certificate!
          </p>

          <button
            @click="downloadCertificate"
            class="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 inline-flex items-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Download Certificate
          </button>
        </div>

        <div v-else class="space-y-4">
          <p class="text-red-700 font-medium">
            You need at least 80% to pass. Try again to earn your certificate.
          </p>

          <button
            @click="retakeQuiz"
            class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Course } from '../types/Course'
import { jsPDF } from 'jspdf'
import { $fetch } from 'ofetch'

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: string
  explanation?: string
}

interface Props {
  course: Course
  userId: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  quizCompleted: [passed: boolean, score: number]
}>()

// State
const quizStarted = ref(false)
const quizCompleted = ref(false)
const generatingQuestions = ref(false)
const questions = ref<QuizQuestion[]>([])
const currentQuestionIndex = ref(0)
const selectedAnswer = ref<string>('')
const answerSelected = ref(false)
const correctAnswers = ref(0)
const quizPassed = ref(false)

// Computed
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])

const getOptionClass = (option: string) => {
  if (!answerSelected.value) {
    return 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
  }

  const isSelected = selectedAnswer.value === option
  const isCorrect = option === currentQuestion.value?.correctAnswer

  if (isCorrect) {
    return 'border-green-500 bg-green-50 text-green-700'
  } else if (isSelected && !isCorrect) {
    return 'border-red-500 bg-red-50 text-red-700'
  } else {
    return 'border-gray-200 bg-gray-50 opacity-50'
  }
}

// Methods
const generateQuizQuestions = async () => {
  generatingQuestions.value = true

  try {
    const prompt = `Generate 5 multiple-choice questions for a quiz about the course "${props.course.title}". The course description is: "${props.course.description}". Each question should have 4 options (A, B, C, D) with only one correct answer. Format the response as a JSON array of objects with this structure:
    [
      {
        "question": "Question text here?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "Option A",
        "explanation": "Brief explanation of why this is correct"
      }
    ]
    Make sure the questions test understanding of key concepts from the course content.`

    const response = await $fetch<{ reply: string }>('/api/chat', {
      method: 'POST',
      body: { message: prompt }
    })

    // Parse the AI response to extract JSON
    const responseText = response.reply
    const jsonMatch = responseText.match(/\[[\s\S]*\]/)

    if (jsonMatch) {
      const parsedQuestions = JSON.parse(jsonMatch[0])
      questions.value = parsedQuestions.slice(0, 5) // Ensure we have exactly 5 questions
    } else {
      // Fallback questions if parsing fails
      questions.value = generateFallbackQuestions()
    }
  } catch (error: any) {
    console.error('Failed to generate quiz questions:', error)

    // Check if it's a rate limiting error (429)
    if (error?.status === 429 || error?.message?.includes('429')) {
      console.log('Gemini API rate limited, using fallback questions')
    }

    questions.value = generateFallbackQuestions()
  } finally {
    generatingQuestions.value = false
  }
}

const generateFallbackQuestions = (): QuizQuestion[] => {
  return [
    {
      question: `What is the main topic of the "${props.course.title}" course?`,
      options: [
        props.course.description.substring(0, 50) + '...',
        'General programming concepts',
        'Web development basics',
        'Database management'
      ],
      correctAnswer: props.course.description.substring(0, 50) + '...',
      explanation: 'Based on the course description provided.'
    },
    {
      question: 'What is the primary goal of this course?',
      options: [
        'To teach fundamental concepts and practical skills',
        'To provide theoretical knowledge only',
        'To focus on advanced topics',
        'To cover unrelated subjects'
      ],
      correctAnswer: 'To teach fundamental concepts and practical skills',
      explanation: 'Courses typically aim to provide both theoretical understanding and practical application.'
    },
    {
      question: `Who is the instructor for "${props.course.title}"?`,
      options: [
        props.course.professor,
        'Unknown instructor',
        'Multiple instructors',
        'Self-paced course'
      ],
      correctAnswer: props.course.professor,
      explanation: 'The course is taught by the listed professor.'
    },
    {
      question: 'What level is this course designed for?',
      options: [
        props.course.level || 'Beginner',
        'Advanced only',
        'Expert level',
        'All levels'
      ],
      correctAnswer: props.course.level || 'Beginner',
      explanation: 'The course level is specified in the course information.'
    },
    {
      question: 'What language is this course taught in?',
      options: [
        props.course.language || 'English',
        'Multiple languages',
        'Technical jargon only',
        'Sign language'
      ],
      correctAnswer: props.course.language || 'English',
      explanation: 'The course language is specified in the course details.'
    }
  ]
}

const startQuiz = async () => {
  await generateQuizQuestions()
  quizStarted.value = true
  currentQuestionIndex.value = 0
  correctAnswers.value = 0
  selectedAnswer.value = ''
  answerSelected.value = false
}

const selectAnswer = (answer: string) => {
  if (answerSelected.value) return

  selectedAnswer.value = answer
  answerSelected.value = true

  if (answer === currentQuestion.value?.correctAnswer) {
    correctAnswers.value++
  }
}

const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
    selectedAnswer.value = ''
    answerSelected.value = false
  } else {
    completeQuiz()
  }
}

const completeQuiz = () => {
  const score = (correctAnswers.value / questions.value.length) * 100
  quizPassed.value = score >= 80
  quizCompleted.value = true

  emit('quizCompleted', quizPassed.value, score)
}

const retakeQuiz = () => {
  quizStarted.value = false
  quizCompleted.value = false
  questions.value = []
  currentQuestionIndex.value = 0
  correctAnswers.value = 0
  selectedAnswer.value = ''
  answerSelected.value = false
  quizPassed.value = false
}

const downloadCertificate = async () => {
  try {
    // Get user information
    const userResponse = await $fetch(`/api/users/${props.userId}`) as any
    const user = userResponse

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    // Background color
    pdf.setFillColor(240, 248, 255) // Light blue background
    pdf.rect(0, 0, pageWidth, pageHeight, 'F')

    // Border
    pdf.setDrawColor(59, 130, 246) // Blue border
    pdf.setLineWidth(2)
    pdf.rect(10, 10, pageWidth - 20, pageHeight - 20)

    // Title
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(36)
    pdf.setTextColor(59, 130, 246) // Blue text
    pdf.text('CERTIFICATE OF COMPLETION', pageWidth / 2, 40, { align: 'center' })

    // Subtitle
    pdf.setFontSize(18)
    pdf.setTextColor(100, 116, 139) // Gray text
    pdf.text('This certifies that', pageWidth / 2, 60, { align: 'center' })

    // Student Name
    pdf.setFontSize(28)
    pdf.setTextColor(31, 41, 55) // Dark text
    pdf.setFont('helvetica', 'bold')
    const studentName = user.name || user.displayName || 'Student'
    pdf.text(studentName, pageWidth / 2, 80, { align: 'center' })

    // Completion text
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(100, 116, 139)
    pdf.text('has successfully completed the course', pageWidth / 2, 100, { align: 'center' })

    // Course Name
    pdf.setFontSize(22)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(59, 130, 246)
    pdf.text(`"${props.course.title}"`, pageWidth / 2, 120, { align: 'center' })

    // Instructor
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(100, 116, 139)
    pdf.text(`Taught by ${props.course.professor}`, pageWidth / 2, 140, { align: 'center' })

    // Score
    const score = Math.round((correctAnswers.value / questions.value.length) * 100)
    pdf.setFontSize(16)
    pdf.setTextColor(34, 197, 94) // Green text
    pdf.text(`Score: ${score}%`, pageWidth / 2, 160, { align: 'center' })

    // Date
    const completionDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    pdf.setFontSize(14)
    pdf.setTextColor(100, 116, 139)
    pdf.text(`Completed on ${completionDate}`, pageWidth / 2, 180, { align: 'center' })

    // Signature line
    pdf.setDrawColor(200, 200, 200)
    pdf.setLineWidth(0.5)
    pdf.line(pageWidth - 80, pageHeight - 40, pageWidth - 20, pageHeight - 40)

    // Signature text
    pdf.setFontSize(10)
    pdf.setTextColor(100, 116, 139)
    pdf.text('Authorized Signature', pageWidth - 50, pageHeight - 30, { align: 'center' })

    // Platform name
    pdf.setFontSize(12)
    pdf.setTextColor(59, 130, 246)
    pdf.text('Skillify Learning Platform', pageWidth / 2, pageHeight - 20, { align: 'center' })

    // Generate blob and download
    const fileName = `Certificate_${props.course.title.replace(/[^a-zA-Z0-9]/g, '_')}_${studentName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`
    const pdfBlob = pdf.output('blob')
    const url = URL.createObjectURL(pdfBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

  } catch (error) {
    console.error('Failed to generate certificate:', error)
    alert('Failed to generate certificate. Please try again.')
  }
}

// Initialize component
onMounted(() => {
  // Check if course is already completed
  // This logic will be added when we implement course completion tracking
})
</script>

<style scoped>
/* Additional styles if needed */
</style>

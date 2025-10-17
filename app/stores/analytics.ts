import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface UserStats {
  totalUsers: number
  adminUsers: number
  regularUsers: number
  newSignups: number
}

export interface CourseAnalytics {
  totalCourses: number
  totalEnrollments: number
  averageRating: number
}

export interface FinancialSummary {
  totalRevenue: number
  monthlyRevenue: number
}

export interface AnalyticsData {
  userStats: UserStats
  courseAnalytics: CourseAnalytics
  financialSummary: FinancialSummary
}

export const useAnalyticsStore = defineStore('analytics', () => {
  const analytics = ref<AnalyticsData | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchAnalytics = async () => {
    loading.value = true
    error.value = null
    try {
      analytics.value = await $fetch('/api/analytics')
    } catch (err) {
      error.value = 'Failed to fetch analytics'
      console.error('Error fetching analytics:', err)
    } finally {
      loading.value = false
    }
  }

  // Auto-refresh analytics every 30 seconds
  const startPolling = () => {
    setInterval(fetchAnalytics, 30000)
  }

  return {
    analytics,
    loading,
    error,
    fetchAnalytics,
    startPolling
  }
})

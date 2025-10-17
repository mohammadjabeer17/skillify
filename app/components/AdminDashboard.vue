<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-center justify-between">
          <div class="text-white">
            <h1 class="text-4xl font-extrabold tracking-tight">Admin Dashboard</h1>
            <p class="text-blue-100 mt-2 text-lg">Real-time analytics and user management</p>
          </div>
          <div class="flex items-center space-x-6">
            <div class="text-right text-white">
              <p class="text-sm opacity-80">Last updated</p>
              <p class="text-lg font-semibold">{{ lastUpdated }}</p>
            </div>
            <button
              @click="refreshData"
              class="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg text-white font-medium hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 transform hover:scale-105"
            >
              <i class="fa-solid fa-refresh mr-3 animate-spin-on-hover"></i>
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Analytics Overview -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Analytics Overview</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Total Users -->
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg border border-blue-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                  <i class="fa-solid fa-users text-white text-lg"></i>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-semibold text-blue-700">Total Users</p>
                <p class="text-3xl font-bold text-blue-900">{{ analyticsStore.analytics?.userStats?.totalUsers || 0 }}</p>
                <p class="text-xs text-blue-600 mt-1">
                  {{ analyticsStore.analytics?.userStats?.regularUsers || 0 }} regular, {{ analyticsStore.analytics?.userStats?.adminUsers || 0 }} admin
                </p>
              </div>
            </div>
          </div>

          <!-- Total Courses -->
          <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg border border-green-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                  <i class="fa-solid fa-book text-white text-lg"></i>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-semibold text-green-700">Total Courses</p>
                <p class="text-3xl font-bold text-green-900">{{ analyticsStore.analytics?.courseAnalytics?.totalCourses || 0 }}</p>
                <p class="text-xs text-green-600 mt-1">Available courses</p>
              </div>
            </div>
          </div>

          <!-- Total Enrollments -->
          <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg border border-purple-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                  <i class="fa-solid fa-graduation-cap text-white text-lg"></i>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-semibold text-purple-700">Enrollments</p>
                <p class="text-3xl font-bold text-purple-900">{{ analyticsStore.analytics?.courseAnalytics?.totalEnrollments || 0 }}</p>
                <p class="text-xs text-purple-600 mt-1">Active enrollments</p>
              </div>
            </div>
          </div>

          <!-- Revenue -->
          <div class="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl shadow-lg border border-yellow-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
                  <i class="fa-solid fa-dollar-sign text-white text-lg"></i>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-semibold text-orange-700">Revenue</p>
                <p class="text-3xl font-bold text-orange-900">${{ revenue }}</p>
                <p class="text-xs text-orange-600 mt-1">Total earnings</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Charts Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-200 p-6 hover:shadow-xl transition-all duration-300">
            <div class="flex items-center mb-4">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                <i class="fa-solid fa-chart-pie text-white"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900">User Distribution</h3>
            </div>
            <div class="flex items-center justify-center">
              <canvas ref="userChartRef" width="300" height="200" class="max-w-full"></canvas>
            </div>
          </div>
          <div class="bg-gradient-to-br from-white to-green-50 rounded-xl shadow-lg border border-green-200 p-6 hover:shadow-xl transition-all duration-300">
            <div class="flex items-center mb-4">
              <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                <i class="fa-solid fa-chart-bar text-white"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900">Course Analytics</h3>
            </div>
            <div class="flex items-center justify-center">
              <canvas ref="courseChartRef" width="300" height="200" class="max-w-full"></canvas>
            </div>
          </div>
        </div>
      </div>



      <!-- Notifications Section -->
      <div class="mb-8">
        <div class="bg-gradient-to-br from-white to-indigo-50 rounded-xl shadow-lg border border-indigo-200">
          <div class="px-6 py-4 border-b border-indigo-200 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-xl">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                <i class="fa-solid fa-bell text-white"></i>
              </div>
              <h2 class="text-2xl font-bold text-white">Recent Notifications</h2>
            </div>
          </div>
          <div class="p-6">
            <div v-if="notifications.length === 0" class="text-center py-8">
              <i class="fa-solid fa-bell-slash text-gray-400 text-4xl mb-4"></i>
              <p class="text-gray-500">No new notifications</p>
            </div>
            <div v-else class="space-y-4">
              <div
                v-for="notification in notifications"
                :key="notification.id"
                class="flex items-start p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                    <i class="fa-solid fa-info-circle text-white text-sm"></i>
                  </div>
                </div>
                <div class="ml-4 flex-1">
                  <p class="text-sm font-medium text-blue-900">{{ notification.message }}</p>
                  <p class="text-xs text-blue-600 mt-1 flex items-center">
                    <i class="fa-solid fa-clock mr-1"></i>
                    {{ notification.timestamp }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Management Toggle -->
    <div class="mb-8">
      <div class="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200">
        <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-600 to-gray-700 rounded-t-xl">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                <i class="fa-solid fa-cogs text-white"></i>
              </div>
              <h2 class="text-2xl font-bold text-white">Management</h2>
            </div>
            <div class="flex items-center space-x-4">
              <button
                @click="currentView = 'users'"
                :class="currentView === 'users' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 border border-gray-300'"
                class="px-6 py-3 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
              >
                <i class="fa-solid fa-users mr-2"></i>
                User Management
              </button>
              <button
                @click="currentView = 'courses'"
                :class="currentView === 'courses' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' : 'bg-white text-gray-700 border border-gray-300'"
                class="px-6 py-3 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105"
              >
                <i class="fa-solid fa-book mr-2"></i>
                Course Management
              </button>
            </div>
          </div>
        </div>
        <div class="p-6">
          <!-- User Management Section -->
          <div v-if="currentView === 'users'">
            <div class="mb-4 flex items-center justify-between">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search users by name or email..."
                class="flex-1 mr-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                @input="searchUsers"
              />
              <div class="flex space-x-2">
                <button
                  @click="exportUsers"
                  class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <i class="fa-solid fa-download mr-2"></i>
                  Export Users
                </button>
                <button
                  @click="exportAnalyticsData"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <i class="fa-solid fa-chart-line mr-2"></i>
                  Export Analytics
                </button>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="user in usersStore.users" :key="user.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                          <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span class="text-sm font-medium text-gray-700">{{ user.name.charAt(0).toUpperCase() }}</span>
                          </div>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.email }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        :class="user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'"
                        class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      >
                        {{ user.role }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        @click="editUser(user)"
                        class="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <i class="fa-solid fa-edit"></i> Edit
                      </button>
                      <button
                        @click="deleteUser(user.id)"
                        class="text-red-600 hover:text-red-900"
                      >
                        <i class="fa-solid fa-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Course Management Section -->
          <div v-if="currentView === 'courses'">
            <div class="mb-4 flex justify-end">
              <button
                @click="course.toggleNewCourse"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <i class="fa-solid fa-plus mr-2"></i>
                Add Course
              </button>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Professor</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="c in course.courses" :key="c.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ c.title }}</div>
                      <div class="text-sm text-gray-500 truncate max-w-xs">{{ c.description }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ c.professor }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${{ c.price }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <span class="text-sm text-gray-900 mr-1">{{ c.rating }}</span>
                        <i class="fa-solid fa-star text-yellow-400"></i>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        @click="course.startEditCourse(c.id)"
                        class="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <i class="fa-solid fa-edit"></i> Edit
                      </button>
                      <button
                        @click="course.removeCourse(c.id)"
                        class="text-red-600 hover:text-red-900"
                      >
                        <i class="fa-solid fa-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Course Form Modal -->
    <CourseForm v-if="course.newCourse || course.editingCourseId" />

    <!-- User Form Modal -->
    <UserForm v-if="editingUserId" :editingUserId="editingUserId" @close="closeUserForm" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from "vue";
import { useCourseStore } from "../stores/courses";
import { useEnrolledCourseStore } from "../stores/enrolledCourses";
import { useAuthStore } from "../stores/auth";
import { useUsersStore } from "../stores/users";
import { useAnalyticsStore } from "../stores/analytics";
import { useExport } from "../composables/useExport";
import Chart from "chart.js/auto";

const course = useCourseStore();
const enrolledCourses = useEnrolledCourseStore();
const auth = useAuthStore();
const usersStore = useUsersStore();
const analyticsStore = useAnalyticsStore();

const loadingUsers = ref(false);
const loadingAnalytics = ref(false);
const errorUsers = ref('');
const errorAnalytics = ref('');

const searchQuery = ref('');
const currentView = ref('users');
const editingUserId = ref<string | null>(null);
const lastUpdated = ref(new Date().toLocaleTimeString());

const validUsers = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return usersStore.users.filter(user => {
    return (
      user.role === "user" &&
      user.name.trim() !== "" &&
      emailRegex.test(user.email)
    );
  });
});

const revenue = computed(() => {
  // Use the total revenue from analytics which aggregates all enrolled courses across all users
  return analyticsStore.analytics?.financialSummary?.totalRevenue || 0;
});

const userChartRef = ref<HTMLCanvasElement>();
const courseChartRef = ref<HTMLCanvasElement>();

let userChart: Chart | null = null;
let courseChart: Chart | null = null;
let timeInterval: NodeJS.Timeout | null = null;

const notifications = ref<any[]>([]);
let notificationInterval: NodeJS.Timeout | null = null;

const fetchNotifications = async () => {
  try {
    // Fetch recent activities from API
    const response = await fetch('/api/activities/recent');
    if (response.ok) {
      const activities = await response.json();
      notifications.value = activities.map((activity: any, index: number) => ({
        id: index + 1,
        message: activity.message,
        timestamp: activity.timestamp
      }));
    } else {
      throw new Error('Failed to fetch notifications');
    }
  } catch (error) {
    // Fallback to static notifications if API fails
    notifications.value = [
      {
        id: 1,
        message: 'New user registered: john.doe@example.com',
        timestamp: '2 hours ago'
      },
      {
        id: 2,
        message: 'Course "Advanced JavaScript" completed by 5 users',
        timestamp: '4 hours ago'
      },
      {
        id: 3,
        message: 'System maintenance scheduled for tonight',
        timestamp: '1 day ago'
      }
    ];
  }
};

const renderUserChart = () => {
  if (!userChartRef.value) return;
  if (userChart) userChart.destroy();

  userChart = new Chart(userChartRef.value, {
    type: "doughnut",
    data: {
      labels: ["Admins", "Regular Users"],
      datasets: [
        {
          label: "Users",
          data: [
            analyticsStore.analytics?.userStats?.adminUsers || 0,
            analyticsStore.analytics?.userStats?.regularUsers || 0,
          ],
          backgroundColor: ["#3b82f6", "#10b981"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12,
            font: {
              size: 12
            }
          }
        }
      }
    },
  });
};

const renderCourseChart = () => {
  if (!courseChartRef.value) return;
  if (courseChart) courseChart.destroy();

  courseChart = new Chart(courseChartRef.value, {
    type: "bar",
    data: {
      labels: ["Courses", "Enrollments"],
      datasets: [
        {
          label: "Count",
          data: [
            analyticsStore.analytics?.courseAnalytics?.totalCourses || 0,
            analyticsStore.analytics?.courseAnalytics?.totalEnrollments || 0,
          ],
          backgroundColor: ["#f59e0b", "#ef4444"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0
          }
        },
      },
      plugins: {
        legend: {
          display: false
        }
      }
    },
  });
};

const updateCharts = () => {
  nextTick(() => {
    renderUserChart();
    renderCourseChart();
  });
};

const searchUsers = async () => {
  try {
    loadingUsers.value = true;
    errorUsers.value = '';
    if (searchQuery.value.trim()) {
      await usersStore.searchUsers(searchQuery.value);
    } else {
      await usersStore.fetchUsers();
    }
  } catch (error) {
    errorUsers.value = 'Failed to load users. Please try again.';
  } finally {
    loadingUsers.value = false;
  }
};

const editUser = (user: any) => {
  editingUserId.value = user.id;
};

const closeUserForm = () => {
  editingUserId.value = null;
};

const deleteUser = async (userId: string) => {
  if (confirm('Are you sure you want to delete this user?')) {
    try {
      await usersStore.deleteUser(userId);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  }
};

const refreshData = async () => {
  try {
    loadingUsers.value = true;
    loadingAnalytics.value = true;
    errorUsers.value = '';
    errorAnalytics.value = '';
    await usersStore.fetchUsers();
    await analyticsStore.fetchAnalytics();
    updateCharts();
  } catch (error) {
    errorUsers.value = 'Failed to refresh data. Please try again.';
  } finally {
    loadingUsers.value = false;
    loadingAnalytics.value = false;
  }
};

const { exportUsers: exportUsersComposable, exportCourses, exportAnalytics } = useExport();

const exportUsers = () => {
  const users = usersStore.users;
  if (!users.length) {
    alert('No users to export');
    return;
  }
  exportUsersComposable(users);
};

const exportAnalyticsData = () => {
  const analytics = analyticsStore.analytics;
  if (!analytics) {
    alert('No analytics data to export');
    return;
  }
  exportAnalytics(analytics);
};

onMounted(async () => {
  course.fetchCourses();
  enrolledCourses.fetchEnrolledCourses();
  auth.initAuth();
  await usersStore.fetchUsers();
  await analyticsStore.fetchAnalytics();
  updateCharts();
  analyticsStore.startPolling();
  fetchNotifications();
  timeInterval = setInterval(() => {
    lastUpdated.value = new Date().toLocaleTimeString();
  }, 1000);
  notificationInterval = setInterval(fetchNotifications, 30000); // Fetch notifications every 30 seconds
});

watch(
  () => analyticsStore.analytics?.userStats,
  () => {
    updateCharts();
  }
);

watch(
  () => analyticsStore.analytics?.courseAnalytics,
  () => {
    updateCharts();
  }
);

onBeforeUnmount(() => {
  if (userChart) userChart.destroy();
  if (courseChart) courseChart.destroy();
  if (timeInterval) clearInterval(timeInterval);
  if (notificationInterval) clearInterval(notificationInterval);
});
</script>

<style scoped>
@keyframes zoomPulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
.animate-zoomPulse {
  animation: zoomPulse 1.5s infinite ease-in-out;
}
</style>

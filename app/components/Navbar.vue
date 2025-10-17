<template>
  <nav class="bg-[#080b0f] text-white fixed w-full z-50 shadow-md p-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex items-center">
          <i class="fa-solid fa-bars-progress text-[#2f76e8] text-3xl mr-2"></i>
          <NuxtLink to="/">
            <h1 class="text-white text-2xl font-bold font-sans">SKILLIFY</h1>
          </NuxtLink>
        </div>

        <div class="hidden md:flex space-x-2 lg:space-x-4 font-semibold text-base lg:text-lg">
          <NuxtLink
            to="/"
            class="px-4 py-3 rounded-lg transition-all duration-200 min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-[#2f76e8] focus:ring-offset-2 focus:ring-offset-[#080b0f]"
            :class="isActive('/') ? 'bg-[#2f76e8] text-white shadow-md' : 'hover:bg-gray-700 hover:text-gray-100'"
          >
            Ho
          </NuxtLink>

          <NuxtLink
            to="/myjourney"
            class="px-4 py-3 rounded-lg transition-all duration-200 min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-[#2f76e8] focus:ring-offset-2 focus:ring-offset-[#080b0f]"
            :class="
              isActive('/myjourney') ? 'bg-[#2f76e8] text-white shadow-md' : 'hover:bg-gray-700 hover:text-gray-100'
            "
          >
            My Journey
          </NuxtLink>

          <NuxtLink
            to="/myjourney"
            class="px-4 py-3 rounded-lg transition-all duration-200 min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-[#2f76e8] focus:ring-offset-2 focus:ring-offset-[#080b0f]"
            :class="
              isActive('/myjourney') ? 'bg-[#2f76e8] text-white shadow-md' : 'hover:bg-gray-700 hover:text-gray-100'
            "
          >
             Chat Bot
          </NuxtLink>

          <NuxtLink
            to="/courses"
            class="px-4 py-3 rounded-lg transition-all duration-200 min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-[#2f76e8] focus:ring-offset-2 focus:ring-offset-[#080b0f]"
            :class="isActive('/courses') ? 'bg-[#2f76e8] text-white shadow-md' : 'hover:bg-gray-700 hover:text-gray-100'"
          >
            All Courses
          </NuxtLink>

          <NuxtLink
            to="/professors"
            class="px-4 py-3 rounded-lg transition-all duration-200 min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-[#2f76e8] focus:ring-offset-2 focus:ring-offset-[#080b0f]"
            :class="
              isActive('/professors') ? 'bg-[#2f76e8] text-white shadow-md' : 'hover:bg-gray-700 hover:text-gray-100'
            "
          >
            Professors
          </NuxtLink>

          <NuxtLink
            to="/cart"
            class="px-4 py-3 rounded-lg transition-all duration-200 min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-[#2f76e8] focus:ring-offset-2 focus:ring-offset-[#080b0f]"
            :class="isActive('/cart') ? 'bg-[#2f76e8] text-white shadow-md' : 'hover:bg-gray-700 hover:text-gray-100'"
          >
            Cart
          </NuxtLink>

          <NuxtLink
            to="/wishlist"
            class="px-4 py-3 rounded-lg transition-all duration-200 min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-[#2f76e8] focus:ring-offset-2 focus:ring-offset-[#080b0f]"
            :class="isActive('/wishlist') ? 'bg-[#2f76e8] text-white shadow-md' : 'hover:bg-gray-700 hover:text-gray-100'"
          >
            Wishlist
          </NuxtLink>

          <NuxtLink
            to="/aboutus"
            class="px-4 py-3 rounded-lg transition-all duration-200 min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-[#2f76e8] focus:ring-offset-2 focus:ring-offset-[#080b0f]"
            :class="isActive('/aboutus') ? 'bg-[#2f76e8] text-white shadow-md' : 'hover:bg-gray-700 hover:text-gray-100'"
          >
            About Us
          </NuxtLink>

          <NuxtLink
            v-if="auth.user && auth.user.role === 'admin'"
            to="/admin"
            class="px-4 py-3 rounded-lg transition-all duration-200 min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-[#2f76e8] focus:ring-offset-2 focus:ring-offset-[#080b0f]"
            :class="isActive('/admin') ? 'bg-[#2f76e8] text-white shadow-md' : 'hover:bg-gray-700 hover:text-gray-100'"
          >
            A
          </NuxtLink>
          <NuxtLink
            to="/profile"
            class="px-4 py-3 rounded-lg transition-all duration-200 min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-[#2f76e8] focus:ring-offset-2 focus:ring-offset-[#080b0f]"
            :class="isActive('/profile') ? 'bg-[#2f76e8] text-white shadow-md' : 'hover:bg-gray-700 hover:text-gray-100'"
          >
            Profile
          </NuxtLink>
        </div>

        <div class="hidden md:flex items-center gap-4">
          <div class="flex items-center gap-3">
            <img
              :src="'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80'"
              alt="User Avatar"
              class="w-10 h-10 rounded-full border-2 border-[#2f76e8] transition-transform duration-200 hover:scale-105"
            />
            <h1 v-if="auth.user && auth.user.name" class="font-bold text-white">
              {{ auth.user.name.toUpperCase() }}
            </h1>
          </div>
          <NuxtLink
            to="/login"
            class="p-2 rounded-lg transition-all duration-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2f76e8] focus:ring-offset-2 focus:ring-offset-[#080b0f] min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Logout"
            @click.prevent="handleLogout"
          >
            <i class="fa-solid fa-right-from-bracket text-2xl"></i>
          </NuxtLink>
        </div>

        <div class="md:hidden">
          <button
            @click="isOpen = !isOpen"
            class="p-2 rounded-lg transition-all duration-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2f76e8] focus:ring-offset-2 focus:ring-offset-[#080b0f] min-h-[44px] min-w-[44px] flex items-center justify-center"
            :aria-expanded="isOpen"
            aria-label="Toggle navigation menu"
          >
            <i v-if="!isOpen" class="fa-solid fa-bars text-2xl text-white"></i>
            <i v-else class="fa-solid fa-xmark text-2xl text-white"></i>
          </button>
        </div>
      </div>
    </div>

    <div v-if="isOpen" class="md:hidden bg-[#080b0f] px-4 pb-4 space-y-2">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.path"
        :to="link.path"
        class="block px-3 py-2 rounded-md"
        :class="isActive(link.path) ? 'bg-blue-700' : 'hover:bg-gray-700'"
        @click="isOpen = false"
      >
        {{ link.label }}
      </NuxtLink>

      <NuxtLink
        v-if="auth.user && auth.user.role === 'admin'"
        to="/admin"
        class="block px-3 py-2 rounded-md"
        :class="isActive('/admin') ? 'bg-blue-700' : 'hover:bg-gray-700'"
        @click="isOpen = false"
      >
        Admin
      </NuxtLink>

      <div class="flex items-center gap-3 mt-3">
  <template v-if="user">
    
    <NuxtLink :to="'/profile'">
      <img
        :src="user?.photoURL || 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80'"
        alt="User Avatar"
        class="w-10 h-10 rounded-full object-cover border-2 border-[#2f76e8]"
      />
    </NuxtLink>
    <div class="flex gap-2 justify-center items-center">
      <h1 class="text-white font-bold">
        {{ (user.displayName || user.name || 'User') }}
      </h1>
      <NuxtLink
      @click="handleLogout"
          v-if="user"
            to="/login"
            class=" hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            <i class="fa-solid fa-sign-in-alt mr-2"></i>
           
          </NuxtLink>
          
    </div>

    
  </template>

  <template v-else>
    <!-- Guest view -->
    <img
      src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
      alt="Guest Avatar"
      class="w-10 h-10 rounded-full object-cover border-2 border-[#2f76e8]"
    />
    <div class="flex flex-col">
      <h1 class="text-white font-bold">Guest</h1>
      <NuxtLink
      to="/login"
      class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
    >
      <i class="fa-solid fa-sign-in-alt mr-2"></i>
      <span>Login</span>
    </NuxtLink>
    </div>
    
  </template>
</div>

    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { ref, computed } from "vue";
import { useAuth } from "../composables/useAuth";

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();
const isOpen = ref(false);
const isActive = (path: string) => route.path === path;

const { user: firebaseUser } = useAuth();

const user = computed(() => ({
  ...auth.user,
  displayName: firebaseUser.value?.displayName,
  photoURL: firebaseUser.value?.photoURL,
}));

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/myjourney", label: "My Journey" },
  { path: "/courses", label: "All Courses" },
  { path: "/professors", label: "Professors" },
  { path: "/cart", label: "Cart" },
  { path: "/wishlist", label: "Wishlist" },
  { path: "/chatbot", label: "Chat Bot" },
  { path: "/aboutus", label: "About Us" },
  { path: "/profile", label: "Profile" },
];

function handleLogout() {
  auth.logout();
  
}
</script>

<template>
  <div v-if="!authToggle" class="pt-8 flex flex-col gap-2 w-[80%]">
    <label class="text-white">Email</label>
    <input
      type="Email"
      placeholder="Enter your email"
      v-model="loginForm.email"
    />

    <label class="text-white pt-4">Password</label>
    <div class="relative">
      <input
        placeholder="password"
        :type="showPassword ? 'text' : 'password'"
        v-model="loginForm.password"
      />
      <span @click="togglePassword" class="absolute right-4 m-2 cursor-pointer">
        <i v-if="showPassword" class="fa-solid fa-eye-slash text-white"></i>
        <i v-else class="fa-solid fa-eye text-white"></i>
      </span>
    </div>

    <p class="text-red-500 text-center pt-2" v-if="error">{{ error }}</p>

    <button
      class="shiny-btn text-white active-glow bg-[#2f76e8] font-[Roboto] mt-6 p-2 w-full rounded-md"
      @click="handleLogin"
      :disabled="loading"
    >
      <Loader v-if="loading" />
      <span v-else>
        <i class="fa-solid fa-right-to-bracket p-2 mr-2"></i> Sign in
      </span>
    </button>

    <div class="relative my-6">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-700"></div>
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="px-4 bg-[#1E293B] text-gray-500 font-sans"
          >Or continue with</span
        >
      </div>
    </div>
    <button
      type="button"
      @click="handleGoogleSignIn"
      :disabled="loading"
      class="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google logo"
        class="w-5 h-5"
      />
      <span class="font-sans font-medium">Sign in with Google</span>
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useAuth } from "../composables/useAuth";
import { useRouter } from "vue-router";
// import { navigateTo } from "#app";

const { signInWithGoogle } = useAuth();
const router = useRouter();

// @ts-ignore
definePageMeta({
  layout: "auth",
});

const auth = useAuthStore();

const authToggle = ref(false);
const showPassword = ref(false);
const togglePassword = () => (showPassword.value = !showPassword.value);

const loginForm = ref({
  email: "admin@local",
  password: "admin123",
});

const loading = ref(false);
const error = ref("");

const handleLogin = async () => {
  if (!loginForm.value.email.trim() || !loginForm.value.password.trim()) {
    error.value = "Please enter both email and password";
    return;
  }

  loading.value = true; // Show loader immediately
  error.value = "";

  try {
    // Wait for 2 seconds before performing login
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const success = await auth.login(
      loginForm.value.email,
      loginForm.value.password
    );

    if (success) {
      router.push("/");
    } else {
      error.value = "Invalid email or password";
    }
  } catch (err: any) {
    console.error("Login error:", err);
    if (err?.statusCode === 400) {
      error.value = "Please check your email and password";
    } else if (err?.statusCode === 401) {
      error.value = "Invalid email or password";
    } else if (err?.statusCode === 500) {
      error.value = "Server error. Please try again later";
    } else {
      error.value = "Login failed. Please try again";
    }
  } finally {
    loading.value = false;
  }
};

const handleGoogleSignIn = async () => {
  try {
    loading.value = true;
    error.value = "";
    const { success, error: signInError } = await signInWithGoogle();
    if (success) {
      router.push("/");
    } else {
      error.value = signInError || "Failed to sign in with Google";
    }
  } catch (e: any) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.container {
  background-image: linear-gradient(
    135deg,
    rgb(30, 41, 59) 0%,
    rgb(15, 23, 42) 100%
  );
}
input {
  background-color: #0f172a;
  padding: 10px;
  width: 100%;
  border-radius: 6px;
  color: white;
  outline: none;
  border: 1px solid rgb(48, 48, 48);
  font-family: sans-serif;
  font-size: 14px;
}
.title {
  font-family: "Exo 2", sans-serif;
  letter-spacing: 0.02rem;
}
</style>

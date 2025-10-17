<template>
  <div class="container h-[100vh] flex justify-center items-center">
    <div
      class="w-[28%] border-[0.1px] border-[#1383CE] h-auto pb-10 bg-[#1E293B] rounded-2xl flex flex-col items-center shadow-4xl"
    >
      <i class="fa-solid fa-bars-progress text-[#2f76e8] text-5xl pt-12"></i>
      <h1 class="text-white text-3xl font-bold pt-4 font-sans title">
        SKILLIFY
      </h1>
      <p class="text-[17px] pt-2 text-gray-500 font-sans font-semibold">
        Explore the world of knowledge
      </p>

      <!-- Register Form -->
      <div class="pt-8 flex flex-col gap-2 w-[80%]">
        <label class="text-white">Full Name</label>
        <input placeholder="Enter your full name" v-model="registerForm.name" />

        <label class="text-white pt-4">Email</label>
        <input placeholder="Enter your email" v-model="registerForm.email" />

        <label class="text-white pt-4">Password</label>
        <div class="relative">
          <input
            placeholder="Create a password"
            :type="showPassword ? 'text' : 'password'"
            v-model="registerForm.password"
          />
          <span
            @click="togglePassword"
            class="absolute right-4 m-2 cursor-pointer"
          >
            <i v-if="showPassword" class="fa-solid fa-eye-slash text-white"></i>
            <i v-else class="fa-solid fa-eye text-white"></i>
          </span>
        </div>
      </div>

      <!-- Error -->
      <p class="text-red-500 text-center pt-2" v-if="error">{{ error }}</p>

      <!-- Button -->
      <button
        class="active-glow shiny-btn text-white bg-[#2f76e8] font-[Roboto] mt-6 p-2 w-[80%] rounded-md"
        @click="handleRegister"
        :disabled="loading"
      >
        <Loader v-if="loading" />
        <span v-else>
          <i class="fa-solid fa-user p-2 mr-2"></i> Create Account
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";

definePageMeta({
  layout: "auth",
});

const auth = useAuthStore();

const registerForm = ref({
  name: "",
  email: "",
  password: "",
});

const showPassword = ref(false);
const togglePassword = () => (showPassword.value = !showPassword.value);

const loading = ref(false);
const error = ref("");

const handleRegister = async () => {
  if (!registerForm.value.name.trim() || !registerForm.value.email.trim() || !registerForm.value.password.trim()) {
    error.value = "Please fill in all fields";
    return;
  }

  loading.value = true;
  error.value = "";
  try {
    const success = await auth.register(
      registerForm.value.name,
      registerForm.value.email,
      registerForm.value.password
    );
    if (success) {
      window.location.href = "/";
    } else {
      error.value = "Registration failed. Please try again.";
    }
  } catch (err: any) {
    console.error("Registration error:", err);
    if (err?.statusCode === 400) {
      error.value = err.message || "Invalid registration data";
    } else if (err?.statusCode === 500) {
      error.value = "Server error. Please try again later";
    } else {
      error.value = "An error occurred during registration.";
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.container {
  background-image: linear-gradient(135deg, #080b0f, rgb(35, 38, 46) 100%);
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

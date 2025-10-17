<template>
  <div class="w-[80%]">
    <div class="pt-8 flex flex-col gap-2">
      <label class="text-white">Full Name</label>
      <input placeholder="Enter your full name" v-model="registerForm.name" />
    </div>
    <div class="pt-4 flex flex-col gap-2">
      <label class="text-white">Email</label>
      <input type="email" placeholder="Enter your email" v-model="registerForm.email" />
    </div>

    <div class="pt-4 flex flex-col gap-2">
      <label class="text-white">Password</label>

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
          <span v-if="showPassword">
            <i class="fa-solid fa-eye-slash text-white"></i>
          </span>

          <span v-else>
            <i class="fa-solid fa-eye text-white"></i>
          </span>
        </span>
      </div>
    </div>
    <p class="text-red-500 text-center pt-2" v-if="error">{{ error }}</p>

    <button
      class="active-glow shiny-btn text-white bg-[#2f76e8] font-[Roboto] mt-6 p-2 w-full rounded-md"
      @click="handleRegister"
    >
      <Loader v-if="loading" />
      <div v-else><i class="fa-solid fa-user p-2 mr-2"></i> Create Account</div>
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";

// @ts-ignore
definePageMeta({
  layout: "auth",
});

const auth = useAuthStore();

const showPassword = ref(false);
const togglePassword = () => (showPassword.value = !showPassword.value);

const registerForm = ref({
  name: "",
  email: "",
  password: "",
});

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

<template>
  <div class="container h-[100vh] flex justify-center items-center">
    <div
      class="w-[28%] border-[0.1px] border-[#1383CE] h-auto pb-10 bg-[#1E293B] md:w-[26vw] w-[80vw] rounded-2xl flex flex-col items-center shadow-4xl"
    >
      <i class="fa-solid fa-bars-progress text-[#2f76e8] text-5xl pt-12"></i>
      <h1 class="text-white text-3xl font-bold pt-4 font-sans title">
        SKILLIFY
      </h1>
      <p class="text-[17px] pt-2 text-gray-500 font-sans font-semibold">
        Explore the world of knowledge
      </p>

      <div
        class="bg-[#0F172A] text-white w-[80%] mt-6 p-1 rounded-xl flex justify-between"
      >
        <button
          :class="`font-sans font-semibold text-[14px] ${
            !authToggle
              ? 'bg-[#2f76e8] active-glow h-[40px] w-[50%] rounded'
              : 'w-[50%]'
          }`"
          @click="authToggle = false"
        >
          Login
        </button>
        <button
          :class="`font-sans font-semibold text-[14px] ${
            authToggle
              ? 'bg-[#2f76e8] active-glow h-[40px] w-[50%] rounded'
              : 'w-[50%]'
          }`"
          @click="authToggle = true"
        >
          Register
        </button>
      </div>
      <Login v-if="!authToggle" />
      <Register v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";

// @ts-ignore
definePageMeta({
  layout: "auth",
});

const auth = useAuthStore();

const authToggle = ref(false);
const showPassword = ref(false);
const togglePassword = () => (showPassword.value = !showPassword.value);
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

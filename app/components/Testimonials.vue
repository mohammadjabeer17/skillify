<template>
  <section class="py-20">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="text-2xl sm:text-3xl font-bold mb-10 text-center">
        What Our Learners Say
      </h2>
      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div
          v-for="t in testimonials"
          :key="t.name"
          class="bg-white rounded-xl shadow-2xl p-6 hover:scale-105 transition"
        >
          <p class="text-gray-700 text-sm sm:text-base">{{ t.quote }}</p>
          <div class="flex items-center mt-4">
            <img
              :src="t.image"
              class="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-3"
            />
            <div>
              <p class="font-semibold">{{ t.name }}</p>
              <p class="text-xs sm:text-sm text-gray-500">{{ t.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  {
    name: "Alice",
    role: "Frontend Developer",
    quote: "This platform accelerated my career!",
    image: "https://randomuser.me/api/portraits/women/30.jpg",
  },
  {
    name: "John",
    role: "Data Scientist",
    quote: "The projects and hands-on courses are amazing.",
    image: "https://randomuser.me/api/portraits/men/31.jpg",
  },
  {
    name: "Maya",
    role: "UI/UX Designer",
    quote: "Learned practical skills I could use immediately.",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
  },
];
</script>

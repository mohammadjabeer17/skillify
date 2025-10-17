<template>
  <section class="overflow-hidden px-4 w-[100vw] md:w-[82vw] mx-auto">
    <div
      class="py-20  pl-0 grid md:grid-cols-2 gap-10 items-center"
    >
      <div class="text-center md:text-left">
        <h1 class="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
          Learn Without <span class="text-blue-500">Limits</span>
        </h1>

        <p
          class="mt-5 text-sm sm:text-lg text-gray-500 max-w-lg mx-auto md:mx-0"
        >
          Start, switch, or advance your career with more than 213,000 courses,
          Professional Certificates, and degrees from world-class universities
          and companies.
        </p>

        <div class="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
          <NuxtLink :to="'/courses'">
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white px-6 sm:px-10 py-3 rounded-lg font-medium shadow-lg transition-transform transform hover:-translate-y-1 w-full sm:w-auto"
            >
              Explore Courses
            </button>
          </NuxtLink>
        </div>

        <div
          class="mt-12 flex flex-col flex-row flex-wrap gap-6 sm:gap-10 text-center justify-center md:justify-start"
        >
          <div class="flex-1">
            <p class="text-lg sm:text-2xl font-bold text-blue-500">
              <i class="fa-solid fa-users mr-2"></i>57M+
            </p>
            <p class="text-gray-700 pt-1 text-xs sm:text-base">Students</p>
          </div>
          <div class="flex-1">
            <p class="text-lg sm:text-2xl font-bold text-blue-500">
              <i class="fa-solid fa-award mr-2"></i>213K+
            </p>
            <p class="text-gray-700 pt-1 text-xs sm:text-base">Courses</p>
          </div>
          <div class="flex-1">
            <p class="text-lg sm:text-2xl font-bold text-blue-500">
              <i class="fa-solid fa-globe mr-2"></i>190+
            </p>
            <p class="text-gray-700 pt-1 text-xs sm:text-base">Countries</p>
          </div>
        </div>
      </div>

      <div class="relative flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
          alt="Students learning"
          class="rounded-2xl shadow-2xl w-full h-auto max-w-md md:max-w-full object-cover"
        />

        <div
          class="absolute top-4 left-4 sm:top-6 sm:left-6 bg-white text-gray-900 px-3 sm:px-4 py-2 rounded-xl shadow-md text-xs sm:text-sm flex items-center gap-2 max-w-[180px]"
        >
          <span class="text-green-500">🏅</span>
          <div>
            <p class="font-semibold leading-tight">Certificate Ready</p>
            <p class="text-gray-500 text-[10px] sm:text-xs">
              Get industry recognition
            </p>
          </div>
        </div>

        <div
          class="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white text-gray-900 px-3 sm:px-4 py-2 rounded-xl shadow-md text-xs sm:text-sm flex items-center gap-2 max-w-[180px]"
        >
          <span class="text-blue-500">📈</span>
          <div>
            <p class="font-semibold leading-tight">Trending Skills</p>
            <p class="text-gray-500 text-[10px] sm:text-xs">
              Stay ahead of the curve
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

</script>

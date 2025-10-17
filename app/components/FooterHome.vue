<template>
  <footer class="bg-gray-900 text-gray-300 py-10 mt-10">
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
      
      <!-- Brand -->
      <div>
        <h2 class="text-2xl font-bold text-white">Skillify</h2>
        <p class="mt-3 text-sm">
          Empowering learners with high-quality online courses, resources, 
          and expert guidance to achieve their goals.
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-3">Quick Links</h3>
     <ul class="space-y-2">
  <li><NuxtLink to="/" class="hover:text-white">Home</NuxtLink></li>
  <li><NuxtLink to="/courses" class="hover:text-white">Courses</NuxtLink></li>
  <li><NuxtLink to="/professors" class="hover:text-white">Professors</NuxtLink></li>
  <li><NuxtLink to="/aboutus" class="hover:text-white">About Us</NuxtLink></li>
</ul>

      </div>

      <!-- Resources -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-3">Resources</h3>
        <ul class="space-y-2">
          <li><a href="/blog" class="hover:text-white">Blog</a></li>
          <li><a href="/faq" class="hover:text-white">FAQs</a></li>
          <li><a href="/help" class="hover:text-white">Help Center</a></li>
          <li><a href="/tutorials" class="hover:text-white">Tutorials</a></li>
        </ul>
      </div>

      <!-- Newsletter & Social -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-3">Stay Connected</h3>
        <p class="text-sm mb-3">Subscribe to our newsletter for the latest updates.</p>
        <div class="flex">
          <input
            type="email"
            placeholder="Enter your email"
            class="w-full px-3 py-2 rounded-l-md border-2  focus:outline-none text-gray-600"
          />
        <NuxtLink :to="'/courses'">
            <button class="bg-blue-600 px-4 py-3 rounded-r-md text-white hover:bg-blue-700">
            Subscribe
          </button>
        </NuxtLink>
        </div>
        <div class="flex space-x-4 mt-4">
          <a href="#" class="hover:text-white"><i class="fab fa-facebook"></i></a>
          <a href="#" class="hover:text-white"><i class="fab fa-twitter"></i></a>
          <a href="#" class="hover:text-white"><i class="fab fa-linkedin"></i></a>
          <a href="#" class="hover:text-white"><i class="fab fa-youtube"></i></a>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
      © {{ new Date().getFullYear() }} LearnHub. All rights reserved. |
      <a href="/privacy" class="hover:text-white">Privacy Policy</a> •
      <a href="/terms" class="hover:text-white">Terms of Service</a>
    </div>
  </footer>
</template>

<script setup>

</script>



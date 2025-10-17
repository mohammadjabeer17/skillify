<script lang="ts" setup>
const instructors = [
  {
    id: 1,
    name: "Rajkumar",
    role: "Frontend Developer",
    description:
      "Worked on Functionality . Backend . Data Store & UI Integration",
    image:
      "https://res.cloudinary.com/dwdekki8t/image/upload/v1757955716/IMG_20250804_201911_geyhzn_b48d3e.jpg",
  },
  {
    id: 2,
    name: "Rudhraksh",
    role: "UI/UX Designer",
    description: "User Interface · Responsive Design · User Experience",
    image:
      "https://res.cloudinary.com/dwdekki8t/image/upload/v1757940770/WhatsApp_Image_2025-09-15_at_17.18.38_c65f1abd_qmdppa.jpg",
  },
  {
    id: 3,
    name: "Jabeer",
    role: "Auth & Research Specialist",
    description:
      "Information Gathering · Google Authentication . Razorpay Integration ",
    image:
      "https://res.cloudinary.com/dwdekki8t/image/upload/v1757940900/WhatsApp_Image_2025-09-15_at_18.24.43_0a777869_tioaml.jpg",
  },
  {
    id: 3,
    name: "Nikhil",
    role: "Frontend Developer",
    description: "Admindashboard . User Auth . UI Integration",
    image:
      "https://res.cloudinary.com/dwdekki8t/image/upload/v1757941445/WhatsApp_Image_2025-09-15_at_18.26.22_10044fe3_tpn2hs.jpg",
  },
];
</script>
<template>
  <section class="md:py-8 py-20 bg-gray-50 w-[100vw] md:w-[78vw]">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="text-4xl font-bold mb-10 text-center">Our Team</h2>
      <div class="grid sm:grid-cols-2 md:grid-cols-2 gap-8">
        <div
          v-for="instructor in instructors"
          :key="instructor.id"
          class="bg-white rounded-xl shadow-md p-6 text-center hover:scale-105 transition"
        >
          <img
            :src="instructor.image"
            alt="Instructor"
            class="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <h3 class="font-semibold">{{ instructor.name }}</h3>
          <p class="text-gray-500 text-sm font-semibold pt-2">
            {{ instructor.role }}
          </p>
          <p class="text-gray-500 text-sm pt-2">{{ instructor.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

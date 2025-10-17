// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: [
    "~/assets/css/main.css",
    "@fortawesome/fontawesome-free/css/all.css",
    "@fortawesome/fontawesome-free/css/all.min.css",
  ],

  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      title: "Skillify - Learn. Share. Grow.",
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Russo+One&family=Audiowide&family=Exo+2:wght@600;700;800&display=swap",
        },
      ],
    },
  },
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@pinia/nuxt",
  ],
  runtimeConfig: {
    geminiApiKey: process.env.GEMINI_API_KEY,
  razorpayKeyId: process.env.RAZORPAY_KEY_ID || "rzp_test_RU4nb5RxwSpjZv",
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET || "gQPic8eVQkicsJ7fRu1DvW3m",
  },

  router: {
    options: {
      strict: true,
    },
  },

  nitro: {
    commonJS: {
      include: [/razorpay/],
    },
  },
});

<script setup lang="ts">
import { useHead } from "nuxt/app";
import { useRoute } from "vue-router";
const route = useRoute();
const slug = route.params.slug;
useHead({
  title: slug?.[0]?.toString().toUpperCase() + " - Page Not Found",
  meta: [
    {
      name: "description",
      content: "The page you're looking for doesn't exist" + slug?.[0],
    },
  ],
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4"
  >
    <div class="text-center">
      <!-- Animated 404 Number -->
      <div class="relative">
        <h1
          class="text-[150px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 animate-pulse leading-none select-none"
        >
          404
        </h1>
        <div
          class="absolute inset-0 text-[150px] md:text-[200px] font-black text-purple-500/20 blur-2xl leading-none select-none"
        >
          404
        </div>
      </div>

      <!-- Message -->
      <div class="mt-4 space-y-3">
        <h2 class="text-2xl md:text-3xl font-bold text-white">
          Oops! Page Not Found
        </h2>
        <p class="text-gray-400 max-w-md mx-auto text-sm md:text-base">
          The page you're looking for seems to have wandered off into the
          digital void.
        </p>
      </div>

      <!-- Decorative Elements -->
      <div class="flex justify-center gap-2 my-8">
        <span
          class="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
          style="animation-delay: 0ms"
        ></span>
        <span
          class="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
          style="animation-delay: 150ms"
        ></span>
        <span
          class="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
          style="animation-delay: 300ms"
        ></span>
      </div>

      <!-- Back Home Button -->
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
        Back to Home
      </NuxtLink>
    </div>
  </div>
</template>

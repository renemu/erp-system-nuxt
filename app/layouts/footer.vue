<script setup lang="ts">
import { GithubIcon } from "lucide-vue-next";
import { useRuntimeConfig } from "nuxt/app";

const config = useRuntimeConfig();
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer
    class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors"
  >
    <div class="px-4 md:px-6 lg:px-8 py-4">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <!-- Copyright -->
        <div
          class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400"
        >
          <span
            >&copy; {{ currentYear }} {{ config.public.appName }}. All rights
            reserved.</span
          >
        </div>

        <!-- Links -->
        <div class="flex items-center gap-4 text-sm">
          <NuxtLink
            to="/privacy"
            class="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            Privacy Policy
          </NuxtLink>
          <NuxtLink
            to="/terms"
            class="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            Terms of Service
          </NuxtLink>
          <NuxtLink
            to="/help"
            class="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            Help Center
          </NuxtLink>
        </div>

        <!-- Version -->
        <div
          class="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-2"
        >
          Developed by
          <a
            href="https://github.com/renemu"
            target="_blank"
            class="text-gray-600 dark:text-gray-400 hover:text-gray-400 dark:hover:text-gray-300 transition-colors flex items-center"
          >
            <GithubIcon class="w-4 h-4" />
            <span class="font-medium"> RENEMU </span>
          </a>
          <div class="text-xs text-gray-400 dark:text-gray-500">v1.0.0</div>
        </div>
      </div>
    </div>
  </footer>
</template>

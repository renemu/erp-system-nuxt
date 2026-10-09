<script setup lang="ts">
import { Sun, Moon } from "lucide-vue-next";
import { useTheme } from "../../composables/useTheme";

const { isDark, toggleTheme } = useTheme();

const links = [
  { label: "Alur kerja", href: "#alur" },
  { label: "Modul", href: "#modul" },
  { label: "Progres", href: "#progres" },
];
</script>

<template>
  <header
    class="sticky top-0 z-30 border-b border-gray-200 bg-gray-50/90 backdrop-blur dark:border-gray-800 dark:bg-gray-950/90"
  >
    <div
      class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
    >
      <NuxtLink
        to="/"
        class="flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-500"
      >
        <span
          class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-sm font-bold text-white"
          aria-hidden="true"
          >ER</span
        >
        <span class="font-display text-lg font-bold tracking-tight"
          >ERP System</span
        >
      </NuxtLink>

      <nav aria-label="Navigasi utama" class="hidden items-center gap-1 md:flex">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <button
          type="button"
          :aria-label="isDark ? 'Gunakan mode terang' : 'Gunakan mode gelap'"
          class="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-500 dark:text-gray-300 dark:hover:bg-gray-800"
          @click="toggleTheme"
        >
          <Sun v-if="isDark" class="h-5 w-5" />
          <Moon v-else class="h-5 w-5" />
        </button>
        <NuxtLink
          to="/auth/login"
          class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
        >
          Masuk
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

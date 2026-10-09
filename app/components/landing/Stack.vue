<script setup lang="ts">
const stack = [
  { name: "Nuxt 4", role: "Framework dan routing halaman" },
  { name: "Vue 3", role: "Antarmuka berbasis komponen" },
  { name: "Tailwind CSS", role: "Gaya tampilan dan mode gelap" },
  { name: "Lucide", role: "Ikon" },
];
</script>

<template>
  <section class="border-t border-gray-200 dark:border-gray-800">
    <div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 class="font-display text-2xl font-bold tracking-tight">
        Dibangun dengan
      </h2>
      <dl class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="item in stack"
          :key="item.name"
          class="border-l-2 border-gray-300 pl-4 dark:border-gray-700"
        >
          <dt class="font-display text-lg font-semibold tracking-tight">
            {{ item.name }}
          </dt>
          <dd class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {{ item.role }}
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

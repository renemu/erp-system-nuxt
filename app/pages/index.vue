<script setup lang="ts">
import { useHead, useRuntimeConfig } from "nuxt/app";

const config = useRuntimeConfig();
const appName = config.public.appName || "ERP System";

useHead({
  title: `${appName} - Aplikasi ERP berbasis web`,
  meta: [
    {
      name: "description",
      content:
        "ERP System menyatukan penjualan, persediaan, pembelian, keuangan, dan SDM dalam satu aplikasi web. Dibangun dengan Nuxt 4 dan Tailwind CSS, masih dalam pengembangan.",
    },
  ],
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=Instrument+Sans:wght@400;500;600&display=swap",
    },
  ],
});
</script>

<template>
  <div
    class="min-h-screen bg-gray-50 font-body text-gray-900 antialiased transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100"
  >
    <a
      href="#konten"
      class="sr-only rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
    >
      Lewati ke konten
    </a>

    <LandingHeader />

    <main id="konten">
      <LandingHero />
      <LandingModules />
      <LandingRoadmap />
      <LandingStack />
    </main>

    <LandingFooter />
  </div>
</template>

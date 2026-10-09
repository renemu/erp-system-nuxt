// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    configPath: "tailwind.config.ts",
  },
  runtimeConfig: {
    public: {
      // Fallback agar judul halaman dan footer tidak menjadi "undefined"
      // saat NUXT_PUBLIC_APP_NAME belum diatur (mis. di Vercel).
      appName: process.env.NUXT_PUBLIC_APP_NAME || "ERP System",
    },
  },
});

<template>
  <footer class="border-t border-gray-200 dark:border-gray-800">
    <div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div
        class="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <h2
            class="font-display text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Coba tampilan dasarnya
          </h2>
          <p
            class="mt-3 max-w-[46ch] leading-relaxed text-gray-600 dark:text-gray-400"
          >
            Dashboard memakai data contoh, dan halaman login belum terhubung ke
            server.
          </p>
        </div>

        <div class="flex flex-wrap gap-3">
          <NuxtLink
            to="/dashboard"
            class="rounded-lg bg-purple-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
          >
            Buka dashboard
          </NuxtLink>
          <NuxtLink
            to="/auth/login"
            class="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Masuk
          </NuxtLink>
        </div>
      </div>

      <div
        class="mt-16 flex flex-col gap-2 border-t border-gray-200 pt-6 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400 sm:flex-row sm:justify-between"
      >
        <p>ERP System</p>
        <p>Proyek eksperimen, masih dalam pengembangan.</p>
      </div>
    </div>
  </footer>
</template>

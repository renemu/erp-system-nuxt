<template>
  <section
    class="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pb-28 lg:pt-20"
  >
    <div class="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
      <div class="lg:col-span-6">
        <h1
          class="font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.25rem]"
          style="font-variation-settings: 'wdth' 88"
        >
          Pesanan masuk, stok dan pembukuan ikut berubah.
        </h1>
        <p
          class="mt-6 max-w-[48ch] text-lg leading-relaxed text-gray-600 dark:text-gray-400"
        >
          ERP System menyatukan penjualan, persediaan, pembelian, keuangan, dan
          SDM dalam satu aplikasi web, supaya data yang sama tidak perlu dicatat
          berulang di tiap bagian.
        </p>

        <div class="mt-8 flex flex-wrap items-center gap-3">
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

        <p
          class="mt-6 flex max-w-[48ch] items-start gap-2 text-sm text-gray-500 dark:text-gray-400"
        >
          <span
            class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-500"
            aria-hidden="true"
          ></span>
          Masih dalam pengembangan. Dashboard, mode gelap, dan tampilan
          responsif sudah bisa dicoba.
        </p>
      </div>

      <div id="alur" class="scroll-mt-24 lg:col-span-6">
        <LandingFlow />
      </div>
    </div>
  </section>
</template>

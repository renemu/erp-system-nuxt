<script setup lang="ts">
interface ModuleRow {
  name: string;
  scope: string;
  to?: string;
}

// Scope text follows the sidebar menu; status follows the README progress list.
const modules: ModuleRow[] = [
  {
    name: "Dashboard",
    scope: "Ringkasan pendapatan, pesanan, produk, dan pelanggan. Masih memakai data contoh.",
    to: "/dashboard",
  },
  {
    name: "Persediaan",
    scope: "Produk, kategori, stok, dan gudang.",
  },
  {
    name: "Penjualan",
    scope: "Pesanan, invoice, pelanggan, dan penawaran.",
  },
  {
    name: "Pembelian",
    scope: "Purchase order, pemasok, dan penerimaan barang.",
  },
  {
    name: "Keuangan",
    scope: "Akun, transaksi, dan laporan.",
  },
  {
    name: "SDM",
    scope: "Karyawan, departemen, absensi, dan penggajian.",
  },
];
</script>

<template>
  <section
    id="modul"
    class="scroll-mt-16 border-t border-gray-200 dark:border-gray-800"
  >
    <div class="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div class="grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <h2
            class="font-display text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Satu aplikasi untuk lima bagian bisnis
          </h2>
          <p
            class="mt-4 max-w-[40ch] leading-relaxed text-gray-600 dark:text-gray-400"
          >
            Menu tiap modul sudah ada di sidebar. Isinya dikerjakan satu per
            satu, dimulai dari autentikasi.
          </p>
        </div>

        <ul
          class="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800 lg:col-span-8"
        >
          <li
            v-for="m in modules"
            :key="m.name"
            class="grid gap-2 py-5 sm:grid-cols-[9rem_1fr_auto] sm:items-baseline sm:gap-6"
          >
            <h3 class="font-display text-xl font-semibold tracking-tight">
              {{ m.name }}
            </h3>
            <p class="max-w-[52ch] text-gray-600 dark:text-gray-400">
              {{ m.scope }}
            </p>
            <NuxtLink
              v-if="m.to"
              :to="m.to"
              class="w-fit rounded-full bg-purple-600 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
            >
              Buka dashboard
            </NuxtLink>
            <span
              v-else
              class="w-fit rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400"
            >
              Direncanakan
            </span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

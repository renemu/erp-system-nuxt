<script setup lang="ts">
import { Check, Circle } from "lucide-vue-next";

// Mirrors the progress checklist in README.md
const done = [
  "Layout dasar: sidebar, navbar, footer",
  "Mode gelap dan terang",
  "Tampilan responsif",
  "Halaman login (tampilan saja)",
  "Halaman dashboard",
];

const next = [
  "Autentikasi",
  "Modul persediaan",
  "Modul penjualan",
  "Modul pembelian",
  "Modul keuangan",
  "Modul SDM",
];

const total = done.length + next.length;
</script>

<template>
  <section
    id="progres"
    class="scroll-mt-16 border-t border-gray-200 dark:border-gray-800"
  >
    <div class="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div class="grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <h2
            class="font-display text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Progres pengembangan
          </h2>
          <p
            class="mt-4 max-w-[40ch] leading-relaxed text-gray-600 dark:text-gray-400"
          >
            {{ done.length }} dari {{ total }} item sudah selesai. Daftar ini
            sama dengan checklist di README proyek.
          </p>
        </div>

        <div class="lg:col-span-8">
          <div
            class="flex gap-1"
            role="img"
            :aria-label="`${done.length} dari ${total} item selesai`"
          >
            <span
              v-for="n in total"
              :key="n"
              :class="[
                'h-2 flex-1 rounded-full',
                n <= done.length
                  ? 'bg-purple-600'
                  : 'bg-gray-200 dark:bg-gray-800',
              ]"
            ></span>
          </div>

          <div class="mt-10 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 class="font-display text-lg font-semibold tracking-tight">
                Selesai
              </h3>
              <ul class="mt-4 space-y-3">
                <li
                  v-for="item in done"
                  :key="item"
                  class="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                >
                  <Check
                    class="mt-0.5 h-5 w-5 shrink-0 text-purple-600 dark:text-purple-400"
                    aria-hidden="true"
                  />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="font-display text-lg font-semibold tracking-tight">
                Berikutnya
              </h3>
              <ul class="mt-4 space-y-3">
                <li
                  v-for="item in next"
                  :key="item"
                  class="flex items-start gap-3 text-gray-600 dark:text-gray-400"
                >
                  <Circle
                    class="mt-0.5 h-5 w-5 shrink-0 text-gray-400 dark:text-gray-600"
                    aria-hidden="true"
                  />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

interface Order {
  id: string;
  invoice: string;
  customer: string;
  product: string;
  qty: number;
  total: number;
  stockBefore: number;
}

// Illustrative sample data only, mirrors the sample orders on the dashboard.
const REORDER_AT = 100;
const RESTOCK_TO = 300;

const orders: Order[] = [
  {
    id: "ORD-001",
    invoice: "INV-001",
    customer: "PT. ABC Corp",
    product: "Kopi arabika 1 kg",
    qty: 40,
    total: 5500000,
    stockBefore: 220,
  },
  {
    id: "ORD-002",
    invoice: "INV-002",
    customer: "CV. XYZ Trading",
    product: "Gula pasir 1 kg",
    qty: 160,
    total: 3200000,
    stockBefore: 210,
  },
  {
    id: "ORD-003",
    invoice: "INV-003",
    customer: "Toko Makmur Jaya",
    product: "Teh melati 250 g",
    qty: 50,
    total: 1850000,
    stockBefore: 90,
  },
];

const rupiah = (n: number) =>
  "Rp " + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const selectedId = ref(orders[0]!.id);

const selected = computed(
  () => orders.find((o) => o.id === selectedId.value) ?? orders[0]!,
);

const steps = computed(() => {
  const o = selected.value;
  const stockAfter = o.stockBefore - o.qty;
  const needsRestock = stockAfter < REORDER_AT;

  return [
    {
      module: "Penjualan",
      title: `Invoice ${o.invoice} dibuat`,
      detail: `${o.customer}, ${rupiah(o.total)}, jatuh tempo 14 hari`,
      alert: false,
    },
    {
      module: "Persediaan",
      title: `${o.product}: stok ${o.stockBefore} menjadi ${stockAfter} unit`,
      detail: `Gudang utama berkurang ${o.qty} unit sesuai pesanan`,
      alert: false,
    },
    {
      module: "Keuangan",
      title: `Piutang usaha bertambah ${rupiah(o.total)}`,
      detail: "Debit piutang usaha, kredit pendapatan penjualan",
      alert: false,
    },
    needsRestock
      ? {
          module: "Pembelian",
          title: `Disarankan pesan ulang ${RESTOCK_TO - stockAfter} unit`,
          detail: `Stok di bawah batas ${REORDER_AT} unit, purchase order siap dibuat`,
          alert: true,
        }
      : {
          module: "Pembelian",
          title: "Belum perlu pesan ulang",
          detail: `Stok ${stockAfter} unit masih di atas batas ${REORDER_AT} unit`,
          alert: false,
        },
  ];
});
</script>

<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6"
  >
    <h2 class="font-display text-xl font-bold tracking-tight">
      Satu pesanan, empat modul
    </h2>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
      Pilih pesanan untuk melihat apa yang berubah. Datanya hanya contoh.
    </p>

    <div
      class="mt-5 grid gap-2 sm:grid-cols-3"
      role="group"
      aria-label="Pilih pesanan contoh"
    >
      <button
        v-for="order in orders"
        :key="order.id"
        type="button"
        :aria-pressed="order.id === selectedId"
        :class="[
          'rounded-lg border px-3 py-2.5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500',
          order.id === selectedId
            ? 'border-purple-600 bg-purple-50 dark:border-purple-400 dark:bg-purple-950/40'
            : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800',
        ]"
        @click="selectedId = order.id"
      >
        <span
          class="block text-xs font-medium text-gray-500 dark:text-gray-400"
          >{{ order.id }}</span
        >
        <span class="mt-0.5 block truncate text-sm font-semibold">{{
          order.customer
        }}</span>
        <span
          class="mt-0.5 block text-sm tabular-nums text-gray-600 dark:text-gray-300"
          >{{ rupiah(order.total) }}</span
        >
      </button>
    </div>

    <ol
      :key="selectedId"
      aria-live="polite"
      class="relative mt-6 space-y-5 border-l border-gray-200 pl-6 dark:border-gray-700"
    >
      <li
        v-for="(step, i) in steps"
        :key="step.module"
        class="relative animate-flow-in motion-reduce:animate-none"
        :style="{ animationDelay: `${i * 110}ms` }"
      >
        <span
          :class="[
            'absolute -left-[29.5px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-white dark:ring-gray-900',
            step.alert ? 'bg-amber-500' : 'bg-purple-600',
          ]"
          aria-hidden="true"
        ></span>
        <p
          class="font-display text-sm font-semibold text-purple-700 dark:text-purple-300"
        >
          {{ step.module }}
        </p>
        <p
          :class="[
            'mt-0.5 text-sm font-medium',
            step.alert
              ? 'text-amber-700 dark:text-amber-400'
              : 'text-gray-900 dark:text-gray-100',
          ]"
        >
          {{ step.title }}
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ step.detail }}
        </p>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import MainLayout from "../layouts/main.vue";
import Button from "../components/button.vue";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  ArrowUpRight,
} from "lucide-vue-next";

const stats = [
  {
    name: "Total Revenue",
    value: "Rp 125.400.000",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Total Orders",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Products",
    value: "456",
    change: "-2.4%",
    trend: "down",
    icon: Package,
    color: "from-purple-500 to-violet-600",
  },
  {
    name: "Customers",
    value: "2,890",
    change: "+15.3%",
    trend: "up",
    icon: Users,
    color: "from-orange-500 to-amber-600",
  },
];

const recentOrders = [
  {
    id: "ORD-001",
    customer: "PT. ABC Corp",
    amount: "Rp 5.500.000",
    status: "completed",
  },
  {
    id: "ORD-002",
    customer: "CV. XYZ Trading",
    amount: "Rp 3.200.000",
    status: "processing",
  },
  {
    id: "ORD-003",
    customer: "Toko Makmur Jaya",
    amount: "Rp 1.850.000",
    status: "pending",
  },
  {
    id: "ORD-004",
    customer: "PT. Sukses Selalu",
    amount: "Rp 8.750.000",
    status: "completed",
  },
  {
    id: "ORD-005",
    customer: "UD. Berkah Abadi",
    amount: "Rp 2.100.000",
    status: "processing",
  },
];

const getStatusClass = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    case "processing":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    case "pending":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
  }
};
</script>

<template>
  <MainLayout title="dashboard">
    <div class="space-y-6">
      <!-- Page Header -->
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening with your business.
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          @click="$router.push('/finance/reports')"
        >
          <ArrowUpRight class="w-4 h-4" />
          View Reports
        </Button>
      </div>

      <!-- Stats Grid -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      >
        <div
          v-for="stat in stats"
          :key="stat.name"
          class="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="flex items-center justify-between">
            <div
              :class="[
                'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center',
                stat.color,
              ]"
            >
              <component :is="stat.icon" class="w-6 h-6 text-white" />
            </div>
            <div
              :class="[
                'flex items-center gap-1 text-sm font-medium',
                stat.trend === 'up'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400',
              ]"
            >
              <TrendingUp v-if="stat.trend === 'up'" class="w-4 h-4" />
              <TrendingDown v-else class="w-4 h-4" />
              {{ stat.change }}
            </div>
          </div>
          <div class="mt-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
              {{ stat.name }}
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {{ stat.value }}
            </p>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Recent Orders -->
        <div
          class="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm"
        >
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Orders
            </h2>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Order ID
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Customer
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                <tr
                  v-for="order in recentOrders"
                  :key="order.id"
                  class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {{ order.id }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300"
                  >
                    {{ order.customer }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300"
                  >
                    {{ order.amount }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="[
                        'px-2.5 py-1 text-xs font-medium rounded-full capitalize',
                        getStatusClass(order.status),
                      ]"
                    >
                      {{ order.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
            <NuxtLink
              to="/sales/orders"
              class="text-sm text-purple-600 dark:text-purple-400 hover:underline"
            >
              View all orders →
            </NuxtLink>
          </div>
        </div>

        <!-- Quick Actions -->
        <div
          class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm"
        >
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              Quick Actions
            </h2>
          </div>
          <div class="p-4 space-y-3">
            <button
              class="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
            >
              <div
                class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center"
              >
                <ShoppingCart
                  class="w-5 h-5 text-blue-600 dark:text-blue-400"
                />
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  New Order
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Create sales order
                </p>
              </div>
            </button>
            <button
              class="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
            >
              <div
                class="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center"
              >
                <Package class="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  Add Product
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Add new inventory item
                </p>
              </div>
            </button>
            <button
              class="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
            >
              <div
                class="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
              >
                <Users class="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  Add Customer
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Register new customer
                </p>
              </div>
            </button>
            <button
              class="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
            >
              <div
                class="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center"
              >
                <DollarSign
                  class="w-5 h-5 text-orange-600 dark:text-orange-400"
                />
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  Create Invoice
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Generate new invoice
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

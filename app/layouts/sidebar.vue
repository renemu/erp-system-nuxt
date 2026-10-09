<script setup lang="ts">
import {
  Home,
  Users,
  Package,
  ShoppingCart,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Wallet,
  Truck,
  X,
} from "lucide-vue-next";
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";

const props = defineProps<{
  isOpen: boolean;
  isMobile: boolean;
  isCollapsed: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

interface MenuItem {
  name: string;
  icon: any;
  path?: string;
  children?: { name: string; path: string }[];
}

const menuItems: MenuItem[] = [
  { name: "Dashboard", icon: Home, path: "/dashboard" },
  {
    name: "Inventory",
    icon: Package,
    children: [
      { name: "Products", path: "/inventory/products" },
      { name: "Categories", path: "/inventory/categories" },
      { name: "Stock", path: "/inventory/stock" },
      { name: "Warehouses", path: "/inventory/warehouses" },
    ],
  },
  {
    name: "Sales",
    icon: ShoppingCart,
    children: [
      { name: "Orders", path: "/sales/orders" },
      { name: "Invoices", path: "/sales/invoices" },
      { name: "Customers", path: "/sales/customers" },
      { name: "Quotations", path: "/sales/quotations" },
    ],
  },
  {
    name: "Purchasing",
    icon: Truck,
    children: [
      { name: "Purchase Orders", path: "/purchasing/orders" },
      { name: "Suppliers", path: "/purchasing/suppliers" },
      { name: "Receiving", path: "/purchasing/receiving" },
    ],
  },
  {
    name: "Finance",
    icon: Wallet,
    children: [
      { name: "Accounts", path: "/finance/accounts" },
      { name: "Transactions", path: "/finance/transactions" },
      { name: "Reports", path: "/finance/reports" },
    ],
  },
  {
    name: "HR",
    icon: Users,
    children: [
      { name: "Employees", path: "/hr/employees" },
      { name: "Departments", path: "/hr/departments" },
      { name: "Attendance", path: "/hr/attendance" },
      { name: "Payroll", path: "/hr/payroll" },
    ],
  },
  { name: "Reports", icon: BarChart3, path: "/reports" },
  { name: "Documents", icon: FileText, path: "/documents" },
];

const bottomMenuItems: MenuItem[] = [
  { name: "Settings", icon: Settings, path: "/settings" },
  { name: "Help", icon: HelpCircle, path: "/help" },
];

const expandedMenus = ref<string[]>([]);

const route = useRoute();

// Collapsed desktop mode: submenu is shown as a floating flyout.
// It is teleported to <body> with fixed positioning so it is never clipped
// by the sidebar's overflow container and always sits above other layers.
const isCollapsedDesktop = computed(() => props.isCollapsed && !props.isMobile);

const flyout = ref<{ name: string; top: number; left: number } | null>(null);
let flyoutTimer: ReturnType<typeof setTimeout> | null = null;

const activeFlyoutItem = computed(() =>
  flyout.value ? menuItems.find((item) => item.name === flyout.value!.name) : undefined
);

const clearFlyoutTimer = () => {
  if (flyoutTimer) {
    clearTimeout(flyoutTimer);
    flyoutTimer = null;
  }
};

const closeFlyout = () => {
  clearFlyoutTimer();
  flyout.value = null;
};

const scheduleCloseFlyout = () => {
  clearFlyoutTimer();
  // Small delay so the pointer can travel from the icon to the flyout
  flyoutTimer = setTimeout(() => {
    flyout.value = null;
  }, 150);
};

const openFlyout = (item: MenuItem, event: Event) => {
  if (!isCollapsedDesktop.value || !item.children) return;
  clearFlyoutTimer();

  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  // Estimated height: header (~41px) + items (~36px each) + padding
  const estimatedHeight = 41 + item.children.length * 36 + 8;
  const maxTop = window.innerHeight - estimatedHeight - 8;

  flyout.value = {
    name: item.name,
    top: Math.max(8, Math.min(rect.top, maxTop)),
    left: rect.right + 8,
  };
};

const toggleMenu = (item: MenuItem, event: Event) => {
  // Collapsed desktop: click toggles the flyout (useful for touch/keyboard)
  if (isCollapsedDesktop.value) {
    if (flyout.value?.name === item.name) {
      closeFlyout();
    } else {
      openFlyout(item, event);
    }
    return;
  }

  const index = expandedMenus.value.indexOf(item.name);
  if (index > -1) {
    expandedMenus.value.splice(index, 1);
  } else {
    expandedMenus.value.push(item.name);
  }
};

const onDocumentClick = (event: MouseEvent) => {
  if (!flyout.value) return;
  const target = event.target as HTMLElement | null;
  if (target?.closest("[data-sidebar-flyout], [data-sidebar-trigger]")) return;
  closeFlyout();
};

onMounted(() => {
  document.addEventListener("click", onDocumentClick);
  window.addEventListener("resize", closeFlyout);
});

onBeforeUnmount(() => {
  clearFlyoutTimer();
  document.removeEventListener("click", onDocumentClick);
  window.removeEventListener("resize", closeFlyout);
});

// Close the flyout on navigation and whenever the sidebar mode changes
watch(() => route.path, closeFlyout);
watch(isCollapsedDesktop, closeFlyout);

const isExpanded = (menuName: string) => expandedMenus.value.includes(menuName);

const handleNavClick = () => {
  if (props.isMobile) {
    emit("close");
  }
};

// Computed for sidebar width class
const sidebarWidthClass = computed(() => {
  if (props.isMobile) {
    return 'w-72';
  }
  return props.isCollapsed ? 'w-20' : 'w-72';
});

// Computed for transform class
const transformClass = computed(() => {
  if (props.isMobile) {
    return props.isOpen ? 'translate-x-0' : '-translate-x-full';
  }
  // Desktop always visible, just different width
  return 'translate-x-0';
});
</script>

<template>
  <aside
    :class="[
      'fixed top-0 left-0 z-50 h-screen transition-all duration-300 ease-in-out',
      'bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800',
      sidebarWidthClass,
      transformClass,
    ]"
  >
    <div class="h-full flex flex-col overflow-hidden">
      <!-- Logo & Brand -->
      <div
        :class="[
          'h-16 flex items-center border-b border-gray-200 dark:border-gray-800',
          isCollapsed && !isMobile ? 'px-2 justify-center' : 'px-4 justify-between'
        ]"
      >
        <NuxtLink to="/dashboard" :class="['flex items-center', isCollapsed && !isMobile ? 'justify-center' : 'gap-3']">
          <div
            class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20 flex-shrink-0"
          >
            <span class="text-white font-bold text-lg">ER</span>
          </div>
          <div v-if="!isCollapsed || isMobile" class="overflow-hidden">
            <p class="text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap">
              ERP System
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
              Enterprise Resource
            </p>
          </div>
        </NuxtLink>
        <!-- Button to toggle sidebar (mobile only) -->
        <Button
          v-if="isMobile"
          variant="ghost"
          size="sm"
          @click="emit('close')"
        >
          <X class="w-5 h-5" />
        </Button>
      </div>

      <!-- Navigation -->
      <nav
        :class="['flex-1 overflow-y-auto py-4 space-y-1', isCollapsed && !isMobile ? 'px-2' : 'px-3']"
        @scroll="closeFlyout"
      >
        <template v-for="item in menuItems" :key="item.name">
          <!-- Menu with children -->
          <div
            v-if="item.children"
            class="relative group"
            @mouseenter="openFlyout(item, $event)"
            @mouseleave="scheduleCloseFlyout"
          >
            <button
              data-sidebar-trigger
              @click="toggleMenu(item, $event)"
              :class="[
                'flex items-center w-full p-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
                isCollapsed && !isMobile ? 'justify-center' : ''
              ]"
              :title="isCollapsed && !isMobile ? item.name : undefined"
            >
              <component
                :is="item.icon"
                class="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex-shrink-0"
              />
              <template v-if="!isCollapsed || isMobile">
                <span class="flex-1 ml-3 text-left text-sm font-medium whitespace-nowrap">{{
                  item.name
                }}</span>
                <ChevronDown
                  v-if="isExpanded(item.name)"
                  class="w-4 h-4 text-gray-500 transition-transform"
                />
                <ChevronRight
                  v-else
                  class="w-4 h-4 text-gray-500 transition-transform"
                />
              </template>
            </button>
            
            <!-- Submenu for expanded sidebar -->
            <transition
              v-if="!isCollapsed || isMobile"
              enter-active-class="transition-all duration-200 ease-out"
              leave-active-class="transition-all duration-200 ease-in"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-96"
              leave-from-class="opacity-100 max-h-96"
              leave-to-class="opacity-0 max-h-0"
            >
              <ul
                v-show="isExpanded(item.name)"
                class="pl-11 mt-1 space-y-1 overflow-hidden"
              >
                <li v-for="child in item.children" :key="child.path">
                  <NuxtLink
                    :to="child.path"
                    @click="handleNavClick"
                    class="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 transition-colors whitespace-nowrap"
                    active-class="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-medium"
                  >
                    {{ child.name }}
                  </NuxtLink>
                </li>
              </ul>
            </transition>
          </div>

          <!-- Single menu item -->
          <NuxtLink
            v-else
            :to="item.path!"
            @click="handleNavClick"
            :class="[
              'flex items-center p-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group',
              isCollapsed && !isMobile ? 'justify-center' : ''
            ]"
            active-class="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
            :title="isCollapsed && !isMobile ? item.name : undefined"
          >
            <component
              :is="item.icon"
              class="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex-shrink-0"
            />
            <span v-if="!isCollapsed || isMobile" class="ml-3 text-sm font-medium whitespace-nowrap">{{ item.name }}</span>
          </NuxtLink>
        </template>
      </nav>

      <!-- Bottom Menu -->
      <div
        :class="[
          'py-4 border-t border-gray-200 dark:border-gray-800 space-y-1',
          isCollapsed && !isMobile ? 'px-2' : 'px-3'
        ]"
      >
        <NuxtLink
          v-for="item in bottomMenuItems"
          :key="item.name"
          :to="item.path!"
          @click="handleNavClick"
          :class="[
            'flex items-center p-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group',
            isCollapsed && !isMobile ? 'justify-center' : ''
          ]"
          active-class="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
          :title="isCollapsed && !isMobile ? item.name : undefined"
        >
          <component
            :is="item.icon"
            class="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex-shrink-0"
          />
          <span v-if="!isCollapsed || isMobile" class="ml-3 text-sm font-medium whitespace-nowrap">{{ item.name }}</span>
        </NuxtLink>
      </div>
    </div>
  </aside>

  <!-- Flyout submenu for collapsed sidebar (desktop only).
       Teleported to <body> so it escapes the sidebar's overflow clipping
       and stacks above the navbar, content and sidebar. -->
  <Teleport to="body">
    <transition
      enter-active-class="transition duration-150 ease-out"
      leave-active-class="transition duration-100 ease-in"
      enter-from-class="opacity-0 -translate-x-1"
      enter-to-class="opacity-100 translate-x-0"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 -translate-x-1"
    >
      <div
        v-if="flyout && activeFlyoutItem && isCollapsedDesktop"
        data-sidebar-flyout
        class="fixed z-[60] w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
        :style="{ top: flyout.top + 'px', left: flyout.left + 'px' }"
        @mouseenter="clearFlyoutTimer"
        @mouseleave="scheduleCloseFlyout"
      >
        <div class="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <span class="text-sm font-semibold text-gray-900 dark:text-white">{{
            activeFlyoutItem.name
          }}</span>
        </div>
        <ul class="py-1">
          <li v-for="child in activeFlyoutItem.children" :key="child.path">
            <NuxtLink
              :to="child.path"
              class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              active-class="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-medium"
              @click="closeFlyout"
            >
              {{ child.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </transition>
  </Teleport>

  <!-- Overlay for mobile -->
  <div
    v-if="isOpen && isMobile"
    class="fixed inset-0 z-40 bg-black/50 lg:hidden"
    @click="emit('close')"
  />
</template>

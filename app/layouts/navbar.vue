<script setup lang="ts">
import {
  Menu,
  Bell,
  Search,
  Sun,
  Moon,
  ChevronDown,
  User,
  Settings,
  LogOut,
  X,
} from "lucide-vue-next";
import { ref, computed } from "vue";
import { useTheme } from "~/composables/useTheme";

const props = defineProps<{
  sidebarOpen: boolean;
}>();

const emit = defineEmits<{
  toggleSidebar: [];
}>();

const { isDark, toggleTheme } = useTheme();

const isProfileOpen = ref(false);
const isSearchOpen = ref(false);
const searchQuery = ref("");
const notifications = ref([
  { id: 1, title: "New order received", time: "5 min ago", unread: true },
  { id: 2, title: "Stock low: Product A", time: "1 hour ago", unread: true },
  { id: 3, title: "Payment confirmed", time: "2 hours ago", unread: false },
]);
const isNotificationOpen = ref(false);

const unreadCount = computed(() => notifications.value.filter((n) => n.unread).length);

const toggleProfile = () => {
  isProfileOpen.value = !isProfileOpen.value;
  if (isProfileOpen.value) {
    isNotificationOpen.value = false;
  }
};

const toggleNotification = () => {
  isNotificationOpen.value = !isNotificationOpen.value;
  if (isNotificationOpen.value) {
    isProfileOpen.value = false;
  }
};

const closeDropdowns = () => {
  isProfileOpen.value = false;
  isNotificationOpen.value = false;
};

// Close dropdowns when clicking outside
if (typeof window !== "undefined") {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".profile-dropdown") && !target.closest(".notification-dropdown")) {
      closeDropdowns();
    }
  });
}
</script>

<template>
  <header
    class="fixed top-0 right-0 left-0 lg:left-72 z-40 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-all duration-300"
  >
    <div class="h-full px-4 flex items-center justify-between">
      <!-- Left side -->
      <div class="flex items-center gap-4">
        <!-- Mobile menu button -->
        <button
          @click="emit('toggleSidebar')"
          class="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
        >
          <Menu class="w-6 h-6" />
        </button>

        <!-- Search bar - Desktop -->
        <div class="hidden md:flex w-80">
          <div class="relative w-full">
            <Search
              class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <!-- Right side -->
      <div class="flex items-center gap-2">
        <!-- Mobile search button -->
        <button
          @click="isSearchOpen = !isSearchOpen"
          class="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
        >
          <Search v-if="!isSearchOpen" class="w-5 h-5" />
          <X v-else class="w-5 h-5" />
        </button>

        <!-- Theme toggle -->
        <button
          @click="toggleTheme"
          class="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <Sun v-if="isDark" class="w-5 h-5 text-yellow-500" />
          <Moon v-else class="w-5 h-5" />
        </button>

        <!-- Notifications -->
        <div class="relative notification-dropdown">
          <button
            @click.stop="toggleNotification"
            class="relative p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Bell class="w-5 h-5" />
            <span
              v-if="unreadCount > 0"
              class="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center"
            >
              {{ unreadCount }}
            </span>
          </button>

          <!-- Notification dropdown -->
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div
              v-if="isNotificationOpen"
              class="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h3 class="font-semibold text-gray-900 dark:text-white">Notifications</h3>
              </div>
              <div class="max-h-72 overflow-y-auto">
                <div
                  v-for="notification in notifications"
                  :key="notification.id"
                  class="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-0"
                >
                  <div class="flex items-start gap-3">
                    <div
                      :class="[
                        'w-2 h-2 mt-2 rounded-full flex-shrink-0',
                        notification.unread ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600',
                      ]"
                    />
                    <div class="flex-1 min-w-0">
                      <p
                        :class="[
                          'text-sm',
                          notification.unread
                            ? 'font-medium text-gray-900 dark:text-white'
                            : 'text-gray-600 dark:text-gray-400',
                        ]"
                      >
                        {{ notification.title }}
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {{ notification.time }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                <NuxtLink
                  to="/notifications"
                  class="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                >
                  View all notifications
                </NuxtLink>
              </div>
            </div>
          </transition>
        </div>

        <!-- Profile -->
        <div class="relative profile-dropdown">
          <button
            @click.stop="toggleProfile"
            class="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <img
              src="https://ui-avatars.com/api/?name=John+Doe&background=7c3aed&color=fff"
              alt="Profile"
              class="w-8 h-8 rounded-lg"
            />
            <div class="hidden sm:block text-left">
              <p class="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Admin</p>
            </div>
            <ChevronDown class="hidden sm:block w-4 h-4 text-gray-500" />
          </button>

          <!-- Profile dropdown -->
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div
              v-if="isProfileOpen"
              class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <p class="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">john.doe@company.com</p>
              </div>
              <div class="py-1">
                <NuxtLink
                  to="/profile"
                  class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <User class="w-4 h-4" />
                  Profile
                </NuxtLink>
                <NuxtLink
                  to="/settings"
                  class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Settings class="w-4 h-4" />
                  Settings
                </NuxtLink>
              </div>
              <div class="py-1 border-t border-gray-200 dark:border-gray-700">
                <button
                  class="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <LogOut class="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <!-- Mobile search bar -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isSearchOpen"
        class="absolute top-full left-0 right-0 p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 md:hidden"
      >
        <div class="relative">
          <Search
            class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            autofocus
          />
        </div>
      </div>
    </transition>
  </header>
</template>

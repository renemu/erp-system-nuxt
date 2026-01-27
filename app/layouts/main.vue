<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useHead, useRuntimeConfig } from "nuxt/app";
import Navbar from "./navbar.vue";
import Sidebar from "./sidebar.vue";
import Footer from "./footer.vue";

const props = defineProps<{
  title?: string;
}>();
const config = useRuntimeConfig();
const pageTitle = computed(() => {
  if (!props.title) {
    return config.public.appName;
  }

  return props.title.charAt(0).toUpperCase() + props.title.slice(1);
});

const nameApp = config.public.appName || "ERP System";
useHead({
  title: pageTitle.value + " - " + nameApp,
  meta: [{ name: "description", content: "ERP System" }],
});

const sidebarOpen = ref(true);
const sidebarCollapsed = ref(false);
const isMobile = ref(false);

const toggleSidebar = () => {
  if (isMobile.value) {
    // On mobile, toggle open/close
    sidebarOpen.value = !sidebarOpen.value;
  } else {
    // On desktop, toggle collapsed/expanded
    sidebarCollapsed.value = !sidebarCollapsed.value;
  }
};

const closeSidebar = () => {
  if (isMobile.value) {
    sidebarOpen.value = false;
  }
};

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024;
  if (isMobile.value) {
    sidebarOpen.value = false;
    sidebarCollapsed.value = false;
  } else {
    sidebarOpen.value = true;
  }
};

// Computed for main content margin
const mainMarginClass = computed(() => {
  if (isMobile.value) {
    return 'lg:ml-0';
  }
  return sidebarCollapsed.value ? 'lg:ml-20' : 'lg:ml-72';
});

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});
</script>

<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300"
  >
    <!-- Navbar -->
    <Navbar 
      :sidebar-open="sidebarOpen" 
      :sidebar-collapsed="sidebarCollapsed"
      :is-mobile="isMobile"
      @toggle-sidebar="toggleSidebar" 
    />

    <!-- Sidebar -->
    <Sidebar
      :is-open="sidebarOpen"
      :is-mobile="isMobile"
      :is-collapsed="sidebarCollapsed"
      @close="closeSidebar"
    />

    <!-- Main Content -->
    <main
      :class="[
        'pt-16 min-h-[calc(100vh-56px)] transition-all duration-300',
        mainMarginClass,
      ]"
    >
      <div class="p-4 md:p-6 lg:p-8">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <div :class="['transition-all duration-300', mainMarginClass]">
      <Footer />
    </div>
  </div>
</template>

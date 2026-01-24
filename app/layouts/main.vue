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
useHead({
  title: pageTitle.value + " - " + config.public.appName,
  meta: [{ name: "description", content: "ERP System" }],
});
const sidebarOpen = ref(false);
const isMobile = ref(false);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const closeSidebar = () => {
  sidebarOpen.value = false;
};

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024;
  if (!isMobile.value) {
    sidebarOpen.value = true;
  }
};

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
    <Navbar :sidebar-open="sidebarOpen" @toggle-sidebar="toggleSidebar" />

    <!-- Sidebar -->
    <Sidebar
      :is-open="sidebarOpen"
      :is-mobile="isMobile"
      @close="closeSidebar"
    />

    <!-- Main Content -->
    <main
      :class="[
        'pt-16 min-h-[calc(100vh-56px)] transition-all duration-300',
        'lg:ml-72',
      ]"
    >
      <div class="p-4 md:p-6 lg:p-8">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <div class="lg:ml-72 transition-all duration-300">
      <Footer />
    </div>
  </div>
</template>

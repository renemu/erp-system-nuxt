import { ref, watchEffect, computed, onMounted } from "vue";

const theme = ref<"light" | "dark">("light");
const isHydrated = ref(false);

export function useTheme() {
  const isDark = computed(() => theme.value === "dark");

  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
  };

  const setTheme = (newTheme: "light" | "dark") => {
    theme.value = newTheme;
  };

  onMounted(() => {
    // Load saved theme from localStorage on client
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      theme.value = savedTheme;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      theme.value = "dark";
    }
    isHydrated.value = true;
  });

  watchEffect(() => {
    if (typeof window === "undefined") return;
    
    const html = document.documentElement;
    if (theme.value === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    
    if (isHydrated.value) {
      localStorage.setItem("theme", theme.value);
    }
  });

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme,
  };
}

<script setup lang="ts">
import { computed } from "vue";
import { LoaderCircle } from "lucide-vue-next";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success";
type Size = "xs" | "sm" | "md" | "lg" | "xl";

const props = withDefaults(
  defineProps<{
    variant?: Variant;
    size?: Size;
    disabled?: boolean;
    loading?: boolean;
    block?: boolean;
    rounded?: boolean;
    type?: "button" | "submit" | "reset";
  }>(),
  {
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
    block: false,
    rounded: false,
    type: "button",
  },
);

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const isDisabled = computed(() => props.disabled || props.loading);

const baseClasses =
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900";

const variantClasses = computed(() => {
  const variants: Record<Variant, string> = {
    primary:
      "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500 dark:bg-purple-600 dark:hover:bg-purple-700",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
    outline:
      "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:border-gray-500",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400 dark:text-gray-300 dark:hover:bg-gray-800",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700",
    success:
      "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700",
  };
  return variants[props.variant];
});

const sizeClasses = computed(() => {
  const sizes: Record<Size, string> = {
    xs: "text-xs px-2 py-1",
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-2.5",
    xl: "text-lg px-6 py-3",
  };
  return sizes[props.size];
});

const roundedClasses = computed(() => {
  if (props.rounded) return "rounded-full";

  const roundedSizes: Record<Size, string> = {
    xs: "rounded",
    sm: "rounded-md",
    md: "rounded-lg",
    lg: "rounded-lg",
    xl: "rounded-xl",
  };
  return roundedSizes[props.size];
});

const disabledClasses = computed(() => {
  if (isDisabled.value) {
    return "opacity-50 cursor-not-allowed pointer-events-none";
  }
  return "cursor-pointer";
});

const blockClasses = computed(() => {
  return props.block ? "w-full" : "";
});

const buttonClasses = computed(() => {
  return [
    baseClasses,
    variantClasses.value,
    sizeClasses.value,
    roundedClasses.value,
    disabledClasses.value,
    blockClasses.value,
  ].join(" ");
});

const loaderSize = computed(() => {
  const sizes: Record<Size, string> = {
    xs: "w-3 h-3",
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
    xl: "w-6 h-6",
  };
  return sizes[props.size];
});

const handleClick = (event: MouseEvent) => {
  if (isDisabled.value) {
    event.preventDefault();
    return;
  }
  emit("click", event);
};
</script>

<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <!-- Loading Spinner -->
    <LoaderCircle v-if="loading" :class="['animate-spin', loaderSize]" />

    <!-- Button Content -->
    <span
      :class="{ 'opacity-0': loading && !$slots.default }"
      class="flex items-center justify-center"
    >
      <slot />
    </span>
  </button>
</template>

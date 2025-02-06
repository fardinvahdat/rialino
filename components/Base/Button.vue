<template>
    <button class="bg-primary-b1 text-white hover:bg-opacity-90 transition-all delay-100 rounded-md px-4 flex flex-nowrap items-center justify-center gap-1 py-2 text-base font-normal disabled:bg-opacity-30" :disabled="disabled">
        <slot />
    </button>
</template>

<script setup>
const props = defineProps({
    disabled: {
        default: false
    },
    loading: {
        default: false
    }
})
</script>
<template>
    <div class="text-3xl font-bold underline">
        {{ store.count }}
    </div>
</template>

<script setup>
import { useExampleStore } from '@/stores/example'

// access the `store` variable anywhere in the component ✨
const store = useExampleStore()
</script>
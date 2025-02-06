<template>
    <ul class="flex lg:flex-row flex-col">
        <li v-for="(item, index) in list" :key="index" class="md:p-0 py-3 lg:border-b-0 border-b-[1px]">
            <NuxtLink :to="item.route" class="pl-2 pr-2 py-1 text-gray-b4 text-base font-normal" :class="index !== 0 && 'lg:border-r-2'">{{ item.label }}</NuxtLink>
        </li>
    </ul>
</template>

<script setup>
const props = defineProps({
    list: {
        default: []
    }
})
</script>
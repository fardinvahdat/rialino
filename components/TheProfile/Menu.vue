<template>
    <main>
        <header class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <div
                    class="md:w-[70px] w-[40px] md:h-[70px] h-[40px] bg-primary-l1 rounded-full text-primary-b1 flex items-center justify-center border-2 border-primary-b1">
                    <Icon name="user" class="md:h-[40px] md:w-[40px] w-[25px] h-[25px]" v-if="!user?.user?.avatar" />
                    <img v-else :src="user?.user?.avatar" class="h-full w-full rounded-full" />
                </div>
                <div>
                    <h2 class="md:text-lg text-base font-medium">
                        {{ user?.user?.first_name }}
                        {{ user?.user?.last_name }}
                    </h2>
                </div>
            </div>
            <div>
                <p class="md:text-sm text-sm text-gray-b5 font-medium">
                    {{ user?.user?.email }}
                </p>
            </div>
        </header>
        <div class="my-6 h-10 bg-gray-b5 bg-opacity-5 border-[1px] border-gray-border rounded-xl px-4 flex items-center justify-between md:text-sm text-xs text-gray-b3"
            v-if="!user?.user?.avatar">عکس پروفایل خود را وارد کنید
            <NuxtLink class="text-primary-b1" @click="emits('close')" to="/profile">پروفایل</NuxtLink>
        </div>
        <ul class="grid gap-2">
            <li v-for="(item, index) in menu" :key="index" class="border-b-[1px] border-gray-border cursor-pointer">
                <NuxtLink @click="emits('close')"
                    class="py-3 md:text-sm text-xs flex items-center gap-3 hover:text-primary-b1" :to="item.path">
                    <Icon :name="item.icon" class="relative bottom-1" />{{ item.label }}
                </NuxtLink>
            </li>
        </ul>
    </main>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const store = useUserStore()
const { menu, user } = storeToRefs(store)

const emits = defineEmits(['close'])
</script>
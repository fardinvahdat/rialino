<template>
    <div class="py-10 bg-primary-l1">
        <footer class="md:w-[80%] w-[90%] mx-auto grid md:grid-cols-4 gap-4">
            <div class="flex flex-col justify-between gap-4">
                <Icon name="logo" />
                <p class="text-sm text-gray-b5 leading-6">{{ t('lorem_ipsum_short') }}</p>
                <ul class="flex items-center gap-2">
                    <li v-for="(item, index) in socialLinks" :key="index">
                        <Icon :name="item.icon" class="w-[30px] h-[30px]" />
                    </li>
                </ul>
            </div>
            <div>
                <h1 class="mb-4 text-xl font-bold">منو</h1>
                <ul class="h-full flex flex-col gap-2">
                    <li v-for="(item, index) in menu" :key="index" class="text-sm text-gray-b2">
                        <NuxtLink :to="item.route">{{ item.label }}</NuxtLink>
                    </li>
                </ul>
            </div>
            <div>
                <h1 class="mb-4 text-xl font-bold">منو</h1>
                <ul class="h-full flex flex-col gap-2">
                    <li v-for="(item, index) in menu" :key="index" class="text-sm text-gray-b2">
                        <NuxtLink :to="item.route">{{ item.label }}</NuxtLink>
                    </li>
                </ul>
            </div>
            <div>
                <h1 class="mb-4 text-xl font-bold">راتباط با ما</h1>
                <div class="flex flex-col gap-4">
                    <a :href="`phone:${t('support_number')}`" class="text-gray-b2 text-base flex items-center gap-2">
                        <Icon name="calling" class="relative bottom-1 h-[30px] w-[30px]" />
                        {{ t('support_number') }}
                    </a>
                    <a :href="`phone:${t('support_number')}`" class="text-gray-b2 text-base flex items-center gap-2">
                        <Icon name="support" class="relative bottom-1 h-[30px] w-[30px]" />
                        ارتباط با پشتیبانی
                    </a>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
const { t } = useI18n()
const socialLinks = [
    {
        icon: "instagram",
        link: ''
    }
]
const menu = ref([
    {
        label: t('landing'),
        route: "/"
    },
    {
        label: t('shops'),
        route: "/"
    },
    {
        label: t('services'),
        route: "/"
    },
    {
        label: t('about_us'),
        route: "/"
    },
    {
        label: t('contact_us'),
        route: "/"
    },
])
</script>
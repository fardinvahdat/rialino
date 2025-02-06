<template>
    <div class="grid md:grid-cols-2 md:gap-6 gap-2 bg-primary-l1 rounded-lg p-5 md:w-[80%] w-[90%] mx-auto mt-[-40px]">
        <div class="flex flex-col justify-evenly">
            <p class="md:text-base text-sm text-gray-b5">{{ t('direct_by_from_creator') }}</p>
            <h2 class="md:text-xl text-lg md:my-6 my-2 font-bold">{{ t('why_buy_from_amazon') }}</h2>
            <p class="md:text-base text-sm text-gray-b3 md:leading-10 leading-8">{{ t('lorem_ipsum_long') }}</p>
        </div>
        <div class="md:grid md:grid-cols-2 gap-2 max-w-full flex flex-nowrap overflow-x-auto">
            <div v-for="(item, index) in options" :key="index"
                class="md:rounded-lg rounded-md bg-gray-l3 md:p-5 p-2 md:min-w-[150px] min-w-[200px]">
                <div class="text-primary-b1 bg-primary-l1 p-2 rounded-md w-fit">
                    <Icon name="user" />
                </div>
                <h5 class="md:text-lg text-sm font-bold md:my-2 mt-1">{{ item.title }}</h5>
                <p class="md:text-sm text-xs md:my-2 text-gray-b5 leading-6">{{ item.description }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
const { t } = useI18n()
const options = [
    {
        icon: "user",
        title: t('lorem_ipsum_title'),
        description: t("lorem_ipsum_short")
    },
    {
        icon: "user",
        title: t('lorem_ipsum_title'),
        description: t("lorem_ipsum_short")
    },
    {
        icon: "user",
        title: t('lorem_ipsum_title'),
        description: t("lorem_ipsum_short")
    },
    {
        icon: "user",
        title: t('lorem_ipsum_title'),
        description: t("lorem_ipsum_short")
    },
]
</script>
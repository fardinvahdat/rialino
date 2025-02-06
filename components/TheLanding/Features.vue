<template>
    <div class="md:w-[80%] w-[90%] mx-auto mt-6 pb-10">
        <div v-for="(item, index) in options" :key="index" class="grid md:grid-cols-2 gap-2 mb-6">
            <div :class="index % 2 == 1 ? 'md:order-3' : 'md:order-1'">
                <img :src="item.image" class="lg:h-[330px] h-[250px] rounded-lg w-full object-cover" />
            </div>
            <div class="md:order-2">
                <p class="md:text-base text-sm text-gray-b5">{{ item.caption }}</p>
                <h2 class="md:text-xl text-base md:my-6 my-3 font-bold">{{ item.title }}</h2>
                <p class="md:text-base text-sm text-gray-b3 md:leading-10 leading-8">{{ item.description }}</p>
                <BaseButton class="mt-2">{{ t('more_info') }}
                    <Icon name="arrow-left" />
                </BaseButton>
            </div>
        </div>
    </div>
</template>

<script setup>
const { t } = useI18n()

const options = [
    {
        image: "/images/amazon-yellow.png",
        caption: t('buy_original_product_experience'),
        title: t('buy_from_shops'),
        description: t('lorem_ipsum_long'),
    },
    {
        image: "/images/buy.png",
        caption: t('direct_by_from_creator'),
        title: t('massive_buy_from_china'),
        description: t('lorem_ipsum_long'),
    },
]
</script>
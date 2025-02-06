<template>
    <div>
        <img src="/images/landing-hero.png" :alt="t('rialino')"
            class="lg:h-[400px] md:h-[300px] h-[250px] w-full lg:object-fill object-fill">
        <div
            class="rounded-lg p-5 md:w-[80%] w-[90%] bg-gray-l3 mx-auto shadow-lg border-[1px] relative lg:bottom-[70px] md:bottom-[90px] bottom-[100px]">
            <div class="grid md:grid-cols-2 md:gap-2 items-center">
                <div class="flex items-center gap-4 w-full">
                    <Icon :name="selectedOption?.icon || ''" class="md:h-[70px] h-[50px]" />
                    <p class="md:text-lg text-sm">{{ t('auto_order') }} {{ selectedOption?.name }}</p>
                </div>
                <div class="relative bg-gray-l4 w-full min-h-10 rounded-md flex items-center gap-2 p-2">
                    <select
                        class="w-[100px] bg-primary-l1 rounded-md p-1 outline-none text-primary-b1 md:text-base text-sm"
                        v-model="name">
                        <option v-for="(item, index) in list" :key="index" :value="item.name">{{ item.name }}</option>
                    </select>
                    <input v-model="url"
                        class="w-full border-none bg-transparent outline-none h-full md:text-base text-sm"
                        :placeholder="t('order_placeholder')" />
                    <button class="absolute left-2" @click="emits('search', {
            site_name: name,
            url
        })" :disabled="props.loading">
                        <Icon name="search" v-if="!props.loading" />
                        <BaseLoading class="py-2" v-else />
                    </button>
                </div>
            </div>
            <p class="lg:text-base text-sm text-gray-b3 mt-4 leading-7">{{ selectedOption?.description }}</p>
        </div>
    </div>
</template>

<script setup>
const { t } = useI18n()

const emits = defineEmits(['search'])

const props = defineProps({
    list: {
        default: []
    },
    name: {
        default: ''
    },
    loading: {
        default: false
    }
})

const name = ref(props.name)
const url = ref("")

const selectedOption = computed(() => {
    return props.list?.filter((opt) => opt.name == name.value)[0]
})

</script>
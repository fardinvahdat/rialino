<template>
    <div>
        <div class="rounded-lg my-2 md:w-[80%] w-[90%]  mx-auto">
            <div class="flex items-center gap-2">
                <div class="md:h-[70px] h-[50px]">
                    <Icon :name="selectedOption?.icon || ''" class="md:h-[70px] h-[50px]" />
                    <!-- <p class="md:text-lg text-sm w-max">{{ t('auto_order') }} {{ selectedOption?.name }}</p> -->
                </div>
                <form class="relative bg-gray-l3 w-full min-h-10 rounded-md flex items-center gap-2 p-2 shadow-md"
                    @submit.prevent="emits('search', {
                        site_name: name,
                        url
                    })">
                    <select
                        class="w-[100px] bg-primary-l1 rounded-md p-1 outline-none text-primary-b1 md:text-base text-sm"
                        v-model="name">
                        <option v-for="(item, index) in list" :key="index" :value="item.name">{{ item.name }}</option>
                    </select>
                    <input v-model="url"
                        class="w-full border-none bg-transparent outline-none h-full md:text-base text-sm text-left placeholder:text-right pl-10 "
                        :placeholder="t('order_placeholder')" />
                    <button class="absolute left-2" :disabled="props.loading">
                        <Icon name="search" v-if="!props.loading" />
                        <BaseLoading class="py-2" v-else />
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
const { t } = useI18n()
const route = useRoute()

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
    },
    url: {
        default: ''
    },
})

const name = ref('')
const url = ref('')

const selectedOption = computed(() => {
    return props.list?.filter((opt) => opt.name == name.value)[0] || [{
        icon: "amazon", name: "amazon"
    }]
})

onMounted(() => {
})
url.value = route.query.url
name.value = route.query.site_name

</script>
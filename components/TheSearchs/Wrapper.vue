<template>
    <div>
        <TheSearchsSearchBox :name="state.site_name" :url="state.url" :list="searachList" :loading="searchLoading"
            @search="handleSearch" />
        <div class="md:w-[80%] w-[90%] py-10 mx-auto">
            <section class="rounded-md bg-gray-l3 p-5 shadow-md">
                <template v-if="!searchLoading">
                    <div class="grid lg:grid-cols-4 col-span-2 gap-2 py-6">
                        <div class="col-span-3 grid md:grid-cols-2 gap-2 items-center">
                            <div>
                                <img :src="state.result.index_img" class="h-[300px] w-full rounded-md object-contain" />
                            </div>
                            <div class="h-full px-4">
                                <h1 class="text-lg mb-2 font-bold">قیمت و خرید هدست گیمینگ استریو BENGOO G9000 برای
                                    کنترلر PS4 PC Xbox One PS5(آبی)
                                </h1>
                                <p class="text-left text-sm text-gray-400">{{ state.result.title }}</p>
                                <el-divider class="!my-2" />
                                <p class="text-sm text-left">{{ state.result.description }}</p>
                            </div>
                        </div>
                        <div
                            class="md:col-span-1 col-span-2 border-[1px] border-gray-border p-5 rounded-md h-full flex flex-col gap-2 justify-between">
                            <div class="text-sm flex items-center gap-2">
                                <Icon name="document" /> محاسبه قیمت
                            </div>
                            <div class="flex items-center justify-between text-sm text-gray-b6">
                                <span>قیمت کالا به دلار</span>
                                <span class="text-gray-b2">{{ state.result.price }}</span>
                            </div>
                            <div class="flex items-center justify-between text-sm text-gray-b6">
                                <span>قیمت کالا به تومان</span>
                                <span class="text-gray-b2">{{ new Intl.NumberFormat('fa-IR').format(
            state.result.toman_price,
        ) }}</span>
                            </div>
                            <el-divider class="!my-2" />
                            <div class="flex items-center justify-between text-sm text-gray-b6">
                                <span>نوع ارسال</span>
                            </div>
                            <ClientOnly>
                                <el-radio-group v-model="shippingType" class="gap-2 w-full">
                                    <el-radio v-for="(item, index) in shippings" :key="index" :value="item.value"
                                        class="gap-2 w-full border-[1px] px-2 min-h-10 text-sm rounded-md">{{ item.label
                                        }}</el-radio>
                                </el-radio-group>
                            </ClientOnly>
                            <BaseButton class="text-sm mt-2" @click="handleAddToCart" :disabled="isAddToCartLoading">
                                <template v-if="!isAddToCartLoading">
                                    <Icon name="shopping-cart" /> افزونه به سبد خرید
                                </template>
                                <template v-else>
                                    <BaseLoading color="#fff" class="h-6 w-6" />
                                </template>
                            </BaseButton>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <TheSearchsSkeleton />
                </template>
            </section>
        </div>
    </div>
</template>

<script setup>
import { ElNotification } from 'element-plus'
import { useUserStore } from '@/stores/user'
const store = useUserStore()
const { user } = storeToRefs(store)

const state = ref({
    url: '',
    site_name: '',
    result: {
        id: "abbea579-a7df-4dcc-944e-2db710fa8f41",
        title: "Gaming Chairs Computer Gaming Chairs, Reclining Gamer Chair Ergonomic Office Chair Computer Desk Chair，with Neck Pillow Adjustable Armrests Office Chair (Grey)",
        description: "Gaming Chairs Computer Gaming Chairs, Reclining Gamer Chair Ergonomic Office Chair Computer Desk Chair，with Neck Pillow Adjustable Armrests Office Chair (Grey)",
        index_img: "https://m.media-amazon.com/images/I/51eTEJaqDuL.__AC_SX300_SY300_QL70_ML2_.jpg",
        price: "85.00",
        toman_price: 7140000,
        currency_type: "USD",
        source_type: "amazon",
        tax: 714000
    }
})
const searachList = ref(null)
const searchLoading = ref(true)
const shippingType = ref('')
const shippings = [
    {
        value: 1,
        label: "دریایی ( ۴ الی ۸ هفته کاری )"
    },
    {
        value: 2,
        label: "هوایی ( ۲ الی ۴ هفته کاری )"
    },
]

const route = useRoute()
const router = useRouter()
const isAddToCartLoading = ref(false)
const token = useCookie('token')


onMounted(async () => {
    state.value.url = route.query.url
    state.value.site_name = route.query.site_name
    handleSearch(state.value)
    const config = useRuntimeConfig()
    try {
        const data = await $fetch(`${config.public.baseURL}home`);
        searachList.value = data.data.search.sites
    } catch (error) {
        console.log(error);
    }
})

const handleSearch = async (e) => {
    router.replace({
        query: {
            url: e.url,
            site_name: e.site_name
        }
    })
    if (e.url) {
        searchLoading.value = true
        try {
            // Call the server API route
            const response = await $fetch('/api/search', {
                method: 'POST',
                body: {
                    url: e.url,
                    site_name: e.site_name
                },
            });

            // Handle the response
            ElNotification({
                title: '',
                message: response.message,
                type: 'success',
            })
        } catch (err) {
            console.log('error', err)
            ElNotification({
                title: 'ناموفق',
                message: err.data?.data.message || 'Search failed',
                type: 'error',
            })
        } finally {
            searchLoading.value = false
        }
    }
}
const handleAddToCart = async () => {
    if (!user.value) return
    isAddToCartLoading.value = true
    try {
        // Call the server API route
        const response = await $fetch('/api/add-to-cart', {
            method: 'POST',
            body: {
                id: state.value.result.id,
                source_type: state.value.result.source_type,
                description: ''
            },
        });

        await getUserData(token.value)

        // Handle the response
        ElNotification({
            title: '',
            message: response.message,
            type: 'success',
        })

    } catch (err) {
        console.log('error', err)
        ElNotification({
            title: 'ناموفق',
            message: err.data?.data.message || 'add To Cart failed',
            type: 'error',
        })
    } finally {
        isAddToCartLoading.value = false
    }
}
</script>
<style>
.el-radio-group .el-radio {
    margin: 0
}

.el-radio__input.is-checked+.el-radio__label {
    color: #1A70FF
}

.el-radio__input.is-checked .el-radio__inner {
    background-color: #1A70FF;
    border-color: #1A70FF;
}
</style>
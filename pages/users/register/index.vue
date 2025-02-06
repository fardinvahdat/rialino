<template>
    <div class="h-screen flex items-center justify-center px-2">
        <div
            class="max-w-[480px] w-full rounded-md border-[1px] border-gray-border py-12 px-8 flex flex-col gap-12 items-center bg-white">
            <h1 class="h-[46px] flex items-center">Logo</h1>
            <form class="flex flex-col gap-8" @submit.prevent="handleLogin">
                <h2 class="font-bold text-2xl">ثبت نام</h2>
                <div class="flex flex-col gap-3">
                    <div>
                        <label class="text-sm text-gray-b4">لطفا نام خود را وارد کنید <span
                                class="text-red-600">*</span></label>
                        <input v-model="state.first_name" type="text" placeholder="مثلا: رضا"
                            class="w-full py-[10px] px-3 mt-1 text-right rounded-md border-[1px] outline-none focus:border-black text-base" />
                    </div>
                    <div>
                        <label class="text-sm text-gray-b4">لطفا نام خانوادگی خود را وارد کنید <span
                                class="text-red-600">*</span></label>
                        <input v-model="state.last_name" type="text" placeholder="مثلا: ابراهیمی"
                            class="w-full py-[10px] px-3 mt-1 text-right rounded-md border-[1px] outline-none focus:border-black text-base" />
                    </div>
                    <div>
                        <label class="text-sm text-gray-b4">لطفا ایمیل خود را وارد کنید <span
                                class="text-red-600">*</span></label>
                        <input v-model="state.email" type="email" :placeholder="`test@${t('rialino')}.com`"
                            class="w-full py-[10px] px-3 mt-1 text-right rounded-md border-[1px] outline-none focus:border-black text-base" />
                    </div>
                </div>
                <BaseButton :disabled="isLoading || (!state.first_name || !state.last_name || !state.email)">
                    {{ !isLoading ? 'تایید' : 'منتظر بمانید...' }}
                </BaseButton>
            </form>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'custom'
})
import { ElNotification } from 'element-plus'
const { t } = useI18n()
const token = useCookie('token')

const state = ref({
    first_name: "",
    last_name: "",
    email: ""
})
const isLoading = ref(false)


const handleLogin = async () => {
    isLoading.value = true

    //fetch api
    try {
        // Call the server API route
        const response = await $fetch('/api/update-profile', {
            method: 'POST',
            body: { ...state.value, token: token.value },
        });

        // Handle the response
        console.log('Login response:', response);
        ElNotification({
            title: 'موفق',
            message: response.message,
            type: 'success',
        })
        navigateTo('/')
    } catch (err) {
        ElNotification({
            title: 'ناموفق',
            message: err.data?.data.message || 'Login failed',
            type: 'error',
        })
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    console.log(token.value);
})
</script>
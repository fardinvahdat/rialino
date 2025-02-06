<template>
    <div class="h-screen flex items-center justify-center px-2">
        <div
            class="max-w-[480px] w-full rounded-md border-[1px] border-gray-border py-12 px-8 flex flex-col gap-12 items-center bg-white">
            <h1 class="h-[46px] flex items-center">Logo</h1>
            <form class="flex flex-col gap-8 w-full" @submit.prevent="handleCheckOTP">
                <h2 class="font-bold text-2xl">کد تایید را وارد کنید</h2>
                <div class="flex flex-col gap-8">
                    <p class="text-sm text-gray-b2">برای ساخت حساب جدید، کد پیامک‌ شده به شمارۀ «{{ number }}» را
                        وارد کنید. <NuxtLink to="/users/login" class="text-primary-b1 font-bold">تغییر شماره</NuxtLink>
                    </p>
                    <BaseOtpInput v-model="otp" :length="6" @complete="handleOtpComplete" />
                </div>
                <button
                    class="flex justify-center items-center gap-1 text-sm text-gray-b1 cursor-pointer disabled:text-gray-b5 disabled:cursor-wait"
                    :disabled="!isResendAllowed" type="button" @click="handleLogin()">
                    <template v-if="!isResendAllowed">
                        <el-countdown format="mm:ss" :value="expired_at" />
                        <p>مانده تا دریافت مجدد کد</p>
                    </template>
                    <template v-else>
                        <p v-if="!isResendCodeLoading">دریافت مجدد کد</p>
                        <BaseLoading class="py-2" v-else />
                    </template>
                </button>
                <BaseButton :disabled="isLoading || ('' + otp).length !== 6">
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
const number = ref('')
const otp = ref('');
const isLoading = ref(false)
const isResendCodeLoading = ref(false)
const token = useCookie('token')
const remainingTimeToResend = ref(Date.now() + 1000 * 60)
const isResendAllowed = ref(true)
const expired_at = ref('')


onMounted(() => {
    const userData = sessionStorage.getItem('user');
    if (JSON.parse(userData)?.number) {
        number.value = JSON.parse(userData).number
        expired_at.value = (JSON.parse(userData).expired_at)
        expired_at.value > new Date() ? (isResendAllowed.value = false, setTimeout(() => {
            isResendAllowed.value = true
        }, expired_at.value - new Date())) : isResendAllowed.value = true
    } else {
        navigateTo('/users/login')
    }
})

//1738495997834
//1738495795000

const handleOtpComplete = async (value) => {
    otp.value = value
    handleCheckOTP()
};

const handleCheckOTP = async () => {
    isLoading.value = true
    try {
        // Call the server API route
        const response = await $fetch('/api/check-otp', {
            method: 'POST',
            body: {
                mobile: number.value,
                otp: otp.value
            },
        });

        // Handle the response
        console.log('Login response:', response);
        token.value = response.data.token
        if (!response.data.user.first_name || !response.data.user.last_name || !response.data.user.email) {
            navigateTo('/users/register')
        } else {
            ElNotification({
                title: 'موفق',
                message: response.message,
                type: 'success',
            })
            navigateTo('/')
        }
    } catch (err) {
        debugger
        ElNotification({
            title: 'ناموفق',
            message: err?.data?.data.message || ' failed',
            type: 'error',
        })
        console.log(err)
    } finally {
        isLoading.value = false
    }
}


const handleLogin = async () => {
    debugger
    if (!isResendAllowed.value) return
    isResendCodeLoading.value = true

    //fetch api
    try {
        // Call the server API route
        const response = await $fetch('/api/login', {
            method: 'POST',
            body: {
                mobile: number.value,
            },
        });

        // Handle the response
        console.log('Login response:', response);
        ElNotification({
            title: '',
            message: response.message,
            type: 'success',
        })
        const user = {
            number: number.value,
            expired_at: Date.now() + 1000 * (+response.data.expired_at_second)
        }
        sessionStorage.setItem('user', JSON.stringify(user));
        expired_at.value = Date.now() + 1000 * (+response.data.expired_at_second)
        isResendAllowed.value = false
        setTimeout(() => {
            isResendAllowed.value = true
        }, expired_at.value - new Date());
    } catch (err) {
        debugger
        console.log('error', err)
        ElNotification({
            title: 'ناموفق',
            message: err.data?.data.message || 'Login failed',
            type: 'error',
        })
    } finally {
        isResendCodeLoading.value = false
    }
}
</script>
<style>
.el-statistic__content {
    color: inherit !important;
    font-size: inherit !important;
    ;
}
</style>
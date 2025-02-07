<template>
    <div class="h-screen flex items-center justify-center px-2">
        <div
            class="max-w-[480px] w-full rounded-md border-[1px] border-gray-border py-12 px-8 flex flex-col gap-12 items-center bg-white">
            <h1 class="h-[46px] flex items-center">Logo</h1>
            <form class="flex flex-col gap-8" @submit.prevent="handleLogin">
                <h2 class="font-bold text-2xl">ورود</h2>
                <div>
                    <label class="text-sm text-gray-b4">لطفا شماره موبایل خود را وارد کنید</label>
                    <input v-model="number" type="text" placeholder="مثلا: ۰۹۱۲۱۲۳۴۵۶۷"
                        @change="errorMessageNumber && isInputValid"
                        class="w-full py-[10px] px-3 mt-1 placeholder:text-right rounded-md border-[1px] outline-none focus:border-black text-base" />
                    <p class="text-xs text-red-600" v-if="errorMessageNumber">{{ errorMessageNumber }}</p>
                </div>
                <BaseButton :disabled="isLoading">
                    {{ !isLoading ? 'ادامه' : 'منتظر بمانید...' }}
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
const number = ref(null)
const errorMessageNumber = ref('')
const isLoading = ref(false)

const isInputValid = computed(() => {
    if (!number.value) {
        errorMessageNumber.value = 'وارد کردن شماره الزامیست.'
        return false
    } else if (!(number.value + '').startsWith('09')) {
        errorMessageNumber.value = "شماره وارد شده معتبر نمی باشد(شماره وارد شده باید با ۰۹ شروع شود)"
        return false
    } else if ((number.value + '').length !== 11) {
        errorMessageNumber.value = "شماره وارد شده معتبر نمی باشد."
        return false
    } else {
        errorMessageNumber.value = ''
        return true
    }
})

const handleLogin = async () => {
    if (!isInputValid.value) return
    const userData = sessionStorage.getItem('user');
    if (JSON.parse(userData) && JSON.parse(userData)?.number == number.value) {
        let remainTime = (JSON.parse(userData).expired_at - new Date()) / 1000
        if (remainTime > 1) {
            ElNotification({
                title: 'ناموفق',
                message: `کد تایید قبلا برای شما ارسال شده است, مدت زمان باقیمانده تا ارسال مجدد کد ${Math.round(remainTime)} ثانیه است`,
                type: 'error',
            })
            return
        }
    }
    isLoading.value = true

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
        navigateTo('/users/otp')
    } catch (err) {
        console.log('error', err)
        ElNotification({
            title: 'ناموفق',
            message: err.data?.data.message || 'Login failed',
            type: 'error',
        })
    } finally {
        isLoading.value = false
    }
}
</script>
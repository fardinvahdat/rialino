<template>
    <div class="my-10 flex items-center justify-center px-2">
        <div
            class="max-w-[480px] w-full rounded-md border-[1px] border-gray-border py-12 px-8 flex flex-col gap-12 items-center bg-white">

            <div class="md:w-[70px] w-[40px] md:h-[70px] h-[40px] bg-primary-l1 rounded-full text-primary-b1 flex items-center justify-center border-2 border-primary-b1"
                @click="avatarRef.click()">
                <template v-if="!isAvatarLoading">
                    <Icon name="user" class="md:h-[40px] md:w-[40px] w-[25px] h-[25px]" v-if="!user?.user.avatar" />
                    <img v-else :src="user?.user.avatar" class="h-full w-full rounded-full" />
                </template>
                <template v-else>
                    <BaseLoading />
                </template>
                <input ref="avatarRef" accept=".png,.jpg,.jpeg,.webp" type="file" hidden @change="handleUploadAvatar">
            </div>
            <form class="flex flex-col gap-8" @submit.prevent="handleUpdateProfile">
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
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const store = useUserStore()
const { user } = storeToRefs(store)

import { ElNotification } from 'element-plus'
const { t } = useI18n()
const token = useCookie('token')

const state = ref({
    first_name: "",
    last_name: "",
    email: "",
    avatar: ''
})
const isLoading = ref(false)
const isAvatarLoading = ref(false)
const avatarRef = ref(null)



const getInfo = () => {
    state.value.first_name = user.value?.user.first_name || ''
    state.value.last_name = user.value?.user.last_name || ''
    state.value.email = user.value?.user.email || ''
    state.value.avatar = user.value?.user.avatar || ''
}
const handleUpdateProfile = async () => {
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
const handleUploadAvatar = async (e) => {
    if (!e.target.files.length) return
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    formData.append('type', 'purchase')

    isAvatarLoading.value = true

    //fetch api
    try {
        // Call the server API route
        const response = await $fetch('/api/upload-file', {
            method: 'POST',
            body: formData,
        });

        try {
            // Call the server API route
            const responseUpdate = await $fetch('/api/update-avatar', {
                method: 'POST',
                body: {
                    file_id: response.data.id
                },
            });

            // Handle the response
            ElNotification({
                title: 'موفق',
                message: responseUpdate.message,
                type: 'success',
            })
        } catch (error) {
            ElNotification({
                title: 'ناموفق',
                message: error.data?.data.message || 'Update failed',
                type: 'error',
            })
        }
    } catch (err) {
        console.log(err);
        ElNotification({
            title: 'ناموفق',
            message: err.data?.data.message || 'Upload failed',
            type: 'error',
        })
    } finally {
        isAvatarLoading.value = false
    }
}



onMounted(() => {
    getInfo()
})

watch(() => user.value, (newVal) => {
    getInfo()
})
</script>
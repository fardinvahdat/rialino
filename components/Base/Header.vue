<template>
    <header class="sticky top-0 w-full  z-40 bg-gray-l3 shadow-md">
        <section class="md:w-[80%] w-[90%] mx-auto ">
            <div class="h-[80px] flex items-center justify-between py-1 bg-gray-l3">


                <div class="w-full flex items-center gap-6">
                    <button class="lg:hidden" @click="menuCollapse = true">
                        <Icon name="menu" />
                    </button>
                    <nuxtLink to="/" class="lg:inline-block hidden">
                        <Icon name="logo" />
                    </nuxtLink>
                    <div class="transition-all delay-100 lg:relative absolute lg:right-0 right-[-150%] lg:shadow-none lg:h-auto top-0 lg:p-0 lg:w-auto w-[80%] p-5 z-50 h-screen"
                        :class="(isMobile && menuCollapse) && '!right-0 !bg-white !w-full'">
                        <button class="lg:hidden absolute left-4" @click="menuCollapse = false">
                            <Icon name="close" />
                        </button>
                        <BaseMenu :list="menu" />
                    </div>
                </div>


                <NuxtLink to="/" class="lg:hidden w-full">
                    <Icon name="logo" />
                </NuxtLink>

                <div class="max-w-[33%] w-full flex items-center justify-end gap-2">
                    <div class="flex items-center gap-1 lg:text-primary-b1 text-gray-b2">
                        <div class="lg:flex flex-col justify-start hidden">
                            <a :href="`phone:${t('support_number')}`" class="text-gray-b2 font-semibold text-base">{{
                                t('support_number') }}</a>
                            <span class="text-gray-b2 font-normal text-sm block text-left">{{ t('support') }}</span>
                        </div>
                    </div>
                    <NuxtLink to="/users/login" v-if="!user">
                        <BaseButton class="h-fit lg:bg-primary-b1 bg-transparent lg:!text-gray-l3 !text-gray-b2"
                            v-if="!isLoading">
                            <Icon name="user" /><span class="lg:inline hidden">{{ t('login_register') }}</span>
                        </BaseButton>
                        <BaseLoading v-else />
                    </NuxtLink>
                    <button v-else
                        class="text-primary-b1 flex items-center justify-center gap-2 hover:bg-gray-100 p-1 rounded-md"
                        @click="drawer = true">
                        <div class="bg-primary-l1 rounded-full w-10 h-10 flex items-center justify-center">
                            <Icon name="user" />
                        </div>
                        <Icon name="angle-down" />
                    </button>
                </div>
            </div>
        </section>
    </header>
    <el-drawer v-model="drawer" direction="ltr" :size="isMobile ? 300 : 450">
        <template #header>
        </template>
        <template #default>
            <theProfileMenu :user="user" @close="drawer = false" />
        </template>
        <template #footer>
            <div class="w-full border-t-2 pt-4">
                <button class="py-2 flex items-center gap-1 text-gray-b4 md:text-base text-sm" @click="handleExit">
                    <Icon name="exit" /> خروج
                </button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup>
import { ElMessageBox, ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
const { t } = useI18n()
const token = useCookie('token')
const store = useUserStore()
const { user } = storeToRefs(store)
const isLoading = ref(true)
const drawer = ref(false)
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
const menuCollapse = ref(false)
const isMobile = computed(() => {
    if (process.client) {
        return windowWidth.value < 1024
    }
})
const windowWidth = ref(0);
// Function to update the window width
const updateWindowWidth = () => {
    windowWidth.value = window.innerWidth;
};

// Remove event listener when the component is unmounted
onUnmounted(() => {
    window.removeEventListener('resize', updateWindowWidth);
});
const handleExit = () => {
    ElMessageBox.confirm('میخواهید خارج شوید؟', '', {
        confirmButtonText: 'بله',
        cancelButtonText: 'انصراف',
        type: 'warning',
    })
        .then(() => {
            drawer.value = false
            ElMessage({
                type: 'success',
                message: 'با موفقیت خارج شدید',
            })
            setTimeout(() => {
                token.value = ""
                user.value = null
            }, 1000);
        })
        .catch(() => {
            // catch error
        })

}
onMounted(async () => {
    if (token.value) {
        isLoading.value = true
        await getUserData(token.value)
    } else {
        isLoading.value = false
    }
    windowWidth.value = window.innerWidth
    window.addEventListener('resize', updateWindowWidth);
})
</script>
<style>
.el-message-box__header.show-close {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 30px !important;
}

.el-message-box__btns {
    display: flex;
    justify-content: center;
    flex-direction: row-reverse
}

.el-message-box__btns .el-button--primary {
    background-color: #1A70FF;
    border-color: #1A70FF;
    font-size: 12px;
}
</style>
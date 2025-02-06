<template>
    <div>
        <TheLandingHero v-if="siteName" :name="siteName" :list="searachList" :loading="searchLoading"
            @search="handleSearch" />
        <TheLandingWhyRialino />
        <TheLandingFeatures />
    </div>
</template>

<script setup>
const searachList = ref(null)
const siteName = ref('')
const searchLoading = ref(false)
const router = useRouter()



const handleSearch = (e) => {
    searchLoading.value = true
    router.replace({
        path: `/search`,
        query: {
            url: e.url,
            site_name: e.site_name
        }
    })
}

onMounted(async () => {
    const config = useRuntimeConfig()
    try {
        const data = await $fetch(`${config.public.baseURL}home`);
        searachList.value = data.data.search.sites
        siteName.value = searachList.value[0].name
    } catch (error) {
        console.log(error);
    }
})
</script>
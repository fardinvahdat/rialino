<template>
    <div class="grid lg:grid-cols-3 col-span-2 gap-2 py-6">
        <div class="col-span-2 grid md:grid-cols-2 gap-2 items-center">
            <div>
                <el-skeleton animated>
                    <template #template>
                        <el-skeleton-item variant="image" style="height: 300px;border-radius: 5px;" />
                    </template>
                </el-skeleton>
            </div>
            <div class="h-full">
                <el-skeleton animated>
                    <template #template>
                        <div class="h-full flex flex-col justify-between">
                            <el-skeleton-item variant="text" style="height: 30px" />
                            <el-skeleton-item variant="text" style="height: 30px" />
                            <ElDivider class="!my-4" />
                            <el-skeleton-item variant="text" style="height: 30px" />
                            <el-skeleton-item variant="text" style="height: 30px" />
                            <el-skeleton-item variant="text" style="height: 30px" />
                            <el-skeleton-item variant="text" style="height: 30px" />
                        </div>
                    </template>
                </el-skeleton>
            </div>
        </div>
        <div class="md:col-span-1 col-span-2 border-[1px] border-gray-border p-5 rounded-md h-full">
            <el-skeleton animated>
                <template #template>
                    <div class="flex flex-col justify-between h-full">
                        <div class="flex items-center justify-between gap-2">
                            <el-skeleton-item variant="text" style="height: 30px;max-width: 80px;" />
                            <el-skeleton-item variant="text" style="height: 30px;max-width: 80px;" />
                        </div>
                        <div class="flex items-center justify-between gap-2">
                            <el-skeleton-item variant="text" style="height: 30px;max-width: 80px;" />
                            <el-skeleton-item variant="text" style="height: 30px;max-width: 80px;" />
                        </div>
                        <ElDivider class="!my-2" />
                        <el-skeleton-item variant="text" style="height: 30px" />
                        <el-skeleton-item variant="text" style="height: 30px" />
                        <ElDivider class="!my-2" />

                        <div class="flex items-center justify-between gap-2">
                            <el-skeleton-item variant="text" style="height: 30px;max-width: 80px;" />
                            <el-skeleton-item variant="text" style="height: 30px;max-width: 80px;" />
                        </div>
                        <div class="flex items-center justify-between gap-2">
                            <el-skeleton-item variant="text" style="height: 30px;max-width: 80px;" />
                            <el-skeleton-item variant="text" style="height: 30px;max-width: 80px;" />
                        </div>
                    </div>
                </template>
            </el-skeleton>
        </div>
    </div>
</template>

<script setup>

</script>
<style scoped>
.el-skeleton {
    height: 100%;
}
</style>
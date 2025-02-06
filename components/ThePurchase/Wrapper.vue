<template>
    <div class="w-[90%] md:w-[80%] mx-auto my-10 md:p-5 p-3 bg-gray-l3 rounded-lg shadow-md">
        <h1 class="lg:text-xl md:text-lg text-base text-gray-b2 font-bold">ثبت درخواست خرید</h1>

        <form @submit.prevent="handlePurchase" class="grid md:grid-cols-2 grid-cols-1 gap-8 mt-10">
            <div class="grid gap-4">
                <div>
                    <label class="text-sm text-gray-b4">عنوان <span class="text-red-600">*</span></label>
                    <input v-model="state.title" type="text" placeholder="مثلا: صندلی گیمینگ"
                        class="w-full py-[10px] h-[53px] px-3 mt-1  rounded-md bg-gray-l4 border-[1px] outline-none focus:border-black text-base"
                        :class="isValidationEnabaled && !state.title && 'border-red-600'" />
                </div>
                <div>
                    <label class="text-sm text-gray-b4">توضیحات <span class="text-red-600">*</span></label>
                    <textarea v-model="state.content" cols="30" rows="10"
                        placeholder="لطفا در مورد جزئیات محصول توضیح دهید"
                        class="w-full py-[10px] px-3 mt-1 rounded-md bg-gray-l4 border-[1px] outline-none focus:border-black text-base"
                        :class="isValidationEnabaled && !state.content && 'border-red-600'"></textarea>
                </div>
            </div>
            <div class="flex items-center bg-gray-l4 rounded-lg p-5">
                <el-upload v-model:file-list="fileList" drag class="grid md:grid-cols-2 h-full w-full max-h-[300px]"
                    multiple :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove"
                    list-type="picture">
                    <div class="w-full h-full order-1 rounded-lg flex items-center justify-center flex-col gap-2">
                        <Icon name="upload" />
                        <p class="text-gray-b2 md:text-base text-sm text-center">برای آپلود فایل کلیک کنید یا فایل را
                            بکشید</p>
                    </div>
                </el-upload>
            </div>
            <div class="md:col-span-2 flex items-center justify-center">
                <BaseButton class="px-10">ارسال</BaseButton>
            </div>
        </form>
    </div>
</template>

<script setup>
const fileList = ref([
    {
        name: 'lorem picsum',
        url: 'https://picsum.photos/200/200',
    },
    {
        name: 'lorem picsum',
        url: 'https://picsum.photos/200/200',
    },
    {
        name: 'lorem picsum',
        url: 'https://picsum.photos/200/200',
    },
])
const state = ref({
    title: '',
    content: '',
    goods_type: '',
    count: 1,
    files: []
})
const isValidationEnabaled = ref(false)
const handlePurchase = () => {
    isValidationEnabaled.value = true
}

const handleRemove = (file, uploadFiles) => {
    console.log(file, uploadFiles)
}

const handlePreview = (uploadFile) => {
    console.log(uploadFile)
}


const beforeRemove = (uploadFile, uploadFiles) => {

}
</script>
<style>
.el-upload-dragger {
    border-radius: 15px;
    height: 100%;
    max-height: 250px;
}

.el-upload {
    padding-right: 8px;
    height: 100%;
    width: 100%;
    order: 2;
    display: flex !important;
    align-items: center;
    justify-content: center;
}

.el-upload-list {
    /* max-height: 250px; */
    overflow-y: auto;
}

@media (max-width:768px) {
    .el-upload {
        order: unset;
    }

}

.el-upload-list__item .el-icon--close {
    right: unset !important;
    left: 5px;
}

.el-icon--close-tip {
    display: none !important;
}

.el-upload-list__item {
    border-radius: 15px !important
}

.el-upload-list__item-status-label {
    z-index: 9;
}

.el-upload-list__item-thumbnail {
    border-radius: 5px
}
</style>
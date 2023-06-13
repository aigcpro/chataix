<template>
    <clientOnly>
        <section class="relative py-20 2xl:py-40 overflow-hidden" style="height: 100vh">
            <img class="hidden md:block absolute top-0 right-0 -mr-96 -mt-112" src="~/assets/images/circle.svg" alt="">
            <img class="absolute top-0 right-0 h-40 lg:h-80 lg:mr-64 lg:mt-24" src="~/assets/images/stars-dark.svg" alt="">
            <img class="hidden lg:block absolute top-0 left-0 h-64 -ml-10" src="~/assets/images/blue-double-circle.svg" alt="">
            <img class="absolute bottom-0 left-0 h-80" src="~/assets/images/light-double-circle.svg" alt="">
            <div class="relative container px-4 mx-auto">
                <div class="max-w-3xl mx-auto">
                    <div class="max-w-xl">

                        <h2 class="mt-12 mb-14 text-5xl font-bold font-heading">{{ error.statusCode }}</h2>
                        <p class="mb-20 text-xl text-gray-500">{{ error.message }}</p>
                        <div  class="cursor-pointer inline-block px-12 py-4 text-lg bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition duration-200" @click="handleError">返回首页</div>
                    </div>
                </div>
            </div>
        </section>
    </clientOnly>
</template>
<script lang="ts" setup>
/**
 * 接收错误信息
 */
const props = defineProps({
    error: {
        type: Object,
        required: true
    }
})
/**
 * 清除错误信息并返回首页
 */
const handleError = () => {
    clearError({ redirect: '/' })
}
</script>

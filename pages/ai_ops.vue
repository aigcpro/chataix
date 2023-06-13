<template>
    <main class="main overflow-auto ai-app" id="iframe">

    <iframe
        id="iframeContain"
        name="iframeContain"
        seamless
        scrolling="yes"
        src="https://ops.chataix.top/apps/ops/"
      >
        您当前的浏览器不支持页面上的功能，请升级您当前的浏览器版本或使用谷歌浏览器访问当前页面
     </iframe>
    </main>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useCounter} from '~/store/counter'
import {ElMessage} from 'element-plus'
    const token = useCookie('token')
    if (!token.value) {
        ElMessage.error('请先登录');
        navigateTo('/');
    }
</script>

<style>
.w-100-svg svg{
    width: 100%;
}
.is_like{
    fill: #409eff;
    stroke: #409eff;
}
iframe{ width: 100%; height: 900px; }
</style>

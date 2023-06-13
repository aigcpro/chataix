<template>
    <main class="main overflow-auto ai-app">
    <iframe
        id="ai_shop"
        name="iframeContain"
        seamless
        scrolling="yes"
        :src="counter.setting.buy_card"
      >
        您当前的浏览器不支持页面上的功能，请升级您当前的浏览器版本或使用谷歌浏览器访问当前页面
     </iframe>
    </main>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {ElMessage} from 'element-plus'
import { useCounter } from '~/store/counter'
const counter = useCounter()
</script>

<style>
.w-100-svg svg{
    width: 100%;
}
.is_like{
    fill: #409eff;
    stroke: #409eff;
}
#ai_shop{
    width: 100%;
    height: 1000px;
}
</style>

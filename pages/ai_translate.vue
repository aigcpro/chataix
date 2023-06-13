<template>
    <main class="main overflow-auto ai-app" >
    <iframe
        id="ai_translate"
        name="iframeContain"
        seamless
        scrolling="yes"
        src="https://translate.chataix.top"
      >
        您当前的浏览器不支持页面上的功能，请升级您当前的浏览器版本或使用谷歌浏览器访问当前页面
     </iframe>
    </main>
<!--      <Login :login_dialog="login_dialog" @handleCancel="handleCancel"/>-->
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useCounter} from '~/store/counter'
import {ElMessage} from 'element-plus'
const token = useCookie('user_info')
const login_dialog = ref(false)
console.log(token)
// const handleCancel = () => {
//     login_dialog.value = false
// }
// if(!token){
// login_dialog.value = false
//     console.log("登录")
// }else{
//     login_dialog.value = true
//     console.log("未登录")
// }
</script>

<style>
.w-100-svg svg{
    width: 100%;
}
.is_like{
    fill: #409eff;
}#ai_translate{ width: 100%; height: 900px; }
</style>

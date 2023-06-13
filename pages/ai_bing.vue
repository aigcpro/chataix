<template>
   <main class="main overflow-auto ai-app">

    <div v-if="me_vip">
        <iframe
        id="bing"
        name="iframeContain"
        seamless
        scrolling="yes"
        src="https://bing.chataix.top"
      >
        您当前的浏览器不支持页面上的功能，请升级您当前的浏览器版本或使用谷歌浏览器访问当前页面
     </iframe>
    </div>
       <p  v-else class="vip_test">无权限访问，请到个人中心订阅会员</p>
   </main>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useCounter} from '~/store/counter'
import {ElMessage} from 'element-plus'
const token = useCookie('token')
const me_vip = ref({})
const aotu_url = ref({})
    if (!token.value) {
        ElMessage.error('请先登录');
        navigateTo('/');
    }else{

    }
const now_user = () =>{
    get_user().then((res:any) => {
        if(res._rawValue.vip==null){
            me_vip.value=res._rawValue.vip
        }
    }).catch((err:any) => {
         navigateTo('/');
    })
}
now_user()
</script>
<style>
.w-100-svg svg{
    width: 100%;
}
.is_like{
    fill: #409eff;
    stroke: #409eff;
}
.ek_vip{
    width: 100%; height: 937px;
}
.vip_test{
    font-size: 2rem;
    text-align: center;
    margin: 0 auto;
    position: relative;
    top:40%;
    z-index: 9999;
}

#bing{ width: 100%; height: 937px; }
</style>

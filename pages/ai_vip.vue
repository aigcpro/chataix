<template>
    <main class="main overflow-auto ai-app aotugpt">
        <p class="aotugpt_test">请在个人中心购买VIP会员后使用</p>
    </main>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {useCounter} from '~/store/counter'
import {ElMessage} from 'element-plus'
</script>
<style>
.aotugpt_test{
    font-size: 2rem;
    text-align: center;
    margin: 0 auto;
    position: relative;
    top:40%;
}
.aotugpt{
    width: 100%;
    height: 937px;
}
</style>

import ElementPlus from 'element-plus'
import { ID_INJECTION_KEY } from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

export default defineNuxtPlugin( nuxtApp => {
    nuxtApp.vueApp.use(ElementPlus, {
        locale: zhCn,
    })
    nuxtApp.vueApp.provide(ID_INJECTION_KEY,{
        prefix: Math.floor(Math.random() * 10000),
        current: 0,
    })
    for (const key in ElementPlusIconsVue) {
        // @ts-ignore
        nuxtApp.vueApp.component(key, ElementPlusIconsVue[key])
    }

})

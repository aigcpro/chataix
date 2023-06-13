<template>
    <main class="main overflow-auto ai-app">
        <div class="w-full bg-slate-50 pb-20 pt-10">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h3 class="mb-4">我的收藏</h3>

                <div class="flex" v-show="loadings">
                    <el-skeleton class="mr-4 relative col-span-1 flex flex-col justify-between divide-y divide-gray-200 rounded-lg text-center " v-for="sk in 4" animated>
                        <template #template >
                            <el-skeleton-item variant="image" class="w-100-svg flex flex-1 flex-col p-8"/>
                            <div class="pt-1 pb-1">
                                <div
                                    style="
                                        display: flex;
                                        align-items: center;
                                        justify-content: space-between;
                                      "
                                >
                                    <el-skeleton-item variant="text" style="width:45%" />
                                    <el-skeleton-item variant="text" style="width:45%" />
                                </div>
                            </div>
                        </template>
                    </el-skeleton>
                </div>
                <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">


                    <li v-for="(item,index) in applications" v-if="!loadings" :key="index"
                        class="relative col-span-1 flex flex-col justify-between divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
                        <div class="absolute top-5 right-5 cursor-pointer">
                            <el-icon class="fs-5 hover:text-yellow-600" @click="ai_collect_send(item.ai_application[0].id)"><Star /></el-icon>
                        </div>
                        <NuxtLink :to="'/app/'+item.ai_application[0].id">
                            <div class="flex flex-1 flex-col p-8">
                                <div
                                    class="mx-auto flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full  text-3xl">
                                    <el-image class="w-100 h-100" :src="item.ai_application[0].icon" alt="" />
                                </div>
                                <h3 class="mt-6 text-sm font-medium text-gray-900">{{ item.ai_application[0].title }}</h3>
                                <dl class="mt-1 flex flex-grow flex-col justify-between">
                                    <dt class="sr-only">Title</dt>
                                    <dd class="text-sm text-gray-500">{{ item.ai_application[0].description }}</dd>
                                    <dd class="mt-3">
                                        <span
                                            v-for="(cate,cate_index) in item.ai_application[0].ai_appmeta"
                                            class="rounded-full bg-gray-100 mr-2 px-2 py-1 text-xs font-medium text-gray-800"
                                        >{{ cate.ai_category.title }}</span
                                        >
                                    </dd>
                                </dl>
                            </div>
                        </NuxtLink>
                        <div>
                            <div class="-mt-px flex divide-x divide-gray-200">
                                <div class="flex w-0 flex-1">
                                    <button
                                        @click="like_send(item.ai_application[0].id)"
                                        class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                                             class="h-5 w-5 text-gray-400">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"></path>
                                        </svg>
                                        点赞 {{item.ai_application[0].like}}
                                    </button>
                                </div>

                                <div class="-ml-px flex w-0 flex-1">
                                    <NuxtLink
                                        class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                        :to="'/app/'+item.ai_application[0].id">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                                             class="h-5 w-5 text-gray-400">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"></path>
                                        </svg>
                                        运行</NuxtLink></div>
                            </div>
                        </div>
                    </li>
                </ul>
                <el-empty class="m-auto w-100" v-show="applications.length==0 && !loadings" description="暂无应用"></el-empty>

                <div class="mt-10 flex justify-center">

                    <el-pagination
                        :current-page="page"
                        :page-size="limit"
                        :pager-count="4"
                        class="mr-4 ml-4"
                        background
                        layout="prev, pager, next"
                        :total="app_count"
                        @current-change="get_more"
                    />
                </div>
            </div>
            <div class="qas">
                <div class="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
                    <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">小应用可以做什么</h2>
                    <p class="mt-6 max-w-2xl text-base leading-7 text-gray-600">
                        问答系统：根据用户提供的问题生成有关某个主题的答案。

                        文本摘要：从长文章中提取关键信息，生成简洁易懂的摘要。

                        语言翻译：将文本从一种语言翻译成另一种语言。

                        代码生成：根据用户提供的描述自动生成代码片段。

                        创意写作：为用户生成短篇或长篇的创意性文本，如故事、博客文章、广告文案等。
                    </p>
                    <div class="mt-20">
                        <dl class="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:grid-cols-3 lg:gap-x-10">
                            <div v-for="faq in app_qs" :key="faq.id">
                                <dt class="text-base font-semibold leading-7 text-gray-900">{{ faq.title }}</dt>
                                <dd class="mt-2 text-base leading-7 text-gray-600">{{ faq.answer }}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {ElMessage} from 'element-plus'
import {useCounter} from "~/store/counter";
definePageMeta({
    middleware: ['islogin']
})
const page = ref(1)
const limit = ref(8)
const applications = ref([])
const app_count = ref(0)
const search_text = ref('')
const loadings = ref(false)
const tabs = ref([])
const counter = useCounter()
const token  = useCookie('token')
useHead({
    title: '我的收藏小应用 - '+counter.setting.title,
    meta: [
        { name: 'description', content: counter.setting.description},
        { name: 'keywords', content: counter.setting.keywords}
    ]
})
const get_all = ()=>{
    loadings.value = true
    get_me_all_app({
        page:page.value,
        limit:limit.value
    }).then((res:any)=>{
        applications.value = res._rawValue.data
        app_count.value = res._rawValue.count
        tabs.value=res._rawValue.cate
        loadings.value = false
    }).catch((err:any)=>{
        console.log(err)
    })
}
get_all()




const get_more = (val: number)=>{
    page.value = val
    get_all()
}
const like_send = (id:string)=>{
    app_like({
        id:id
    }).then((res:any)=>{
        get_all()
        ElMessage.success(res._rawValue.message)
    }).catch((err:any)=>{
        console.log(err)
    })
}
const app_qs = ref([])
const get_qs_start = ()=>{
    get_app_qs().then((res:any)=>{
        app_qs.value = res._rawValue.data
    }).catch((err:any)=>{
        console.log(err)
    })
}
get_qs_start()

const ai_collect_send = (id:string)=>{
    ai_collect({
        id:id
    }).then((res:any)=>{
        get_all()
        ElMessage.success(res._rawValue.message)
    }).catch((err:any)=>{
        console.log(err)
    })
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
</style>

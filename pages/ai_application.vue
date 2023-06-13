<template>
    <main class="main overflow-auto ai-app">
        <div class="w-full bg-slate-50 pb-20 pt-10">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="mb-10 grid grid-cols-1 items-center justify-between pt-10 sm:grid-cols-3 sm:pt-0 ">

                    <div>
                        <div class="relative">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg aria-hidden="true" class="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none"
                                     stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            <el-input
                                      size="large"
                                   :placeholder="'收录了 '+app_count+' 个应用'"
                                   v-model="search_text"
                                   @keydown.enter.native="search()"
                            />
                        </div>
                    </div>
                    <div></div>
                    <div class="flex justify-end gap-x-6 ">
                        <NuxtLink
                            class="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600 relative mt-2 md:mt-0"
                            to="/users/product">
                            <div class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                     stroke="currentColor" aria-hidden="true" class="h-6 w-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span class="mr-0.5 whitespace-nowrap">创建应用</span></div>
                        </NuxtLink>
                        <NuxtLink
                            v-if="token"
                            class="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-yellow-500 text-white hover:text-slate-100 hover:bg-yellow-400 active:bg-yellow-800 active:text-yellow-100 focus-visible:outline-yellow-600 relative mt-2 md:mt-0"
                            to="/me_application">
                            <div class="flex items-center gap-2">
                                <svg t="1684147730534" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2967" width="18" height="18"><path d="M512 4.096C231.424 4.096 4.096 231.424 4.096 512s227.328 508.416 508.416 508.416 508.416-227.328 508.416-508.416S792.576 4.096 512 4.096z m0 941.568c-239.616 0-433.664-194.048-433.664-433.664S272.384 78.336 512 78.336s433.664 194.048 433.664 433.664-194.048 433.664-433.664 433.664z" fill="#ffffff" p-id="2968"></path><path d="M596.992 348.672c-35.328 0-66.048 17.408-84.992 44.032-18.944-25.6-49.664-42.496-83.968-42.496-57.856 0-104.448 46.592-104.448 104.448 0 28.16 11.264 53.248 29.184 72.192l1.536 1.536L511.488 686.08l159.232-159.232c18.944-18.944 30.72-45.056 30.72-73.728 0-57.856-46.592-104.448-104.448-104.448z" fill="#ffffff" p-id="2969"></path></svg>
                                <span class="mr-0.5 whitespace-nowrap">我的收藏</span></div>
                        </NuxtLink>
                    </div>
                </div>
                <div class="mb-4 mt-4">

                    <div class="tags-application sm:block">
                        <el-tag
                            v-for="(tab, tabIdx) in tabs"
                            :key="tabIdx"
                            :class="[
                                tab_active == tab.other ? 'active' : 'hover:active',
                                'mx-1',
                                'cursor-pointer',
                                'mb-2'
                                ]"
                            @click="change_tab(tab.other)"
                            :type="tab.color"
                            effect="light"
                            round
                            size="large"
                        >
                            {{ tab.title }}
                        </el-tag>
                    </div>
                </div>
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
                            <el-icon class="fs-5 hover:text-yellow-600" @click="ai_collect_send(item.id)"><Star /></el-icon>
                        </div>

                        <NuxtLink :to="'/app/'+item.id">
                            <div class="flex flex-1 flex-col p-8">
                                <div
                                    class="mx-auto flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full  text-3xl">
                                    <el-image class="w-100 h-100" :src="item.icon" alt="" />
                                </div>
                                <h3 class="mt-6 text-sm font-medium text-gray-900">{{ item.title }}</h3>
                                <dl class="mt-1 flex flex-grow flex-col justify-between">
                                    <dt class="sr-only">Title</dt>
                                    <dd class="text-sm text-gray-500">{{ item.description }}</dd>
                                    <dd class="mt-3">
                                        <span
                                            v-for="(cate,cate_index) in item.ai_appmeta"
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
                                        @click="like_send(item.id)"
                                        class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                                             class="h-5 w-5 text-gray-400">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"></path>
                                        </svg>
                                        点赞 {{item.like}}
                                    </button>
                                </div>

                                <div class="-ml-px flex w-0 flex-1">
                                    <NuxtLink
                                    class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                    :to="'/app/'+item.id">
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

const page = ref(1)
const limit = ref(8)
const applications = ref([])
const app_count = ref(0)
const search_text = ref('')
const loadings = ref(false)
const tabs = ref([])
const tab_active=ref()
const counter = useCounter()
const token  = useCookie('token')
useHead({
    title: 'AI小应用 - '+counter.setting.title,
    meta: [
        { name: 'description', content: counter.setting.description},
        { name: 'keywords', content: counter.setting.keywords}
    ]
})
const get_all = ()=>{
    loadings.value = true
    tab_active.value = ''
    get_all_app({
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

const change_tab = (other:string)=>{
    tab_active.value = other
    loadings.value = true
    get_ai_cate({
        page:page.value,
        limit:limit.value,
        cate:other
    }).then((res:any)=>{
        applications.value = res._rawValue.data
        app_count.value = res._rawValue.count
        loadings.value = false
    }).catch((err:any)=>{
        console.log(err)
    })
}

const search = ()=>{
    loadings.value = true
    tab_active.value = ''
    search_app({
        page:page.value,
        limit:limit.value,
        search_text:search_text.value
    }).then((res:any)=>{
        applications.value = res._rawValue.data
        app_count.value = res._rawValue.count
        loadings.value = false
    }).catch((err:any)=>{
        console.log(err)
    })
}
const get_more = (val: number)=>{
    page.value = val

    if (tab_active.value){
        change_tab(tab_active.value)
    }else {
        get_all()
    }
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

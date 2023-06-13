<template>
    <main class="main overflow-auto ai-app-appid">
        <Head>
            <Title>{{ info.title }} - {{counter.setting.title}}</Title>
        </Head>
        <div class="w-full bg-slate-50 pb-20">
            <div class="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
                <nav class="flex" aria-label="Breadcrumb">
                    <ol role="list" class="flex items-center space-x-4">
                        <li>
                            <div><NuxtLink class="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-500" to="/ai_application">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                     aria-hidden="true" class="h-5 w-5 flex-shrink-0">
                                    <path fill-rule="evenodd"
                                          d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                                          clip-rule="evenodd"></path>
                                </svg>
                                <span class="">应用列表</span>
                            </NuxtLink>
                            </div>
                        </li>
                    </ol>
                </nav>
                <div class="mx-auto flex max-w-3xl flex-col items-center justify-center py-2">
                    <main class="mt-12 flex w-full flex-1 flex-col items-center justify-center px-4  sm:mt-20"><h1
                        class="max-w-[708px] text-4xl font-bold text-slate-900 sm:text-6xl">{{ info.title }}</h1>
                        <p class="mt-6 text-lg leading-8 text-gray-600">{{ info.description }}</p>
                        <div class="flex w-full max-w-xl flex-col items-center"><textarea rows="4"
                                                                                          v-model="code"
                                                                                          :disabled="send_loading"
                                                                                          class="my-5 w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                                                                                          placeholder="请输入点什么吧~"
                                                                                          data-dl-input-translation="true"></textarea>
                            <div class="flex gap-4 self-end">
<!--                                <button type="button"-->
<!--                                        class="mx-atuo mt-8 rounded-xl border bg-white px-8 py-2 font-medium text-black hover:bg-gray-200/80 sm:mt-10">-->
<!--                                    收藏-->
<!--                                </button>-->
                                <el-button type="primary"
                                           size="large"
                                           round
                                           @click="run_app()"
                                           :loading="send_loading"
                                        class="mx-atuo mt-8 rounded-xl bg-black px-8 py-2 font-medium text-white hover:bg-black/80 sm:mt-10">
                                    运行
                                </el-button>
                            </div>
                            <div class="my-10 w-full space-y-10 bg-white rounded p-3 shadow-sm" v-if="last_content" v-html="renderMarkdown(last_content).replace(/\\n/g, '\n')">

                            </div>
                        </div>
                    </main>
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
import {ElMessage} from "element-plus";
import hljs from 'highlight.js'
import markdownIt from 'markdown-it'
import {get_app_qs} from "~/utils/api";
import {useCounter} from "~/store/counter";
const route = useRoute();
const appid = ref(route.params.appid);
const token = useCookie('token')
const info = ref({});
const counter = useCounter()
useHead({
    meta: [
        { name: 'description', content: counter.setting.description},
        { name: 'keywords', content: counter.setting.keywords}
    ]
})
const get_appid_info = ()=>{
    get_appid({
        appid: appid.value
    }).then((res:any)=>{
        info.value = res._rawValue.data
        code.value = info.value.test_input
    })
}
get_appid_info()




const renderMarkdown = (markdown: any) => {
    return markdownIt({
        highlight: (str: string, lang: string) => {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`
                } catch (__) {}
            }

            return `<pre class="hljs"><code>${markdownIt().utils.escapeHtml(str)}</code></pre>`
        },
        breaks: true // 添加breaks插件
    }).render(markdown)
}
const { public: { baseUrl } } = useRuntimeConfig()
const headers = {
    'Authorization': `Bearer ${token.value}`,
    'Accept': 'text/event-stream',
}
const streams = ref()
const send_loading = ref(false)
const last_content = ref('')
const code = ref('')
const run_app = async ()=>{
    last_content.value = ''
    send_loading.value = true
    const res = await fetch(`${baseUrl}api/now_app`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            code: code.value,
            appid: appid.value
        }),

    })

    if (res.status==500){
        send_loading.value = false
        ElMessage.error('服务器错误')
        return false
    }
    if (res.status==401){
        send_loading.value = false
        ElMessage.error('请先登录')
        return false
    }
    if (res.status==402){
        send_loading.value = false
        ElMessage.error('发送次数已达上限或余额不足')
        return false
    }
    if (res.status==403){
        send_loading.value = false
        ElMessage.error('禁止发送违禁词')
        return false
    }
    const stream = res.body?.getReader();
    const onData = ({ value }: { value: Uint8Array }) => {
        let result = new TextDecoder().decode(value);
        // console.log(result);
        let arr  = result.split('\n\n').map(str => str.replace(/\n/g, ''));
        let new_arr: any[] = [];
        // console.log(arr)
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].slice(-2) == ']}' && arr[i].startsWith('data:')){
                new_arr.push(JSON.parse(arr[i].replace('data:', '')));
            }else if(arr[i].startsWith('data:') && arr[i].slice(-2) != ']}'){
                streams.value = arr[i].replace('data:', '');
            }else if(arr[i].slice(-2) == ']}' && arr[i].startsWith('data:') == false){
                // 与streams.value拼接成一个字符串
                let str = streams.value+= arr[i]
                new_arr.push(JSON.parse(str.replace('data:', '')))
                streams.value = ''
            }else{
                if (arr[i].includes('"error"')){
                    last_content.value = JSON.parse(arr[i]).error.message
                }
                streams.value = ''
            }

        }


        // console.log(new_arr)
        for (let i = 0; i < new_arr.length; i++) {
            setTimeout(() => {
                if (new_arr[i].choices[0].delta.content){
                    last_content.value += new_arr[i].choices[0].delta.content
                }
            }, 100)

        }

    };


    const read = async () => {
        const result = await stream?.read();
        if (result?.done) {
            send_loading.value = false
            code.value =''

        } else {
            onData(result!);
            await read();
        }
    };
    await read();

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

</script>

<style>
.ai-app-appid textarea:focus-visible{
    outline: 2px solid #409eff;
    outline-offset: 2px;
}
</style>

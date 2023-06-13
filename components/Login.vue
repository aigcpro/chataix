<template>
    <el-dialog v-model="login_dialog" class="mb_dialog dialog_login_of" append-to-body>
            <el-dialog
                v-model="check_dialog"
                :title="agreement.title"
                class="dialog_login_of"
            >
                <div v-html="agreement.description"></div>
                <template #footer>
                                      <span class="dialog-footer">
                                        <el-button type="primary" @click="check_dialog_change()">
                                            同意协议
                                        </el-button>
                                      </span>
                </template>
            </el-dialog>
        <div class="w-100 dialog_login">
            <!--login-->
            <div v-if="is_login_card" class="card border-0">
                <div class="card-body">

                    <h3 class="text-center">登录</h3>

                    <p class="text-center mb-6">登录自主用户，开始聊天</p>
                    <el-form ref="ruleFormRefLogin" :model="ruleFormLogin" :rules="rulesLogin" class="demo-ruleForm"
                        status-icon>
                        <el-form-item prop="email">
                                <el-input type="email" size="large" v-model="ruleFormLogin.email"
                                    placeholder="输入你的邮箱/手机号">
                                    <template #prefix>
                                        <el-icon><User /></el-icon>
                                    </template>
                                </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                                <el-input type="password" size="large" v-model="ruleFormLogin.password"
                                    placeholder="输入你的密码">
                                    <template #prefix>
                                        <el-icon><Lock /></el-icon>
                                    </template>
                                </el-input>
                        </el-form-item>
                        <div class="form-group d-flex justify-content-between mb-4">
                            <NuxtLink class="link" href="/users/reset">忘记密码</NuxtLink>
                        </div>
                        <el-form-item>
                            <el-button :loading="login_loading" size="large" type="primary"
                                @click="submitFormLogin(ruleFormRefLogin)" class="login">
                                登录
                            </el-button>
                        </el-form-item>
                    </el-form>
                    <div class="mt-6" v-if="counter.setting.three_login_open=='1'">
                        <div class="relative">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-gray-300" />
                            </div>
                            <div class="relative flex justify-center text-sm">
                                <span class="bg-white px-2 text-gray-500">第三方登录</span>
                            </div>
                        </div>

                        <div class="mt-3 grid grid-cols-1 gap-1 mb-3" v-if="counter.setting.wechat_login=='1'">
                            <div>
                                <div
                                    @click="wechat_login()"
                                    class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                                >
                                    <span class="sr-only">Sign in with Twitter</span>
                                    <svg t="1684751208419" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23618" width="26" height="26"><path d="M512 512m-447.9 0a447.9 447.9 0 1 0 895.8 0 447.9 447.9 0 1 0-895.8 0Z" fill="#00C785" p-id="23619"></path><path d="M741.6 567.5c0-63.7-63.7-115.5-135.3-115.5-75.9 0-135.5 51.9-135.5 115.5 0 63.8 59.6 115.5 135.5 115.5 15.9 0 31.9-4 47.8-7.9l43.7 24-12-39.8c32-24 55.8-56 55.8-91.8z m-179.3-19.9c-7.9 0-15.9-7.9-15.9-15.9 0-7.9 7.9-15.9 15.9-15.9 12 0 20 7.9 20 15.9s-8 15.9-20 15.9z m87.7 0c-7.9 0-15.8-7.9-15.8-15.9 0-7.9 7.9-15.9 15.8-15.9 12 0 19.9 7.9 19.9 15.9 0.1 8-8.1 15.9-19.9 15.9z m0 0" fill="#FFFFFF" p-id="23620"></path><path d="M593.1 437.9c5.2 0 10.5 0.4 15.7 0.9-14-65.6-84.1-114.2-164.1-114.2-89.4 0-162.7 60.9-162.7 138.3 0 44.7 24.3 81.4 65 109.9l-16.2 49 56.9-28.6c20.4 4 36.7 8.1 56.9 8.1 5 0 10.1-0.2 15.1-0.7-3.2-10.8-5-22.3-5-34.1 0.1-70.9 61.2-128.6 138.4-128.6z m-87.5-44.1c12.2 0 20.3 8.1 20.3 20.4 0 12.2-8.1 20.3-20.3 20.3-12.3 0-24.5-8.1-24.5-20.3 0.2-12.3 12.4-20.4 24.5-20.4z m-113.9 40.7c-12.3 0-24.5-8.1-24.5-20.3 0-12.3 12.2-20.4 24.5-20.4s20.4 8.1 20.4 20.4c0 12-8.1 20.3-20.4 20.3z m0 0" fill="#FFFFFF" p-id="23621"></path></svg>
                                </div>
                            </div>

                        </div>
                    </div>

                    <p class="text-center mb-0">还没有账户？
                        <span class="link cursor-pointer" @click="go_regs()">注册一个</span>
                        .
                    </p>
                </div>
            </div>
            <!--register-->
            <div v-else class="card border-0">
                <div class="card-body">

                    <h3 class="text-center">注册</h3>

                    <p class="text-center mb-6">创建一个免费账户</p>
                    <el-tabs v-model="activeName" class="demo-tabs reg_demo_tabs">
                        <el-tab-pane label="邮箱注册" name="first" >
                            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" status-icon>
                                <el-form-item prop="name">
                                    <el-input type="text" size="large" v-model="ruleForm.name" placeholder="填写您的用户名">
                                        <template #prefix>
                                            <el-icon>
                                                <User />
                                            </el-icon>
                                        </template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="email">
                                    <el-input type="email" size="large" v-model="ruleForm.email" placeholder="请填写您的邮箱">
                                        <template #prefix>
                                            <svg t="1682921458000" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg" p-id="3552" width="16" height="16">
                                                <path
                                                    d="M875.52 189.44c11.1104 0 20.48 9.3696 20.48 20.48v604.16c0 11.1104-9.3696 20.48-20.48 20.48H148.48c-11.1104 0-20.48-9.3696-20.48-20.48V209.92c0-11.1104 9.3696-20.48 20.48-20.48h727.04m0-40.96H148.48c-33.792 0-61.44 27.648-61.44 61.44v604.16c0 33.792 27.648 61.44 61.44 61.44h727.04c33.792 0 61.44-27.648 61.44-61.44V209.92c0-33.792-27.648-61.44-61.44-61.44z"
                                                    fill="#cdcdcd" p-id="3553"></path>
                                                <path
                                                    d="M834.4576 245.6064c-3.2768 0-6.5536 0.768-9.6256 2.4064L512 416.0512 199.168 248.064a20.3264 20.3264 0 0 0-9.6256-2.4064c-7.3216 0-14.4384 3.8912-18.1248 10.752-5.3248 9.9328-1.5872 22.4256 8.3456 27.7504L502.272 457.3184c3.072 1.6384 6.3488 2.304 9.6256 2.304h0.2048c3.2768 0 6.5536-0.6656 9.6256-2.304l322.5088-173.2096c9.9328-5.3248 13.6704-17.8176 8.3456-27.7504a20.63872 20.63872 0 0 0-18.1248-10.752z"
                                                    fill="#cdcdcd" p-id="3554"></path>
                                            </svg>
                                        </template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="email_code">
                                    <el-input type="email" size="large" v-model="ruleForm.email_code"
                                        placeholder="请填写您的邮箱验证码">
                                        <template #prefix>
                                            <el-icon><Filter /></el-icon>
                                        </template>
                                        <template #append>
                                            <el-button :loading="send_wait" class="flex" type="primary"
                                                @click="send_code()">
                                                {{ send_code_text }}
                                            </el-button>
                                        </template>

                                    </el-input>


                                </el-form-item>
                                <el-form-item prop="password">
                                    <el-input type="password" size="large" v-model="ruleForm.password" placeholder="填写您的密码">
                                        <template #prefix>
                                            <el-icon><Lock /></el-icon>
                                        </template>

                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="invite_code" class="mb-0">
                                    <el-input type="invite_code" size="large" v-model="ruleForm.invite_code"
                                        placeholder="填写您的邀请码（可选）">
                                        <template #prefix>
                                            <el-icon><Position /></el-icon>
                                        </template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="check_xieyi" class="mb-0 mt-0">
                                    <el-checkbox type="check_xieyi" v-model="ruleForm.check_xieyi" @click="check_dialog=true">
                                        同意《用户协议》
                                    </el-checkbox>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" :loading="reg_loading" class="register" size="large"
                                        @click="submitForm(ruleFormRef)">
                                        注册
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="手机注册" name="second" v-if="reg_way == '2' || reg_way == '3'">
                            <el-form ref="ruleFormRefs" :model="TruleForm" :rules="rulest" class="demo-ruleForm"
                                status-icon>
                                <el-form-item prop="name">

                                        <el-input type="text" v-model="TruleForm.name"
                                            placeholder="填写您的用户名"
                                            size="large"
                                            >
                                            <template #prefix>
                                                <el-icon><User /></el-icon>
                                            </template>
                                        </el-input>
                                </el-form-item>
                                <el-form-item prop="phone">
                                        <el-input type="phone" v-model="TruleForm.phone"
                                            placeholder="请填写您的手机号"
                                            size="large">
                                            <template #prefix>
                                                <el-icon><Phone /></el-icon>
                                            </template>
                                        </el-input>
                                </el-form-item>
                                <el-form-item prop="phone_code">
                                            <el-input type="phone_code"
                                                v-model="TruleForm.phone_code" placeholder="请填写您的手机验证码"
                                                size="large">
                                                <template #prefix>
                                                    <el-icon><Filter /></el-icon>
                                                </template>
                                                <template #append>
                                                    <el-button :loading="send_wait" type="primary"
                                                        class="flex" @click="send_p_code()">
                                                        {{ send_code_text }}</el-button>
                                                </template>
                                            </el-input>
                                </el-form-item>
                                <el-form-item prop="password">
                                        <el-input type="password"
                                            v-model="TruleForm.password" placeholder="填写您的密码"
                                            size="large">
                                            <template #prefix>
                                                <el-icon><Lock /></el-icon>
                                            </template>
                                        </el-input>
                                </el-form-item>
                                <el-form-item prop="invite_code" class="mb-0">
                                        <el-input type="invite_code"
                                            v-model="TruleForm.invite_code" placeholder="填写您的邀请码（可选）"
                                            size="large">
                                            <template #prefix>
                                                <el-icon><Position /></el-icon>
                                            </template>
                                        </el-input>
                                </el-form-item>
                                <el-form-item prop="check_xieyi" class="mb-0 mt-0">
                                    <el-checkbox  v-model="TruleForm.check_xieyi" @click="check_dialog=true">
                                        同意《用户协议》
                                    </el-checkbox>
                                </el-form-item>

                                <el-form-item>
                                    <el-button type="primary" :loading="reg_loading" class="register" size="large"
                                        @click="submitFormS(ruleFormRefs)">
                                        注册
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>



                    <p class="text-center mb-0">已经有账户了? <span class="link cursor-pointer" @click="go_login()">登录</span>.</p>

                </div>
            </div>
        </div>
    </el-dialog>

</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useCounter } from '~/store/counter'
const counter = useCounter()
const is_login_card = ref(true)

const go_regs = () => {
    is_login_card.value = false
}
const go_login = () => {
    is_login_card.value = true
}

const props = defineProps({
    login_dialog: {
        type: Boolean,
        default: false
    },
})
const emit = defineEmits(['handleCancel']) // 定义emit
const login_dialog = computed({
    get() {
        return props.login_dialog
    },
    set(val) {
        emit('handleCancel', val)
    }
})
const handleCancel = () => {
    login_dialog.value = false
}



const email = ref('')
const password = ref('')
const ruleFormRefLogin = ref<FormInstance>()
const ruleFormLogin = reactive({
    email: '',
    password: ''
})
const rulesLogin = reactive<FormRules>({
    email: [
        { required: true, message: '请输入邮箱或手机号', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
    ]
})
const login_loading = ref(false)
const token = useCookie('token',  { maxAge: 60 * 60 * 24 * 2 })
const user_info = useCookie('user_info')
const router = useRouter()
const cookie_message = useCookie('message')



const submitFormLogin = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            login_loading.value = true
            logins({
                email: ruleFormLogin.email,
                password: ruleFormLogin.password
            }).then((res: any) => {
                login_loading.value = false
                if (res._rawValue.status == 200) {
                    handleCancel()
                    cookie_message.value = ''
                    token.value = res._rawValue.token
                    user_info.value = res._rawValue.user_info
                    ElMessage.success(res._rawValue.message)
                    router.go(0)
                }
            }).catch((err: any) => {
                login_loading.value = false
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}
const { public: { baseUrl } } = useRuntimeConfig()

const wechat_login= ()=>{
    window.location.href = baseUrl + 'api/socials/wechat'
}
// register send
const reg_way = counter.setting.register_way
const ruleFormRef = ref<FormInstance>()
const ruleFormRefs = ref<FormInstance>()
const ruleForm = <any>reactive({
    name: '',
    email: '',
    password: '',
    email_code: '',
    invite_code: '',
    check_xieyi: false

})
const TruleForm = <any>reactive({
    name: '',
    phone: '',
    password: '',
    phone_code: '',
    invite_code: '',
    check_xieyi: false
})
if (process.client) {
    const searchParams = new URLSearchParams(window.location.search)
    if (searchParams.get('invite_code')) {
        ruleForm.invite_code = searchParams.get('invite_code')
        TruleForm.invite_code = searchParams.get('invite_code')
    }
}
const rulest = reactive<FormRules>({
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
    ],
    phone_code: [
        { required: true, message: '请输入手机验证码', trigger: 'blur' },
    ],

})

const rules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
    ],
    email_code: [
        { required: true, message: '请输入邮箱验证码', trigger: 'blur' },
    ],


})
const reg_loading = ref(false)
// EMAIL register
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            if (ruleForm.check_xieyi == false) {
                ElMessage.error('请同意用户协议')
                return
            }
            reg_loading.value = true
            register({
                name: ruleForm.name,
                email: ruleForm.email,
                password: ruleForm.password,
                email_code: ruleForm.email_code,
                invite_code: ruleForm.invite_code
            }).then((res: any) => {
                if (res._rawValue.status == 200) {
                    ElMessage.success(res._rawValue.message)
                    formEl.resetFields()
                    go_login()
                    reg_loading.value = false
                }

            }).catch((err: any) => {
                reg_loading.value = false
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}

const check_dialog = ref(false)
const agreement = ref({})
const get_agreement=()=>{
    get_agreement_f().then((res: any) => {
        agreement.value = res._rawValue.data
    }).catch((err: any) => {
        console.log(err)
    })
}
get_agreement()
const check_dialog_change = ()=>{
    check_dialog.value = false
    ruleForm.check_xieyi = true
    TruleForm.check_xieyi = true
}
// Phone register
const submitFormS = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            if (TruleForm.check_xieyi == false) {
                ElMessage.error('请同意用户协议')
                return
            }
            reg_loading.value = true
            register({
                name: TruleForm.name,
                phone: TruleForm.phone,
                password: TruleForm.password,
                phone_code: TruleForm.phone_code,
                invite_code: TruleForm.invite_code
            }).then((res: any) => {
                if (res._rawValue.status == 200) {
                    ElMessage.success(res._rawValue.message)
                    formEl.resetFields()
                    go_login()
                    reg_loading.value = false
                }

            }).catch((err: any) => {
                reg_loading.value = false
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}
const send_code_text = ref('发送验证码')
const send_wait = ref(false)
const activeName = reg_way === '1' ? 'first' : (reg_way == '2' ? 'second' : 'first')

const send_code = () => {
    if (ruleForm.email == '') {
        ElMessage.error('请填写邮箱')
        return
    }
    send_wait.value = true
    send_email({
        email: ruleForm.email
    }).then((res: any) => {
        if (res._rawValue.status == 200) {
            ElMessage.success(res._rawValue.message)
            // 发送成功倒计时60秒
            let time = 60
            const timer = setInterval(() => {
                if (time <= 0) {
                    send_code_text.value = '发送验证码'
                    send_wait.value = false
                    clearInterval(timer)
                    return
                }
                send_code_text.value = time + 's'
                send_wait.value = true
                time--
            }, 1000)
        }
    }).catch((err: any) => {
        send_wait.value = false
        console.log(err)
    })
}

const send_p_code = () => {
    if (TruleForm.phone == '') {
        ElMessage.error('请填写手机号')
        return
    }
    send_wait.value = true
    send_phone_code({
        phone: TruleForm.phone
    }).then((res: any) => {
        if (res._rawValue.status == 200) {
            ElMessage.success(res._rawValue.message)
            // 发送成功倒计时60秒
            let time = 60
            const timer = setInterval(() => {
                if (time <= 0) {
                    send_code_text.value = '发送验证码'
                    send_wait.value = false
                    clearInterval(timer)
                    return
                }
                send_code_text.value = time + 's'
                send_wait.value = true
                time--
            }, 1000)
        }
    }).catch((err: any) => {
        send_wait.value = false
        console.log(err)
    })
}
</script>

<style>
.dialog_login .el-button {
    width: 100%;
}

.el-dialog.dialog_login_of {
    width: 25%;
}

.dialog_login_of i {
    font-size: 16px;
}
</style>

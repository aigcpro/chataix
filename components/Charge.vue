<template>
    <el-dialog class="msgbox" v-model="dialogFormVisible" :title="'充值'+counter.setting.money_name_set+'/VIP'" width="20%" append-to-body>

        <el-tabs
            v-model="activeName"
            class="demo-tabs"
        >
            <el-tab-pane :label="'充值'+counter.setting.money_name_set" name="first">
                <div class="qr_fing" v-loading="qr_load">
                    <qrcode-vue v-if="qr_show" :value="pay_scan" size="240" class="mt-2 mb-2 m-auto d-sm-block"></qrcode-vue>
                </div>
                <el-form :model="form">
                    <el-form-item label="充值">
                        <el-input-number :step="0.01" controls-position="right" v-model="form.amount" autocomplete="off" :min="counter.setting.min_recharge" placeholder="请输入充值金额" />
                    </el-form-item>
                    <el-form-item label="支付方式">
                        <el-radio v-if="counter.setting.pay_wechat_open==1" v-model="form.pay_type" label="wechat">微信
                        </el-radio>
                        <el-radio v-if="counter.setting.pay_alipay_open==1" v-model="form.pay_type" label="alipay">支付宝
                        </el-radio>
                    </el-form-item>

                </el-form>

            </el-tab-pane>
            <el-tab-pane label="开通VIP" name="second">
                <div class="qr_fing" v-loading="qr_load">
                    <qrcode-vue v-if="qr_show" :value="pay_scan" size="240" class="mt-2 mb-2 m-auto d-sm-block"></qrcode-vue>
                </div>
                <el-form :model="form">
                    <el-form-item label="购买会员">
                        <el-radio-group v-model="form.vip_type">
                            <el-radio border @change="changeRadio(item.id,item.pay_amount)" v-for="(item,index) in vip_list" :key="index" :label="item.id" class="mb-2">
                                {{ item.title }} ￥{{ item.pay_amount }}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="支付方式">
                        <el-radio  v-model="form.pay_type" v-if="counter.setting.pay_wechat_open==1" label="wechat">微信</el-radio>
                        <el-radio  v-model="form.pay_type" v-if="counter.setting.pay_alipay_open==1" label="alipay">支付宝</el-radio>
                        <el-radio  v-model="form.pay_type" label="balance">{{counter.setting.money_name_set}}</el-radio>

                    </el-form-item>
                    <el-form-item label="优惠卷">
                        <el-input v-model="form.kami" placeholder="请输入优惠卷码"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>

        </el-tabs>
        <template #footer>
                                      <span class="dialog-footer">
                                        <el-button type="primary" @click="is_vipor_charge()" :loading="charge_loading">
                                          立即充值
                                        </el-button>
                                          <el-button type="primary" plain @click="dialogm()">
                                              完成支付
                                          </el-button>
                                      </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import QrcodeVue from "qrcode.vue";

import {useCounter} from '~/store/counter'
import {ElMessage} from "element-plus";
const activeName = ref('first')

const counter = useCounter()
const props = defineProps({
    dialogFormVisible: {
        type: Boolean,
        default: false
    },
})
const emit = defineEmits(['handleCancels']) // 定义emit
const dialogFormVisible = computed({
    get() {
        return props.dialogFormVisible
    },
    set(val) {
        emit('handleCancels', val)
    }
})
const handleCancels = () => {
    dialogFormVisible.value = false
}
const qr_load = ref(false)
const pay_scan = ref('')
const charge_loading = ref(false)
const qr_show = ref(false)
const form = reactive({
    amount:1,
    pay_type:counter.setting.pay_wechat_open == 1 ? 'wechat' : 'alipay',
    vip_type:1,
    kami:'',
})

const vip_list = ref([])
const get_vip = () => {
    get_vip_show().then((res:any) => {
        vip_list.value = res._rawValue.data
        vip_ids.value = res._rawValue.data[0].id
        vip_now_money.value = res._rawValue.data[0].pay_amount
    }).catch((err:any) => {
        ElMessage.error('获取失败')
    })
}
get_vip()

const vip_ids = ref('')
const vip_now_money = ref(0)
const changeRadio = (ids:string,money:any) => {
    vip_ids.value = ids
    vip_now_money.value = money
}

const send_charge = () => {
    if (form.amount == 0) {
        ElMessage.error('请输入充值金额')
        return
    }
    charge_loading.value = true
    qr_load.value = true
    qr_show.value = true
    const isMobile = /Mobile|Android|iOS/.test(navigator.userAgent);

    if (form.pay_type == 'alipay') {
        alipay({
            amount:form.amount,
            type:'charge',
            is_mobile:isMobile&& counter.setting.alipay_wap_open == '1'?1:0
        }).then((res:any) => {
            if (isMobile && counter.setting.alipay_wap_open == '1') {
                window.location.href = res._rawValue.pay_url
            }else{
                pay_scan.value = res._rawValue.qr_code
            }

            charge_loading.value = false
            qr_load.value = false
        }).catch((err:any) => {
            charge_loading.value = false
            qr_load.value = false
            qr_show.value = false
            console.log(err.message)
        })
    }else{
        wechat({
            amount:form.amount,
            type:'charge',
            is_mobile:isMobile&& counter.setting.wechat_wap_open == '1'?1:0
        }).then((res:any) => {
            if (isMobile && counter.setting.wechat_wap_open == '1') {
                window.location.href = res._rawValue.pay_url
            }else{
                pay_scan.value = res._rawValue.qr_code
            }
            charge_loading.value = false
            qr_load.value = false
        }).catch((err:any) => {
            charge_loading.value = false
            qr_load.value = false
            qr_show.value = false

            console.log(err.message)
        })
    }

}

const up_to_vip = () => {
    if (vip_ids.value == '') {
        ElMessage.error('请选择VIP套餐')
        return
    }
    charge_loading.value = true
    qr_load.value = true
    qr_show.value = true
    const isMobile = /Mobile|Android|iOS/.test(navigator.userAgent);

    if (form.pay_type == 'alipay') {
        alipay({
            v_id:vip_ids.value,
            amount:vip_now_money.value,
            type:'vip',
            coupon:form.kami,
            is_mobile:isMobile&& counter.setting.alipay_wap_open == '1'?1:0
        }).then((res:any) => {
            if (isMobile && counter.setting.alipay_wap_open == '1') {
                window.location.href = res._rawValue.pay_url
            }else{
                pay_scan.value = res._rawValue.qr_code
            }
            charge_loading.value = false
            qr_load.value = false
        }).catch((err:any) => {
            charge_loading.value = false
            qr_load.value = false
            qr_show.value = false
            console.log(err.message)
        })
    }else if (form.pay_type == 'wechat'){
        wechat({
            v_id:vip_ids.value,
            amount:vip_now_money.value,
            type:'vip',
            coupon:form.kami,
            is_mobile:isMobile&& counter.setting.wechat_wap_open == '1'?1:0
        }).then((res:any) => {
            if (isMobile && counter.setting.wechat_wap_open == '1') {
                window.location.href = res._rawValue.pay_url
            }else{
                pay_scan.value = res._rawValue.qr_code
            }
            charge_loading.value = false
            qr_load.value = false
        }).catch((err:any) => {
            charge_loading.value = false
            qr_load.value = false
            qr_show.value = false
            console.log(err.message)
        })
    }else if (form.pay_type == 'balance'){
        qr_load.value = false
        qr_show.value = false
        buy_vip({
            v_id:vip_ids.value,
            coupon:form.kami,
        }).then((res:any) => {
            charge_loading.value = false
            ElMessage.success(res._rawValue.message)
        }).catch((err:any) => {
            charge_loading.value = false
            qr_load.value = false
            qr_show.value = false
            console.log(err.message)
        })
    }else{
        ElMessage.error('请选择支付方式')
    }
}

const is_vipor_charge = () => {
    if (activeName.value == 'first') {
        send_charge()
    }else{
        up_to_vip()
    }
}
const dialogm = ()=>{
    dialogFormVisible.value = false
}
</script>

<style scoped>

</style>

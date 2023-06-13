<template>
    <div class="sidebar border-end py-xl-4 py-3 px-xl-4 px-3 left-me">
        <div class="tab-content">

            <div class="tab-pane fade show active" id="nav-tab-user" role="tabpanel">

                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h4 class="mb-0 text-primary">个人中心</h4>
                    <div>
                        <div @click="sigt_out()" title="" class="btn default_ant_btn">
                            <svg t="1682767377027" class="icon inline-block align-bottom" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6322" width="20" height="20"><path d="M611.84 242.688c-8.192 0-15.872 6.144-18.432 14.336-3.072 10.752 3.072 22.016 13.824 26.112 52.736 19.968 97.28 56.32 128.512 103.424 34.816 53.248 49.152 116.736 40.96 179.712-8.192 62.976-38.4 120.832-85.504 163.328s-107.52 66.56-171.008 68.608h-6.656c-61.44 0-120.832-20.992-167.936-58.88-49.152-39.936-82.944-95.744-94.208-158.208-12.8-62.464-1.536-126.464 30.208-181.76 28.16-49.152 71.168-87.552 122.368-110.592 10.24-4.096 15.872-15.872 12.288-26.624-2.56-8.192-10.24-13.312-18.432-13.312-2.56 0-5.12 0.512-7.68 1.536C329.728 276.48 279.04 321.536 245.76 378.88c-36.352 63.488-49.152 137.728-35.84 209.408 13.312 71.68 52.224 136.704 109.056 182.784 54.784 44.032 122.88 68.096 192.512 68.096h8.704c73.216-2.048 143.36-30.208 197.632-78.848 54.272-49.152 89.6-115.712 98.816-188.416 9.728-72.704-7.168-145.92-47.104-207.36-36.352-55.808-89.088-97.792-151.04-120.832-2.048-1.024-4.608-1.024-6.656-1.024z" p-id="6323"></path><path d="M512 184.32c11.264 0 20.48 9.216 20.48 20.48v174.08c0 11.264-9.216 20.48-20.48 20.48s-20.48-9.216-20.48-20.48V204.8c0-11.264 9.216-20.48 20.48-20.48z" p-id="6324"></path></svg>

                            退出登录
                        </div>
                    </div>
                </div>

                <div class="card border-0 text-center pt-3 mb-4">
                    <el-skeleton style="width: 240px;margin:0 auto" animated v-show="s_loading">
                        <template #template>
                            <el-skeleton-item variant="image" style="width: 240px; height: 240px" />
                            <div style="padding: 14px">
                                <el-skeleton-item variant="p" style="width: 50%" />
                                <div>
                                    <el-skeleton-item variant="text" style="margin-right: 16px" />
                                </div>
                            </div>
                        </template>
                    </el-skeleton>
                    <div class="card-body" v-if="!s_loading">
                        <div class="card-user-avatar">
                            <img :src="me_info.avatar" alt="avatar" class="avatar-150">
                            <el-upload
                                class="avatar-uploader"
                                :action="actions"
                                :show-file-list="false"
                                :headers="{'Authorization': 'Bearer ' + token}"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                            >
                                <button type="button" class="btn btn-primary btn-sm"><i class="zmdi zmdi-edit"></i></button>
                            </el-upload>
                        </div>
                        <div class="card-user-detail mt-4">
                            <h5>{{ me_info.name }}</h5>
                            <span class="text-muted"><div class="__cf_email__">{{ me_info.email }}</div></span>
                            {{ me_info.description }}
                        </div>
                    </div>
                </div>
                <el-descriptions
                    class="margin-top"
                    title="个人信息"
                    :column="1"
                    :size="size"
                    border
                >
                    <template #extra>
                        <el-button :disabled="is_signin" v-if="is_signin">已经签到</el-button>
                        <el-button v-else type="primary" @click="go_signin()" :loading="signin_loading">签到</el-button>
                    </template>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon >
                                    <Phone />
                                </el-icon>
                                手机号
                            </div>
                        </template>
                        {{ me_info.phone?me_info.phone:'未绑定' }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon><Money /></el-icon>
                                {{counter.setting.money_name_set}}
                            </div>
                        </template>
                        ￥ {{ me_info.money }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon >
                                    <tickets />
                                </el-icon>
                                会员等级
                            </div>
                        </template>
                        <el-tag size="small">{{ me_vip? me_vip.title:'免费会员' }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon><ChatDotSquare /></el-icon>
                                今日剩余问答
                            </div>
                        </template>
                        <el-tag size="small">{{ last_msg }}</el-tag> 次
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon><EditPen /></el-icon>
                                今日剩余绘画
                            </div>
                        </template>
                        <el-tag size="small" type="success">{{ last_draw }}</el-tag> 次
                    </el-descriptions-item>

                </el-descriptions>
            </div>


        </div>
    </div>
    <div class="main px-xl-5 px-lg-4 px-3 pt-3 overflow-auto setting_mod">

        <div class="main-body">

            <div class="body-header border-bottom py-xl-3 py-2">
                <div class="container px-0">
                    <div class="row align-items-center">

                        <div class="col-12">
                            <div class="media">
                                <div class="avatar sm">
                                    <NuxtLink to="/" title="" class="link"><i
                                        class="zmdi zmdi-arrow-left zmdi-hc-lg"></i></NuxtLink>
                                </div>
                                <div class="media-body overflow-hidden">
                                    <div class="d-flex align-items-center mb-1">
                                        <h6 class="fw-bold text-truncate mb-0 me-auto">设置</h6>
                                    </div>
                                    <div class="text-truncate">修改用户配置信息</div>
                                </div>
                                <div  @click="sigt_out()"  class="hide-btn btn btn-dark sidebar-toggle-btn">退出</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="body-page d-flex py-xl-3 py-2">
                <div class="container px-0">

                    <div class="row">
                        <div class="col-12">
                            <ul class="nav nav-tabs nav-overflow page-header-tabs mb-4 mt-md-5 mt-3">
                                <li class="nav-item" @click="change_set('me')"><a class="nav-link" :class="c_change=='me'?'active':''" data-toggle="tab"
                                                        href="javascript:;" role="tab">个人信息</a></li>
                                <li class="nav-item" @click="change_set('wallet')"><a class="nav-link" :class="c_change=='wallet'?'active':''" data-toggle="tab" href="javascript:;"
                                                        role="tab">钱包</a></li>
                                <li class="nav-item" @click="change_set('pass')"><a class="nav-link" :class="c_change=='pass'?'active':''" data-toggle="tab" href="javascript:;"
                                                        role="tab">密码</a></li>
                                <li class="nav-item" @click="change_set('vip')"><a class="nav-link" :class="c_change=='vip'?'active':''" data-toggle="tab" href="javascript:;"
                                                                                    role="tab">VIP会员</a></li>
                                <li class="nav-item" @click="change_set('invite')"><a class="nav-link" :class="c_change=='invite'?'active':''" data-toggle="tab" href="javascript:;"
                                                                                   role="tab">邀请码</a></li>
                                <li class="nav-item" @click="change_set('signin')"><a class="nav-link" :class="c_change=='signin'?'active':''" data-toggle="tab" href="javascript:;"
                                                                                      role="tab">签到</a></li>
                            </ul>
                        </div>
                    </div>

                    <div class="tab-content">

                        <div class="tab-pane fade" :class="c_change=='me'?'show active':''" role="tabpanel">
                            <div class="row">
                                <div class="col-12">
                                    <div class="card mb-4">
                                        <div class="card-header">
                                            <h6 class="card-title mb-0">用户设置</h6>
                                            <span class="text-muted small">更新您的信息</span>
                                        </div>
                                        <div class="card-body">
                                            <el-skeleton :rows="5" animated v-show="now_loading" />
                                            <form class="row g-3 ai-form" v-if="!now_loading">
                                                <div class="col-lg-4 col-md-6 col-sm-12 ">
                                                    <div class="form-group">
                                                        <div class="input-group">
                                                            <input type="text" class="form-control form-control-lg"
                                                                   placeholder="Enter your name" v-model="me_info.name">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-6 col-sm-12">
                                                    <div class="form-group">
                                                        <div class="input-group">
                                                            <input type="text" class="form-control form-control-lg"
                                                                   placeholder="Enter phone" v-model="me_info.phone" disabled>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-1 col-md-6 col-sm-12">
                                                    <el-button size="large" @click="change_phone_number = true">更换手机</el-button>
                                                </div>
                                                <el-dialog v-model="change_phone_number" class="phone_dialog" title="更新手机号">
                                                    <el-form :model="phone_form">
                                                        <el-form-item label="手机号">
                                                            <el-input v-model="phone_form.phone" placeholder="请输入手机号" autocomplete="off" />
                                                        </el-form-item>
                                                        <el-form-item label="手机验证码">
                                                                <el-input v-model="phone_form.phone_code" placeholder="请输入验证码" autocomplete="off">
                                                                    <template #append>
                                                                        <el-button :loading="send_wait" type="primary" @click="send_p_code()">
                                                                            {{ send_code_text }}</el-button>
                                                                    </template>
                                                                </el-input>


                                                        </el-form-item>

                                                    </el-form>
                                                    <template #footer>
                                                          <span class="dialog-footer">
                                                            <el-button type="primary" @click="c_user_phone()">
                                                              提交
                                                            </el-button>
                                                          </span>
                                                    </template>
                                                </el-dialog>

                                                <div class="col-lg-3 col-md-6 col-sm-12">
                                                    <div class="form-group">
                                                        <div class="input-group">
                                                            <input type="text" class="form-control form-control-lg"
                                                                   placeholder="Enter your email" v-model="me_info.email" disabled>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-1 col-md-6 col-sm-12">
                                                    <el-button size="large" @click="change_email_code=true">更换邮箱</el-button>
                                                </div>
                                                <el-dialog v-model="change_email_code" class="email_dialog" title="更改邮箱">
                                                    <el-form :model="email_form">
                                                        <el-form-item label="邮箱">
                                                            <el-input v-model="email_form.email" autocomplete="off" />
                                                        </el-form-item>
                                                        <el-form-item label="邮箱验证码">
                                                                <el-input v-model="email_form.email_code" placeholder="请输入验证码" autocomplete="off">
                                                                    <template #append>
                                                                        <el-button :loading="send_wait" type="primary" @click="send_e_code()">
                                                                            {{ send_code_text }}</el-button>
                                                                    </template>
                                                                </el-input>

                                                        </el-form-item>
                                                    </el-form>
                                                    <template #footer>
                                                          <span class="dialog-footer">
                                                             <el-button type="primary" @click="c_user_email()">
                                                              提交
                                                            </el-button>
                                                          </span>
                                                    </template>
                                                </el-dialog>

                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <div class="input-group">
                                                            <textarea rows="4" class="form-control"
                                                                      placeholder="Enter Bio" v-model="me_info.description"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <el-button type="primary" @click="update_info()" :loading="up_loading">
                                                        更新信息
                                                    </el-button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="tab-pane fade" :class="c_change=='wallet'?'show active':''" role="tabpanel">
                            <div class="row">

                                <div class="col-12 col-md-6">

                                    <div class="card mb-4">
                                        <div class="card-body">
                                            <div class="row align-items-end">
                                                <div class="col">
                                                    <h6 class="text-uppercase text-muted mb-1 small">{{counter.setting.money_name_set}}</h6>
                                                    <span class="h3 mb-0">{{ me_info.money }}</span>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="btn btn-sm btn-dark" v-if="counter.setting.pay_wechat_open==1 || counter.setting.pay_alipay_open==1" @click="charge()">充值</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-12 col-md-6">

                                    <div class="card mb-4">
                                        <div class="card-body">
                                            <div class="row align-items-end">
                                                <div class="col">
                                                    <h6 class="text-uppercase text-muted mb-1 small">卡密兑换</h6>
                                                    <span class="h3 mb-0">
                                                        <el-input v-model="kami_code" placeholder="请填写卡密信息"></el-input>
                                                    </span>
                                                </div>
                                                <div class="col-auto">
                                                    <a :href="counter.setting.buy_card" class="btn btn-sm el-button el-button--success btn btn-sm">购买卡密</a>
                                                    <el-button :loading="kami_loading" type="primary" class="btn btn-sm" @click="change_code()">兑换</el-button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <el-dialog class="msgbox" v-model="dialogFormVisible"  :title="counter.setting.money_name_set+'充值'" width="20%" append-to-body>
                                    <div class="qr_fing" v-loading="qr_load">
                                        <qrcode-vue  v-if="qr_show" :value="pay_scan" size="240" class="mt-2 mb-2 m-auto d-sm-block"  ></qrcode-vue>
                                    </div>

                                    <el-form :model="form">
                                        <el-form-item label="充值">
                                            <el-input-number :step="0.01" controls-position="right" v-model="form.amount" autocomplete="off" :min="counter.setting.min_recharge" :placeholder="'请输入充值'+counter.setting.money_name_set" />
                                        </el-form-item>
                                        <el-form-item label="支付方式">
                                            <el-radio v-if="counter.setting.pay_wechat_open==1"  v-model="form.pay_type" label="wechat">微信</el-radio>
                                            <el-radio v-if="counter.setting.pay_alipay_open==1" v-model="form.pay_type" label="alipay">支付宝</el-radio>
                                        </el-form-item>

                                    </el-form>
                                    <template #footer>
                                      <span class="dialog-footer">
                                        <el-button type="primary" @click="send_charge()" :loading="charge_loading">
                                          立即充值
                                        </el-button>
                                          <el-button type="primary" plain @click="dialogm()">
                                              完成支付
                                          </el-button>
                                      </span>
                                    </template>
                                </el-dialog>

                                <div class="col-12">
                                    <el-table :data="tableData" stripe style="width: 100%">
                                        <el-table-column prop="created_at" label="时间" />
                                        <el-table-column prop="order_id" label="订单编号" />
                                        <el-table-column prop="amount" :label="counter.setting.money_name_set" />
                                        <el-table-column label="支付状态">
                                            <template #default="scope">
                                                {{scope.row.status=='0'?'未支付':'已支付'}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="支付方式">
                                            <template #default="scope">
                                                {{scope.row.way=='wechat'?'微信支付':'支付宝支付'}}
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>


                        <div class="tab-pane fade" :class="c_change=='pass'?'show active':''" role="tabpanel">
                            <div class="row justify-content-between mb-4">
                                <div class="col-12 col-md-6">
                                    <h5>更改密码</h5>
                                </div>
                                <div class="col-auto">
                                    <NuxtLink to="/users/reset" class="btn btn-warning">忘记你的密码?</NuxtLink>
                                </div>
                            </div>
                            <div class="row g-3">
                                <div class="col-12">

                                    <div class="card mb-4">
                                        <div class="card-body">
                                            <form class="row">
                                                <div class="col-lg-4 col-md-12">
                                                    <div class="form-group mb-3">
                                                        <label>旧密码</label>
                                                        <input type="email" class="form-control" v-model="pass_all.old_password">
                                                    </div>
                                                    <div class="form-group mb-3">
                                                        <label>新密码</label>
                                                        <input type="email" class="form-control"  v-model="pass_all.new_password">
                                                    </div>
                                                    <div class="form-group mb-3">
                                                        <label>确认密码</label>
                                                        <input type="email" class="form-control" v-model="pass_all.new_password_confirmation">
                                                    </div>
                                                    <el-button type="primary" @click="c_pass()" :loading="pass_loading">
                                                        更新密码
                                                    </el-button>
                                                </div>
                                                <div class="col-lg-8 col-md-12">

                                                    <div class="card bg-light border">
                                                        <div class="card-body">
                                                            <p class="mb-2">密码要求</p>
                                                            <p class="small text-muted mb-2">
                                                                要创建一个新的密码，你必须满足以下所有要求。
                                                            </p>

                                                            <ul class="small text-muted ps-4 mb-0">
                                                                <li>最少8个字符</li>
                                                                <li>至少带有一个数字</li>
                                                                <li>不能和旧密码相同</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="tab-pane fade" :class="c_change=='vip'?'show active':''" role="tabpanel">
                            <div class="row">

                                <div class="col-12 col-md-6">

                                    <div class="card mb-4">
                                        <div class="card-body">
                                            <div class="row align-items-center">
                                                <div class="col">
                                                    <h6 class="text-uppercase text-muted mb-1 small">VIP等级</h6>
                                                    <span class="h3 mb-0">{{ me_vip? me_vip.title:'免费会员' }}</span>
                                                    <span class="text-gray mt-2 d-sm-block">到期时间：{{ me_vip?me_vip.expire_time:'永久' }}</span>
                                                    <p>今日剩余问答：<el-tag size="small">{{ last_msg }}</el-tag> 次 </p>
                                                    <p> 今日剩余绘画：<el-tag size="small" type="success">{{ last_draw }}</el-tag> 次</p>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="btn btn-sm btn-dark" @click="up_vip_dialog()" v-if="counter.setting.pay_wechat_open==1 || counter.setting.pay_alipay_open==1">升级</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">

                                    <div class="card mb-4">
                                        <div class="card-body">
                                            <div class="row align-items-end">
                                                <div class="col">
                                                    <h6 class="text-uppercase text-muted mb-1 small">卡密兑换</h6>
                                                    <span class="h3 mb-0">
                                                        <el-input v-model="kami_code" placeholder="请填写卡密信息"></el-input>
                                                    </span>
                                                </div>
                                                <div class="col-auto">
                                                    <a :href="counter.setting.buy_card" class="btn btn-sm el-button el-button--success btn btn-sm">购买卡密</a>
                                                    <el-button :loading="kami_loading" type="primary" class="btn btn-sm" @click="change_code()">兑换</el-button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="col-12">
                                    <!--vip introduct-->
                                    <div class="module-privilege mb-2">
                                        <ul class="privilege-ul name-ul">
                                            <li class="privilege-item first-item">
                                                <p class="title">
                                                    <span>功能特权</span>
                                                </p>
                                            </li>
                                            <li class="privilege-item" style="background: #fbf9f8">
                                                <a>描述</a>
                                            </li>
                                            <li class="privilege-item">
                                                <a>价格</a>
                                            </li>
                                            <li class="privilege-item" style="background: #fbf9f8">
                                                <a>每天限制问答次数</a>
                                            </li>
                                            <li class="privilege-item">
                                                <a>每天限制绘画次数</a>
                                            </li>
                                            <li class="privilege-item">
                                                <a>天数</a>
                                            </li>
                                        </ul>
                                        <ul class="privilege-ul vip-ul " v-for="(vs,vs_index) in vip_list" :key="vs_index">
                                            <li class="privilege-item first-item">
                                                <div class="vip-type">
                                                    <p class="vip-type-icon">
                                                        <span class="vip-icon vip-middle icon-size-middle"></span>
                                                    </p>
                                                    <span class="vip-type-title">{{ vs.title }}</span>
                                                </div>
                                                <div class="buy-btn-box">
                                                    <p class="center-button-base center-button-light-red center-button-container-middle">开通会员
                                                    </p>
                                                </div>
                                            </li>
                                            <li class="privilege-item" style="background: #fbf9f8">{{ vs.description }}</li>
                                            <li class="privilege-item">￥ {{vs.pay_amount}}</li>
                                            <li class="privilege-item" style="background: #fbf9f8">{{ vs.limit_send }} 次</li>
                                            <li class="privilege-item">{{ vs.limit_draw }} 次</li>
                                            <li class="privilege-item">{{ vs.end_time }} 天</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <el-table :data="tableVip" stripe style="width: 100%">
                                        <el-table-column prop="created_at" label="时间" />
                                        <el-table-column prop="title" label="标题" />
                                        <el-table-column prop="order_id" label="订单编号" />
                                        <el-table-column prop="amount" :label="counter.setting.money_name_set" />
                                        <el-table-column label="支付状态">
                                            <template #default="scope">
                                                {{scope.row.status=='0'?'未支付':'已支付'}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="支付方式">
                                            <template #default="scope">
                                                {{scope.row.way=='wechat'?'微信支付':scope.row.way=='alipay'?'支付宝支付':counter.setting.money_name_set+'支付'}}
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>

                            </div>
                        </div>
                        <div class="tab-pane fade" :class="c_change=='invite'?'show active':''"  role="tabpanel">
                            <div class="row">

                                <div class="col-12 col-md-6">

                                    <div class="card mb-4">
                                        <div class="card-body">
                                            <div class="row align-items-center">
                                                <div class="col">
                                                    <h6 class="text-uppercase text-muted mb-1 small">邀请码</h6>
                                                    <span class="h3 mb-0 invite_code">{{ invite_code }}</span>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="btn btn-sm btn-dark" @click="invite_up()">生成邀请码</div>

                                                    <div class="btn btn-sm btn-dark ml-2" @click="copy_invite()">复制邀请链接</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <!--vip introduct-->
                                    <div class="module-privilege mb-2">
                                        <ul class="privilege-ul name-ul">
                                            <li class="privilege-item first-item">
                                                <p class="title">
                                                    <span>邀请奖励</span>
                                                </p>
                                            </li>
                                            <li class="privilege-item" style="background: #fbf9f8">
                                                <a>邀请人数</a>
                                            </li>
                                            <li class="privilege-item">
                                                <a>奖励额度</a>
                                            </li>
                                            <li class="privilege-item" style="background: #fbf9f8">
                                                <a>奖励会员</a>
                                            </li>

                                        </ul>
                                        <ul class="privilege-ul vip-ul " v-for="(ins,ins_index) in invite_set" :key="ins_index">
                                            <li class="privilege-item first-item">
                                                <div class="vip-type">
                                                    <p class="vip-type-icon">
                                                        <span class="vip-icon vip-middle icon-size-middle"></span>
                                                    </p>
                                                    <span class="vip-type-title">{{ ins_index+1 }} 级奖励项</span>
                                                </div>

                                            </li>
                                            <li class="privilege-item" style="background: #fbf9f8">{{ ins.invite_c }} 人</li>
                                            <li class="privilege-item">￥ {{ins.invite_amount}}</li>
                                            <li class="privilege-item" style="background: #fbf9f8">{{ ins.vip_info?ins.vip_info.title:'无' }}</li>

                                        </ul>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <el-table :data="tableInvite" stripe style="width: 100%">
                                        <el-table-column prop="created_at" label="时间" />
                                        <el-table-column prop="invite_user.name" label="邀请人" />
                                        <el-table-column prop="user_id" label="邀请人ID" />
                                    </el-table>
                                </div>

                            </div>
                        </div>
                        <div class="tab-pane fade" :class="c_change=='signin'?'show active':''" role="tabpanel">
                            <div class="row">
                                <el-calendar>
                                    <template #date-cell="{ data }">
                                        {{ data.day.split('-').slice(1).join('-') }}

                                        <p :class="data.day==formatTime(times.created_at) ? 'is-selected' : ''" v-for="(times,times_index) in sign_all" :key="times_index">

                                            <el-icon v-if="data.day==formatTime(times.created_at)" style="color: #409eff"><Select /></el-icon>
                                        </p>
                                    </template>

                                </el-calendar>
                                <div class="col-12">
                                    <el-button :disabled="is_signin" class="w-100 mt-4" v-if="is_signin">已经签到</el-button>
                                    <el-button v-else type="primary" class="w-100 mt-4" @click="go_signin()" :loading="signin_loading">立即签到</el-button>

                                    <!--vip introduct-->
                                    <div class="module-privilege mb-2">
                                        <ul class="privilege-ul name-ul">
                                            <li class="privilege-item first-item">
                                                <p class="title">
                                                    <span>功能特权</span>
                                                </p>
                                            </li>
                                            <li class="privilege-item" style="background: #fbf9f8">
                                                <a>描述</a>
                                            </li>
                                            <li class="privilege-item">
                                                <a>连续签到天数</a>
                                            </li>
                                            <li class="privilege-item" style="background: #fbf9f8">
                                                <a>获得额度</a>
                                            </li>
                                            <li class="privilege-item">
                                                <a>获得会员</a>
                                            </li>
                                        </ul>
                                        <ul class="privilege-ul mt-2 vip-ul " v-for="(si,si_index) in signin_info" :key="si_index">
                                            <li class="privilege-item first-item">
                                                <div class="vip-type">
                                                    <p class="vip-type-icon">
                                                        <span class="vip-icon vip-middle icon-size-middle"></span>
                                                    </p>
                                                    <span class="vip-type-title">{{ si.title }}</span>
                                                </div>
                                                <div class="buy-btn-box">
                                                    <p class="center-button-base center-button-light-red center-button-container-middle">开通会员
                                                    </p>
                                                </div>
                                            </li>
                                            <li class="privilege-item" style="background: #fbf9f8">{{ si.title }}</li>
                                            <li class="privilege-item"> {{si.day}} 天</li>
                                            <li class="privilege-item" style="background: #fbf9f8">￥ {{ si.balance }}</li>
                                            <li class="privilege-item">{{ si.vip_info?si.vip_info.title:'暂无' }}</li>

                                        </ul>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <el-table :data="sign_me_info" stripe style="width: 100%">
                                        <el-table-column prop="created_at" label="时间" />
                                        <el-table-column prop="balance" :label="counter.setting.money_name_set" />
                                        <el-table-column label="会员名称">
                                            <template #default="scope">
                                                {{scope.row.vip_info?scope.row.vip_info.title:'暂无'}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="description" label="描述" />

                                    </el-table>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
        <el-dialog
            v-model="dialogVip"
            class="vip_mb"
            title="会员升级"
            append-to-body
        >
            <el-alert class="mb-2" title="选择好VIP套餐后，点击立即升级生成二维码支付！" type="primary" :closable="false" show-icon />

            <div class="qr_fing" v-loading="qr_load">
                <qrcode-vue  v-if="qr_show" :value="pay_scan" size="240" class="mt-2 mb-2 m-auto d-sm-block"  ></qrcode-vue>
            </div>

            <el-form :model="form">
                <el-form-item label="购买会员">
                    <el-radio-group v-model="form.vip_type">
                        <el-radio class="mb-2" @change="changeRadio(item.id,item.pay_amount)" v-for="(item,index) in vip_list" :key="index" :label="item.id" border>
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
            <template #footer>
                                      <span class="dialog-footer">
                                        <el-button type="primary" @click="up_to_vip()">立即升级</el-button>
                                        <el-button type="primary" plain @click="dialogv()">
                                          完成支付
                                        </el-button>
                                      </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import {get_signin_info, kami_check, kami_send, send_email, signin_me} from "~/utils/api";

definePageMeta({
    middleware: ['islogin']
})
import { useCounter } from '~/store/counter'
const counter = useCounter()
import type { UploadProps } from 'element-plus'

useHead({
    title: '个人中心 - '+counter.setting.title,
    meta: [
        { name: 'description', content: counter.setting.description},
        { name: 'keywords', content: counter.setting.keywords}
    ]
})
import {ref,reactive} from 'vue'
import { ElMessage,ElTable,ElNotification  } from 'element-plus'
import QrcodeVue from 'qrcode.vue'
const full_url = ref('') as any
if (process.client){
    full_url.value = window.location.origin
}else{
    full_url.value = ''
}

const token = useCookie('token')
const router = useRouter()
const user_info = useCookie('user_info')
const actions  = counter.setting.APP_URL+'/api/upload_avatar'
const c_change = ref('me')
const me_info = ref({
    name:'',
    phone:'',
    description:'',
})
const tableData = ref([])
const tableVip = ref([])
const s_loading = ref(false)
const up_loading = ref(false)
const now_loading = ref(true)
const me_vip = ref({})
const invite_set = ref([])
const sigt_out = () => {
    token.value = ''
    ElMessage.success('退出成功')
    router.push('/')
}
const sign_all = ref([])
const formatTime = (time:any) => {
    const date = new Date(time)
    const year = date.getFullYear()
    const month = date.getMonth()+1<10 ? '0'+(date.getMonth()+1):date.getMonth()+1
    const day = date.getDate()<10 ? '0'+date.getDate():date.getDate()
    return `${year}-${month}-${day}`
}
const last_msg = ref(0)
const last_draw = ref(0)
const is_signin = ref(false)
const now_user = () =>{
    s_loading.value = true
    now_loading.value = true
    get_user().then((res:any) => {
        me_info.value = res._rawValue.data
        me_vip.value = res._rawValue.vip
        tableData.value = res._rawValue.order
        tableVip.value = res._rawValue.v_order
        invite_code.value = res._rawValue.data.invite_code
        tableInvite.value = res._rawValue.invite_meta
        invite_set.value = res._rawValue.invite_set
        sign_all.value = res._rawValue.sign
        last_msg.value = res._rawValue.last_msg
        last_draw.value = res._rawValue.last_draw
        s_loading.value = false
        now_loading.value = false
    }).catch((err:any) => {
        s_loading.value = false
        now_loading.value = false
        console.log(err)
    })
}
now_user()

const signins_check = ()=>{
    signin_check().then((res:any) => {
        is_signin.value = res._rawValue.data
    }).catch((err:any) => {
        console.log(err)
    })
}
signins_check()
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
const change_set = (options:string) => {
    c_change.value = options
}
const update_info = () => {
    up_loading.value = true
    update_user({
        name:me_info.value.name,
        description:me_info.value.description,
    }).then((res:any) => {
        now_user()
        up_loading.value = false
        ElMessage.success('修改成功')
    }).catch((err:any) => {
        up_loading.value = false
        console.log(err)
    })
}
const pass_loading = ref(false)
const pass_all = ref({
    old_password:'',
    new_password:'',
    new_password_confirmation:'',
})
const c_pass = () => {
    pass_loading.value = true
    if (pass_all.value.new_password != pass_all.value.new_password_confirmation) {
        ElMessage.error('两次密码不一致')
        pass_loading.value = false
        return
    }
    change_password({
        password:pass_all.value.old_password,
        new_password:pass_all.value.new_password,
    }).then((res:any) => {
        pass_loading.value = false
        ElMessage.success('修改成功')
        pass_all.value = {
            old_password:'',
            new_password:'',
            new_password_confirmation:'',
        }
    }).catch((err:any) => {
        pass_loading.value = false
        ElMessage.error(err.message)
    })
}

const dialogFormVisible = ref(false)
const form = reactive({
    amount:1,
    pay_type:counter.setting.pay_wechat_open == 1 ? 'wechat' : 'alipay',
    vip_type:1,
    kami:'',
})
const charge = () => {
    dialogFormVisible.value = true
}
const pay_scan = ref('')
const charge_loading = ref(false)
const qr_load = ref(false)
const qr_show = ref(false)
const send_charge = () => {
    if (form.amount == 0) {
        ElMessage.error('请输入充值'+counter.setting.money_name_set)
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
                console.log('mobile')
                window.location.href = res._rawValue.pay_url
            }else{
                console.log('pc')
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
                console.log('mobile')
                window.location.href = res._rawValue.pay_url
            }else{
                console.log('pc')
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
// VIP bug
const dialogVip = ref(false)
const up_vip_dialog = ()=>{
    dialogVip.value = true
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
                console.log('mobile')
                window.location.href = res._rawValue.pay_url
            }else{
                console.log('pc')
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
                console.log('mobile')
                window.location.href = res._rawValue.pay_url
            }else{
                console.log('pc')
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
            dialogVip.value = false
            now_user()
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
const vip_ids = ref('')
const vip_now_money = ref(0)
const changeRadio = (ids:string,money:any) => {
    vip_ids.value = ids
    vip_now_money.value = money
}
const invite_code = ref('')
const tableInvite = ref([

])
const copy_invite = () => {
    const input = document.createElement('input')
    input.setAttribute('readonly', 'readonly')
    input.setAttribute('value', full_url.value+'/?invite_code='+invite_code.value)
    document.body.appendChild(input)
    input.select()
    if (document.execCommand('copy')) {
        document.execCommand('copy')
        ElMessage.success('复制成功')
    }
    document.body.removeChild(input)
}
const invite_up = () =>{
    invite_code_send().then((res:any)=>{
        invite_code.value = res._rawValue.data
        ElMessage.success(
            '邀请码已更新'
        )
    }).catch((err:any)=>{
        console.log(err)
    })
}
const kami_code = ref('')
const kami_loading = ref(false)
const change_code = ()=>{
    if (kami_code.value == '') {
        ElMessage.error('请输入卡密')
        return
    }
    kami_loading.value = true
    kami_send({
        code:kami_code.value,
    }).then((res:any)=>{
        ElNotification({
            title: '成功',
            message: res._rawValue.info,
            type: 'success',
        })
        kami_code.value = ''
        kami_loading.value = false
        now_user()
    }).catch((err:any)=>{
        kami_loading.value = false
        console.log(err)
    })
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    console.log(URL.createObjectURL(uploadFile.raw!))
    ElMessage.success('上传成功')
    now_user()
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
        ElMessage.error('仅支持jpg/png格式图片!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('图片大小不能超过 2MB!')
        return false
    }
    return true
}

const change_phone_number = ref(false)
const change_email_code = ref(false)
const phone_form = reactive({
    phone:'',
    phone_code:'',
})
const email_form = reactive({
    email:'',
    email_code:'',
})
const c_user_phone = () => {
    if (phone_form.phone == '') {
        ElMessage.error('请输入手机号')
        return
    }
    if (phone_form.phone_code == '') {
        ElMessage.error('请输入验证码')
        return
    }
    change_phone_number.value = true
    change_phone({
        phone:phone_form.phone,
        code:phone_form.phone_code,
    }).then((res:any)=>{
        ElMessage.success('修改成功')
        change_phone_number.value = false
        now_user()
    }).catch((err:any)=>{
        console.log(err)
    })
}
const send_wait = ref(false)
const send_code_text = ref('发送验证码')
const send_p_code = () => {
    if (phone_form.phone == '') {
        ElMessage.error('请输入手机号')
        return
    }
    send_wait.value = true
    send_phone_code({
        phone:phone_form.phone,
    }).then((res:any)=>{
        send_wait.value = true
        let time = 60
        const timer = setInterval(() => {
            time--
            send_code_text.value = time + 's'
            if (time == 0) {
                send_wait.value = false
                send_code_text.value = '发送验证码'
                clearInterval(timer)
            }
        }, 1000)
        ElMessage.success('发送成功')
    }).catch((err:any)=>{
        send_wait.value = false
        console.log(err)
    })
}

const send_e_code = () => {
    if (email_form.email == '') {
        ElMessage.error('请输入邮箱')
        return
    }
    send_wait.value = true
    send_email({
        email:email_form.email,
    }).then((res:any)=>{
        send_wait.value = true
        let time = 60
        const timer = setInterval(() => {
            time--
            send_code_text.value = time + 's'
            if (time == 0) {
                send_wait.value = false
                send_code_text.value = '发送验证码'
                clearInterval(timer)
            }
        }, 1000)
        ElMessage.success('发送成功')
    }).catch((err:any)=>{
        send_wait.value = false
        console.log(err)
    })
}

const c_user_email = () => {
    if (email_form.email == '') {
        ElMessage.error('请输入邮箱')
        return
    }
    if (email_form.email_code == '') {
        ElMessage.error('请输入验证码')
        return
    }
    change_email_code.value = true
    change_email({
        email:email_form.email,
        code:email_form.email_code,
    }).then((res:any)=>{
        ElMessage.success('修改成功')
        change_email_code.value = false
        now_user()
    }).catch((err:any)=>{
        console.log(err)
    })
}

const dialogv = ()=>{
    dialogVip.value = false
    now_user()
}

const dialogm = ()=>{
    dialogFormVisible.value = false
    now_user()
}

const signin_loading = ref(false)
const go_signin = ()=>{
    signin_loading.value = true
    signin_me().then((res:any)=>{
        ElMessage.success('签到成功')
        signin_loading.value = false
        now_user()
    }).catch((err:any)=>{
        signin_loading.value = false
        console.log(err)
    })
}
const signin_info = ref([])
const sign_me_info = ref([])
const get_sign = () =>{
    get_signin_info().then((res:any)=>{
        signin_info.value = res._rawValue.sign_info
        sign_me_info.value = res._rawValue.data
    }).catch((err:any)=>{
        console.log(err)
    })
}
get_sign()


</script>

<style>
.avatar-uploader .el-upload{
    display:inline
}
.ai-form .el-button{
    height: 100%;
}
.el-calendar__body{
    padding: 0px;
}
</style>

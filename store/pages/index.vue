<template>

    <div class="sidebar border-end py-xl-4 py-3">

        <div class="tab-content">


            <div class="tab-pane fade show active" id="nav-tab-chat" role="tabpanel">

                <div class="d-flex justify-content-between align-items-center mb-4 ml-4 mr-4">
                    <h3 class="mb-0 font-bold h3-color-black">Messages</h3>
                    <div>
                        <div @click="login_dialog_click()" class="btn new_ant_btn" v-if="!token">
                            登录
                            <el-icon class="v-align"><UserFilled /></el-icon>
                        </div>
                        <NuxtLink to="/users/setting" class="btn new_ant_btn" v-else>个人中心
                            <el-icon class="v-align"><UserFilled /></el-icon>

                        </NuxtLink>
                    </div>
                </div>

                <div class="form-group input-group-lg search mb-3 ml-4 mr-4">
                    <svg t="1682690103231" class="icon zmdi-search" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4274" width="15" height="15"><path d="M1012.594519 956.738392l-171.053228-183.229898c69.580974-84.07701 107.270668-190.767837 107.270668-300.357871C948.811959 212.801812 736.589989 0 475.081495 0S1.351031 212.801812 1.351031 473.730464c0 261.508494 212.801812 473.730464 473.730464 473.730465 68.421291 0 134.523216-14.496036 195.98641-42.334225 9.857305-4.638732 16.809604-12.17667 20.294451-22.033975 3.479049-9.857305 2.899207-20.294451-1.159683-29.571914-4.638732-9.857305-12.17667-16.815402-22.033975-20.29445-9.857305-3.484847-20.294451-3.484847-29.577713 1.159683-51.600091 23.193658-106.685028 35.370328-164.09513 35.370328-218.020385 0-395.451869-177.431484-395.451869-395.451869s177.431484-395.451869 395.451869-395.451868c218.026183 0 395.451869 177.431484 395.451869 395.451868 0 102.631937-39.429219 200.0453-110.169876 274.265006a41.052775 41.052775 0 0 0-11.016987 27.838188c0 10.437146 4.64453 20.294451 12.182469 27.83239 0.579841 0.579841 1.739524 1.159683 2.313567 1.739524 0.58564 0 0.58564 0.579841 1.159683 0.579841 0 0.58564 0.58564 0.58564 0.58564 1.159683 0.579841 1.159683 1.153884 2.319366 2.313567 3.484847l187.288788 200.625142c7.543737 8.11778 17.980883 12.17667 28.412231 12.17667 9.857305 0 19.134768-3.479049 26.672707-10.437146a40.206206 40.206206 0 0 0 12.756512-27.252548c1.165481-11.602627-2.893409-21.459932-9.851506-29.577712z" p-id="4275" fill="#bfbfbf"></path></svg>

                    <input type="text" class="form-control" v-model="qs_input" @keydown.enter.native="qs_search" placeholder="Search...">
                </div>

                <ul class="chat-list mb-2">
                    <li class="header d-flex justify-content-between  mb-1 ml-4 mr-4">
                        <div class="d-sm-flex align-items-center">
                            <div class="dropdown inline-block">
                                <div @click="all_message()" class="btn btn-link px-1 py-0 border-0 text-muted dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="zmdi zmdi-refresh"></i></div>
                            </div>
                            RECENT CHATS
                        </div>
                        <div class="dropdown">
                            <div @click="delete_all()" class="ml-1 btn btn-link px-1 py-0 border-0 text-muted dropdown-toggle text-danger" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="zmdi zmdi-delete"></i></div>
                        </div>
                    </li>
                    <li class="online" :class="ms_active==0?'active':''">
                        <div class="card" @click="check_message(0)">
                            <div class="card-body">
                                <div class="media">
                                    <div class="avatar me-3">
                                        <div class="avatar rounded-circle no-image  text-light overflow-hidden">
                                            <img src="~/assets/images/bot-avatar.png" class="avatar rounded-circle" alt="">
                                        </div>
                                    </div>
                                    <div class="media-body overflow-hidden">
                                        <div class="d-flex align-items-center mb-1">
                                            <h6 class="text-truncate mb-0 me-auto">{{ counter.setting.bot_name }}</h6>

                                        </div>
                                        <div class="text-truncate">
                                            <i class="zmdi zmdi-circle text-success"></i> Online
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <el-skeleton class="m-2" :rows="5" animated v-if="data_load"/>
                    <div class="bot_info" v-else v-loading="left_loding">
                        <li class="online" :class="ms_active==item[item.length-1].session_id?'active':''"
                            v-for="(item,index) in messages" :key="index">
                            <div class="hover_action">

                                <button type="button" @click="change_sname(item[item.length-1].session_id)" class="btn btn-link text-primary"><i class="zmdi zmdi-edit"></i>
                                </button>
                                <button type="button" @click="delete_msg(item[item.length-1].session_id)" class="btn btn-link text-danger"><i class="zmdi zmdi-delete"></i>
                                </button>
                            </div>
                            <div class="card" @click="check_message(item[item.length-1].session_id)">
                                <div class="card-body">
                                    <div class="media">
                                        <div class="avatar me-3">
                                            <span class="status rounded-circle"></span>
                                            <img class="avatar rounded-circle" src="@/assets/images/bot-avatar.png"
                                                 alt="avatar">
                                        </div>
                                        <div class="media-body overflow-hidden">
                                            <div class="d-flex align-items-center mb-1">
                                                <h6 class="text-truncate mb-0 me-auto" v-if="item[item.length - 1].message_b">{{
                                                        item[item.length - 1].message_b
                                                    }}
                                                </h6>
                                                <h6 class="text-truncate mb-0 me-auto" v-else>{{
                                                        item[item.length - 1].question
                                                    }}
                                                </h6>
                                                <p class="small text-muted text-nowrap ms-4 mb-0">
                                                    {{ item[item.length - 1].created_at }}</p>
                                            </div>
                                            <div class="text-truncate h-20" v-html="item[item.length - 1].message.replace(/\n/g, '<br />')"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </div>
                </ul>
                <el-pagination
                    :current-page="page"
                    :page-size="limit"
                    :pager-count="4"
                    class="mr-4 ml-4"
                    background
                    layout="prev, pager, next"
                    :total="ms_count"
                    @current-change="handleCurrentChange"
                />
            </div>

            <!--this is jiehu-->

            <!--this is change jiehu-->
        </div>

    </div>
    <div class="main">

        <div class="chat-body" id="chatbody" v-loading="loadins"

        >


            <div class="chat-header border-bottom md:py-3 sm:py-3 py-2 ">
                <div class="container-xxl">

                    <div class="row align-items-center">
                        <div class="col-6 col-xl-4 d-flex">
                            <button @click="change_side()" class="btn sidebar-toggle-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">

                                    <path stroke="#000" stroke-linecap="round" stroke-width="1.5" d="M6 8.746h12M6 15.317h12"/>
                                    <circle class="sliders" cx="7.5" cy="8.746" r="1.5" fill="#409eff" stroke="#409eff" stroke-width="1.5"/>
                                    <circle class="sliders-2" cx="16.5" cy="15.254" r="1.5" fill="#409eff" stroke="#409eff" stroke-width="1.5"/>
                                </svg>

                            </button>
                            <div class="media">
                                <div class="avatar me-3" v-if="ms_active==0">
                                    <div class="avatar rounded-circle no-image  text-light overflow-hidden">
                                        <img src="~/assets/images/bot-avatar.png" class="avatar rounded-circle" alt="">
                                    </div>
                                </div>
                                <div class="me-3 show-user-detail" v-else>
                                    <span class="status rounded-circle"></span>
                                    <img class="avatar rounded-circle" src="@/assets/images/bot-avatar.png" alt="avatar">
                                </div>
                                <div class="media-body overflow-hidden">
                                    <div class="d-flex align-items-center mb-1">
                                        <h6 class="text-truncate mb-0 me-auto" v-if="ms_active==0">{{ counter.setting.bot_name }}</h6>
                                        <h6 class="mobile_width_5rem text-truncate mb-0 me-auto w-40" v-if="me_message.length>0">{{me_message[0].question}}</h6>
                                    </div>
                                    <div class="text-truncate"><i class="zmdi zmdi-circle text-success"></i> <span v-if="counter.setting.show_limit_front=='1'">今日会员剩余<el-tag size="small" class="ml-1">{{ last_msg }}</el-tag> 次</span><span v-else>Online</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-6 col-xl-8 text-end">
                            <ul class="nav justify-content-end align-items-center mobile_show">
                                <li class="nav-item list-inline-item d-md-block me-2">
                                    <client-only>
                                        <el-dropdown>
                                            <a class="css-htwhyh nav-link text-muted" data-toggle="pill" href="javascript:;"><i class="zmdi zmdi-more fs-6"></i></a>

                                            <template #dropdown>
                                                <el-dropdown-menu>
                                                    <el-dropdown-item>
                                                        <a @click="up_new_img()" data-toggle="pill" class="text-gray-400" href="javascript:;">
                                                            <i class="zmdi zmdi-image-o fs-6 align-text-bottom"></i>
                                                            保存图片
                                                        </a>
                                                    </el-dropdown-item>
                                                    <el-dropdown-item>
                                                        <a @click="check_message(ms_active)" class="text-gray-400"  data-toggle="pill" href="javascript:;">
                                                            <i class="zmdi zmdi-refresh fs-6 align-text-bottom"></i>
                                                            刷新对话
                                                        </a>
                                                    </el-dropdown-item>
                                                    <el-dropdown-item>
                                                        <a v-if="token" @click="charge()" class=" text-gray-400" data-toggle="pill" href="javascript:;"><i class="zmdi zmdi-card-travel fs-6 align-text-bottom"></i>充值{{counter.setting.money_name_set}}</a>
                                                        <a v-else @click="login_dialog_click()" class="text-gray-400" data-toggle="pill" href="javascript:;"><i class="zmdi zmdi-card-travel fs-6 align-text-bottom"></i>充值{{counter.setting.money_name_set}}</a>

                                                    </el-dropdown-item>
                                                </el-dropdown-menu>
                                            </template>
                                        </el-dropdown>
                                    </client-only>
                                </li>

                            </ul>
                            <ul class="nav justify-content-end align-items-center mobile_none">
                                <li class="nav-item list-inline-item d-md-block me-2">
                                    <client-only><el-tooltip
                                        class="box-item"
                                        effect="dark"
                                        content="生成图片"
                                        placement="bottom"
                                    >
                                        <a @click="up_new_img()" class="css-htwhyh nav-link text-muted" data-toggle="pill" href="javascript:;"><i class="zmdi zmdi-image-o fs-6"></i></a>
                                    </el-tooltip>
                                    </client-only>
                                </li>
                                <li class="nav-item list-inline-item d-md-block me-2">
                                    <client-only>
                                        <el-tooltip
                                            class="box-item"
                                            effect="dark"
                                            content="刷新当前聊天"
                                            placement="bottom"
                                        >
                                            <a @click="check_message(ms_active)" class="css-htwhyh nav-link text-muted" data-toggle="pill" href="javascript:;"><i class="zmdi zmdi-refresh fs-6"></i></a>
                                        </el-tooltip>
                                    </client-only>
                                </li>
                                <li class="nav-item list-inline-item d-md-block me-2">
                                    <client-only>
                                        <el-tooltip
                                            class="box-item"
                                            effect="dark"
                                            content="充值"
                                            placement="bottom"
                                        >
                                            <a v-if="token" @click="charge()" class="nav-link text-muted  css-htwhyh" data-toggle="pill" href="javascript:;"><i class="zmdi zmdi-card-travel fs-6"></i></a>
                                            <a v-else @click="login_dialog_click()" class="nav-link text-muted  css-htwhyh" data-toggle="pill" href="javascript:;"><i class="zmdi zmdi-card-travel fs-6"></i></a>

                                        </el-tooltip>
                                    </client-only>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            <div class="chat-content relative" ref="poster">
                <div class="res_stop fixed top-20" :class="is_done?'d-none':''" @click="stop_stream()">
                    <el-button>
                        <i class="zmdi zmdi-stop font-22 mr-2"></i>
                        停止运行
                    </el-button>
                </div>
                <div class="container-xxl">
                    <ul class="list-unstyled pt-5 pb-44 sm:py-6">
                        <!--bot guan-->
                        <div class="bot_message_s" v-if="ms_active==0">
                            <li class="d-flex message">

                                <div class="mr-lg-3 me-2">
                                    <div
                                        class="avatar rounded-circle d-flex align-items-center justify-content-center overflow-hidden">
                                        <img src="~/assets/images/bot-avatar.png" class="avatar rounded-circle" alt="">
                                    </div>
                                </div>

                                <div class="message-body">
                                    <div class="ske-message-row" v-show="normal_loading">
                                        <div class="pb-5 mb-1 message-content d-flex align-items-center bg-gray-200 h-4 w-25 full animate-pulse"></div>
                                        <div class="pb-5 mb-1 message-content d-flex align-items-center bg-gray-200 h-4 w-50 full animate-pulse"></div>
                                    </div>


                                    <div class="message-row d-flex align-items-center" v-for="(n_t,n_index) in normal_message" :key="n_index">
                                        <div class="message-content p-3" v-html="n_t.info"></div>
                                    </div>

                                </div>
                            </li>
                        </div>

                        <!--bot guan end-->

                        <!--qs-->

                        <div class="message_s" v-for="(item,index) in me_message" :key="index">
                            <li class="d-flex message right">
                                <div class="message-body">
                                <span class="date-time text-muted">{{ item.created_at }}<i
                                    class="zmdi zmdi-check-all text-primary"></i></span>
                                    <div class="message-row d-flex align-items-center justify-content-end">
                                        <div class="message-content border p-3">
                                            {{ item.question }}
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li class="d-flex message">

                                <div class="mr-lg-3 me-2">
                                    <img class="avatar sm rounded-circle" src="@/assets/images/bot-avatar.png"
                                         alt="avatar">
                                </div>

                                <div class="message-body">
                                    <span class="date-time text-muted">{{ item.created_at }}</span>
                                    <div class="message-row relative d-flex align-items-center">

                                            <div class="message-content p-3" :class="index==me_message.length-1 && !is_done?'ms-up':''" v-html="renderMarkdown(item.message).replace(/\\n/g, '\n')">
                                            </div>
                                        <div class="speak absolute left-2 top-1 btn z-10 new_ant_btn" v-if="!speak_is_audio"  @click="speak(item.message.replace(/\\n/g, '\n'))"><el-icon><Microphone /></el-icon>播放</div>
                                        <div class="speak absolute left-2 top-1 btn z-10 new_ant_btn" v-else  @click="stop_speak()"><el-icon><Microphone /></el-icon>停止</div>




                                        <el-dropdown>
                                            <div class="dropdown">
                                                <a class="text-muted ms-1 p-2 text-muted" href="javascript:;" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i class="zmdi zmdi-more-vert"></i>
                                                </a>
                                            </div>
                                            <template #dropdown>
                                                <el-dropdown-menu>
                                                    <el-dropdown-item command="copy" @click.native="handleClick(item.message.replace(/\\n/g, '\n'))">复制答案</el-dropdown-item>
                                                    <el-dropdown-item command="copy" @click.native="exportWord(item.message.replace(/\\n/g, '\n'))">导出Word</el-dropdown-item>
                                                    <el-dropdown-item command="copy" @click.native="exportPdf(item.message.replace(/\\n/g, '\n'))">导出PDF</el-dropdown-item>

                                                </el-dropdown-menu>
                                            </template>
                                        </el-dropdown>


                                    </div>
                                </div>
                            </li>

                        </div>
                        <!--qs end-->
                    </ul>
                </div>
            </div>

            <div class="chat-footer border-top py-xl-2 py-lg-2 py-2">
                <div class="container-xxl">
                    <div class="row">
                        <div class="col-12">
                            <el-form
                                ref="ruleFormRef"
                                :model="ruleForm"
                                :rules="rules"
                                class="demo-ruleForm"
                                status-icon
                            >
                                <div class="col-12 d-inline-block">
                                    <el-form-item prop="message_input">
                                        <el-input
                                            :disabled="send_loading"
                                            class="form-control border-0 pl-0"
                                            v-model="ruleForm.message_input"
                                            :autosize="{ minRows: 1, maxRows: 10 }"
                                            placeholder="请输入提问内容,shift+enter换行"
                                            type="textarea"
                                            v-if="counter.setting.no_login_aiqs=='1' && !token"
                                            @keydown.enter.native.prevent="submitFormNoLogin(ruleFormRef)"
                                        />
                                        <el-input
                                            :disabled="send_loading"
                                            class="form-control border-0 pl-0"
                                            v-model="ruleForm.message_input"
                                            :autosize="{ minRows: 1, maxRows: 10 }"
                                            placeholder="请输入提问内容,shift+enter换行"
                                            type="textarea"
                                            v-else
                                            @keydown.enter.native.prevent="submitForm(ruleFormRef)"
                                        />
                                        <div class="absolute right-6 d-inline-block div-pad">

                                            <el-form-item>
                                                <el-button-group>
                                                    <client-only>
                                                        <el-button text round
                                                                   type="primary"
                                                                   @click="change_online()"
                                                                   :loading="send_loading"
                                                                   v-if="counter.setting.online_is_open=='1'"
                                                        >
                                                            <svg v-if="!online_open" t="1683706169266" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="31585" data-immersive-translate-effect="1" data-immersive-translate-mark="1" width="24" height="24"><path d="M887.68 567.253333c-72.96 60.586667-168.746667 114.986667-281.173333 155.946667-108.8 39.68-213.76 59.52-306.56 61.226667-1.92 0-2.773333 2.56-1.28 3.84C361.813333 841.813333 443.733333 874.666667 533.333333 874.666667c180.693333 0 330.24-132.48 357.76-305.493334 0.213333-1.92-1.92-3.2-3.413333-1.92zM205.866667 585.6c64 13.653333 179.84 13.44 334.933333-42.88 160.64-58.453333 250.24-136.106667 288.426667-187.733333 11.093333-14.933333 11.52-35.413333 0.853333-50.56C764.586667 210.773333 656.213333 149.333333 533.333333 149.333333 333.013333 149.333333 170.666667 311.68 170.666667 512c0 12.16 0.64 24.32 1.92 36.053333a42.666667 42.666667 0 0 0 33.28 37.546667z" p-id="31586" fill="#e6e6e6"></path><path d="M971.733333 260.906667c-22.4-61.866667-90.026667-99.626667-183.253333-112.213334-9.6-1.28-14.506667 11.306667-6.613333 16.853334 23.893333 17.066667 45.866667 36.693333 65.92 58.666666 3.84 4.266667 8.746667 7.68 13.866666 10.24 25.386667 12.373333 42.88 28.8 49.92 48.213334 29.44 80.64-106.666667 231.893333-349.013333 320s-443.733333 59.733333-472.96-20.906667c-8.106667-22.613333-3.413333-50.56 13.013333-81.28 3.2-5.76 5.12-12.16 5.546667-18.773333 1.92-28.373333 6.826667-55.893333 14.08-82.56 2.56-9.386667-8.96-16.213333-15.786667-9.173334-69.76 72.32-100.48 148.906667-77.013333 213.546667 47.146667 129.28 290.773333 155.306667 555.093333 59.093333 264.106667-95.786667 434.346667-272.426667 387.2-401.706666z" p-id="31587" fill="#e6e6e6"></path></svg>
                                                            <svg v-else t="1683706169266" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="31585" data-immersive-translate-effect="1" data-immersive-translate-mark="1" width="24" height="24"><path d="M887.68 567.253333c-72.96 60.586667-168.746667 114.986667-281.173333 155.946667-108.8 39.68-213.76 59.52-306.56 61.226667-1.92 0-2.773333 2.56-1.28 3.84C361.813333 841.813333 443.733333 874.666667 533.333333 874.666667c180.693333 0 330.24-132.48 357.76-305.493334 0.213333-1.92-1.92-3.2-3.413333-1.92zM205.866667 585.6c64 13.653333 179.84 13.44 334.933333-42.88 160.64-58.453333 250.24-136.106667 288.426667-187.733333 11.093333-14.933333 11.52-35.413333 0.853333-50.56C764.586667 210.773333 656.213333 149.333333 533.333333 149.333333 333.013333 149.333333 170.666667 311.68 170.666667 512c0 12.16 0.64 24.32 1.92 36.053333a42.666667 42.666667 0 0 0 33.28 37.546667z" p-id="31586" fill="#409eff"></path><path d="M971.733333 260.906667c-22.4-61.866667-90.026667-99.626667-183.253333-112.213334-9.6-1.28-14.506667 11.306667-6.613333 16.853334 23.893333 17.066667 45.866667 36.693333 65.92 58.666666 3.84 4.266667 8.746667 7.68 13.866666 10.24 25.386667 12.373333 42.88 28.8 49.92 48.213334 29.44 80.64-106.666667 231.893333-349.013333 320s-443.733333 59.733333-472.96-20.906667c-8.106667-22.613333-3.413333-50.56 13.013333-81.28 3.2-5.76 5.12-12.16 5.546667-18.773333 1.92-28.373333 6.826667-55.893333 14.08-82.56 2.56-9.386667-8.96-16.213333-15.786667-9.173334-69.76 72.32-100.48 148.906667-77.013333 213.546667 47.146667 129.28 290.773333 155.306667 555.093333 59.093333 264.106667-95.786667 434.346667-272.426667 387.2-401.706666z" p-id="31587" fill="#409eff"></path></svg>
                                                        </el-button>
                                                    </client-only>

                                                    <el-button text round  type="primary" @click="dialog_scene=true" :loading="send_loading"
                                                    >
                                                        <svg t="1682692794050" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2037" width="20" height="20"><path d="M784.321561 472.741296l-238.706562 137.818938v275.620827l238.706562 137.818939 238.706562-137.818939V610.560234zM0 610.560234v275.620827l238.706562 137.818939 238.706562-137.818939V610.560234l-238.706562-137.818938zM750.050119 137.801888l-238.706562-137.818938-238.706562 137.818938v275.620827l238.706562 137.818939 238.706562-137.818939z" fill="#e6e6e6" p-id="2038"></path></svg>
                                                    </el-button>
                                                    <el-button v-if="counter.setting.no_login_aiqs=='1' && !token" text round  type="primary" @click="submitFormNoLogin(ruleFormRef)" :loading="send_loading"
                                                    >
                                                        <svg t="1682692762162" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10566" width="20" height="20"><path d="M906.4448 28.859733L75.741867 284.3648c-57.8048 17.783467-68.317867 95.061333-17.3568 127.6416l245.435733 156.893867a70.980267 70.980267 0 0 0 84.002133-5.563734l306.3296-258.491733c16.605867-14.011733 39.0144 8.379733 25.002667 25.002667L460.680533 636.228267a70.946133 70.946133 0 0 0-5.546666 83.985066l156.859733 245.4016c32.5632 50.944 109.858133 40.430933 127.6416-17.3568L995.140267 117.572267c16.7424-54.459733-34.2528-105.454933-88.695467-88.712534z" fill="#409eff" p-id="10567"></path></svg>

                                                    </el-button>
                                                    <el-button v-else text round  type="primary" @click="submitForm(ruleFormRef)" :loading="send_loading"
                                                    >
                                                        <svg t="1682692762162" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10566" width="20" height="20"><path d="M906.4448 28.859733L75.741867 284.3648c-57.8048 17.783467-68.317867 95.061333-17.3568 127.6416l245.435733 156.893867a70.980267 70.980267 0 0 0 84.002133-5.563734l306.3296-258.491733c16.605867-14.011733 39.0144 8.379733 25.002667 25.002667L460.680533 636.228267a70.946133 70.946133 0 0 0-5.546666 83.985066l156.859733 245.4016c32.5632 50.944 109.858133 40.430933 127.6416-17.3568L995.140267 117.572267c16.7424-54.459733-34.2528-105.454933-88.695467-88.712534z" fill="#409eff" p-id="10567"></path></svg>

                                                    </el-button>

                                                </el-button-group>


                                            </el-form-item>
                                        </div>

                                    </el-form-item>
                                    <el-dialog
                                        v-model="dialog_scene"
                                        title="预设配置"
                                        width="30%"
                                        append-to-body
                                        class="mb_dialog"
                                    >
                                        <h6 class="mb-3">模型选择</h6>
                                        <div role="tablist" aria-orientation="horizontal"
                                             class="flex space-x-1 rounded-xl bg-gray-300/20 p-1 mb-2">
                                            <button
                                                v-for="(mod,mod_index) in model_list"
                                                class="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 "
                                                :class="model_is_select==mod?'bg-white':''"
                                                :key="mod_index"
                                                @click="model_is_select=mod"
                                                >{{ mod }}
                                            </button>
                                        </div>
                                        <h6 class="mb-3">场景选择</h6>
                                        <el-row :gutter="20">
                                            <el-col :span="18">
                                                <el-input
                                                    v-model="scene_search"
                                                    placeholder="请输入场景名称"
                                                    class="input-with-select"
                                                >
                                                    <template #append>
                                                        <el-button :icon="Search" @keydown.enter.native="scene_insearch()" @click="scene_insearch()" />
                                                    </template>

                                                </el-input>
                                            </el-col>
                                            <el-col :span="6">
                                                <el-button @click="scene_preset=true">预设场景</el-button>
                                            </el-col>

                                        </el-row>

                                        <ul class="list-none" v-loading="scene_loading">
                                            <li v-for="(oc,oc_index) in scene_model" :key="oc_index" class="py-2 px-4 cursor-pointer hover:bg-gray-200 focus:bg-gray-200 rounded mt-1" @click="selectedItem(oc_index)">
                                                <span class="fw-bold">{{oc.title}}</span>
                                                <p>
                                                    {{ oc.Instruction }}
                                                </p>

                                            </li>
                                            <client-only>
                                            <el-pagination
                                                class="mt-2"
                                                :current-page="s_page"
                                                :page-size="s_limit"
                                                :pager-count="4"
                                                background
                                                layout="prev, pager, next"
                                                :total="scene_count"
                                                @current-change="handleCurrentChangeScene"
                                            />
                                            </client-only>
                                            <el-empty v-show="scene_count==0" description="暂无数据" />
                                        </ul>
                                        <template #footer>
                                              <span class="dialog-footer">
                                                <el-button type="primary" @click="dialog_scene = false">
                                                  完成
                                                </el-button>
                                              </span>
                                        </template>
                                    </el-dialog>
                                    <el-dialog
                                        v-model="scene_preset"
                                        title="场景预设"
                                        width="30%"
                                        append-to-body
                                        class="mb_dialog"
                                    >
                                        <!--scene-->
                                        <el-form
                                            ref="formRefScene"
                                            :model="SceneForm"
                                            class="demo-dynamic"
                                        >
                                            <el-form-item
                                                v-for="(domain, index) in SceneForm.domains"
                                                :key="domain.key"
                                                :prop="'domains.' + index + '.value'"
                                                :rules="{
                                                    required: true,
                                                    message: '预设内容不得为空',
                                                    trigger: 'blur',
                                                  }"
                                            >
                                                <el-row :gutter="20">
                                                    <el-col :span="6">
                                                        <el-select v-model="domain.sel">
                                                            <el-option
                                                                v-for="item in domainOptions"
                                                                :key="item.value"
                                                                :label="item.label"
                                                                :value="item.value"
                                                            />
                                                        </el-select>
                                                    </el-col>
                                                    <el-col :span="16">
                                                        <el-input type="textarea" autosize v-model="domain.value" />

                                                    </el-col>
                                                    <el-col :span="2">
                                                        <el-button @click.prevent="removeDomain(domain)"
                                                        ><el-icon><CircleClose /></el-icon></el-button
                                                        >
                                                    </el-col>
                                                </el-row>


                                            </el-form-item>
                                            <el-form-item>
                                                <el-button @click="addDomain">新增</el-button>
                                                <el-button @click="resetForm(formRefScene)">重置</el-button>
                                            </el-form-item>
                                        </el-form>
                                        <!--scene preset-->
                                        <template #footer>
                                              <span class="dialog-footer">
                                                <el-button type="primary" @click="scene_preset = false">
                                                  完成
                                                </el-button>
                                              </span>
                                        </template>
                                    </el-dialog>
                                    <el-form-item style="margin-bottom:0;display:none;">
                                        <el-input></el-input>
                                    </el-form-item>
                                </div>

                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    </div>
    <client-only>
        <el-drawer
            v-model="drawer"
            title="Chat"
            :direction="direction"
            size="70%"
        >
            <template #default>
                <div class="sidebar sidebar_drawer">

                    <div class="tab-content">

                        <div class="tab-pane fade show active" id="nav-tab-chat" role="tabpanel">

                            <div class="d-flex justify-content-between align-items-center m-2">
                                <h3 class="mb-0 font-bold h3-color-black">Messages</h3>
                                <div>
                                    <div @click="login_dialog_click()" class="btn new_ant_btn" v-if="!token">
                                        登录
                                        <el-icon class="v-align"><UserFilled /></el-icon>
                                    </div>
                                    <NuxtLink to="/users/setting" class="btn new_ant_btn" v-else>个人中心
                                        <el-icon class="v-align"><UserFilled /></el-icon>

                                    </NuxtLink>
                                </div>
                            </div>

                            <div class="form-group input-group-lg search mb-3">
                                <i class="zmdi zmdi-search"></i>
                                <input type="text" class="form-control" v-model="qs_input" @keydown.enter.native="qs_search" placeholder="Search...">
                            </div>

                            <ul class="chat-list mb-2">
                                <li class="header d-flex justify-content-between mb-1 pl-2 pr-2">
                                    <div class="d-sm-flex align-items-center">
                                        <div class="dropdown inline-block">
                                            <div @click="all_message()" class="btn btn-link px-1 py-0 border-0 text-muted dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="zmdi zmdi-refresh"></i></div>
                                        </div>
                                        RECENT CHATS
                                    </div>
                                    <div class="dropdown">
                                        <div @click="delete_all()" class="ml-1 btn btn-link px-1 py-0 border-0 text-muted dropdown-toggle text-danger" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="zmdi zmdi-delete"></i></div>

                                    </div>
                                </li>
                                <li class="online" :class="ms_active==0?'active':''">
                                    <div class="card" @click="check_message(0)">
                                        <div class="card-body">
                                            <div class="media">
                                                <div class="avatar me-3">
                                                    <div class="avatar rounded-circle no-image  text-light overflow-hidden">
                                                        <img src="~/assets/images/bot-avatar.png" class="avatar rounded-circle" alt="">
                                                    </div>
                                                </div>
                                                <div class="media-body overflow-hidden">
                                                    <div class="d-flex align-items-center mb-1">
                                                        <h6 class="text-truncate mb-0 me-auto">{{ counter.setting.bot_name }}</h6>

                                                    </div>
                                                    <div class="text-truncate">
                                                        <i class="zmdi zmdi-circle text-success"></i> Online
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <el-skeleton :rows="5" animated v-if="data_load"/>
                                <div class="bot_info" v-else v-loading="left_loding">
                                    <li class="online" :class="ms_active==item[item.length-1].session_id?'active':''"
                                        v-for="(item,index) in messages" :key="index">
                                        <div class="hover_action">
                                            <button type="button" @click="change_sname(item[item.length-1].session_id)" class="btn btn-link text-primary"><i class="zmdi zmdi-edit"></i>
                                            </button>
                                            <button type="button" @click="delete_msg(item[item.length-1].session_id)" class="btn btn-link text-danger"><i class="zmdi zmdi-delete"></i>
                                            </button>
                                        </div>
                                        <div class="card" @click="check_message(item[item.length-1].session_id)">
                                            <div class="card-body">
                                                <div class="media">
                                                    <div class="avatar me-3">
                                                        <span class="status rounded-circle"></span>
                                                        <img class="avatar rounded-circle" src="@/assets/images/bot-avatar.png"
                                                             alt="avatar">
                                                    </div>
                                                    <div class="media-body overflow-hidden">
                                                        <div class="d-flex align-items-center mb-1">
                                                            <h6 class="text-truncate mb-0 me-auto" v-if="item[item.length - 1].message_b">{{
                                                                    item[item.length - 1].message_b
                                                                }}
                                                            </h6>
                                                            <h6 class="text-truncate mb-0 me-auto" v-else>{{
                                                                    item[item.length - 1].question
                                                                }}
                                                            </h6>
                                                            <p class="small text-muted text-nowrap ms-4 mb-0">
                                                                {{ item[item.length - 1].created_at }}</p>
                                                        </div>
                                                        <div class="text-truncate h-20" v-html="item[item.length - 1].message.replace(/\n/g, '<br />')"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </div>
                            </ul>
                            <el-pagination
                                :current-page="page"
                                :page-size="limit"
                                :pager-count="4"
                                background
                                layout="prev, pager, next"
                                :total="ms_count"
                                @current-change="handleCurrentChange"
                            />
                        </div>
                        <!--this is jiehu-->

                        <!--this is change jiehu-->
                    </div>

                </div>
            </template>

        </el-drawer>
    </client-only>

    <Login :login_dialog="login_dialog"  @handleCancel="handleCancel"/>
    <Charge :dialogFormVisible="dialogFormVisible"  @handleCancels="handleCancels"/>
    <div class="tongji" v-if="counter.setting.script_tongji" v-html="counter.setting.script_tongji"></div>

</template>

<script lang="ts" setup>
import { useCounter } from '~/store/counter'

import {ref} from 'vue'
import ClipboardJS from "clipboard";
import {ElMessage,ElMessageBox,ElDrawer} from 'element-plus'
import type { FormInstance, FormRules ,MicroPhone} from 'element-plus'
import html2canvas from "html2canvas";
import Prism from 'prismjs'
import hljs from 'highlight.js'
import markdownIt from 'markdown-it'
import markdownItKatex from 'markdown-it-katex'
import jsPDF from 'jspdf'
import fileSaver from 'file-saver';
import { asBlob } from 'html-docx-js-typescript'
import Speech from 'speak-tts'

import {Search, UserFilled} from "@element-plus/icons-vue";
const counter = useCounter()
const renderMarkdown = (markdown: any) => {
    return markdownIt({
        linkify: true, // 添加linkify插件
        highlight: (str: string, lang: string) => {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return `<pre class="hljs"><span ref="preCopy" class="pre_copy">Copy</span><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`
                } catch (__) {}
            }

            return `<pre class="hljs"><span ref="preCopy" class="pre_copy">Copy</span><code>${markdownIt().utils.escapeHtml(str)}</code></pre>`
        },
        breaks: true // 添加breaks插件
    }).use(markdownItKatex).render(markdown)
}
useHead({
    title: counter.setting.title,
    meta: [
        { name: 'description', content: counter.setting.description},
        { name: 'keywords', content: counter.setting.keywords}
    ],

})
const login_dialog = ref(false)
const login_dialog_click = () => {
    login_dialog.value = true
}
const scene_preset = ref(false)
const handleCancel = () => {
    login_dialog.value = false
}
const dialogFormVisible = ref(false)
const charge = ()=>{
    dialogFormVisible.value = true
}
const handleCancels = () => {
    dialogFormVisible.value = false
}
const token = useCookie('token')
const router = useRouter();
const messages = ref([]) as any
const ms_active = ref(0)
const me_message = ref([]) as any
const loadins = ref(false)
const send_loading = ref(false)
const data_load = ref(false)
const scene_model = ref([]) as any
const m_last = ref({}) as any

const page = ref(1);
const limit = ref(8);
const ms_count = ref(0)
const left_loding = ref(false)
const getToken = (token: any) => {
    console.log(token)
    login_dialog.value = false
    token.value = token
}
import { addfont } from '@/assets/js/font'

const exportPdf = (info:any)=>{
    const doc = new jsPDF();
    addfont(doc)
    doc.addFont('bolds', 'b', 'normal')

//使用字体时，使用这句即可
    doc.setFont('b');
    doc.text(info, 10, 10);
    doc.save('answer.pdf');
}

const exportWord = (info:any)=>{
    asBlob(info).then((blob: any) => {
        fileSaver.saveAs(blob, 'answer.docx');
    });
}
onMounted(async () => {

    // 先获取数据
    // nextTick保证你的获取到的已转成html的markdown内容已经更新到HTML的DOM结构中了。
    await nextTick()
    //  然后执行高亮即可
    Prism.highlightAll()
    speechInit()

})
const speech = ref()

const speechInit = () =>{
    speech.value = new Speech();
    speech.value.setLanguage('zh-CN');
        speech.value.init().then(()=>{
    })
}

const speak_is_audio = ref(false)
const speak=(info:any)=>{
    speech.value.cancel()
    speak_is_audio.value = true
    speech.value.speak({text:info}).then(()=>{
        speak_is_audio.value = false
        ElMessage.success('语音播放完成')
    })
}

const stop_speak = ()=>{
    speech.value.cancel()
    speak_is_audio.value = false
}
const code_copy = () => {
    if (process.client) {
        const clipboard = new ClipboardJS('.pre_copy', {
            target: (trigger: any) => {
                return trigger.nextElementSibling
            }
        })
        clipboard.on('success', (e: any) => {
            if (e.trigger.innerText === 'Copy') {
                e.trigger.innerText = 'Copied'
                ElMessage.success('复制成功')
                setTimeout(() => {
                    e.trigger.innerText = 'Copy'
                }, 1000)
            }


        })
        clipboard.on('error', (e: any) => {
            ElMessage.error('复制失败')
        })
    }
}
code_copy()
const last_msg = ref(0)
// 请求左侧列表
const all_message = () => {
    left_loding.value = true
    data_load.value = true
    get_message({
        page: page,
        limit: limit,
    }).then((res: any) => {
        messages.value = res._rawValue.data
        m_last.value = res._rawValue.m_last
        ms_count.value = res._rawValue.count
        max_session.value = res._rawValue.max_session
        left_loding.value = false
        data_load.value = false
    }).catch((err: any) => {
        data_load.value = false
        left_loding.value = false
        console.log(err)
    })
}
const get_limit= ()=>{
    get_user_limit().then((res: any) => {
        last_msg.value = res._rawValue.last_msg
    }).catch((err: any) => {
        console.log(err)
    })
}
if (token.value){
    all_message()
    get_limit()
}
const max_session = ref(0)
const s_page = ref(1)
const s_limit = ref(4)
const change_status = ref(true)
const model_list = ref([]) as any
const model_is_select = ref()
const scene_all= () => {
    get_scene_f({
        page: s_page,
        limit: s_limit,
    }).then((res: any) => {
        scene_model.value = res._rawValue.data
        scene_count.value = res._rawValue.count
        model_list.value = res._rawValue.model
        model_is_select.value = res._rawValue.model[0]
    }).catch((err: any) => {
        console.log(err)
    })
}
scene_all()


const handleCurrentChange = (val: number) => {
    left_loding.value = true

    get_message({
        page: val,
        limit: limit,
    }).then((res: any) => {
        page.value = val
        messages.value = res._rawValue.data
        ms_count.value = res._rawValue.count
        left_loding.value = false
    }).catch((err: any) => {
        left_loding.value = false
        console.log(err)
    })

}


const scene_loading = ref(false)
const handleCurrentChangeScene = (val: number) => {
    scene_loading.value = true
    if (change_status.value) {
        if (scene_search.value) {
            s_page.value = val
            scene_searchs({
                search:scene_search.value,
                page:val,
                limit:s_limit.value
            }).then((res: any) => {
                s_page.value = val
                scene_model.value = res._rawValue.data
                scene_count.value = res._rawValue.count
                ElMessage.success('搜索完成')
                scene_loading.value = false

            }).catch((err: any) => {
                ElMessage.error(err.message)
                scene_loading.value = false

            })
        }else{
            get_scene_f({
                page: val,
                limit: s_limit,
            }).then((res: any) => {
                s_page.value = val
                scene_model.value = res._rawValue.data
                scene_count.value = res._rawValue.count
                scene_loading.value = false
            }).catch((err: any) => {
                console.log(err)
                scene_loading.value = false

            })
        }
        change_status.value = true
    }
}


const handleSizeChange = (val: number) => {
    limit.value = val
    left_loding.value = true
    get_message({
        page: page,
        limit: val,
    }).then((res: any) => {
        messages.value = res._rawValue.data
        ms_count.value = res._rawValue.count
        left_loding.value = false
    }).catch((err: any) => {
        left_loding.value = false
        console.log(err)
    })
}

// 单独请求聊天记录
const check_message = (id: number) => {
    ms_active.value = id
    loadins.value = true
    c_message({
        session_id: id,
    }).then((res: any) => {
        me_message.value = res._rawValue.data
        loadins.value = false
        down_message()
    }).catch((err: any) => {
        loadins.value = false
    })
}
const normal_message = ref([])
const normal_loading = ref(true)
const get_normal_tips = () => {
    get_normal().then((res: any) => {
        normal_message.value = res._rawValue.data
        normal_loading.value = false
    }).catch((err: any) => {
        console.log(err)
    })
}
get_normal_tips()
const down_message = () => {
    setTimeout(() => {
        let chat = document.getElementsByClassName('chat-content')[0]
        chat.style.transition = "500ms"; // 过渡时间为0.5秒
        chat.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' });
    }, 100)
}
// 发送消息
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    message_input:'',
})

const rules = reactive<FormRules>({
    message_input: [
        {required: true, message: '请输入内容', trigger: 'blur'},
    ],
})
const { public: { baseUrl } } = useRuntimeConfig()


const headers = {
    'Authorization': `Bearer ${token.value}`,
    'Accept': 'text/event-stream',
}
const is_done = ref(true)
const streams = ref()
const up_stop = ref('start')
const stop_stream = ()=>{
    up_stop.value = 'end'
    is_done.value = true
    send_loading.value = false
    ruleForm.message_input = ''
}
const  submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (event.shiftKey) {
            // 按下shift键，插入换行符
            ruleForm.message_input += "\n";
            return false;
        }
        if (valid) {

                if (!token.value) {
                    ElMessage.warning('请先登录')
                    login_dialog_click()
                    return false
                }


            send_loading.value = true
            me_message.value.push({
                "session_id": ms_active.value,
                "question": ruleForm.message_input,
                "message": "",
            })
            down_message()
            if (online_open.value) {
                chat_online({
                    session_id: ms_active.value,
                    prompt: ruleForm.message_input,
                }).then((res: any) => {
                    me_message.value[me_message.value.length - 1].message = res._rawValue.data
                    down_message()
                    ruleForm.message_input = ''
                    send_loading.value = false
                    if (ms_active.value==0){
                        all_message()
                        setTimeout(() => {
                            if (ms_active.value == 0){
                                ms_active.value = m_last.value.session_id
                            }
                            check_message(ms_active.value)
                        }, 2000)
                    }
                }).catch((err: any) => {
                    me_message.value[me_message.value.length - 1].message = '联网错误'
                    down_message()
                    send_loading.value = false
                })
            }else{
            const res = await fetch(`${baseUrl}api/send_bot`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    info: ruleForm.message_input,
                    session_id: ms_active.value,
                    scene_preset: SceneForm.domains,
                    model_is_select:model_is_select.value,
                }),

            })

            up_stop.value = 'start'

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
                me_message.value[me_message.value.length - 1].message= '发送次数已达上限或余额不足'
                ElMessage.error('发送次数已达上限或余额不足')
                return false
            }
            if (res.status==403){
                send_loading.value = false
                me_message.value[me_message.value.length - 1].message= '禁止发送违禁词'
                ElMessage.error('禁止发送违禁词')
                return false
            }
            let reply_in = false;
            const stream = res.body?.getReader();
            const onData = ({ value }: { value: Uint8Array }) => {
                let result = new TextDecoder().decode(value);

                let arr  = result.split('\n\n').map(str => str.replace(/\n/g, ''));
                let new_arr: any[] = [];

                for (let i = 0; i < arr.length; i++) {
                    is_done.value = false
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
                                me_message.value[me_message.value.length - 1].message= JSON.parse(arr[i]).error.message
                            }
                            streams.value = ''
                        }

                        if (arr[i].includes('reply_content:')){
                            reply_in = true;
                        }
                        if (reply_in){
                            let replyContent = arr[i];
                            let content = replyContent.substring(14);
                            for (let i = 0; i < content.length; i++) {
                                setTimeout(() => {
                                    me_message.value[me_message.value.length - 1].message += content.charAt(i)
                                    down_message()
                                }, 1000)
                            }
                        }



                }

                for (let i = 0; i < new_arr.length; i++) {
                    setTimeout(() => {
                        if (new_arr[i].choices[0].delta.content){
                            me_message.value[me_message.value.length - 1].message += new_arr[i].choices[0].delta.content
                        }
                        down_message()
                    }, 100)

                }

            };


            const read = async () => {
                const result = await stream?.read();
                if (up_stop.value=='end'){
                    console.log('end')
                    up_stop.value = 'start'
                    stream?.cancel()
                    return false;
                }
                if (result?.done) {
                    console.log('done')
                    is_done.value = true
                    get_limit()
                    send_loading.value = false
                    ruleForm.message_input = ''
                    if (ms_active.value==0){
                            all_message()
                            setTimeout(() => {
                            if (ms_active.value == 0){
                                ms_active.value = m_last.value.session_id
                            }
                            check_message(ms_active.value)
                        }, 2000)
                    }
                } else {
                    send_loading.value = true
                    is_done.value = false
                    onData(result!);
                    await read();
                }
            };
            await read();
            }

        } else {
            console.log('error submit!', fields)
        }
    })
}

const cookie_message = useCookie('message')
if (counter.setting.no_login_aiqs=='1' && !token.value){
    if (cookie_message.value){
        me_message.value = cookie_message.value
    }

}

// audio send



// audio send end
const  submitFormNoLogin = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (event.shiftKey) {
            // 按下shift键，插入换行符
            ruleForm.message_input += "\n";
            return false;
        }
        if (valid) {

            send_loading.value = true
            me_message.value.push({
                "session_id": ms_active.value,
                "question": ruleForm.message_input,
                "message": "",
            })
            down_message()

            const res = await fetch(`${baseUrl}api/no_send_bot`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    info: ruleForm.message_input,
                    session_id: ms_active.value,
                    model_select:model_is_select.value,
                    scene_preset: SceneForm.domains,
                }),

            })

            up_stop.value = 'start'

            if (res.status==500){
                send_loading.value = false
                ElMessage.error('服务器错误')
                return false
            }

            if (res.status==402){
                send_loading.value = false
                me_message.value[me_message.value.length - 1].message= '未登录用户提问达到上限,,请登录继续免费使用'
                ElMessage.error('未登录用户提问达到上限,请登录继续免费使用')
                return false
            }
            if (res.status==403){
                send_loading.value = false
                me_message.value[me_message.value.length - 1].message= '禁止发送违禁词'
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
                    is_done.value = false
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
                            me_message.value[me_message.value.length - 1].message= JSON.parse(arr[i]).error.message
                        }
                        streams.value = ''
                    }

                }


                // console.log(new_arr)
                for (let i = 0; i < new_arr.length; i++) {
                    setTimeout(() => {
                        if (new_arr[i].choices[0].delta.content){
                            me_message.value[me_message.value.length - 1].message += new_arr[i].choices[0].delta.content
                        }
                        down_message()
                    }, 100)

                }

            };


            const read = async () => {
                const result = await stream?.read();
                if (up_stop.value=='end'){
                    console.log('end')
                    up_stop.value = 'start'
                    stream?.cancel()
                    return false;
                }
                if (result?.done) {
                    console.log('done')
                    is_done.value = true
                    send_loading.value = false
                    ruleForm.message_input = ''
                    cookie_message.value = me_message.value
                } else {
                    send_loading.value = true
                    is_done.value = false
                    onData(result!);
                    await read();
                }
            };
            await read();


        } else {
            console.log('error submit!', fields)
        }
    })
}

const qs_input = ref('')
const qs_search = ()=>{
    if (!qs_input.value) {
        ElMessage.warning('请输入内容')
        return
    }
    searchs({
        search:qs_input.value
    }).then((res: any) => {
        messages.value = res._rawValue.data
        ElMessage.success('搜索完成')
    }).catch((err: any) => {
        ElMessage.error(err.message)
    })
}

const handleCommand = (command: any) => {
    ruleForm.message_input = scene_model.value[command].Instruction
}

const delete_msg = (id: number) => {
    ElMessageBox.confirm('此操作将永久删除该会话, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        del_msg({
            session_id: id,
        }).then((res: any) => {
            ElMessage.success(res._rawValue.message)
            all_message()
        }).catch((err: any) => {
            console.log(err)
        })
    }).catch(() => {
        ElMessage.info('已取消删除')
    })
}

const delete_all = ()=>{
    ElMessageBox.confirm('此操作将永久删除所有会话, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        del_all().then((res: any) => {
            ElMessage.success(res._rawValue.message)
            all_message()
        }).catch((err: any) => {
            console.log(err)
        })
    }).catch(() => {
        ElMessage.info('已取消删除')
    })
}

const handleClick = (command: any) => {
    const input = document.createElement('input')
    input.setAttribute('readonly', 'readonly')
    input.setAttribute('value', command.replace(/&nbsp;/g, ' '))
    document.body.appendChild(input)
    input.select()
    if (document.execCommand('copy')) {
        document.execCommand('copy')
        ElMessage.success('复制成功')
    }
    document.body.removeChild(input)
}

const  posterimg  = ref();
// 绑定  需要把那个内容生成图片
const  poster  =ref();

const up_new_img = () => {
    html2canvas(poster.value,{
        backgroundColor:'#fff',//海报的背景颜色
        useCORS:true, // 允许跨域
        // 设置放⼤的倍数
        scale:1,
        // scrollX: 0,
        // width:'100%', //生成海报的w
        // height:'100%', //生成海报的h    默认是px
    }).then(canvas=>{
        // canvas 其实就是我们所讲的res 的意思 返回报文的意思
        let  baseImg = canvas.toDataURL("image/png");
        posterimg.value =baseImg;
        let save  = document.createElement('a');
        // <a href=''></a>
        save.href = baseImg;
        // 下载的名字
        save.download = 'yz'
        // 直接回调a的点击事件
        save.click()

    })
}


const drawer = ref(false)
const direction = ref('ltr')
const change_side = () => {
    drawer.value = true
}
const dialog_scene = ref(false)
const scene_search = ref('')
const scene_count = ref(0)
const scene_insearch = ()=>{
    scene_searchs({
        search:scene_search.value,
        page:s_page.value,
        limit:s_limit.value
    }).then((res: any) => {
        scene_model.value = res._rawValue.data
        scene_count.value = res._rawValue.count
        ElMessage.success('搜索完成')
    }).catch((err: any) => {
        ElMessage.error(err.message)
    })
}
const selectedItem = (item: any) => {
    ruleForm.message_input = scene_model.value[item].Instruction
    dialog_scene.value = false
}

const change_sname = (id: number) => {
    ElMessageBox.prompt('请输入新的会话备注', '会话备注', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',

    }).then(({ value }) => {
        change_session_name(id,value)
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '取消修改',
        })
    })
}

const change_session_name=(session_id:any,name:any)=>{
    c_session_name({
        session_id:session_id,
        session_name:name
    }).then((res: any) => {
        ElMessage.success(res._rawValue.message)
        all_message()
    }).catch((err: any) => {
        ElMessage.error(err.message)
    })
}

const online_open = ref(false)
const change_online = ()=>{
    online_open.value = !online_open.value
    const text  = online_open.value?'开启':'关闭'
    ElMessage.success('联网功能'+text+'成功')
}
const formRefScene = ref<FormInstance>()
const SceneForm = reactive<{
    domains: DomainItem[]
}>({
    domains: [
        {
            key: 1,
            value: '',
            sel: 'system',
        },
    ],
})
interface DomainItem {
    key: number
    value: string
    sel: string
}
const domainOptions = [
    {
        value: 'system',
        label: 'system',
    },
    {
        value: 'user',
        label: 'user',
    },
    {
        value: 'assistant',
        label: 'assistant',
    },
]
const removeDomain = (item: DomainItem) => {
    const index = SceneForm.domains.indexOf(item)
    if (index !== -1) {
        SceneForm.domains.splice(index, 1)
    }
}

const addDomain = () => {
    SceneForm.domains.push({
        key: Date.now(),
        value: '',
        sel: 'system',
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>
<style>
.v-align{
    vertical-align: -2px;
}
</style>


<template>
    <div class="main overflow-auto bg-ai">
        <div class="ai-header" style="top: 0px; height: 60px;">
            <div class="ai-header__left" @click="change_drawer()">
                <el-icon>
                    <Operation/>
                </el-icon>
            </div>
            <div class="ai-header__logo ai-header__logo--mobile"><span><a class="ai-header__link"><img
                :src="counter.setting.logo" style="width: 40px;"></a></span>
            </div>
            <div class="ai-header__right">
                <div class="ai-page__right">
                    <div placement="bottomRight">
                        <div>
                            <div>
                                <client-only>
                                    <el-tooltip class="item" effect="dark" :content="'额度：'+user_balance" placement="bottom">
                                        <div class="creation"><img
                                            src="@/assets/images/header_jifen.png"
                                            class="creation-count__icon">
                                        </div>
                                    </el-tooltip>
                                </client-only>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="editor-panel">
            <div class="editor-panel__left-panel mobile_hidden">
                <div class="editor-panel__left-panel-main">
                    <div class="editor-panel__title-wrap"><h4 class="editor-panel__title">AI绘画</h4></div>
                    <div class="ai-writer__left-panel">
                        <div class="left-panel-setting-block">
                            <div
                                 class="flex space-x-1 rounded-xl bg-gray-300/20 p-1 mb-2">
                                <button
                                    :class="activeDraw=='gpt'?'bg-white shadow':''"

                                    class="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none "
                                    @click="change_draw('gpt')"
                                    v-if="counter.setting.is_open_normal_draw==1"
                                >
                                    普通绘图
                                </button>
                                <button
                                    :class="activeDraw=='dream'?'bg-white shadow':''"

                                    class="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none "
                                    @click="change_draw('dream')"
                                    v-if="counter.setting.is_dream_open==1"
                                >
                                    精致绘图
                                </button>
                                <button
                                    :class="activeDraw=='midj'?'bg-white shadow':''"

                                    class="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none "
                                    @click="change_draw('midj')"
                                    v-if="counter.setting.midjourney_is_open==1"
                                >
                                    Midjourney
                                </button>
                            </div>
                            <div class="normal_draw" v-if="activeDraw=='gpt'">
                                <div class="left-panel-setting-block__header">
                                    <div class="left-panel-setting-block__title fs-5"> 图片尺寸</div>
                                </div>
                                <div class="UXmDHLrm">
                                    <span v-for="(s,s_index) in all_size" :key="s_index" :class="size==s.value?'OMJ2YPhL':''" @click="change_size(s.value)">{{ s.name }}</span>
                                </div>
                                <div class="left-panel-setting-block__header">
                                    <div class="left-panel-setting-block__title fs-5"> 图片数量</div>
                                </div>
                                <div class="UXmDHLrm">
                                    <span v-for="(i,i_index) in images_list" :key="i_index" :class="image_select==i.value?'OMJ2YPhL':''" @click="change_i(i.value)">{{i.name}}</span>
                                </div>
                            </div>

                            <div class="dream_draw" v-if="activeDraw=='dream'">
                                <div class="left-panel-setting-block__header">
                                    <div class="left-panel-setting-block__title fs-5"> 图片尺寸</div>
                                </div>
                                <client-only>
                                    <div class="slider-demo-block">
                                        <span class="demonstration">图片高度：</span>

                                        <el-slider :min="512" :max="1024"  v-model="value_height" :step="64" show-stops />
                                    </div>
                                </client-only>
                                <client-only>
                                    <div class="slider-demo-block">
                                        <span class="demonstration">图片宽度：</span>
                                        <el-slider :min="512" :max="1024"  v-model="value_width" :step="64" show-stops />
                                    </div>

                                </client-only>
                                <div class="left-panel-setting-block__header">
                                    <div class="left-panel-setting-block__title fs-5"> 图片数量</div>
                                </div>
                                <div class="UXmDHLrm">
                                    <span v-for="(i,i_index) in images_list" :key="i_index" :class="image_select==i.value?'OMJ2YPhL':''" @click="change_i(i.value)">{{i.name}}</span>
                                </div>
                            </div>

                            <div class="left-panel-setting-block__header">
                                <div class="left-panel-setting-block__title fs-5"> 帮我描述</div>
                            </div>
                            <el-input
                                v-model="draw_ai"
                                :autosize="{ minRows: 3, maxRows: 5 }"
                                type="textarea"
                                placeholder="请输入简单的描述，AI将智能输出绘图内容"
                                maxlength="500"
                            />
                            <el-button type="primary" class="w-100 mt-2 mb-2" :loading="draw_loading" @click="send_ai_draw()">生成绘图描述</el-button>
                            <div class="left-panel-setting-block__header">
                                <div class="left-panel-setting-block__title fs-5"> 灵感需求</div>
                                <div class="ai-writer__panel-section__optional fs-6 cursor-pointer" @click="change_prompt()">
                                    试试示例
                                </div>
                            </div>
                            <el-input
                                v-model="input2"
                                :autosize="{ minRows: 10, maxRows: 15 }"
                                type="textarea"
                                placeholder="请用中文输入Prompt，参考形式：画面主体，细节描述，修饰词"
                                maxlength="500"
                            />
                        </div>
                    </div>
                </div>
                <div class="left-panel-footer">
                    <div class="left-panel-footer__tips mb-2">
                        <div class="left-panel-footer__spend-tip"><img
                            src="~/assets/images/jifen.png"
                            class="left-panel-footer__icon mr-2"> 普通绘图{{ ai_draw_pay }}/Midj绘图{{ mj_midj }}
                        </div>
                        <div class="disclaimer">
                            <div class="disclaimer">
                                <client-only>
                                    <el-tooltip
                                        class="box-item"
                                        effect="dark"
                                        placement="top"
                                    >
                                        <template #content> 您应当合法合规使用本服务，并承担由此产生的所有责任。<br/>本服务生成的作品仅供个人学习交流使用，不可用于商业用途<br/>对您的使用不做保证且不承担任何责任。
                                        </template>
                                        <div class="d-sm-flex align-items-center">
                                            <svg role="img" aria-label="warning" focusable="false" data-icon="warning"
                                                 aria-hidden="true" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 class="gd_design_icon  gd_design_icon-warning">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                      d="M20.5 12C20.5 7.30558 16.6944 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM11.25 14V7H12.75V14H11.25ZM11.25 17V15.5H12.75V17H11.25Z"
                                                      fill="currentColor"></path>
                                            </svg>
                                            免责声明
                                        </div>

                                    </el-tooltip>
                                </client-only>


                            </div>
                        </div>
                    </div>
                    <div class="left-panel-footer__button-group">
                        <el-button :loading="draw_loading" v-if="activeDraw=='gpt'" @click="ai_draw()" class="w-100" type="primary" size="large"> <i class="zmdi zmdi-collection-image-o up_images"></i>开始绘图</el-button>
                        <el-button :loading="draw_loading" v-else-if="activeDraw=='dream'" @click="ai_draw_dreams()" class="w-100" type="primary" size="large"> <i class="zmdi zmdi-collection-image-o up_images"></i>开始绘图</el-button>
                        <el-button :loading="draw_loading" v-else-if="activeDraw=='midj'" @click="midj_ai_draw_send()" class="w-100" type="primary" size="large"> <i class="zmdi zmdi-collection-image-o up_images"></i>开始绘图</el-button>
                    </div>
                </div>
            </div>
            <div class="editor-panel__right-panel">
                <div class="main-body mt-2">
                    <div class="rlshRpVg">

                        <!--finish go-->
                        <div class="ernie-vilg-image" v-if="is_sc || is_finish">
                            <div>
                                <div class="ernie-vilg-item-desc" v-if="is_sc || is_finish" style="margin-bottom: 0px;">正在生成中，预计需要 30s</div>

                                <div class="eE9d1okq" style="margin-top: 20px;" v-if="is_sc">
                                    <div class="ernie-vilg-image-item" v-for="item in image_select">
                                        <img class="ernie-vilg-image-item-img" src="@/assets/images/loading2.gif">
                                    </div>
                                </div>
                                <div class="eE9d1okq" style="margin-top: 20px;" v-if="is_finish">
                                    <div class="ernie-vilg-image-item" v-for="(image,fi_index) in r_images" :key="fi_index">
                                        <img class="ernie-vilg-image-item-img" :src="image.url">

                                    </div>
                                </div>

                            </div>
                        </div>
                        <!--finish go end-->
                        <div
                            class="flex space-x-1 rounded-xl bg-gray-300/20 p-1 mb-2 pd-2">
                            <button
                                :class="activeName=='first'?'bg-white shadow':''"

                                class="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none "
                                @click="change_activeN('first')"
                            >
                                绘画广场
                            </button>
                            <button
                                :class="activeName=='second'?'bg-white shadow':''"

                                class="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none "
                                @click="activeName='second'"
                            >
                                我的绘画
                            </button>
                        </div>
                        <div class="all_draw mt-4 pb-14">
                            <div v-show="activeName=='first'">
                                <el-row :gutter="20" v-if="public_draw.length>0 && !ske_loading">
                                    <waterFull
                                        :images="public_draw"
                                        :columnCount="4"
                                        :columnGap="10"
                                        :width="1280"
                                        mode="JS"
                                        backgroundColor="#F2F4F8" />
                                    <!--<el-col-->
                                    <!--    v-for="(p,p_index) in public_draw" :key="p_index"-->
                                    <!--    :xs="12" :sm="6" :md="6" :lg="6" :xl="6"-->
                                    <!--&gt;-->
                                    <!--    <el-card :body-style="{ padding: '0px' }" class="mb-2" >-->

                                    <!--        <el-image-->
                                    <!--            :src="p.image"-->
                                    <!--            class="image"-->
                                    <!--            :zoom-rate="1.2"-->
                                    <!--            :preview-src-list="pub_srcList"-->
                                    <!--            fit="fill"-->
                                    <!--            :initial-index="p_index"-->


                                    <!--        />-->
                                    <!--        <div style="padding: 10px 0px" class="me_show_pic">-->
                                    <!--            <el-tooltip-->
                                    <!--                class="box-item"-->
                                    <!--                effect="dark"-->
                                    <!--                :content=p.title-->
                                    <!--                placement="bottom"-->
                                    <!--            >-->
                                    <!--                <span>{{ p.title }}</span>-->
                                    <!--            </el-tooltip>-->

                                    <!--        </div>-->
                                    <!--    </el-card>-->
                                    <!--</el-col>-->

                                </el-row>

                                <el-empty description="暂无数据哦~" v-else />
                                <div class="mt-10 flex justify-center">

                                    <el-pagination
                                        :current-page="public_page"
                                        :page-size="public_page_size"
                                        :pager-count="4"
                                        class="mr-4 ml-4"
                                        background
                                        layout="prev, pager, next"
                                        :total="public_draw_count"
                                        @current-change="public_change"
                                    />
                                </div>
                            </div>
                            <div v-show="activeName=='second'">
                                <client-only>
                                    <el-row :gutter="20" v-show="ske_loading">
                                        <el-col
                                            v-for="sk in 4"
                                            :xs="12" :sm="6" :md="6" :lg="6" :xl="6"
                                        >
                                            <el-skeleton>
                                                <template #template>
                                                    <el-skeleton-item variant="image" style=" height: 305px" />
                                                    <div style="padding: 14px">
                                                        <el-skeleton-item variant="p" style="width: 50%" />
                                                        <div>
                                                            <el-skeleton-item variant="text" style="margin-right: 16px" />
                                                        </div>
                                                    </div>
                                                </template>
                                            </el-skeleton>
                                        </el-col>
                                    </el-row>

                                </client-only>
                                <el-row :gutter="20" v-if="me_draw.length>0 && !ske_loading">
                                    <el-col
                                        v-for="(m,m_index) in me_draw" :key="m_index"
                                        :xs="12" :sm="6" :md="6" :lg="6" :xl="6"
                                    >
                                        <el-card :body-style="{ padding: '0px' }" class="mb-2" >
                                            <el-image
                                                :src="m.image"
                                                class="image"
                                                :zoom-rate="1.2"
                                                :preview-src-list="srcList"
                                                fit="fill"
                                                :initial-index="m_index"

                                            />



                                            <div style="padding: 10px 0px" class="me_show_pic">

                                                <el-popover
                                                    placement="top-start"
                                                    title="Prompt:"
                                                    :width="200"
                                                    trigger="hover"
                                                    :content="m.title"

                                                >
                                                    <template #reference>
                                                        <span class="w-25">{{ m.title }}</span>
                                                    </template>
                                                </el-popover>
                                                <div class="bottom">
                                                    <el-button-group>
                                                        <el-button size="small"  type="danger" :loading="draw_bottom" round class="button"
                                                                   v-if="m.is_public==0"
                                                                   @click="send_pub(0,m.id)"
                                                        >私密
                                                        </el-button>
                                                        <el-button size="small" type="primary" :loading="draw_bottom"  round  class="button"
                                                                   v-else
                                                                   @click="send_pub(1,m.id)"
                                                        >公开
                                                        </el-button>
                                                        <el-button size="small" type="danger"  :loading="draw_bottom" round class="button"
                                                                   @click="del_me_draw(m.id)"
                                                        >删除
                                                        </el-button>
                                                    </el-button-group>

                                                </div>

                                            </div>
                                            <div class="tags_up" v-if="m.type=='midjourney'">
                                                <el-tag v-for="(u,u_index) in 4" :key="u_index" @click="up_image_midj(u_index,m.title,m.prompt_id)" :loading="up_loading" class="mr-4 cursor-pointer mb-2 w-10">{{ 'U'+(u_index+1) }}</el-tag>
                                                <br>
                                                <el-tag v-for="(v,v_index) in 4" :key="v_index" @click="vp_image_midj(v_index,m.title,m.prompt_id)" :loading="up_loading" class="mr-4 cursor-pointer w-10">{{ 'V'+(v_index+1) }}</el-tag>

                                            </div>

                                        </el-card>
                                    </el-col>
                                </el-row>

                                <el-empty description="暂无数据哦~" v-else />
                                <div class="mt-10 flex justify-center">

                                    <el-pagination
                                        :current-page="me_page"
                                        :page-size="me_page_size"
                                        :pager-count="4"
                                        class="mr-4 ml-4"
                                        background
                                        layout="prev, pager, next"
                                        :total="me_draw_count"
                                        @current-change="me_change"
                                    />
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
        <client-only>
            <el-drawer
                v-model="drawer"
                title="配置"
                direction="ltr"
                size="80%"
                class="left_ai_draw"
            >
                <div class="editor-panel__left-panel">
                    <div class="editor-panel__left-panel-main">
                        <div class="editor-panel__title-wrap"><h4 class="editor-panel__title">AI绘画</h4></div>
                        <div class="ai-writer__left-panel">
                            <div class="left-panel-setting-block">
                                <div role="tablist" aria-orientation="horizontal"
                                     class="flex space-x-1 rounded-xl bg-gray-300/20 p-1 mb-2">
                                    <button
                                        class="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none "
                                        :class="activeDraw=='gpt'?'bg-white shadow':''"
                                        @click="change_draw('gpt')"
                                        v-if="counter.setting.is_open_normal_draw==1"
                                    >
                                        普通绘图
                                    </button>
                                    <button
                                        class="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none "
                                        :class="activeDraw=='dream'?'bg-white shadow':''"
                                        @click="change_draw('dream')"
                                        v-if="counter.setting.is_dream_open==1"
                                    >
                                        精致绘图
                                    </button>
                                    <button
                                        class="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none "
                                        :class="activeDraw=='midj'?'bg-white shadow':''"
                                        @click="change_draw('midj')"
                                        v-if="counter.setting.midjourney_is_open==1"
                                    >
                                        Midjourney
                                    </button>
                                </div>
                                <div class="normal_draw" v-if="activeDraw=='gpt'">
                                    <div class="left-panel-setting-block__header">
                                        <div class="left-panel-setting-block__title fs-5"> 图片尺寸</div>
                                    </div>
                                    <div class="UXmDHLrm">
                                        <span v-for="(s,s_index) in all_size" :key="s_index" :class="size==s.value?'OMJ2YPhL':''" @click="change_size(s.value)">{{ s.name }}</span>
                                    </div>
                                    <div class="left-panel-setting-block__header">
                                        <div class="left-panel-setting-block__title fs-5"> 图片数量</div>
                                    </div>
                                    <div class="UXmDHLrm">
                                        <span v-for="(i,i_index) in images_list" :key="i_index" :class="image_select==i.value?'OMJ2YPhL':''" @click="change_i(i.value)">{{i.name}}</span>
                                    </div>
                                </div>

                                <div class="dream_draw" v-if="activeDraw=='dream'">
                                    <div class="left-panel-setting-block__header">
                                        <div class="left-panel-setting-block__title fs-5"> 图片尺寸</div>
                                    </div>
                                    <client-only>
                                        <div class="slider-demo-block">
                                            <span class="demonstration">图片高度：</span>

                                            <el-slider :min="512" :max="1024"  v-model="value_height" :step="64" show-stops />
                                        </div>
                                    </client-only>
                                    <client-only>
                                        <div class="slider-demo-block">
                                            <span class="demonstration">图片宽度：</span>
                                            <el-slider :min="512" :max="1024"  v-model="value_width" :step="64" show-stops />
                                        </div>

                                    </client-only>
                                    <div class="left-panel-setting-block__header">
                                        <div class="left-panel-setting-block__title fs-5"> 图片数量</div>
                                    </div>
                                    <div class="UXmDHLrm">
                                        <span v-for="(i,i_index) in images_list" :key="i_index" :class="image_select==i.value?'OMJ2YPhL':''" @click="change_i(i.value)">{{i.name}}</span>
                                    </div>
                                </div>

                                <div class="left-panel-setting-block__header">
                                    <div class="left-panel-setting-block__title fs-5"> 帮我描述</div>
                                </div>
                                <el-input
                                    v-model="draw_ai"
                                    :autosize="{ minRows: 3, maxRows: 5 }"
                                    type="textarea"
                                    placeholder="请输入简单的描述，AI将智能输出绘图内容"
                                    maxlength="500"
                                />
                                <el-button type="primary" class="w-100 mt-2 mb-2" :loading="draw_loading" @click="send_ai_draw()">生成绘图描述</el-button>
                                <div class="left-panel-setting-block__header">
                                    <div class="left-panel-setting-block__title fs-5"> 灵感需求</div>
                                    <div class="ai-writer__panel-section__optional fs-6 cursor-pointer" @click="change_prompt()">
                                        试试示例
                                    </div>
                                </div>
                                <el-input
                                    v-model="input2"
                                    :autosize="{ minRows: 10, maxRows: 15 }"
                                    type="textarea"
                                    placeholder="请用中文输入Prompt，参考形式：画面主体，细节描述，修饰词"
                                    maxlength="500"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="left-panel-footer">
                        <div class="left-panel-footer__tips mb-2">
                            <div class="left-panel-footer__spend-tip"><img
                                src="@/assets/images/jifen.png"
                                class="left-panel-footer__icon mr-2"> 普通绘图{{ ai_draw_pay }}/Midj绘图{{ mj_midj }}
                            </div>
                            <div class="disclaimer">
                                <div class="disclaimer">
                                    <el-tooltip
                                        class="box-item"
                                        effect="dark"
                                        placement="top"
                                    >
                                        <template #content> 您应当合法合规使用本服务，并承担由此产生的所有责任。<br/>本服务生成的作品仅供个人学习交流使用，不可用于商业用途<br/>对您的使用不做保证且不承担任何责任。
                                        </template>
                                        <div class="d-sm-flex align-items-center">
                                            <svg role="img" aria-label="warning" focusable="false" data-icon="warning"
                                                 aria-hidden="true" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 class="gd_design_icon  gd_design_icon-warning">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                      d="M20.5 12C20.5 7.30558 16.6944 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM11.25 14V7H12.75V14H11.25ZM11.25 17V15.5H12.75V17H11.25Z"
                                                      fill="currentColor"></path>
                                            </svg>
                                            免责声明
                                        </div>

                                    </el-tooltip>

                                </div>
                            </div>
                        </div>
                        <div class="left-panel-footer__button-group">
                            <el-button :loading="draw_loading" v-if="activeDraw=='gpt'" @click="ai_draw()" class="w-100" type="primary" size="large"> <i class="zmdi zmdi-collection-image-o up_images"></i>开始绘图</el-button>
                            <el-button :loading="draw_loading" v-else-if="activeDraw=='dream'" @click="ai_draw_dreams()" class="w-100" type="primary" size="large"> <i class="zmdi zmdi-collection-image-o up_images"></i>开始绘图</el-button>
                            <el-button :loading="draw_loading" v-else-if="activeDraw=='midj'" @click="midj_ai_draw_send()" class="w-100" type="primary" size="large"> <i class="zmdi zmdi-collection-image-o up_images"></i>开始绘图</el-button>
                        </div>
                    </div>
                </div>
            </el-drawer>
        </client-only>

    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import { useCounter } from '~/store/counter'

const counter = useCounter()

useHead({
    title: 'AI绘画 - '+counter.setting.title,
    meta: [
        { name: 'description', content: counter.setting.description},
        { name: 'keywords', content: counter.setting.keywords}
    ]
})


import {ElMessage} from "element-plus";
import {midj_ai_check} from "~/utils/api";
import {clearInterval} from "timers";
// 1
const onSuccess = () => {
    console.log('success')
}
const drawer = ref(false)
const change_drawer = () => {
    drawer.value = true
}
const user_balance = ref(0)
const get_user_balance = () => {
    get_siwei_limit().then(res => {
        user_balance.value = res._rawValue.data
    })
}


const activeDraw = ref('gpt')
const onError = () => {
    console.log('error')
}
const user_info = useCookie('user_info')
const input2 = ref('')
const size = ref('256x256')
const image_select = ref(1)
const srcList = ref([])
const pub_srcList = ref([])
const mj_midj = ref(0)
const all_size = [
    {
        name: '256x256(小图)',
        value: '256x256'
    },
    {
        name: '512x512(中图)',
        value: '512x512'
    },
    {
        name: '1024x1024(大图)',
        value: '1024x1024'
    },
]
const images_list = ref([
    {
        name:'1',
        value:1
    },
    {
        name:'2',
        value:2
    },
    {
        name:'3',
        value:3
    },
    {
        name:'4',
        value:4
    },
    {
        name:'5',
        value:5
    },
    {
        name:'6',
        value:6
    },
    {
        name:'7',
        value:7
    },
    {
        name:'8',
        value:8
    },
    {
        name:'9',
        value:9
    },
    {
        name:'10',
        value:10
    },
])
const prompt_info = ref('超级逼真的未来世界，真实照片，虚幻引擎')
const all_prompt =[
    '超级逼真的未来世界，真实照片，虚幻引擎',
    '二次元少女，美丽，大方，精致脸庞',
    '帅哥，二次元，赛博朋克风格，精致脸庞',
    '古风，青山相看两不厌，丹青水墨，中国风',
    '萌萌哒，可爱，二次元，精致脸庞',
    '兔子，可爱，高质量，高品质',
]
const change_prompt = ()=>{
    // 数组中all_prompt随机拿数据改变prompt_info并且判断不和上一次一样
    let random = Math.floor(Math.random()*all_prompt.length)
    if(input2.value == all_prompt[random]){
        change_prompt()
    }else{
        input2.value = all_prompt[random]
    }
}
const change_size  = (s_v:string)=>{
    size.value = s_v
}
const change_i= (i_v:number)=>{
    image_select.value = i_v
}
const r_images = ref([])
const draw_loading = ref(false)
const is_sc = ref(false)
const is_finish = ref(false)
const activeName = ref('first')
const me_draw = ref([])
const public_draw = ref([])


const change_draw = (v:string)=>{
    activeDraw.value = v
}
const ai_draw = ()=>{
    if(input2.value == ''){
        ElMessage.error('请填写关键词')
        return false;
    }
    is_sc.value = true
    draw_loading.value = true
    ai_draw_openai({
        prompt:input2.value,
        size:size.value,
        number:image_select.value,
    }).then((res:any)=>{
        r_images.value = res._rawValue.data
        is_finish.value = false
        is_sc.value = false
        ElMessage.success('生成成功')
        get_me_d()
        draw_loading.value = false
    }).catch((err:any)=>{
        ElMessage.error('生成失败')
        is_sc.value = false
        is_finish.value = false
        draw_loading.value = false
    })
}
const ai_draw_pay = ref('0')
const me_draw_count = ref(0)
const public_draw_count = ref(0)
const me_page = ref(1)
const public_page = ref(1)
const me_page_size = ref(16)
const public_page_size = ref(16)
const ske_loading= ref(false)
const token = useCookie('token')
if (token.value){
    get_user_balance()
}
const get_me_d = ()=>{
    ske_loading.value = true
    srcList.value = []
    get_me_draw({
        page:me_page.value,
        limit:me_page_size.value,
    }).then((res:any)=>{
        me_draw.value = res._rawValue.data
        me_draw_count.value = res._rawValue.count
        ai_draw_pay.value = res._rawValue.dw_m
        mj_midj.value = res._rawValue.mj_m
        ske_loading.value = false
        for (let i = 0; i < me_draw.value.length; i++) {
            srcList.value.push(me_draw.value[i].image)
        }
    }).catch((err:any)=>{
        console.log(err)
        ske_loading.value = false
    })
}
if (token.value){
    get_me_d()
}
const get_new_public=()=>{
    ske_loading.value = true
    pub_srcList.value = []

    get_public_draw({
        page:public_page.value,
        limit:public_page_size.value,
    }).then((res:any)=>{
        public_draw.value = res._rawValue.data
        public_draw_count.value = res._rawValue.count
        ske_loading.value = false
        for (let i = 0; i < public_draw.value.length; i++) {
            pub_srcList.value.push(public_draw.value[i].image)
        }

    }).catch((err:any)=>{
        console.log(err)
        ske_loading.value = false
    })
}
get_new_public()
const send_pub=(c:number,mid:number)=>{
    send_public({
        draw_id:mid
    }).then((res:any)=>{
        ElMessage.success(res._rawValue.message)
        get_me_d()
        get_new_public()
    }).catch((err:any)=>{
        console.log(err)
    })
}
const change_activeN = (v:string)=>{
    activeName.value = v
    get_new_public()
}
const image_type = ref([
    {
        name:'古风',
    },
    {
        name:'二次元',
    },
    {
        name:'写实照片',
    },
    {
        name:'油画'
    },
    {
        name:'水彩画'
    },
    {
        name:'油墨画'
    },
    {
        name:'黑白雕版画'
    },
    {
        name:'雕塑'
    },
    {
        name:'3D模型'
    },
    {
        name:'手绘草图'
    },
    {
        name:'炭笔画'
    },
    {
        name:'极简线条画'
    },
    {
        name:'浮世绘'
    },
    {
        name:'电影质感'
    },
    {
        name:'机械感'
    },

])
const get_info = (name:string)=>{
    if(input2.value == ''){
        input2.value = name
    }else{
        input2.value = input2.value+'，'+name
    }
}
const { public: { baseUrl } } = useRuntimeConfig()
const headers = {
    'Authorization': `Bearer ${token.value}`,
    'Accept': 'text/event-stream',
}
const streams = ref()
const last_content = ref('')
const draw_ai = ref('')
const send_ai_draw = async()=>{
    if (draw_ai.value==''){
        ElMessage.error('请输入内容')
        return false
    }
    input2.value = ''
    last_content.value = ''
    draw_loading.value = true
    const res = await fetch(`${baseUrl}api/draw_ai_send`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            content: draw_ai.value,
            type: 'draw_ai',
        }),

    })

    if (res.status==500){
        draw_loading.value = false
        ElMessage.error('服务器错误')
        return false
    }
    if (res.status==401){
        draw_loading.value = false
        ElMessage.error('请先登录')
        return false
    }
    if (res.status==402){
        draw_loading.value = false
        ElMessage.error('发送次数已达上限或余额不足')
        return false
    }
    if (res.status==403){
        draw_loading.value = false
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
                    input2.value = last_content.value
                }
            }, 100)

        }

    };


    const read = async () => {
        const result = await stream?.read();
        if (result?.done) {
            draw_loading.value = false
            draw_ai.value =''

        } else {
            onData(result!);
            await read();
        }
    };
    await read();
}
const value_height = ref(0)
const value_width = ref(0)

const ai_draw_dreams = ()=>{
    if(input2.value == ''){
        ElMessage.error('请填写关键词')
        return false;
    }
    is_sc.value = true
    draw_loading.value = true
    ai_draw_dream({
        prompt:input2.value,
        size:size.value,
        number:image_select.value,
        height:value_height.value,
        width:value_width.value
    }).then((res:any)=>{
        r_images.value = res._rawValue.data
        is_finish.value = true
        is_sc.value = false
        ElMessage.success('生成成功')
        get_me_d()
        draw_loading.value = false
    }).catch((err:any)=>{
        ElMessage.error('生成失败')
        is_sc.value = false
        draw_loading.value = false
    })
}
// midj
const midj_ai_draw_send = ()=>{
    if(input2.value == ''){
        ElMessage.error('请填写关键词')
        return false;
    }
    is_sc.value = true
    draw_loading.value = true
    midj_ai_draw({
        prompt:input2.value,
    }).then((res:any)=>{
        midj_ai_draw_check(res._rawValue.prompt_id)
        ElMessage.success('提交成功')
        get_me_d()
    }).catch((err:any)=>{
        ElMessage.error('提交失败')
        is_sc.value = false
        draw_loading.value = false
    })
}
const midj_interval = ref()
// 轮询midjourney
const midj_ai_draw_check = (midj_ai:any)=>{
    midj_ai_check({
        prompt_id:midj_ai
    }).then((res:any)=>{
        console.log(1)
        if (res._rawValue.info == 'finished'){
            r_images.value = res._rawValue.data
            is_finish.value = true
            is_sc.value = false
            draw_loading.value = false
            ElMessage.success('生成成功')
            get_me_d()
        }else{
            setTimeout(()=>{
                midj_ai_draw_check(midj_ai)
            },3000)
        }
    }).catch((err:any)=>{
        ElMessage.error('生成失败')
        is_sc.value = false
        draw_loading.value = false
    })
}
const up_loading = ref(false)

const up_image_midj = (index:number,title:any,prompt_id:any)=>{
    up_loading.value = true
    is_sc.value = true
    draw_loading.value = true
    up_midj_index({
        prompt:title,
        index:index,
        prompt_id:prompt_id
    }).then((res:any)=>{
        up_loading.value = false
        r_images.value = res._rawValue.data
        is_finish.value = true
        is_sc.value = false
        draw_loading.value = false
        get_me_d()
    }).catch((err:any)=>{
        up_loading.value = false
        is_sc.value = false
        draw_loading.value = false
        console.log(err)
    })
}

const vp_image_midj = (index:number,title:any,prompt_id:any)=>{
    up_loading.value = true
    is_sc.value = true
    draw_loading.value = true
    v_midj_index({
        prompt:title,
        index:index,
        prompt_id:prompt_id
    }).then((res:any)=>{
        up_loading.value = false
        r_images.value = res._rawValue.data
        is_finish.value = true
        is_sc.value = false
        draw_loading.value = false
        get_me_d()
    }).catch((err:any)=>{
        up_loading.value = false
        is_sc.value = false
        draw_loading.value = false
        console.log(err)
    })
}

const me_change = (val:number)=>{
    me_page.value = val
    get_me_d()
}

const public_change = (val:number)=>{
    public_page.value = val
    get_new_public()
}
const draw_bottom = ref(false)
const del_me_draw = (id:number)=>{
    draw_bottom.value = true
    del_me_d({
        draw_id:id
    }).then((res:any)=>{
        ElMessage.success(res._rawValue.message)
        draw_bottom.value = false
        get_me_d()
    }).catch((err:any)=>{
        draw_bottom.value = false
        console.log(err)
    })
}
</script>

<style>
.slider-demo-block {
    display: flex;
    align-items: center;
}
.slider-demo-block .el-slider {
    margin-top: 0;
    margin-left: 12px;
}
.slider-demo-block .demonstration {
    font-size: 14px;
    line-height: 44px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0;
    margin-right:10px
}
.slider-demo-block .demonstration + .el-slider {
    flex: 0 0 70%;
}
</style>

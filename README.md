<div align="center">
<h1 align="center">ChatAix</h1>

汇聚：智能问答，AI绘图，思维导图，白板，各种智能小应用一体化的AI系统

[演示 Demo](https://www.chataix.top/) / [QQ群](https://github.com/Apple-ljj/chataix/assets/21351751/fd098516-6692-4a1f-8f02-d3a307f28541)

</div>

## 部分界面
![FXSBIO98JVYEP8WUC7SSMBJ](https://github.com/Apple-ljj/chataix/assets/21351751/0e1bf2ad-6ce5-4c80-89f4-3597f3f6daf8)
![3NJ7HUBSNXEMT1H8V@$20 E](https://github.com/Apple-ljj/chataix/assets/21351751/f341882b-cddd-4f42-897f-ebbfc8f679ca)
![IW101H78A6`Y_16L46 `XB1](https://github.com/Apple-ljj/chataix/assets/21351751/4adf9f5c-6f8f-455f-98c7-f94a3a6ccbe8)
![image](https://github.com/Apple-ljj/chataix/assets/21351751/7360e50b-f40a-4caa-b363-6954a3d7a9bb)
![8(UNBTP(B A(3S~`QA2UA6J](https://github.com/Apple-ljj/chataix/assets/21351751/65600a25-cef3-4d84-8041-46480f6f034f)

## 主要功能

- 1.AI智能问答+白板+思维导图
- 2.AI绘图-根据关键词绘图（接入Dalle2+DreamStudio+Midjourney+精美绘图+国风绘图+梦幻绘图+二次元绘图+2.5次元元绘图+艺术绘图多种绘图模型）
- 3.AI小应用-自主创建AI场景小应用-小应用分类（可根据需求创建小应用，适用于：自媒体，运营，编辑编等）
- 4.免登录回答-限制提问多少次后需要登录（根据需求设置）
- 5.签到奖励-可设置连续签到多少天获得多少余额或者会员，提高用户粘性（根据需求设置）
- 6.VIP功能-限制VIP每天免费对话和绘画次数（根据需求设置自己的会员套餐）
- 7.邀请码-用户可以通过分享邀请注册，达到注册次数奖励VIP或者额度
- 8.VIP卡密兑换充值额度，自定义充值额度，会员套餐购买（已对接支付宝微信）
- 9.场景功能-实现场景指定场景内容（包含180+场景选择:如：扮演医生，律师等等）
- 10.生成图片-截图当前对话记录生成图片下载
- 11.key池管理-轮询KEY监听Event请求
- 12.违禁词库-禁止发送某些词汇
- 13.风控中心-检测用户操作
- 14.优惠卷-购买折扣减价
- 15.签到-每日签到奖励-连续签到奖励
- 16.模型指定用户组或会员组选择
- 17.KEY指定模型可用
- 18.自定义预设回复内容


### 本地开发
打开终端，按顺序执行下面命令
```
npm install -g pnpm
```
```
pnpm install
```
```
pnpm run dev
```

### 服务器部署 
打开终端，按顺序执行下面命令
```
npm install -g pnpm
```
```
pnpm install
```
```
pnpm run build
```
```
pm2 start ecosystem.config.js
//如果运行pm2 start ecosystem.config.js报错 先运行pm2 update
```







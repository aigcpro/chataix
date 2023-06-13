import { defineStore } from 'pinia'

interface CounterState {
    setting:any
}
// if (process.client) {
// document.onkeydown = () => {
//   //禁用F12
//   if (window.event && window.event.keyCode == 123) {
//     return false;
//     //禁用ctrl+shift+i,
//   } else if (
//     window.event.ctrlKey &&
//     window.event.shiftKey &&
//     window.event.keyCode == 73
//   ) {
//     return false;
//     //屏蔽Shift+F10
//   } else if (window.event.shiftKey && window.event.keyCode == 121) {
//     return false;
//   }
// };
// // 通过高顿判断是否打开控制台
//     var threshold = 200;
//     setInterval(function () {
//         //当浏览器窗口宽度或高度与页面的宽度和高度的差值大于00的时候触发页面刷新
//         if (
//             window.outerWidth - window.innerWidth > threshold ||
//             window.outerHeight - window.innerHeight > threshold
//         ) {
//             console.log("打开控制窗口");
//             // window.open('about:blank','_self');
//         }
//     },1000);
// document.oncontextmenu = new Function("event.returnValue=false");
// }

// @ts-ignore
export const useCounter = defineStore('counter', {
    state: (): CounterState => ({
        setting: {}
    }),

    actions: {
        increment() {
            this.setting
        }
    },
    getters: {
        doubleCount() {
            return this.setting
        }
    },
    persist: process.client && {
        storage: persistedState.cookiesWithOptions({
            sameSite: 'strict',
        }),
        paths: ['setting']
    }
})

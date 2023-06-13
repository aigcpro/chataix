import piniaPersist from "pinia-plugin-persist";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.$pinia.use(piniaPersist)
});

import { ElMessage } from 'element-plus'
const fetch = (url: string, options?: any): Promise<any>  => {
    const token = useCookie("token");
    const headers = { // headers信息
        'Authorization' : `Bearer ${token.value}`,
    }
    const { public: { baseUrl } } = useRuntimeConfig()
    const reqUrl = baseUrl + url
    return new Promise(async (resolve, reject) => {
        useFetch(reqUrl, { ...options, headers }).then(({ data,error }: any) => {

            if (!data._rawValue) {
                if(error.value.status==500){
                    ElMessage.error("服务器错误")
                }else{
                    ElMessage.error(error.value.data.message)
                }

                // 这里处理错误回调
                reject(error)
            }else {

                resolve(ref(data))
            }
        }).catch((err: any) => {
            reject(err)
        })
    })
}

export default new class Http {

    get(url: string, params?: any): Promise<any> {
        return fetch(url, { method: 'get', params })
    }

    post(url: string, params?: any): Promise<any>  {
        return fetch(url, { method: 'post', params })
    }

    put(url: string, body?: any): Promise<any>  {
        return fetch(url, { method: 'put', body })
    }

    delete(url: string, body?: any): Promise<any>  {
        return fetch(url, { method: 'delete', body })
    }


}

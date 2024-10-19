/**
 * 1. 发送请求的时候，如果有token，需要附带到响应头中
 * 2. 响应的时候，如果有token，保存token到本地(cookie,localstorage)
 * 3. 响应的时候，如果响应的消息码是403(没有token，token失效)，在本地删除token
 **/
import axios, {type AxiosError, AxiosHeaders} from "axios";
import type {AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosInterceptorOptions} from "axios";
import { ElMessage } from 'element-plus'
type Result<T> = {
    code: number,
    msg: string,
    data: T
}


export class Request {
    instance: AxiosInstance
    baseConfig: AxiosRequestConfig = {baseURL: "http://localhost:9527", timeout: 1000 * 60}

    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(Object.assign(this.baseConfig, config))
        /**
         * 请求拦截器
         * 在发送请求之前所需要做的事情
         **/
        this.instance.interceptors.request.use((config: AxiosRequestConfig | any) => {
            const token: string | null = localStorage.getItem('token')
            if (token) {
                config.headers!.authorization = token
            }
            return config
        }, (error: any) => {
            return Promise.reject(error)
        })

        /**
         * 响应拦截器
         * 在响应接收的时候需要先执行的动作
         **/
        this.instance.interceptors.response.use((res: AxiosResponse) => {
            // 如果服务端给我们返回了新的token，保存token到本地(这里保存到localstorage)
            if (res.headers['authorization']) {
                localStorage.setItem('token', res.headers['authorization'])
            }
            return res.data
        }, (error: AxiosError) => {
            // 处理错误响应
            let message;
            switch (error.status) {
                case 400:
                    message = "请求错误"
                    ElMessage({message:"请求错误", type:"warning"})
                    break
                case 403:
                    ElMessage({message:"无权限", type:"warning"})
                    localStorage.removeItem("token")
                    break
                case 404:
                    message = "资源不存在"
                    ElMessage({message:"资源不存在", type:"warning"})
                    break
                case 500:
                    message = "服务器错误"
                    ElMessage({message:"服务器错误", type:"warning"})
                    break
                default:
                    message = "连接错误"
                    ElMessage({message:"连接错误", type:"warning"})

            }
            return Promise.reject(error)
        })


    }

    public get<T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<Result<T>> {
        return this.instance.get(url, config);
    }
    public post<T = any>(
        url: string,
        data?:any,
        config?: AxiosRequestConfig
    ): Promise<Result<T>> {
        return this.instance.post(url,data, {withCredentials:true,...config});
    }
}

export default new Request({})
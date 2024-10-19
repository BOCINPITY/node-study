import {reactive} from 'vue'
import {defineStore} from 'pinia'
import {login, logout, whoAmI} from "@/service/loginService"
import {ElLoading} from "element-plus";

type L = {
    loginId: string,
    loginPwd: string
}

export const useUserStore = defineStore('userStore', () => {
    const user:any = reactive({data: null, isLoading: false})
    const setUser = (value:any) => {
        user.data = value
    }
    const setIsLoading = (value: boolean) => {
        user.isLoading = value
    }
    const Login = async ({loginId, loginPwd}: L) => {
        setIsLoading(true)
        const loading = ElLoading.service({
            lock: true,
            text: 'Loading...',
            background: 'rgba(0, 0, 0, 0.3)',
            fullscreen: false,
        })
        const data = await login({loginId, loginPwd})
        setTimeout(() => {
            loading.close()
        }, 2000)

        setUser(data.data)
        setIsLoading(false)
    }
    const LoginOut = () => {
        setUser(null)
        logout()
    }
    const WhoAmI = async () => {
        setIsLoading(true)
        try {
            const data = await whoAmI()
            setUser(data)
        } catch (err) {
            setUser(null)
        }
        setIsLoading(false)
    }
    return {
        user,
        setUser,
        setIsLoading,
        Login,
        LoginOut,
        WhoAmI
    }
})

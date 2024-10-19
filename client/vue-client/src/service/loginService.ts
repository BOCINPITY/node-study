import request from "@/service/request"
import {ElMessage} from "element-plus";
type L = {
    loginId: string,
    loginPwd: string
}
export const login = async (data:L) => {
    return await request.post("/api/admin/login", data)
}
export const whoAmI = async () => {
    return await request.get("/api/admin/whoami")
}
export const logout = () => {
    localStorage.removeItem('token')
    ElMessage({message: "logout success", type: "info"})
}


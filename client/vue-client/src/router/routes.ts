import Home from "@/views/Home.vue";

const routes = [
    {path: '/', component: Home},
    {path: '/about', component: () => import("@/views/About.vue")},
    {path: '/login', component: () => import("@/views/Login.vue")},
]

export default routes

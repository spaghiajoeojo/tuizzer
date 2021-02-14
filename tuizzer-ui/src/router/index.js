import Vue from 'vue'
import Router from 'vue-router'
import Join from "@/view/Join";
import Home from "@/view/Home";
import Buzzer from "@/view/Buzzer";
import Dashboard from "@/view/Dashboard";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard
        },
        {
            path: '/join',
            name: 'Join',
            component: Join
        },
        {
            path: '/buzzer/:id',
            name: 'Buzzer',
            component: Buzzer
        }
    ]
})

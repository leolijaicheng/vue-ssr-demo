import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const page1 = () => import('./views/page1.vue')
const page2 = () => import('./views/page2.vue')

export function createRouter(){
    return new Router({
        mode:'history',
        fallback:false,
        scrollBehavior:() => ({ y:0 }),
        routes:[
            { path:'/',redirect:'/view/user' },
            { name:'user',path:'/view/user',component:page1 },
            { name:'movie',path:'/view/move',component:page2 }
        ]
    })
}
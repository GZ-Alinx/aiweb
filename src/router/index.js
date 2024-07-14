import { createRouter,createWebHashHistory } from 'vue-router'
import login from "@/views/login/login.vue"
import frame from "@/views/main/frame.vue"
import { useAuthStore } from '@/stores/auth'
import userlist from '@/views/user/userlist.vue'
import userrole from '@/views/user/userrole.vue'
import userpermision from '@/views/user/userpermision.vue'
import Dashbord from '@/views/dashbord/Dashboard.vue'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'frame',
      component: frame,
      children: [
        {
          path: '/userlist',
          name: 'userlist',
          component: userlist
        },
        {
          path: '/userpermission',
          name: 'userpermision',
          component: userpermision
        },
        {
          path: '/userrole',
          name: 'userrole',
          component: userrole
        },

      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})

// 全局导航守卫
router.beforeEach((to, from) => {
  // 判断用户是否登录 如果没有登录 并且访问的页面不是的登录页面，则跳转到登录页
  const authstroe = useAuthStore()
  if(!authstroe.is_logined && to.name != 'login'){
    return {name: 'login'}
  }
  console.log('登录')
})

export default router

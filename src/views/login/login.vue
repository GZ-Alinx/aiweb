<template>
  <div class="split-container">
    <div class="left-side">
      <div class="illustration">
      </div>
    </div>
    <div class="right-side">
      <div class="login-box">
        <h1 class="login-title">AI运维管理系统</h1>
        <form @submit.prevent="handleSubmit">
          <div class="input-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="form.username" required placeholder="Enter your username" />
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="form.password" required placeholder="Enter your password" />
          </div>
          <div class="button-group">
            <button type="submit" @click="OnSubmit" class="login-button">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup name="login">
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router'
import authHttp from '@/api/authHttp'
import {ElMessage} from 'element-plus'


const authStore = useAuthStore()
const router = useRouter()

let form = reactive({
  username: '',
  password: ''
})

const OnSubmit = async () => {
  // console.log(form.username)
  // console.log(form.password)
  if(!form.username){
        ElMessage.error('请填写用户信息')
        return;
    }
    if(!form.password){
        ElMessage.error('请填写密码信息')
        return;
    }
  let pwdRgx = /^[0-9a-zA-Z_-]{6,20}/
  // 验证密码格式问题
  if (!pwdRgx.test(form.password)) {
    ElMessage.warning('密码格式不满足')
    return;
  }

  // 原生 axios 用法
  // axios.post('http://localhost:8000/auth/login', {
  //   username: form.username,
  //   password: form.password
  // }).then((res) => {
  //   console.log('登陆成功')
  //   let data = res.data
  //   let user = data.user
  //   let token = data.token
  //   // 存储用户信息到持久化中
  //   authStore.setUserToken(user, token)
  //   // 跳转到首页
  //   // router.push('/')
  //   router.push({name: 'frame'})

  // }).catch((err)=> {
  //   console.log('发生错误')
  //   console.log(err)
  // })


  // 封装的 axios 用法
  // authHttp.login(form.username, form.password).then(res => {
  //   console.log('登陆成功')
  //   let data = res.data
  //   let user = data.user
  //   let token = data.token
  //   // 存储用户信息到持久化中
  //   authStore.setUserToken(user, token)
  //   // 跳转到首页
  //   // router.push('/')
  //   router.push({name: 'frame'})
  // }).catch((err) => {
  //   console.log('发生错误')
  //   console.log(err)
  // })

  // 改成了异步调用
  try {
    let data = await authHttp.login(form.username, form.password)
    console.log("data :", data);

    let token = data.token;
    let user = data.user;

    // 存储用户信息到持久化中
    authStore.setUserToken(user, token)
    ElMessage.success('登录成功')
    // 跳转到首页
    // router.push('/')
    router.push({ name: 'frame' })
  } catch (detail) {
    console.log("error:", detail)
    // ElMessage.error(detail.response.data.detail)
  }
}

</script> 

<style scoped src="@/assets/css/login.css"></style>
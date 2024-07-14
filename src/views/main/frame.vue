<script setup>
import { ref, reactive, computed } from 'vue'
import {
    Fold,
    Expand,
} from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores/auth';
// 跳转的 router
import { useRouter } from 'vue-router';
import authHttp from '@/api/authHttp';
import { ElMessage } from 'element-plus';



const authStore = useAuthStore()
const router = useRouter()


// console.log("user:", authStore.user)
let isCollapse = ref(false)
let dialogvisble = ref(false)
let resetPwdForm = reactive({
    oldpwd: '',
    newpwd1: '',
    newpwd2: ''
})
let formTag = ref()


let rules = reactive({
    oldpwd: [
        { required: true, message: '请输入旧密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度在6-20之间', trigger: 'blur' },
    ],
    newpwd1: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度在6-20之间', trigger: 'blur' },
    ],
    newpwd2: [
        { required: true, message: '请输入确认密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度在6-20之间', trigger: 'blur' },
    ],
})

let formLabelWidth = '80px'

let asideWidth = computed(() => {
    if (isCollapse.value) {
        return "49px"
    } else {
        return "230px"
    }
})

const ClickOnMM = () => {
    isCollapse.value = !isCollapse.value
}

const onExit = () => {
    authStore.clearUserTOken();
    router.push({ name: 'login' })
}

//  修改密码
const onsubmitPwd = () => {
    console.log('修改密码')
    formTag.value.validate(async (valid, fields) => {
        if(valid){
            try{
               await authHttp.resetPwd(resetPwdForm.oldpwd, resetPwdForm.newpwd1, resetPwdForm.newpwd2)
               ElMessage.success("密码修改成功");
               dialogvisble.value = false;
            }catch(detail){
                ElMessage.error(detail)
            }
        }else{
            console.log("请按要求添加密码信息")
        }
    })
}

const onControlResetPwdDialog = () => {
    resetPwdForm.oldpwd = ""
    resetPwdForm.newpwd1 = ""
    resetPwdForm.newpwd2 = ""
    dialogvisble.value = true;
}


</script>
<template>
    <el-container class="container">
        <el-aside class="aside" :width="asideWidth">
            <router-link to="/" class="brand"><span v-show="!isCollapse">AI</span>运维平台</router-link>
            <el-menu :router="true" active-text-color="#ffd04b" background-color="#343a40" class="el-menu-vertical-demo"
                default-active="1" text-color="#fff" :collapse="isCollapse" :collapse-transition="false"
                @open="handleOpen" @close="handleClose">
                <el-menu-item index="1" :route="{name: 'frame'}">
                    <template #title>
                        <el-icon>
                            <HomeFilled />
                        </el-icon>
                        <span>Dashbord</span>
                    </template>
                </el-menu-item>
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon>
                            <Avatar />
                        </el-icon>
                        <span>用户权限</span>
                    </template>
                    <el-menu-item index="2-1" :route="{name: 'userlist'}">
                        <el-icon>
                            <User />
                        </el-icon>
                        用户管理
                    </el-menu-item>

                    <el-menu-item index="2-2" :route="{name: 'userpermision'}">
                        <el-icon>
                            <Lock />
                        </el-icon>
                        权限管理
                    </el-menu-item>
                    <el-menu-item index="2-3" :route="{name: 'userrole'}">
                        <el-icon>
                            <Unlock />
                        </el-icon>
                        角色绑定
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item index="3">
                    <el-icon>
                        <i class="iconfont">&#xe98e;</i>
                    </el-icon>
                    <span>资源管理</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <el-icon>
                        <el-icon>
                            <ChromeFilled />
                        </el-icon>
                    </el-icon>
                    <span>服务发布</span>
                </el-menu-item>
                <el-menu-item index="5">
                    <el-icon>
                        <Connection />
                    </el-icon>
                    <span>域名证书</span>
                </el-menu-item>
                <el-menu-item index="6">
                    <el-icon>
                        <Monitor />
                    </el-icon>
                    <span>监控告警</span>
                </el-menu-item>
                <el-menu-item index="7">
                    <el-icon>
                        <Sort />
                    </el-icon>
                    <span>大语言模型配置</span>
                </el-menu-item>
                <el-menu-item index="8">
                    <el-icon>
                        <SetUp />
                    </el-icon>
                    <span>服务配置中心</span>
                </el-menu-item>
                <el-menu-item index="9">
                    <el-icon>
                        <setting />
                    </el-icon>
                    <span>系统设置</span>
                </el-menu-item>
            </el-menu>
        </el-aside>

        <el-container>

            <el-header class="header">
                <div class="left-headers">
                    <el-button v-show="isCollapse" :icon="Expand" @click="ClickOnMM" />
                    <el-button v-show="!isCollapse" :icon="Fold" @click="ClickOnMM" />
                </div>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <el-avatar :size="30" icon="UserFilled" />
                        <span style="margin-left: 10px;">[{{ authStore.user.department.name }}] {{
                            authStore.user.username
                            }}</span>
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="onControlResetPwdDialog">修改密码</el-dropdown-item>
                            <el-dropdown-item>信息修改</el-dropdown-item>
                            <el-dropdown-item divided @click="onExit">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
    <el-dialog v-model="dialogvisble" title="修改密码" width="500">
        <el-form :model="resetPwdForm" :rules="rules" ref="formTag">
            <el-form-item label="旧密码" :label-width="formLabelWidth" prop="oldpwd">
                <el-input v-model="resetPwdForm.oldpwd" autocomplete="off" type="password" />
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth" prop="newpwd1">
                <el-input v-model="resetPwdForm.newpwd1" autocomplete="off" type="password" />
            </el-form-item>
            <el-form-item label="确认密码" :label-width="formLabelWidth" prop="newpwd2">
                <el-input v-model="resetPwdForm.newpwd2" autocomplete="off" type="password" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogvisble = false">取消</el-button>
                <el-button type="primary" @click="onsubmitPwd">
                    确认修改
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>


<style scoped>
.aside {
    background-color: #343a40;
    box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22) !important;
}

.container {
    height: 100vh;
    background-color: #f4f6f9;
}

.aside .brand {
    height: 52px;
    color: #fff;
    text-decoration: none;
    border-bottom: 1px solid #434a50;
    background-color: #232631;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
}

.header {
    background-color: #fff;
    height: 52px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header .left-headers {
    padding: 0;
    margin-left: 0;
    display: flex;
}

.el-dropdown-link {
    display: flex;
    align-items: center;
}

.el-menu {
    border-right: none;
}
</style>
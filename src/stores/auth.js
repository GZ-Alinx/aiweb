import {ref, computed} from 'vue'
import {defineStore} from 'pinia'


const USER_KEY = "AI_USER_KEY"
const TOKEN_KEY = "AI_TOKEN_KEY"


export const useAuthStore = defineStore('auth', () => {
    let _user =  ref({})
    let _token = ref("")

    //存储方法
    function setUserToken(user, token) {
        // 存储到内存中
        _user.value = user;
        _token.value = token;

        // 存储到硬盘中
        localStorage.setItem(USER_KEY,JSON.stringify(user));
        localStorage.setItem(TOKEN_KEY, token);
    }

    // 清楚token信息
    function clearUserTOken() {
        _user.value = {}
        _token.value = ""
        localStorage.removeItem(USER_KEY)
        localStorage.removeItem(TOKEN_KEY)
    }

    // 计算属性
    let user = computed(() => {
        // 如果内存中不存在数据，就从磁盘中获取数据
        // if 判断空对象{} 会返回true 字符串“”会返回false 要注意使用方式
        if(Object.keys(_user.value) == 0){
            let user_str = localStorage.getItem(USER_KEY) 
            if(user_str){
                _user.value = JSON.parse(user_str)
            }
        }
        return _user.value
    })

    let token = computed(() => {
        // token数据返回
        let token_str = localStorage.getItem(TOKEN_KEY)
        if(token_str){
            _token.value =  token_str
        }
        return _token.value
    })
    let is_logined = computed(() =>{
        if(Object.keys(user.value).length > 0 && token.value){
            return true;
        }
        return false;
    })


    // 返回外部进行访问
    return {setUserToken, user, token,is_logined, clearUserTOken}
})
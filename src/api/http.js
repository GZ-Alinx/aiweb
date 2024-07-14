import axios from 'axios'
import {ElMessage} from 'element-plus'
import { useAuthStore } from '@/stores/auth';




// 基础参数和路径
class Http{
    constructor(){
        this.instance = axios.create({
            // 外部环境变量写法
            baseURL: import.meta.env.VITE_BASE_URL,
            //  baseURL: 'http://localhost:8000',
             timeout: 5000,
             headers: {}
        });

        // 发送请求之前要做的事情 加入token信息  或者其他的一些操作
        this.instance.interceptors.request.use((config) => {
            const authStore = useAuthStore()
            const token = authStore.token
            // token拼接中
            if(token){
                config.headers.Authorization = "JWT " + token
            }
            return config
        }) 
    }

    post(path, data){
        // 自动拼接
        // return this.instance.post(path, data)
        return new Promise(async (resolve, reject) => {
            // await 网络请求发出去后 线程会挂起这个等待
            // 等网络数据到达后，线程又会回到当前位置开始往后执行
            // 如果在某个函数中使用了await 那么这个函数就必须呀定义成async
            // axios 等车呢个也是用Promise对象， 在响应状态码不是200时，就会调用reject
            // 调用reject的结果是，外层的函数会抛出异常
            try{
                console.log('开始执行处理方法')
                let result = await this.instance.post(path, data)
                // 如果走到下面代码 说明await没有抛出异常，就肯定说明返回的是200
                // 回调回去
                console.log('开始执行处理方法 结束')
                resolve(result.data);
            }catch(err){
                // 走到catch中 那么状态码就不是200
                ElMessage.error("Http方法请求失败")
                reject(err)
            }
        })
    }

    get(path, params){
        return this.instance.get(path, params)
    }

    delete(path, params){
        return this.instance.delete(path, params)
    }
    
    put(path, params){
        return this.instance.delete(path, params)
    }
}

export default new Http()


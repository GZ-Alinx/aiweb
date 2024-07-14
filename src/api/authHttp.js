import http from './http'
import {ElMessage} from 'element-plus'


const login = (username, password) => {
    const path = '/api/login'
    
    return http.post(path, {username, password})
}

const resetPwd = (oldpwd, pwd1, pwd2) => {
    const path='/api/resetpwd'
    return http.post(path, {oldpwd, pwd1, pwd2})
}

const getAll = () => {
    const path ='/api/users/all'
    return http.get(path)
}

const DeleteUser = (uid) => {
    const path=`/api/users/${uid}/delete`
    return http.delete(path)
}

export default {
    login,
    resetPwd,
    getAll,
    DeleteUser
}
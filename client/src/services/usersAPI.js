import API from './api'

const usersAPI = {
    register(credential){
        return API().post('users/register', credential)
    },
    login(credential){
        return API().post('users/login', credential)
    },
    logout(){
        return API().post('/users/logout')
    },
    update(credential){
        return API().patch('/users/update', credential)
    }
}

export default usersAPI
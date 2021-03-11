import API from './api'

const usersAPI = {
    register(credential){
        return API().post('users/register', credential)
    },
    login(credential){
        return API().post('users/login', credential)
    },
    logout(){
        return API().post('users/logout')
    },
    update(data){
        return API().patch('users/update', data)
    },
    pay(amount){
        return API().post('users/payment_intent', amount)
    },
    index(){
        return API().get('users/index')
    },
    info(id){
        return API().get(`users/info/${id}`)
    },
    delete(id){
        return API().delete(`users/delete/${id}`)
    },
    setAsAdmin(id){
        return API().patch(`users/setAdmin/${id}`)
    }
}

export default usersAPI
import API from './api'

const orderAPI = {
    create(order){
        return API().post('orders', order)
    },
    fetch(id){
        return API().get(`orders/${id}`)
    },
    fetchAll(){
        return API().get('orders')
    },
    index(){
        return API().get('orders/all')
    },
    Delivered(id){
        return API().patch(`orders/deliver/${id}`)
    }
}

export default orderAPI
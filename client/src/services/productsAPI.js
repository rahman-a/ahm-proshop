import API from './api'

const productsAPI = {
    index() {
        return API().get('products')
    },
    fetch(id){
        return API().get(`products/${id}`)
    }

}

export default productsAPI
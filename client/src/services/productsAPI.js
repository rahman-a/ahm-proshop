import API from './api'

const productsAPI = {
    index(keyword, page) {
      return API().get(`products?search=${keyword}&page=${page}`) 
    },
    fetch(id){
        return API().get(`products/${id}`)
    },
    create(data){
        return API().post('products/new', data)
    },
    update(id, data){
        return API().patch(`products/edit/${id}`, data)
    },
    delete(id){
        return API().delete(`products/delete/${id}`)
    },
    review(id,review){
        return API().patch(`products/${id}/review`, review)
    },
    top(){
        return API().get('products/top')
    }

}

export default productsAPI
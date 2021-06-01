import axios from 'axios'

 const api = () => {
    const {token} = localStorage.getItem("USER_INFO") ? JSON.parse(localStorage.getItem("USER_INFO")):''
    return axios.create({
        baseURL:'/api/',
        headers:{ Authorization: `Bearer ${token}`}
    })
}

export default api
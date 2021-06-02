import axios from 'axios'

 const api = () => {
    const {token} = localStorage.getItem("USER_INFO") ? JSON.parse(localStorage.getItem("USER_INFO")):''
    return axios.create({
        baseURL:'http://localhost:5000/api/',
        headers:{ Authorization: `Bearer ${token}`}
    })
}

export default api
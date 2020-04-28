import axios from 'axios';

export default() => {
    return axios.create({
        baseURL: `https://sminet.com.mx/Digital.Docs.Service/Service1.svc`,
        timeout: 1000 * 45,
        withCredentials: false,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    // baseURL: 'http://localhost:5000'
    baseURL: 'https://assignment-12-server-sigma-coral.vercel.app'
})
const useAxiosSecure = () => {
    const {logOut} = useAuth()
    const navigate = useNavigate()
    // interceptor request
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`
        return config
    }, function (error) {
        return Promise.reject(error);
    })

    // interceptor response
    axiosSecure.interceptors.response.use(function (response){
        return response
    }, async(error)=>{
        const status = error.response?.status
        if(status === 401 ||  status === 403){
            await logOut();
            navigate('/logIn')
        }
        return Promise.reject(error)
    })


    return axiosSecure
};

export default useAxiosSecure;
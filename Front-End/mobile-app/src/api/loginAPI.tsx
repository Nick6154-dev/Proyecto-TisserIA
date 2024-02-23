import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const loginAPI = axios.create({
    baseURL: 'https://api-login-4vj1.onrender.com/api'
})

loginAPI.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers['x-token'] = token;
        }
        return config;
    }
);

export default loginAPI;


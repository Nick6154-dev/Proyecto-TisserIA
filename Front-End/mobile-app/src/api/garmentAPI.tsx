import axios from 'axios';

const garmentAPI = axios.create({
    baseURL: 'https://image-service-production.up.railway.app/filterService'
})


export default garmentAPI;


import axios from 'axios';
import config from '../config/config';
const { apiEndpoint } = config;

const instance = axios.create({
    baseURL: apiEndpoint
})



export default instance;
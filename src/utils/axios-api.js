import axios from 'axios';
import { base_url } from '../config';

export const axiosApi = axios.create({
    baseURL: base_url,
});

import axios from 'axios';

const instance = axios.create({
    baseURL: "http://192.168.1.103:8080"
});

instance.interceptors.response.use(
    (response) => {
        // Thrown error for request with OK status code
        const { data } = response;
        return data;
    }
);

export default instance;
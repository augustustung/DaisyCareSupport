import axios from 'axios';

const instance = axios.create({
    baseURL: "https://daisycare-support.herokuapp.com"
});

instance.interceptors.response.use(
    (response) => {
        // Thrown error for request with OK status code
        const { data } = response;
        return data;
    }
);

export default instance;
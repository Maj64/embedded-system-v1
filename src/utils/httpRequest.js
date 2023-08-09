import axios from "axios";

axios.interceptors.request.use((config) => {
    // Add your authorization headers or other request modifications
    return config;
});

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors globally
        return Promise.reject(error);
    }
);

export default axios;

// import axios from "axios";

// axios.interceptors.request.use((config) => {
//     // Add your authorization headers or other request modifications

//     return config;
// });

// axios.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         // Handle errors globally
//         return Promise.reject(error);
//     }
// );

// export default axios;

import axios from "axios";
const httpRequest = axios.create({
    baseURL: "https://da877906-90e8-44cf-b731-dc45744a052c.mock.pstmn.io",
    headers: {
        "Content-Type": "application/json",
    },
});

export default httpRequest;

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
    baseURL: "https://52624c73-9f07-417f-b2a5-2b011182af0e.mock.pstmn.io",
    headers: {
        "Content-Type": "application/json",
    },
});

export default httpRequest;

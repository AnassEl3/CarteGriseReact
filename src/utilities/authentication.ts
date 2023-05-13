import axios from "./axios";

export function logout() {
    // Remove token from local storage
    localStorage.removeItem("token");

    // Remove token from all axios requests
    axios.interceptors.request.use((config) => {
        config.headers.Authorization = "";
        return config;
    });
}

import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
    baseURL: "http://localhost:8668/api/v1/",
    validateStatus: (status) => (status >= 200 && status < 400),
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response.status
        if (status >= 400 && status <= 499) {
            toast.error(`Il ya une erreur au niveau du client | Status: ${status}`);
        }else if(status >= 500 && status <= 599){
            toast.error(`Il ya une erreur au niveau du serveur | Status: ${status}`);
        }else{
            toast.error(`Error`);
        }

        return error;
    }
);

export default api;

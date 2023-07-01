import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { JWTType } from "../types/authentication";
import { userContext } from "../contexts/UserProvider";
import jwtDecode from "jwt-decode";
import api from "../utilities/axios";


export default function AppLayout() {
    const userHolder = useContext(userContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Get token from local storage
        const token = localStorage.getItem("token");

        if (token) {
            // Decode the token
            const jwtData: JWTType = jwtDecode(token);
            // Validate token not expired
            if(Date.now() >= jwtData.exp * 1000){
                localStorage.removeItem("token")
                navigate("/login");
                return;
            }
            // Store cin in context
            userHolder?.setCin(jwtData.sub);
            // Attache token to all axios requests
            api.interceptors.request.use((config) => {
                config.headers.Authorization = `Bearer ${token}`;
                return config;
            });
        } else {
            navigate("/login");
        }
    });

    return (
        <div>
            <Sidebar />
            <Navbar />
            <div className="container mx-auto w-full lg:pl-64">
                <Outlet />
            </div>
        </div>
    );
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFingerprint, faLock } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utilities/axios";
import jwtDecode from "jwt-decode";
import { JWTType } from "../../types/authentication";
import { userContext } from "../../contexts/UserProvider";
import SpinnerScreen from "../../components/ui/SpinnerScreen";
import { toast } from "react-toastify";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [cin, setCin] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const rememberMeToggle = () => {
        setRememberMe((current) => !current);
    };
    const navigate = useNavigate();
    const userHolder = useContext(userContext);

    useEffect(() => {
        // Get token from local storage
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/app");
        }
    });

    const authenticate = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        api
            .post("auth/authenticate", {
                cin: cin,
                mot_de_passe: motDePasse,
                remember_me: rememberMe,
            })
            .then((res) => {
                // Store token in local storage
                localStorage.setItem("token", res.data.token);

                // Attache token to all axios requests
                api.interceptors.request.use((config) => {
                    config.headers.Authorization = `Bearer ${res.data.token}`;
                    return config;
                });

                // Decode JWT
                const tokenData: JWTType = jwtDecode(res.data.token);

                // Update user context
                userHolder?.setCin(tokenData.sub);
                toast.success("Bienvenue", {
                    autoClose: 2000
                });
                navigate("/app");
                setLoading(false);
            })
            .catch((err) => {
                console.log(err.response.status);
                switch (err.response.status) {
                    case 403:
                        toast.error("Le CIN ou mot de passe est incorrecte !");
                        break;
                        
                    default:
                        toast.error("Il y a une erreur au niveau de connection avec le serveur.");
                        break;
                }
                setLoading(false);
            });
    };

    return (
        <>
            <main className="w-full max-w-md mx-auto p-6">
                <div className="relative overflow-hidden mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    {loading ? <SpinnerScreen /> : null}
                    <div className="p-4 sm:p-7">
                        <div className="text-center">
                            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                                S'identifier
                            </h1>
                        </div>

                        <div className="mt-5">
                            {/* <!-- Form --> */}
                            <form onSubmit={authenticate}>
                                <div className="grid gap-y-4">
                                    {/* <!-- Form Group --> */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm mb-2 dark:text-white"
                                        >
                                            CIN
                                        </label>
                                        <div className="relative">
                                            <div>
                                                <div className="flex rounded-md shadow-sm">
                                                    <span className="px-4 inline-flex items-center min-w-fit rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
                                                        <FontAwesomeIcon
                                                            icon={faFingerprint}
                                                        />
                                                    </span>
                                                    <input
                                                        type="text"
                                                        className="py-3 px-4 pr-11 block w-full border-gray-200 shadow-sm rounded-r-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                                                        value={cin}
                                                        onChange={(e) =>
                                                            setCin(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                                <svg
                                                    className="h-5 w-5 text-red-500"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    viewBox="0 0 16 16"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p
                                            className="hidden text-xs text-red-600 mt-2"
                                            id="email-error"
                                        >
                                            Please include a valid email address
                                            so we can get back to you
                                        </p>
                                    </div>
                                    {/* <!-- End Form Group --> */}

                                    {/* <!-- Form Group --> */}
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <label
                                                htmlFor="password"
                                                className="block text-sm mb-2 dark:text-white"
                                            >
                                                Mot de passe
                                            </label>
                                            <a
                                                className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
                                                href="../examples/html/recover-account.html"
                                            >
                                                Mot de passe oublié?
                                            </a>
                                        </div>
                                        <div className="relative">
                                            <div className="flex rounded-md shadow-sm">
                                                <span className="px-4 inline-flex items-center min-w-fit rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
                                                    <FontAwesomeIcon
                                                        icon={faLock}
                                                    />
                                                </span>
                                                <input
                                                    type="password"
                                                    className="py-3 px-4 pr-11 block w-full border-gray-200 shadow-sm rounded-r-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                                                    value={motDePasse}
                                                    onChange={(e) =>
                                                        setMotDePasse(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                                <svg
                                                    className="h-5 w-5 text-red-500"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    viewBox="0 0 16 16"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p
                                            className="hidden text-xs text-red-600 mt-2"
                                            id="password-error"
                                        >
                                            8+ characters required
                                        </p>
                                    </div>
                                    {/* <!-- End Form Group --> */}

                                    {/* <!-- Checkbox --> */}
                                    <div className="flex items-center">
                                        <div className="flex">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                                checked={rememberMe}
                                                onChange={rememberMeToggle}
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <label
                                                htmlFor="remember-me"
                                                className="text-sm dark:text-white"
                                            >
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    {/* <!-- End Checkbox --> */}

                                    <button
                                        type="submit"
                                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>
                            {/* <!-- End Form --> */}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Login;

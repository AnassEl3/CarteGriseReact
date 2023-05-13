import { RouterProvider } from "react-router-dom";
import router from "./router";

// Contexts
import UserProvider from "./contexts/UserProvider";

// React notification / toasters (react-toastify package)
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PageLoadingProvider from "./contexts/PageLoadingProvider";

function App() {
    return (
        <>
            <UserProvider>
                <PageLoadingProvider>
                    <ToastContainer />
                    <RouterProvider router={router} />
                </PageLoadingProvider>
            </UserProvider>
        </>
    );
}

export default App;

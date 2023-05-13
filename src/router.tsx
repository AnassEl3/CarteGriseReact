import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Error from "./pages/Error";
import InfoGenerale from "./pages/infoGenerale/InfoGenerale";
import ListeEmployes from "./pages/employes/ListeEmployes";
import ListeFormulaires from "./pages/formulaires/ListeFormulaires";
import ListeDemandes from "./pages/demandes/ListeDemandes";
import ListeDocuments from "./pages/documents/ListeDocuments";
import ListeCitoyens from "./pages/citoyens/ListeCitoyens";
import ListeVehicules from "./pages/vehicules/ListeVehicules";
import ListeCartegrises from "./pages/cartegrises/ListeCartegrises";
import TableauBord from "./pages/tableauBord/TableauBord";
import Login from "./pages/auth/Login";

const router = createBrowserRouter([
    {
        path: "/",
        // element: <Navigate to="/app" />,
        errorElement: <Error />,
        children: [
            {
                path: "login",
                element: <Login />,
                errorElement: <Error />,
            },
        ],
    },
    {
        path: "/app",
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {
                path: "",
                element: <Navigate to="/app/tablebord" />,
            },
            {
                path: "tablebord",
                element: <TableauBord />,
            },
            {
                path: "administration",
                element: <InfoGenerale />,
            },
            {
                path: "employes",
                element: <ListeEmployes />,
            },
            {
                path: "formulaires",
                element: <ListeFormulaires />,
            },
            {
                path: "demandes",
                element: <ListeDemandes />,
            },
            {
                path: "documents",
                element: <ListeDocuments />,
            },
            {
                path: "citoyens",
                element: <ListeCitoyens />,
            },
            {
                path: "vehicules",
                element: <ListeVehicules />,
            },
            {
                path: "cartegrise",
                element: <ListeCartegrises />,
            },
        ],
    },
]);

export default router;

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
import InfoGeneraleEdit from "./pages/infoGenerale/InfoGeneraleEdit";
import AddEmploye from "./pages/employes/AddEmploye";
import EditEmploye from "./pages/employes/EditEmploye";
import ViewEmploye from "./pages/employes/ViewEmploye";
import AddCitoyen from "./pages/citoyens/AddCitoyen";
import ViewCitoyen from "./pages/citoyens/ViewCitoyen";
import EditCitoyen from "./pages/citoyens/EditCitoyen";
import AddVehicule from "./pages/vehicules/AddVehicule";
import ViewVehicule from "./pages/vehicules/ViewVehicule";
import EditVehicule from "./pages/vehicules/EditVehicule";
import AddCartegrise from "./pages/cartegrises/AddCartegrise";
import ViewCartegrise from "./pages/cartegrises/ViewCartegrise";
import EditCartegrise from "./pages/cartegrises/EditCartegrise";
import AddDemande from "./pages/demandes/AddDemande";
import ViewDemande from "./pages/demandes/ViewDemande";
import EditDemande from "./pages/demandes/EditDemande";

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
                children: [
                    {
                        path: "",
                        element: <InfoGenerale />,
                    },
                    {
                        path: "edit",
                        element: <InfoGeneraleEdit />,
                    },
                ]
            },
            {
                path: "employes",
                children: [
                    {
                        path: "",
                        element: <ListeEmployes />,
                    },
                    {
                        path: "add",
                        element: <AddEmploye />,
                    },
                    {
                        path: ":id",
                        element: <ViewEmploye />,
                    },
                    {
                        path: ":id/edit",
                        element: <EditEmploye />,
                    },
                ]
            },
            {
                path: "formulaires",
                element: <ListeFormulaires />,
            },
            {
                path: "demandes",
                children: [
                    {
                        path: "",
                        element: <ListeDemandes />,
                    },
                    {
                        path: "add",
                        element: <AddDemande />,
                    },
                    {
                        path: ":id",
                        element: <ViewDemande />,
                    },
                    {
                        path: ":id/edit",
                        element: <EditDemande />,
                    },
                ]
            },
            {
                path: "documents",
                element: <ListeDocuments />,
            },
            {
                path: "citoyens",
                children: [
                    {
                        path: "",
                        element: <ListeCitoyens />,
                    },
                    {
                        path: "add",
                        element: <AddCitoyen />,
                    },
                    {
                        path: ":id",
                        element: <ViewCitoyen />,
                    },
                    {
                        path: ":id/edit",
                        element: <EditCitoyen />,
                    },
                ]
            },
            {
                path: "vehicules",
                children: [
                    {
                        path: "",
                        element: <ListeVehicules />,
                    },
                    {
                        path: "add",
                        element: <AddVehicule />,
                    },
                    {
                        path: ":id",
                        element: <ViewVehicule />,
                    },
                    {
                        path: ":id/edit",
                        element: <EditVehicule />,
                    },
                ]
            },
            {
                path: "cartesgrise",
                children: [
                    {
                        path: "",
                        element: <ListeCartegrises />,
                    },
                    {
                        path: "add",
                        element: <AddCartegrise />,
                    },
                    {
                        path: ":id",
                        element: <ViewCartegrise />,
                    },
                    {
                        path: ":id/edit",
                        element: <EditCartegrise />,
                    },
                ]
            },
        ],
    },
]);

export default router;

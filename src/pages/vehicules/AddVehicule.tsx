import { useContext, useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { PageLodaingContext } from "../../contexts/PageLoadingProvider";
import api from "../../utilities/axios";
import { toast } from "react-toastify";
import PageLayout from "../../layouts/PageLayout";
import PageHeader from "../../components/PageHeader";
import { faCar, faCarBattery, faCircleInfo, faGasPump, faPeopleGroup, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/ui/Card";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select";
import Button from "../../components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddVehicule() {
    const pageLoadingHolder = useContext(PageLodaingContext);
    const navigate = useNavigate();

    const [modele, setModele] = useState("");
    const updateModele = (e: ChangeEvent<HTMLInputElement>) => {
        setModele(e.target.value);
    };
    const [modeleErr, setModeleErr] = useState("");

    const [marque, setMarque] = useState("");
    const updateMarque = (e: ChangeEvent<HTMLInputElement>) => {
        setMarque(e.target.value);
    };
    const [marqueErr, setMarqueErr] = useState("");

    const [carburant, setCarburant] = useState("");
    const updateCarburant = (e: ChangeEvent<HTMLInputElement>) => {
        setCarburant(e.target.value);
    };
    const [carburantErr, setCarburantErr] = useState("");

    const [puissance, setPuissance] = useState(0);
    const updatePuissance = (e: ChangeEvent<HTMLInputElement>) => {
        setPuissance(Number(e.target.value));
    };
    const [puissanceErr, setPuissanceErr] = useState("");

    const [nbPlace, setNbPlace] = useState(0);
    const updateNbPlace = (e: ChangeEvent<HTMLInputElement>) => {
        setNbPlace(Number(e.target.value));
    };
    const [nbPlaceErr, setNbPlaceErr] = useState("");

    const [nbCylindres, setNbCylindres] = useState(0);
    const updateNbCylindres = (e: ChangeEvent<HTMLInputElement>) => {
        setNbCylindres(Number(e.target.value));
    };
    const [nbCylindresErr, setNbCylindresErr] = useState("");

    const [ptac, setPtac] = useState(0);
    const updatePtac = (e: ChangeEvent<HTMLInputElement>) => {
        setPtac(Number(e.target.value));
    };
    const [ptacErr, setPtacErr] = useState("");
    
    
    

    const handleAddVehicule = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();
        pageLoadingHolder.setPageLoading(true);
        resetValidation();
        api.post("vehicules", {
            modele,
            marque,
            carburant,
            puissance,
            nb_place: nbPlace,
            nb_cylindres: nbCylindres,
            ptac,
        })
            .then((res) => {
                toast.success("Véhicule a été ajouté avec succès");
                pageLoadingHolder.setPageLoading(false);
                navigate("/app/vehicules");
            })
            .catch((err) => {
                const res = err.response;
                console.log(err);
                (err)
                if (res.status == 400) {
                    toast.error(
                        "Les informations de véhicule ne sont pas valides"
                    );
                    res.data.forEach((element: any) => {
                        switch (element.field) {
                            case "modele":
                                setModeleErr(element.code);
                                break;
                            case "marque":
                                setMarqueErr(element.code);
                                break;
                            case "carburant":
                                setCarburantErr(element.code);
                                break;
                            case "puissance":
                                setPuissanceErr(element.code);
                                break;
                            case "nb_place":
                                setNbPlaceErr(element.code);
                                break;
                            case "nb_cylindres":
                                setNbCylindresErr(element.code);
                                break;
                            case "ptac":
                                setPtacErr(element.code);
                                break;
                            default:
                                break;
                        }
                    });
                }
                pageLoadingHolder.setPageLoading(false);
            });
    };
    
    const handleCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();
        navigate("..");
    };
    
    const resetValidation = () => {
        setModeleErr("");
        setMarqueErr("");
        setCarburantErr("");
        setPuissanceErr("");
        setNbPlaceErr("");
        setNbCylindresErr("");
        setPtacErr("");
    };
    
    return (
        <PageLayout>
            <PageHeader title="Ajouter véhicule" icon={faCar} />
            <form className="grid gap-8" action="">
                <Card title="information personnelle" icon={faCircleInfo}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 justify-center items-center">
                        <Input
                            label="Modèle"
                            value={modele}
                            onChange={updateModele}
                            errorMsg={modeleErr}
                        />
                        <Input
                            label="Marque"
                            value={marque}
                            onChange={updateMarque}
                            errorMsg={marqueErr}
                        />
                        <Input
                            label="Type de carburant"
                            value={carburant}
                            onChange={updateCarburant}
                            errorMsg={carburantErr}
                            leadingIcon={faGasPump}
                        />
                        <Input
                            label="Puissance"
                            type="number"
                            value={puissance}
                            onChange={updatePuissance}
                            errorMsg={puissanceErr}
                            leadingIcon={faCarBattery}
                        />
                        <Input
                            label="Nombre de place"
                            type="number"
                            value={nbPlace}
                            onChange={updateNbPlace}
                            errorMsg={nbPlaceErr}
                        />
                        <Input
                            label="Nombre de cylindres"
                            type="number"
                            value={nbCylindres}
                            onChange={updateNbCylindres}
                            errorMsg={nbCylindresErr}
                        />
                        <Input
                            label="PTAC"
                            type="number"
                            value={ptac}
                            onChange={updatePtac}
                            errorMsg={ptacErr}
                        />
                    </div>
                </Card>
                <div className="flex flex-wrap justify-end items-center">
                    <Button
                        className="m-1"
                        type="submit"
                        color="success"
                        onClick={handleAddVehicule}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        Ajourter véhicule
                    </Button>
                    <Button
                        className="m-1"
                        color="secondary"
                        onClick={handleCancel}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                        Cancel
                    </Button>
                </div>
            </form>
        </PageLayout>
    );
}

export default AddVehicule;

import {useContext, useState, useEffect, ChangeEvent} from "react";
import {useNavigate, useParams} from 'react-router-dom'
import { PageLodaingContext } from "../../contexts/PageLoadingProvider";
import api from "../../utilities/axios";
import { toast } from "react-toastify";
import { Vehicule } from "../../types/models";
import PageLayout from "../../layouts/PageLayout";
import PageHeader from "../../components/PageHeader";
import { faCarBattery, faCircleInfo, faEye, faGasPump, faHeadset, faPen, faPeopleGroup, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import Alink from "../../components/ui/Alink";
import Card from "../../components/ui/Card";
import Input from "../../components/form/Input";
import Button from "../../components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EditVehicule() {
    const { id } = useParams();
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

    useEffect(() => {
        loadData();
    }, []);

    const handleEditVehicule = (
        e: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
        e.preventDefault();
        pageLoadingHolder.setPageLoading(true);
        resetValidation();
        api.patch(`vehicules/${id}`, {
            modele,
            marque,
            carburant,
            puissance,
            nb_place: nbPlace,
            nb_cylindres: nbCylindres,
            ptac,
        })
            .then((res) => {
                toast.success("Véhicule a été modifié avec succès");
                pageLoadingHolder.setPageLoading(false);
                navigate("/app/vehicules");
            })
            .catch((err) => {
                const res = err.response;
                console.log(err);
                err;
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

    const handleReset = () => {
        loadData();
        resetValidation();
    };

    const loadData = () => {
        pageLoadingHolder.setPageLoading(true);
        api.get(`vehicules/${id}`)
            .then((res) => {
                console.log(res);

                const vehicule: Vehicule = res.data;
                setModele(vehicule.modele ?? "");
                setMarque(vehicule.marque ?? "");
                setCarburant(vehicule.carburant ?? "");
                setPuissance(vehicule.puissance ?? 0);
                setNbPlace(vehicule.nb_place ?? 0);
                setNbCylindres(vehicule.nb_cylindres ?? 0);
                setPtac(vehicule.ptac ?? 0);
                pageLoadingHolder.setPageLoading(false);
            })
            .catch((err) => {
                console.log(err);
                pageLoadingHolder.setPageLoading(false);
            });
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
            <PageHeader title="Modifier véhicule" icon={faPeopleGroup}>
                <Alink
                    href={`/app/vehicules/${id}`}
                    className="m-1"
                    color="primary"
                    icon={faEye}
                >
                    Voir
                </Alink>
            </PageHeader>
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
                        color="info"
                        onClick={handleEditVehicule}
                    >
                        <FontAwesomeIcon icon={faPen} />
                        Modifier véhicule
                    </Button>
                    <Button
                        className="m-1"
                        color="secondary"
                        onClick={handleReset}
                    >
                        <FontAwesomeIcon icon={faRotateLeft} />
                        Reset
                    </Button>
                </div>
            </form>
        </PageLayout>
    );
}

export default EditVehicule;

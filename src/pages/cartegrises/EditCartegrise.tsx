import { useEffect, useContext, useState, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageLodaingContext } from "../../contexts/PageLoadingProvider";
import api from "../../utilities/axios";
import { toast } from "react-toastify";
import { CarteGrise } from "../../types/models";
import PageLayout from "../../layouts/PageLayout";
import PageHeader from "../../components/PageHeader";
import {
    faAddressCard,
    faCalendar,
    faCircleInfo,
    faEye,
    faPen,
    faPeopleGroup,
    faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import Alink from "../../components/ui/Alink";
import Card from "../../components/ui/Card";
import Input from "../../components/form/Input";
import Button from "../../components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EditCartegrise() {
    const { id } = useParams();
    const pageLoadingHolder = useContext(PageLodaingContext);
    const navigate = useNavigate();

    const [immatriculation, setImmatriculation] = useState("");
    const updateImmatriculation = (e: ChangeEvent<HTMLInputElement>) => {
        setImmatriculation(e.target.value);
    };
    const [immatriculationErr, setImmatriculationErr] = useState("");

    const [immatriculationAnterieure, setImmatriculationAnterieure] =
        useState("");
    const updateImmatriculationAnterieure = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setImmatriculationAnterieure(e.target.value);
    };
    const [immatriculationAnterieureErr, setImmatriculationAnterieureErr] =
        useState("");

    const [datePremiereUtilisation, setDatePremiereUtilisation] = useState("");
    const updateDatePremiereUtilisation = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setDatePremiereUtilisation(e.target.value);
    };
    const [datePremiereUtilisationErr, setDatePremiereUtilisationErr] =
        useState("");

    const [dateMutation, setDateMutation] = useState("");
    const updateDateMutation = (e: ChangeEvent<HTMLInputElement>) => {
        setDateMutation(e.target.value);
    };
    const [dateMutationErr, setDateMutationErr] = useState("");

    const [dateFinValidation, setDateFinValidation] = useState("");
    const updateDateFinValidation = (e: ChangeEvent<HTMLInputElement>) => {
        setDateFinValidation(e.target.value);
    };
    const [dateFinValidationErr, setDateFinValidationErr] = useState("");

    const [vehiculeUsage, setVehiculeUsage] = useState("");
    const updateVehiculeUsage = (e: ChangeEvent<HTMLInputElement>) => {
        setVehiculeUsage(e.target.value);
    };
    const [vehiculeUsageErr, setVehiculeUsageErr] = useState("");

    const [vehiculeId, setVehiculeId] = useState(0);
    const updateVehiculeId = (e: ChangeEvent<HTMLInputElement>) => {
        setVehiculeId(Number(e.target.value));
    };
    const [vehiculeIdErr, setVehiculeIdErr] = useState("");

    const [citoyenId, setCitoyenId] = useState(0);
    const updateCitoyenId = (e: ChangeEvent<HTMLInputElement>) => {
        setCitoyenId(Number(e.target.value));
    };
    const [citoyenIdErr, setCitoyenIdErr] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const handleEditCarteGrise = (
        e: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
        e.preventDefault();
        pageLoadingHolder.setPageLoading(true);
        resetValidation();
        api.patch(`cartesgrise/${id}`, {
            immatriculation,
            immatriculation_anterieure: immatriculationAnterieure,
            date_premiere_utilisation: datePremiereUtilisation,
            date_mutation: dateMutation,
            date_fin_validation: dateFinValidation,
            vehicule_usage: vehiculeUsage,
            vehicule_id: vehiculeId,
            citoyen_id: citoyenId,
        })
            .then((res) => {
                toast.success("Carte grise a été modifié avec succès");
                pageLoadingHolder.setPageLoading(false);
                navigate("/app/cartesgrise");
            })
            .catch((err) => {
                const res = err.response;
                console.log(err);
                err;
                if (res.status == 400) {
                    toast.error(
                        "Les informations de carte grise ne sont pas valides"
                    );
                    res.data.forEach((element: any) => {
                        switch (element.field) {
                            case "immatriculation":
                                setImmatriculationErr(element.code);
                                break;
                            case "immatriculation_anterieure":
                                setImmatriculationAnterieureErr(element.code);
                                break;
                            case "date_premiere_utilisation":
                                setDatePremiereUtilisationErr(element.code);
                                break;
                            case "date_mutation":
                                setDateMutationErr(element.code);
                                break;
                            case "date_fin_validation":
                                setDateFinValidationErr(element.code);
                                break;
                            case "vehicule_usage":
                                setVehiculeUsageErr(element.code);
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
        api.get(`cartesgrise/${id}`)
            .then((res) => {
                console.log(res);

                const cartegrise: CarteGrise = res.data;
                setImmatriculation(cartegrise.immatriculation ?? "");
                setImmatriculationAnterieure(
                    cartegrise.immatriculation_anterieure ?? ""
                );
                setDatePremiereUtilisation(
                    cartegrise.date_premiere_utilisation ?? ""
                );
                setDateMutation(cartegrise.date_mutation ?? "");
                setDateFinValidation(cartegrise.date_fin_validation ?? "");
                setVehiculeUsage(cartegrise.vehicule_usage ?? "");
                setVehiculeId(cartegrise.vehicule_id ?? "");
                setCitoyenId(cartegrise.citoyen_id ?? "");
                pageLoadingHolder.setPageLoading(false);
            })
            .catch((err) => {
                console.log(err);
                pageLoadingHolder.setPageLoading(false);
            });
    };

    const resetValidation = () => {
        setImmatriculationErr("");
        setImmatriculationAnterieureErr("");
        setDatePremiereUtilisationErr("");
        setDateMutationErr("");
        setDateFinValidationErr("");
        setVehiculeUsage("");
        setVehiculeIdErr("0");
        setCitoyenIdErr("0");
    };
    return (
        <PageLayout>
            <PageHeader title="Modifier carte grise" icon={faAddressCard}>
                <Alink
                    href={`/app/cartesgrise/${id}`}
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
                            label="Immatriculation"
                            value={immatriculation}
                            onChange={updateImmatriculation}
                            errorMsg={immatriculationAnterieureErr}
                        />
                        <Input
                            label="Immatriculation anterieure"
                            value={immatriculationAnterieure}
                            onChange={updateImmatriculationAnterieure}
                            errorMsg={immatriculationAnterieureErr}
                        />
                        <Input
                            label="Usage de véhicule"
                            value={vehiculeUsage}
                            onChange={updateVehiculeUsage}
                            errorMsg={vehiculeUsageErr}
                        />
                    </div>
                </Card>
                <Card title="Dates" icon={faCalendar} className="mt-5">
                    <Input
                        label="Date de première utilisation"
                        type="date"
                        inlineLabel={true}
                        value={datePremiereUtilisation}
                        onChange={updateDatePremiereUtilisation}
                        errorMsg={datePremiereUtilisationErr}
                    />
                    <Input
                        label="Date de mutation"
                        type="date"
                        inlineLabel={true}
                        value={dateMutation}
                        onChange={updateDateMutation}
                        errorMsg={dateMutationErr}
                    />
                    <Input
                        label="Date de fin de validation"
                        type="date"
                        inlineLabel={true}
                        value={dateFinValidation}
                        onChange={updateDateFinValidation}
                        errorMsg={dateFinValidationErr}
                    />
                </Card>
                <div className="flex flex-wrap justify-end items-center">
                    <Button
                        className="m-1"
                        type="submit"
                        color="info"
                        onClick={handleEditCarteGrise}
                    >
                        <FontAwesomeIcon icon={faPen} />
                        Modifier carte grise
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

export default EditCartegrise;

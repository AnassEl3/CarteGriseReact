import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState, ChangeEvent } from "react";
import PageLayout from "../../layouts/PageLayout";
import PageHeader from "../../components/PageHeader";
import {
    faCakeCandles,
    faCircleInfo,
    faEye,
    faKey,
    faLock,
    faPen,
    faPlus,
    faRotateLeft,
    faUsers,
    faVenusMars,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Alink from "../../components/ui/Alink";
import Card from "../../components/ui/Card";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select";
import { PageLodaingContext } from "../../contexts/PageLoadingProvider";
import Button from "../../components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../utilities/axios";
import { Employe } from "../../types/models";
import { toast } from "react-toastify";

const EditEmploye = () => {
    const { id } = useParams();
    const pageLoadingHolder = useContext(PageLodaingContext);
    const navigate = useNavigate();

    const [nom, setNom] = useState("");
    const updateNom = (e: ChangeEvent<HTMLInputElement>) => {
        setNom(e.target.value);
    };
    const [nomErr, setNomErr] = useState("");
    const [prenom, setPrenom] = useState("");
    const updatePrenom = (e: ChangeEvent<HTMLInputElement>) => {
        setPrenom(e.target.value);
    };
    const [prenomErr, setPrenomErr] = useState("");
    const [sexe, setSexe] = useState("");
    const updateSexe = (e: ChangeEvent<HTMLSelectElement>) => {
        setSexe(e.target.value);
    };
    const [sexeErr, setSexeErr] = useState("");
    const [dateNaissance, setDateNaissance] = useState("");
    const updateDateNaissance = (e: ChangeEvent<HTMLInputElement>) => {
        setDateNaissance(e.target.value);
    };
    const [dateNaissanceErr, setDateNaissanceErr] = useState("");
    const [cin, setCin] = useState("");
    const updateCin = (e: ChangeEvent<HTMLInputElement>) => {
        setCin(e.target.value);
    };
    const [cinErr, setCinErr] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const updateMotDePasse = (e: ChangeEvent<HTMLInputElement>) => {
        setMotDePasse(e.target.value);
    };
    const [motDePasseErr, setMotDePasseErr] = useState("");
    const [motDePasseConfirm, setMotDePasseConfirm] = useState("");
    const updateMotDePasseConfirm = (e: ChangeEvent<HTMLInputElement>) => {
        setMotDePasseConfirm(e.target.value);
    };
    const [motDePasseConfirmErr, setMotDePasseConfirmErr] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const handleEditEmploye = (
        e: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
        e.preventDefault();
        pageLoadingHolder.setPageLoading(true)
        api.patch(`employes/${id}`, {
            prenom,
            nom,
            sexe,
            date_naissance: dateNaissance,
            cin,
        }).then(()=>{
            toast.success("L'employé(e) a été modifié avec succès");
            pageLoadingHolder.setPageLoading(false);
        }).catch((err)=>{
            const res = err.response;
            if (res.status == 400) {
                toast.error(
                    "Les informations d'employé(e) ne sont pas valides"
                );
                res.data.forEach((element: any) => {
                    console.log(element);
                    switch (element.field) {
                        case "prenom":
                            setPrenomErr(element.code);
                            break;
                        case "nom":
                            setNomErr(element.code);
                            break;
                        case "sexe":
                            setSexeErr(element.code);
                            break;
                        case "date_naissance":
                            setDateNaissanceErr(element.code);
                            break;
                        case "cin":
                            setCinErr(element.code);
                            break;

                        default:
                            break;
                    }
                });
            }
            pageLoadingHolder.setPageLoading(false);
        })
    };

    const handleReset = () => {
        loadData();
        resetValidation();
    };

    const loadData = () => {
        pageLoadingHolder.setPageLoading(true)
        api.get(`employes/${id}`)
            .then((res) => {
                const employe: Employe = res.data;
                setPrenom(employe.prenom ?? "");
                setNom(employe.nom ?? "");
                setSexe(employe.sexe ?? "");
                setDateNaissance(employe.date_naissance ?? "");
                setCin(employe.cin ?? "");
                pageLoadingHolder.setPageLoading(false)
            })
            .catch((err) => {
                console.log(err);
                pageLoadingHolder.setPageLoading(false)
            });
    };
    const resetValidation = () => {
        setPrenomErr("");
        setNomErr("");
        setSexeErr("");
        setDateNaissanceErr("");
        setCinErr("");
        setMotDePasseErr("");
        setMotDePasseConfirmErr("");
    };

    return (
        <PageLayout>
            <PageHeader
                title="Modifier employé(e)"
                icon={faUsers}
                modificationPage={true}
            >
                <Alink
                    href={`/app/employes/${id}`}
                    className="m-1"
                    color="primary"
                    icon={faEye}
                >
                    Voir
                </Alink>
                <Alink
                    href={`#`}
                    className="m-1"
                    color="warning"
                    icon={faKey}
                >
                    Changer mot de passe
                </Alink>
            </PageHeader>
            <form className="grid gap-8" action="">
                <Card title="information personnelle" icon={faCircleInfo}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 justify-center items-center">
                        <Input
                            label="Prénom"
                            value={prenom}
                            onChange={updatePrenom}
                            errorMsg={prenomErr}
                        />
                        <Input
                            label="Nom"
                            value={nom}
                            onChange={updateNom}
                            errorMsg={nomErr}
                        />
                        <Select
                            label="Sexe"
                            value={sexe}
                            onChange={updateSexe}
                            leadingIcon={faVenusMars}
                            errorMsg={sexeErr}
                        >
                            <option value="">Sexe de l'employé(e) ...</option>
                            <option value="m">Masculin</option>
                            <option value="f">Féminin</option>
                        </Select>
                        <Input
                            label="Date de naissance"
                            type="date"
                            value={dateNaissance}
                            onChange={updateDateNaissance}
                            leadingIcon={faCakeCandles}
                            errorMsg={dateNaissanceErr}
                        />
                        <Input
                            label="CIN"
                            value={cin}
                            onChange={updateCin}
                            errorMsg={cinErr}
                        />
                    </div>
                </Card>
                <div className="flex flex-wrap justify-end items-center">
                    <Button
                        className="m-1"
                        type="submit"
                        color="info"
                        onClick={handleEditEmploye}
                    >
                        <FontAwesomeIcon icon={faPen} />
                        Modifier employé(e)
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
};

export default EditEmploye;

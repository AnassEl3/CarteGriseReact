import { useState, useContext, ChangeEvent } from "react";
import PageLayout from "../../layouts/PageLayout";
import PageHeader from "../../components/PageHeader";
import Card from "../../components/ui/Card";
import {
    faCakeCandles,
    faCircleInfo,
    faKey,
    faLock,
    faPlus,
    faUsers,
    faVenusMars,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select";
import Button from "../../components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import api from "../../utilities/axios";
import { PageLodaingContext } from "../../contexts/PageLoadingProvider";
import { toast } from "react-toastify";
import Switch from "../../components/form/Switch";

function AddEmploye() {
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
    const [compteActive, setCompteActive] = useState(false);
    const updateCompteActive = (e: ChangeEvent<HTMLInputElement>) => {
        setCompteActive(!compteActive);
    };

    const handleAddEmploye = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();
        pageLoadingHolder.setPageLoading(true);
        resertValidation();
        if (motDePasse !== motDePasseConfirm) {
            setMotDePasseConfirmErr(
                "La confirmation de mot de passe n'est pas correcte"
            );
            toast.error("Les informations d'employé(e) ne sont pas valides");
            pageLoadingHolder.setPageLoading(false);
            return;
        }
        // console.log(prenom, nom, sexe, dateNaissance, cin, motDePasse);
        api.post("employes", {
            prenom,
            nom,
            sexe,
            date_naissance: dateNaissance,
            cin,
            mot_de_passe: motDePasse,
            compte_active: compteActive,
        })
            .then((res) => {
                toast.success("L'employé(e) a été ajouté avec succès");
                pageLoadingHolder.setPageLoading(false);
                navigate("/app/employes");
            })
            .catch((err) => {
                const res = err.response;
                if (res.status == 400) {
                    toast.error(
                        "Les informations d'employé(e) ne sont pas valides"
                    );
                    res.data.forEach((element: any) => {
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
                            case "mot_de_passe":
                                setMotDePasseErr(element.code);
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
    
    const resertValidation = () => {
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
            <PageHeader title="Ajouter employé(e)" icon={faUsers} />
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
                <Card title="Authentification" icon={faLock}>
                    <Switch color="danger" inlineLabel={true} label="Compte active" onChange={updateCompteActive}/>
                    <Input
                        type="password"
                        label="Mot de passe"
                        inlineLabel={true}
                        leadingIcon={faKey}
                        value={motDePasse}
                        onChange={updateMotDePasse}
                        errorMsg={motDePasseErr}
                        readOnly={!compteActive}
                    />
                    <Input
                        type="password"
                        label="Confirmation de mot de passe"
                        inlineLabel={true}
                        leadingIcon={faKey}
                        value={motDePasseConfirm}
                        onChange={updateMotDePasseConfirm}
                        errorMsg={motDePasseConfirmErr}
                        readOnly={!compteActive}
                    />
                </Card>
                <div className="flex flex-wrap justify-end items-center">
                    <Button
                        className="m-1"
                        type="submit"
                        color="success"
                        onClick={handleAddEmploye}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        Ajourter employé(e)
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

export default AddEmploye;

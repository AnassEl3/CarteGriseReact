import { useContext, useState, ChangeEvent, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "../../layouts/PageLayout";
import PageHeader from "../../components/PageHeader";
import {
    faCakeCandles,
    faCircleInfo,
    faEnvelope,
    faEye,
    faHeadset,
    faLocationDot,
    faPen,
    faPeopleGroup,
    faPhone,
    faPlus,
    faRotateLeft,
    faVenusMars,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/ui/Card";
import Input from "../../components/form/Input";
import { PageLodaingContext } from "../../contexts/PageLoadingProvider";
import Select from "../../components/form/Select";
import Button from "../../components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../utilities/axios";
import { toast } from "react-toastify";
import Alink from "../../components/ui/Alink";
import { Citoyen } from "../../types/models";

function EditCitoyen() {
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

    const [lieuNaissance, setLieuNaissance] = useState("");
    const updateLieuNaissance = (e: ChangeEvent<HTMLInputElement>) => {
        setLieuNaissance(e.target.value);
    };
    const [lieuNaissanceErr, setLieuNaissanceErr] = useState("");

    const [nationalite, setNationalite] = useState("");
    const updateNationalite = (e: ChangeEvent<HTMLInputElement>) => {
        setNationalite(e.target.value);
    };
    const [nationaliteErr, setNationaliteErr] = useState("");

    const [profession, setProfession] = useState("");
    const updateProfession = (e: ChangeEvent<HTMLInputElement>) => {
        setProfession(e.target.value);
    };
    const [professionErr, setProfessionErr] = useState("");

    const [adresse, setAdresse] = useState("");
    const updateAddresse = (e: ChangeEvent<HTMLInputElement>) => {
        setAdresse(e.target.value);
    };
    const [adresseErr, setAdresseErr] = useState("");

    const [telephone, setTelephone] = useState("");
    const updateTelephone = (e: ChangeEvent<HTMLInputElement>) => {
        setTelephone(e.target.value);
    };
    const [telephoneErr, setTelephoneErr] = useState("");

    const [email, setEmail] = useState("");
    const updateEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const [emailErr, setEmailErr] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const handleEditCitoyen = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();
        pageLoadingHolder.setPageLoading(true);
        resetValidation();
        api.patch(`citoyens/${id}`, {
            prenom,
            nom,
            sexe,
            date_naissance: dateNaissance,
            cin,
            adresse,
            telephone,
            lieu_naissance: lieuNaissance,
            nationalite,
            profession,
            email,
        })
            .then((res) => {
                toast.success("Citoyen(ne) a été modifié avec succès");
                pageLoadingHolder.setPageLoading(false);
                navigate("/app/citoyens");
            })
            .catch((err) => {
                const res = err.response;
                console.log(err);
                (err)
                if (res.status == 400) {
                    toast.error(
                        "Les informations de citoyen(ne) ne sont pas valides"
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
                            case "lieu_naissance":
                                setLieuNaissanceErr(element.code);
                                break;
                            case "cin":
                                setCinErr(element.code);
                                break;
                            case "adresse":
                                setAdresseErr(element.code);
                                break;
                            case "telephone":
                                setTelephoneErr(element.code);
                                break;
                            case "nationalite":
                                setNationaliteErr(element.code);
                                break;
                            case "profession":
                                setProfessionErr(element.code);
                                break;
                            case "email":
                                setEmailErr(element.code);
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
        api.get(`citoyens/${id}`)
            .then((res) => {
                console.log(res);

                const citoyen: Citoyen = res.data;
                setPrenom(citoyen.prenom ?? "");
                setNom(citoyen.nom ?? "");
                setSexe(citoyen.sexe ?? "");
                setDateNaissance(citoyen.date_naissance ?? "");
                setLieuNaissance(citoyen.lieu_naissance ?? "");
                setCin(citoyen.cin ?? "");
                setAdresse(citoyen.adresse ?? "");
                setTelephone(citoyen.telephone ?? "");
                setNationalite(citoyen.nationalite ?? "");
                setProfession(citoyen.profession ?? "");
                setEmail(citoyen.email ?? "");
                pageLoadingHolder.setPageLoading(false);
            })
            .catch((err) => {
                console.log(err);
                pageLoadingHolder.setPageLoading(false);
            });
    };

    const resetValidation = () => {
        setPrenomErr("");
        setNomErr("");
        setSexeErr("");
        setDateNaissanceErr("");
        setCinErr("");
        setAdresseErr("");
        setTelephoneErr("");
        setLieuNaissanceErr("");
        setNationaliteErr("");
        setProfessionErr("");
        setEmailErr("");
    };

    return (
        <PageLayout>
            <PageHeader title="Modifier citoyen(ne)" icon={faPeopleGroup}>
                <Alink
                    href={`/app/citoyens/${id}`}
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
                            label="Lieu de naissance"
                            value={lieuNaissance}
                            onChange={updateLieuNaissance}
                            errorMsg={lieuNaissanceErr}
                        />
                        <Input
                            label="Nationalite"
                            value={nationalite}
                            onChange={updateNationalite}
                            errorMsg={nationaliteErr}
                        />
                        <Input
                            label="Profession"
                            value={profession}
                            onChange={updateProfession}
                            errorMsg={professionErr}
                        />
                        <Input
                            label="CIN"
                            value={cin}
                            onChange={updateCin}
                            errorMsg={cinErr}
                        />
                    </div>
                </Card>
                <Card title="Contact" icon={faHeadset} className="mt-5">
                    <Input
                        label="Addresse"
                        inlineLabel={true}
                        leadingIcon={faLocationDot}
                        value={adresse}
                        onChange={updateAddresse}
                        errorMsg={adresseErr}
                    />
                    <Input
                        label="Téléphone"
                        inlineLabel={true}
                        leadingIcon={faPhone}
                        value={telephone}
                        onChange={updateTelephone}
                        errorMsg={telephoneErr}
                    />
                    <Input
                        label="Email"
                        inlineLabel={true}
                        leadingIcon={faEnvelope}
                        value={email}
                        onChange={updateEmail}
                        errorMsg={emailErr}
                    />
                </Card>
                <div className="flex flex-wrap justify-end items-center">
                    <Button
                        className="m-1"
                        type="submit"
                        color="info"
                        onClick={handleEditCitoyen}
                    >
                        <FontAwesomeIcon icon={faPen} />
                        Modifier citoyen(ne)
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

export default EditCitoyen;

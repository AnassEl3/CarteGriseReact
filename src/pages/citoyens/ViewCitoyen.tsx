import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../../layouts/PageLayout";
import PageHeader from "../../components/PageHeader";
import {
    faCakeCandles,
    faCircleInfo,
    faEnvelope,
    faHeadset,
    faLocationDot,
    faPen,
    faPeopleGroup,
    faPhone,
    faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/ui/Card";
import Input from "../../components/form/Input";
import { PageLodaingContext } from "../../contexts/PageLoadingProvider";
import Select from "../../components/form/Select";
import Button from "../../components/ui/Button";
import api from "../../utilities/axios";
import { Citoyen } from "../../types/models";
import Alink from "../../components/ui/Alink";

function ViewCitoyen() {
    const { id } = useParams();
    const pageLoadingHolder = useContext(PageLodaingContext);
    const navigate = useNavigate();

    const [nom, setNom] = useState("");
    const [nomErr, setNomErr] = useState("");
    const [prenom, setPrenom] = useState("");
    const [prenomErr, setPrenomErr] = useState("");
    const [sexe, setSexe] = useState("");
    const [sexeErr, setSexeErr] = useState("");
    const [dateNaissance, setDateNaissance] = useState("");
    const [dateNaissanceErr, setDateNaissanceErr] = useState("");
    const [cin, setCin] = useState("");
    const [cinErr, setCinErr] = useState("");
    const [lieuNaissance, setLieuNaissance] = useState("");
    const [lieuNaissanceErr, setLieuNaissanceErr] = useState("");
    const [nationalite, setNationalite] = useState("");
    const [nationaliteErr, setNationaliteErr] = useState("");
    const [profession, setProfession] = useState("");
    const [professionErr, setProfessionErr] = useState("");
    const [codeErr, setCodeErr] = useState("");
    const [adresse, setAdresse] = useState("");
    const [adresseErr, setAdresseErr] = useState("");
    const [telephone, setTelephone] = useState("");
    const [telephoneErr, setTelephoneErr] = useState("");
    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState("");

    useEffect(() => {
        loadData();
    }, []);

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

    return (
        <PageLayout>
            <PageHeader title="Voir citoyen(ne)" icon={faPeopleGroup}>
                <Alink
                    href={`/app/citoyens/${id}/edit`}
                    className="m-1"
                    color="info"
                    icon={faPen}
                >
                    Modifier
                </Alink>
            </PageHeader>
            <form className="grid gap-8" action="">
                <Card title="information personnelle" icon={faCircleInfo}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 justify-center items-center">
                        <Input label="Prénom" value={prenom} readOnly={true} />
                        <Input label="Nom" value={nom} readOnly={true} />
                        <Select
                            label="Sexe"
                            value={sexe}
                            leadingIcon={faVenusMars}
                            readOnly={true}
                        >
                            <option value="">Sexe de l'employé(e) ...</option>
                            <option value="m">Masculin</option>
                            <option value="f">Féminin</option>
                        </Select>
                        <Input
                            label="Date de naissance"
                            type="date"
                            value={dateNaissance}
                            leadingIcon={faCakeCandles}
                            readOnly={true}
                        />
                        <Input
                            label="Lieu de naissance"
                            value={lieuNaissance}
                            readOnly={true}
                        />
                        <Input
                            label="Nationalite"
                            value={nationalite}
                            readOnly={true}
                        />
                        <Input
                            label="Profession"
                            value={profession}
                            readOnly={true}
                        />
                        <Input label="CIN" value={cin} readOnly={true} />
                    </div>
                </Card>
                <Card title="Contact" icon={faHeadset} className="mt-5">
                    <Input
                        label="Addresse"
                        inlineLabel={true}
                        leadingIcon={faLocationDot}
                        value={adresse}
                        readOnly={true}
                    />
                    <Input
                        label="Téléphone"
                        inlineLabel={true}
                        leadingIcon={faPhone}
                        value={telephone}
                        readOnly={true}
                    />
                    <Input
                        label="Email"
                        inlineLabel={true}
                        leadingIcon={faEnvelope}
                        value={email}
                        readOnly={true}
                    />
                </Card>
            </form>
        </PageLayout>
    );
}

export default ViewCitoyen;

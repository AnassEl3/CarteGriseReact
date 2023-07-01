import { useEffect, useState, useContext, ChangeEvent } from "react";
import api from "../../utilities/axios";
import PageLayout from "../../layouts/PageLayout";
import {
    faBuildingColumns,
    faCircleInfo,
    faEye,
    faHeadset,
    faLocationDot,
    faPen,
    faPhone,
    faPlus,
    faSave,
} from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/ui/Card";
import Input from "../../components/form/Input";
import { PageLodaingContext } from "../../contexts/PageLoadingProvider";
import Alink from "../../components/ui/Alink";
import Button from "../../components/ui/Button";
import { toast } from "react-toastify";
import PageHeader from "../../components/PageHeader";

const InfoGeneraleEdit = () => {
    const pageLoadingHolder = useContext(PageLodaingContext);
    const [administrations, setAdministrations] = useState([]);
    const [id, setId] = useState(0);
    const [nom, setNom] = useState("");
    const [nomErr, setNomErr] = useState("");
    const updateNom = (e: ChangeEvent<HTMLInputElement>) => {
        setNom(e.target.value);
    };
    const [adresse, setAdresse] = useState("");
    const [adresseErr, setAdresseErr] = useState("");
    const updateAdresse = (e: ChangeEvent<HTMLInputElement>) => {
        setAdresse(e.target.value);
    };
    const [telephone, setTelephone] = useState("");
    const [telephoneErr, setTelephoneErr] = useState("");
    const updateTelephone = (e: ChangeEvent<HTMLInputElement>) => {
        setTelephone(e.target.value);
    };

    useEffect(() => {
        pageLoadingHolder.setPageLoading(true);
        api.get("administrations").then((res) => {
            const administration = res.data._embedded.administrations[0];

            setAdministrations(administration);
            setId(administration.id ?? "");
            setNom(administration.nom ?? "");
            setAdresse(administration.adresse ?? "");
            setTelephone(administration.telephone ?? "");

            pageLoadingHolder.setPageLoading(false);
        });
    }, []);

    const saveChanges = () => {
        pageLoadingHolder.setPageLoading(true);
        api.put(`administrations/${id}`, { nom, adresse, telephone })
            .then((res) => {
                console.log(res);
                toast.success("L'administration a été mise à jour avec succès");
                setNomErr("");
                setAdresseErr("");
                setTelephoneErr("");
                pageLoadingHolder.setPageLoading(false);
            })
            .catch((err) => {
                console.log(err);
                const res = err.response;
                if (res.status == 400) {
                    toast.error(
                        "les informations d'administration ne sont pas valides"
                    );
                    res.data.forEach((element: any) => {
                        console.log(element);
                        switch (element.field) {
                            case "nom":
                                setNomErr(element.code);
                                break;
                            case "adresse":
                                setAdresseErr(element.code);
                                break;
                            case "telephone":
                                setTelephoneErr(element.code);
                                break;

                            default:
                                break;
                        }
                    });
                }
                pageLoadingHolder.setPageLoading(false);
            });
    };

    return (
        <>
            <PageLayout>
                <PageHeader title="Administration" modificationPage={true} icon={faBuildingColumns}>
                    <Alink href="/app/administration" color="primary" icon={faEye}>
                        Voir
                    </Alink>
                </PageHeader>
                <Card title="Information générale" icon={faCircleInfo}>
                    <Input
                        label="Nom de l'administration"
                        inlineLabel={true}
                        value={nom}
                        errorMsg={nomErr}
                        onChange={updateNom}
                    />
                </Card>
                <Card title="Contact" icon={faHeadset} className="mt-5">
                    <div className="grid grid-cols-2 gap-3 mt-5">
                        <Input
                            label="Addresse"
                            leadingIcon={faLocationDot}
                            value={adresse}
                            errorMsg={adresseErr}
                            onChange={updateAdresse}
                        />
                        <Input
                            label="Téléphone"
                            leadingIcon={faPhone}
                            value={telephone}
                            errorMsg={telephoneErr}
                            onChange={updateTelephone}
                        />
                    </div>
                </Card>
                <div className="flex justify-end my-5">
                    <Button type="button" color="info" icon={faSave} onClick={saveChanges}>
                        Sauvegarder
                    </Button>
                </div>
            </PageLayout>
        </>
    );
};

export default InfoGeneraleEdit;

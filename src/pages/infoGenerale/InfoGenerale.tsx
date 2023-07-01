import { useEffect, useState, useContext } from "react";
import api from "../../utilities/axios";
import PageLayout from "../../layouts/PageLayout";
import {
    faBuildingColumns,
    faCircleInfo,
    faHeadset,
    faLocationDot,
    faPen,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/ui/Card";
import Input from "../../components/form/Input";
import { PageLodaingContext } from "../../contexts/PageLoadingProvider";
import Alink from "../../components/ui/Alink";
import PageHeader from "../../components/PageHeader";

const InfoGenerale = () => {
    const pageLoadingHolder = useContext(PageLodaingContext);
    const [administrations, setAdministrations] = useState([]);
    const [id, setId] = useState(0);
    const [nom, setNom] = useState("");
    const [adresse, setAdresse] = useState("");
    const [telephone, setTelephone] = useState("");

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

    return (
        <>
            <PageLayout>
                <PageHeader title="Administration" icon={faBuildingColumns}>
                    <Alink href="edit" color="info" icon={faPen}>
                        Modifier
                    </Alink>
                </PageHeader>
                <Card title="Information générale" icon={faCircleInfo}>
                    <Input
                        label="Nom de l'administration"
                        inlineLabel={true}
                        readOnly={true}
                        value={nom}
                    />
                </Card>
                <Card title="Contact" icon={faHeadset} className="mt-5">
                    <div className="grid grid-cols-2 gap-3 mt-5">
                        <Input
                            label="Addresse"
                            leadingIcon={faLocationDot}
                            readOnly={true}
                            value={adresse}
                        />
                        <Input
                            label="Téléphone"
                            leadingIcon={faPhone}
                            readOnly={true}
                            value={telephone}
                        />
                    </div>
                </Card>
            </PageLayout>
        </>
    );
};

export default InfoGenerale;

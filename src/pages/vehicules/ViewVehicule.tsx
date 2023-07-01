import { useContext, useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageLodaingContext } from "../../contexts/PageLoadingProvider";
import api from "../../utilities/axios";
import { Vehicule } from "../../types/models";
import PageLayout from "../../layouts/PageLayout";
import PageHeader from "../../components/PageHeader";
import {
    faCar,
    faCarBattery,
    faCircleInfo,
    faGasPump,
    faPen,
    faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import Alink from "../../components/ui/Alink";
import Card from "../../components/ui/Card";
import Input from "../../components/form/Input";

function ViewVehicule() {
    const { id } = useParams();
    const pageLoadingHolder = useContext(PageLodaingContext);
    const navigate = useNavigate();

    const [modele, setModele] = useState("");
    const [marque, setMarque] = useState("");
    const [carburant, setCarburant] = useState("");
    const [puissance, setPuissance] = useState(0);
    const [nbPlace, setNbPlace] = useState(0);
    const [nbCylindres, setNbCylindres] = useState(0);
    const [ptac, setPtac] = useState(0);

    useEffect(() => {
        loadData();
    }, []);

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

    return (
        <PageLayout>
            <PageHeader title="Voir véhicule" icon={faCar}>
                <Alink
                    href={`/app/vehicules/${id}/edit`}
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
                        <Input label="Modèle" value={modele} readOnly={true} />
                        <Input label="Marque" value={marque} readOnly={true} />
                        <Input
                            label="Type de carburant"
                            value={carburant}
                            readOnly={true}
                            leadingIcon={faGasPump}
                        />
                        <Input
                            label="Puissance"
                            type="number"
                            value={puissance}
                            readOnly={true}
                            leadingIcon={faCarBattery}
                        />
                        <Input
                            label="Nombre de place"
                            type="number"
                            value={nbPlace}
                            readOnly={true}
                        />
                        <Input
                            label="Nombre de cylindres"
                            type="number"
                            value={nbCylindres}
                            readOnly={true}
                        />
                        <Input
                            label="PTAC"
                            type="number"
                            value={ptac}
                            readOnly={true}
                        />
                    </div>
                </Card>
            </form>
        </PageLayout>
    );
}

export default ViewVehicule;

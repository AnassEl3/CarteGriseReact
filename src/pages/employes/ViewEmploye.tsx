import { useEffect, useContext, useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageLodaingContext } from "../../contexts/PageLoadingProvider";
import api from "../../utilities/axios";
import { Employe } from "../../types/models";
import PageLayout from "../../layouts/PageLayout";
import PageHeader from "../../components/PageHeader";
import {
    faCakeCandles,
    faCircleInfo,
    faPen,
    faUsers,
    faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import Alink from "../../components/ui/Alink";
import Card from "../../components/ui/Card";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select";
import Button from "../../components/ui/Button";

function ViewEmploye() {
    const { id } = useParams();
    const pageLoadingHolder = useContext(PageLodaingContext);
    const navigate = useNavigate();

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [sexe, setSexe] = useState("");
    const [dateNaissance, setDateNaissance] = useState("");
    const [cin, setCin] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        pageLoadingHolder.setPageLoading(true);
        api.get(`employes/${id}`)
            .then((res) => {
                const employe: Employe = res.data;
                setPrenom(employe.prenom ?? "");
                setNom(employe.nom ?? "");
                setSexe(employe.sexe ?? "");
                setDateNaissance(employe.date_naissance ?? "");
                setCin(employe.cin ?? "");
                pageLoadingHolder.setPageLoading(false);
            })
            .catch((err) => {
                console.log(err);
                pageLoadingHolder.setPageLoading(false);
            });
    };

    return (
        <PageLayout>
            <PageHeader title="Voir employé(e)" icon={faUsers}>
                <Alink
                    href={`/app/employes/${id}/edit`}
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
                            label="CIN"
                            value={cin}
                            readOnly={true}
                            />
                    </div>
                </Card>
            </form>
        </PageLayout>
    );
}

export default ViewEmploye;

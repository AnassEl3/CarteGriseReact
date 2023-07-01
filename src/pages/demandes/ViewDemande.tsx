import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "../../layouts/PageLayout";
import PageHeader from "../../components/PageHeader";
import { faCircleInfo, faFileLines, faPen, faPerson } from "@fortawesome/free-solid-svg-icons";
import Alink from "../../components/ui/Alink";
import { PageLodaingContext } from "../../contexts/PageLoadingProvider";
import api from "../../utilities/axios";
import { Citoyen, Demande } from "../../types/models";
import Card from "../../components/ui/Card";
import Input from "../../components/form/Input";

function ViewDemande() {
    const { id } = useParams();
    const pageLoadingHolder = useContext(PageLodaingContext);
    const navigate = useNavigate();

    const [type, setType] = useState("");
    const [dateDemande, setDateDemande] = useState("");
    const [etat, setEtat] = useState("");
    const [descriptionEtat, setDescriptionEtat] = useState("");
    const [code, setCode] = useState("");
    const [citoyenId, setCitoyenId] = useState(0);
    
    const [citoyen, setCitoyen] = useState<Citoyen | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        pageLoadingHolder.setPageLoading(true);
        api.get(`demandes/${id}`)
            .then((res) => {
                console.log(res);

                const demande: Demande = res.data;
                setType(demande.type ?? "");
                setDateDemande(demande.date_demande ?? "");
                setEtat(demande.etat ?? "");
                setDescriptionEtat(demande.description_etat ?? "");
                setCode(demande.code ?? "");
                setCitoyenId(demande.citoyen_id ?? 0);

                api.get(`citoyens/${citoyenId}`).then((res)=>{
                    console.log(res);
                }).catch(err => console.log(err))
                
                pageLoadingHolder.setPageLoading(false);
            })
            .catch((err) => {
                console.log(err);
                pageLoadingHolder.setPageLoading(false);
            });

    };

    return (
        <PageLayout>
            <PageHeader title="Voir carte grise" icon={faFileLines}>
                <Alink
                    href={`/app/demandes/${id}/edit`}
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
                        <Input
                            label="Type"
                            value={type}
                            readOnly={true}
                        />
                        <Input
                            label="Date de demande"
                            type="date"
                            value={dateDemande}
                            readOnly={true}
                        />
                        <Input
                            label="Etat"
                            value={etat}
                            readOnly={true}
                        />
                        <Input
                            label="Description d'état"
                            value={descriptionEtat}
                            readOnly={true}
                        />
                        <Input
                            label="Code"
                            value={code}
                            readOnly={true}
                        />
                    </div>
                </Card>
                <Card title="Citoyen" icon={faPerson}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 justify-center items-center">
                        <div className="grid grid-cols-2">
                            <p>Prénom</p>
                            <h1>{citoyen?.prenom}</h1>
                        </div>
                    </div>
                </Card>
                
            </form>
        </PageLayout>
    );
}

export default ViewDemande;

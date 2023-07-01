import {useState, useContext, useEffect, ChangeEvent} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { PageLodaingContext } from '../../contexts/PageLoadingProvider';
import api from '../../utilities/axios';
import { toast } from 'react-toastify';
import { Demande } from '../../types/models';
import PageLayout from '../../layouts/PageLayout';
import PageHeader from '../../components/PageHeader';
import { faCircleInfo, faEye, faFileLines, faPen, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import Alink from '../../components/ui/Alink';
import Card from '../../components/ui/Card';
import Input from '../../components/form/Input';
import Button from '../../components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function EditDemande() {
    const { id } = useParams();
    const pageLoadingHolder = useContext(PageLodaingContext);
    const navigate = useNavigate();

    const [type, setType] = useState("");
    const updateType = (e: ChangeEvent<HTMLInputElement>) => {
        setType(e.target.value);
    };
    const [typeErr, setTypeErr] = useState("");

    const [dateDemande, setDateDemande] = useState("");
    const updateDateDemande = (e: ChangeEvent<HTMLInputElement>) => {
        setDateDemande(e.target.value);
    };
    const [dateDemandeErr, setDateDemandeErr] = useState("");

    const [etat, setEtat] = useState("");
    const updateEtat = (e: ChangeEvent<HTMLInputElement>) => {
        setEtat(e.target.value);
    };
    const [etatErr, setEtatErr] = useState("");

    const [descriptionEtat, setDescriptionEtat] = useState("");
    const updateDescriptionEtat = (e: ChangeEvent<HTMLInputElement>) => {
        setDescriptionEtat(e.target.value);
    };
    const [descriptionEtatErr, setDescriptionEtatErr] = useState("");

    const [code, setCode] = useState("");
    const updateCode = (e: ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };
    const [codeErr, setCodeErr] = useState("");

    const [citoyenId, setCitoyenId] = useState(0);
    const updateCitoyenId = (e: ChangeEvent<HTMLInputElement>) => {
        setCitoyenId(Number(e.target.value));
    };
    const [citoyenIdErr, setCitoyenIdErr] = useState(0);

    useEffect(() => {
        loadData();
    }, []);

    const handleEditDemande = (
        e: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
        e.preventDefault();
        pageLoadingHolder.setPageLoading(true);
        resetValidation();
        api.patch(`demandes/${id}`, {
            type,
            date_demande: dateDemande,
            etat,
            description_etat: descriptionEtat,
            code,
            citoyen_id: citoyenId,
        })
            .then((res) => {
                toast.success("Demande a été modifié avec succès");
                pageLoadingHolder.setPageLoading(false);
                navigate("/app/demandes");
            })
            .catch((err) => {
                const res = err.response;
                console.log(err);
                err;
                if (res.status == 400) {
                    toast.error(
                        "Les informations de demande ne sont pas valides"
                    );
                    res.data.forEach((element: any) => {
                        switch (element.field) {
                            case "type":
                                setTypeErr(element.code);
                                break;
                            case "date_demande":
                                setDateDemandeErr(element.code);
                                break;
                            case "etat":
                                setEtatErr(element.code);
                                break;
                            case "description_ etat":
                                setDescriptionEtatErr(element.code);
                                break;
                            case "code":
                                setCodeErr(element.code);
                                break;
                            case "citoyen_id":
                                setCitoyenIdErr(element.code);
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
                pageLoadingHolder.setPageLoading(false);
            })
            .catch((err) => {
                console.log(err);
                pageLoadingHolder.setPageLoading(false);
            });
    };

    const resetValidation = () => {
        setTypeErr("");
        setDateDemandeErr("");
        setEtatErr("");
        setDescriptionEtatErr("");
        setCodeErr("");
        setCitoyenIdErr(0);
    };

  return (
    <PageLayout>
            <PageHeader title="Modifier demande" icon={faFileLines}>
                <Alink
                    href={`/app/demandes/${id}`}
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
                            label="Type"
                            value={type}
                            onChange={updateType}
                            errorMsg={typeErr}
                        />
                        <Input
                            label="Date de demande"
                            type="date"
                            value={dateDemande}
                            onChange={updateDateDemande}
                            errorMsg={dateDemandeErr}
                        />
                        <Input
                            label="Etat"
                            value={etat}
                            onChange={updateEtat}
                            errorMsg={etatErr}
                        />
                        <Input
                            label="Description d'état"
                            value={descriptionEtat}
                            onChange={updateDescriptionEtat}
                            errorMsg={descriptionEtatErr}
                        />
                        <Input
                            label="Code"
                            value={code}
                            onChange={updateCode}
                            errorMsg={codeErr}
                        />
                    </div>
                </Card>
                <div className="flex flex-wrap justify-end items-center">
                    <Button
                        className="m-1"
                        type="submit"
                        color="info"
                        onClick={handleEditDemande}
                    >
                        <FontAwesomeIcon icon={faPen} />
                        Modifier demande
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
  )
}

export default EditDemande
import { useContext, useEffect, useState, ChangeEvent} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PageLodaingContext } from '../../contexts/PageLoadingProvider';
import api from '../../utilities/axios';
import { toast } from 'react-toastify';
import PageLayout from '../../layouts/PageLayout';
import PageHeader from '../../components/PageHeader';
import { faCircleInfo, faFileLines, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import Card from '../../components/ui/Card';
import Input from '../../components/form/Input';
import Button from '../../components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AddDemande() {
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
    

    const handleAddDemande = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();
        pageLoadingHolder.setPageLoading(true);
        resetValidation();
        api.post("demandes", {
            type,
            date_demande: dateDemande,
            etat,
            description_etat: descriptionEtat,
            code,
            citoyen_id: citoyenId,
        })
            .then((res) => {
                toast.success("Demande a été ajouté avec succès");
                pageLoadingHolder.setPageLoading(false);
                navigate("/app/demandes");
            })
            .catch((err) => {
                const res = err.response;
                console.log(err);
                (err)
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
                                setEtat(element.code);
                                break;
                            case "description_etat":
                                setDescriptionEtat(element.code);
                                break;
                            case "code":
                                setCodeErr(element.code);
                                break;
                            case "citoyen_id":
                                setCitoyenId(element.code);
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
            <PageHeader title="Ajouter véhicule" icon={faFileLines} />
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
                        color="success"
                        onClick={handleAddDemande}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        Ajourter demande
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
  )
}

export default AddDemande
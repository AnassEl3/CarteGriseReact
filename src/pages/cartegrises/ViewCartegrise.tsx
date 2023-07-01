import {useState, useContext, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { PageLodaingContext } from '../../contexts/PageLoadingProvider';
import api from '../../utilities/axios';
import { CarteGrise } from '../../types/models';
import PageLayout from '../../layouts/PageLayout';
import PageHeader from '../../components/PageHeader';
import { faAddressCard, faCalendar, faCircleInfo, faPen, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import Alink from '../../components/ui/Alink';
import Card from '../../components/ui/Card';
import Input from '../../components/form/Input';

function ViewCartegrise() {
    const { id } = useParams();
    const pageLoadingHolder = useContext(PageLodaingContext);
    const navigate = useNavigate();

    const [immatriculation, setImmatriculation] = useState("");
    const [immatriculationAnterieure, setImmatriculationAnterieure] = useState("");
    const [datePremiereUtilisation, setDatePremiereUtilisation] = useState("");
    const [dateMutation, setDateMutation] = useState("");
    const [dateFinValidation, setDateFinValidation] = useState("");
    const [vehiculeUsage, setVehiculeUsage] = useState("");
    const [vehiculeId, setVehiculeId] = useState(0);
    const [citoyenId, setCitoyenId] = useState(0);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        pageLoadingHolder.setPageLoading(true);
        api.get(`cartesgrise/${id}`)
            .then((res) => {
                console.log(res);

                const cartegrise: CarteGrise = res.data;
                setImmatriculation(cartegrise.immatriculation ?? "");
                setImmatriculationAnterieure(
                    cartegrise.immatriculation_anterieure ?? ""
                );
                setDatePremiereUtilisation(
                    cartegrise.date_premiere_utilisation ?? ""
                );
                setDateMutation(cartegrise.date_mutation ?? "");
                setDateFinValidation(cartegrise.date_fin_validation ?? "");
                setVehiculeUsage(cartegrise.vehicule_usage ?? "");
                setVehiculeId(cartegrise.vehicule_id ?? "");
                setCitoyenId(cartegrise.citoyen_id ?? "");
                pageLoadingHolder.setPageLoading(false);
            })
            .catch((err) => {
                console.log(err);
                pageLoadingHolder.setPageLoading(false);
            });
    };
  return (
    <PageLayout>
            <PageHeader title="Voir carte grise" icon={faAddressCard}>
                <Alink
                    href={`/app/cartesgrise/${id}/edit`}
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
                            label="Immatriculation"
                            value={immatriculation}
                            readOnly={true}
                        />
                        <Input
                            label="Immatriculation anterieure"
                            value={immatriculationAnterieure}
                            readOnly={true}
                        />
                        <Input
                            label="Usage de véhicule"
                            value={vehiculeUsage}
                            readOnly={true}
                        />
                    </div>
                </Card>
                <Card title="Dates" icon={faCalendar} className="mt-5">
                    <Input
                        label="Date de première utilisation"
                        type="date"
                        inlineLabel={true}
                        value={datePremiereUtilisation}
                        readOnly={true}
                    />
                    <Input
                        label="Date de mutation"
                        type="date"
                        inlineLabel={true}
                        value={dateMutation}
                        readOnly={true}
                    />
                    <Input
                        label="Date de fin de validation"
                        type="date"
                        inlineLabel={true}
                        value={dateFinValidation}
                        readOnly={true}
                    />
                </Card>
            </form>
        </PageLayout>
  )
}

export default ViewCartegrise
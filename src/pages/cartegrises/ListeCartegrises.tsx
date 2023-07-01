import {useContext, useEffect, useState, ChangeEvent} from 'react'
import {useNavigate} from 'react-router-dom'
import { PageLodaingContext } from '../../contexts/PageLoadingProvider';
import { CarteGrise } from '../../types/models';
import api from '../../utilities/axios';
import { toast } from 'react-toastify';
import PageLayout from '../../layouts/PageLayout';
import PageHeader from '../../components/PageHeader';
import Alink from '../../components/ui/Alink';
import { faAddressCard, faArrowLeft, faArrowRight, faCircleXmark, faEye, faMagnifyingGlass, faPen, faPeopleGroup, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Input from '../../components/form/Input';
import Model from '../../components/ui/Model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/ui/Button';

const ListeCartegrises = () => {
    const pageLoadingHolder = useContext(PageLodaingContext);
    const [carteGrises, setCartGrises] = useState<CarteGrise[]>([]);
    const [search, setSearch] = useState("");
    const updateSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    const [totalResults, setTotalResults] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(0);
    const incrementPage = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (page < totalPage - 1) {
            setPage(page + 1);
        }
    };
    const decrementPage = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    useEffect(() => {
        loadData();
    }, []);
    useEffect(() => {
        loadData();
    }, [page]);

    const handleDeleteCarteGrise = (
        e: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
        pageLoadingHolder.setPageLoading(true);
        const carteGriseId = e.target.getAttribute("data-carteGriseId");
        console.log(carteGriseId);
        
        api.delete(`cartesgrise/${carteGriseId}`)
            .then((res) => {
                toast.success("Carte grise a été supprimé avec succès");
                loadData();
                pageLoadingHolder.setPageLoading(false);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Erreur: " + err.code);
                pageLoadingHolder.setPageLoading(false);
            });
    };

    const loadData = () => {
        pageLoadingHolder.setPageLoading(true);
        api.get(`cartesgrise?size=5&page=${page}&sort=id,desc`)
            .then((res) => {
                const cartesgrise: CarteGrise[] = res.data._embedded.cartesgrise;
                setTotalPage(res.data.page.totalPages);
                setTotalResults(res.data.page.totalElements);

                setCartGrises(cartesgrise);

                pageLoadingHolder.setPageLoading(false);
            })
            .catch((err) => {
                console.log(err);
                pageLoadingHolder.setPageLoading(false);
            });
    };

    return (
        <PageLayout>
            <PageHeader title="Liste des carte grises" icon={faAddressCard}>
                <Alink href="/app/cartesgrise/add" color="success" icon={faPlus}>
                    Ajouter carte grise
                </Alink>
            </PageHeader>

            <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="p-3 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                    <div className="sm:col-span-1">
                        <Input
                            type="text"
                            placeholder="Recherche..."
                            leadingIcon={faMagnifyingGlass}
                            value={search}
                            onChange={updateSearch}
                        />
                    </div>

                    <div className="sm:col-span-2 md:grow">
                        <div className="flex justify-end gap-x-2">
                            {/* filters */}
                        </div>
                    </div>
                </div>
                {/* Table */}
                <table className="divide-y divide-gray-200 dark:divide-gray-700 w-full">
                    <thead className="">
                        <tr>
                            <th scope="col" className="px-3 py-2 text-center">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                    Immatriculation
                                </span>
                            </th>

                            <th scope="col" className="px-3 py-2 text-center">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                    Date de fin de vlidation
                                </span>
                            </th>
                            <th scope="col" className="px-3 py-2 text-center">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                    Usage
                                </span>
                            </th>
                            <th scope="col" className="px-3 py-2 text-center">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                    Actions
                                </span>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {carteGrises.map((cartegrise) => {
                            return (
                                <tr
                                    className="bg-gray-50 dark:bg-slate-800"
                                    key={cartegrise.id}
                                >
                                    <td className="h-px w-px whitespace-nowrap text-center p-2">
                                        <p>{cartegrise.immatriculation}</p>
                                    </td>
                                    <td className="h-px w-px whitespace-nowrap text-center p-2">
                                        <p>{cartegrise.date_fin_validation}</p>
                                    </td>
                                    <td className="h-px w-px whitespace-nowrap text-center p-2">
                                        <p>{cartegrise.vehicule_usage}</p>
                                    </td>
                                    <td className="h-px w-px whitespace-nowrap text-center p-2">
                                        <div className="flex flex-wrap justify-center items-center">
                                            <Alink
                                                href={`/app/cartesgrise/${cartegrise.id}`}
                                                color="primary"
                                                size="sm"
                                                icon={faEye}
                                                className="m-1"
                                            />
                                            <Alink
                                                href={`/app/cartesgrise/${cartegrise.id}/edit`}
                                                color="info"
                                                size="sm"
                                                icon={faPen}
                                                className="m-1"
                                            ></Alink>
                                            {/* <Alink
                                                    href="/app/citoyens/#"
                                                    color="danger"
                                                    size="sm"
                                                    icon={faTrash}
                                                    className="m-1"
                                                ></Alink> */}
                                            <Model
                                                btnIcon={faTrash}
                                                btnColor="danger"
                                                modelKey={cartegrise.id}
                                            >
                                                <div className="p-4 overflow-y-auto">
                                                    <p className="text-center">
                                                        Voulez-vous supprimer
                                                        la carte grise suivant:
                                                        <br />
                                                        <br />
                                                        Immatriculation:{" "}
                                                        <span className="font-bold text-xl">
                                                            {cartegrise.immatriculation}
                                                        </span>
                                                        <br />
                                                        Date de fin de validation:{" "}
                                                        <span className="font-bold text-xl">
                                                            {cartegrise.date_fin_validation}
                                                        </span>
                                                        <br />
                                                        Usage de véhicule:{" "}
                                                        <span className="font-bold text-xl">
                                                            {cartegrise.vehicule_usage}
                                                        </span>
                                                        <br />
                                                    </p>
                                                </div>
                                                <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                                                    <button
                                                        type="button"
                                                        className={`text-white bg-danger hover:bg-danger-500 focus:ring-danger-500 py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800`}
                                                        data-carteGriseId={
                                                            cartegrise.id
                                                        }
                                                        data-hs-overlay={`#model-n${cartegrise.id}`}
                                                        onClick={
                                                            handleDeleteCarteGrise
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                        />
                                                        Supprimer la carte grise
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                                                        data-hs-overlay={`#model-n${cartegrise.id}`}
                                                    >
                                                        Annuler
                                                    </button>
                                                </div>
                                            </Model>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {carteGrises.length == 0 ? (
                    <tr className="flex justify-center items-center p-5">
                        <p className="text-center text-xl font-bold flex items-center m-auto">
                            <span className="h1 text-3xl px-2">
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </span>
                            Aucun élément trouvé
                        </p>
                    </tr>
                ) : (
                    ""
                )}
                <div className="w-full">
                    <div className="flex justify-between items-center p-3 w-full">
                        <p>{totalResults} Résultats en totale</p>
                        <div className="flex flex-wrap justify-end items-center">
                            <Button
                                color="secondary"
                                icon={faArrowLeft}
                                className="m-1"
                                onClick={decrementPage}
                                disabled={page > 0 ? false : true}
                            >
                                Précedent
                            </Button>
                            <p className="italic font-semibold p-0 m-1 mx-2">
                                Page {page}
                            </p>
                            <Button
                                color="secondary"
                                tailingIcon={faArrowRight}
                                className="m-1"
                                onClick={incrementPage}
                                disabled={page < totalPage - 1 ? false : true}
                            >
                                Suivant
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default ListeCartegrises;

import { useContext, useState, useEffect } from "react";
import PageLayout from "../../layouts/PageLayout";
import PageHeader from "../../components/PageHeader";
import { faAddressCard, faCarRear, faFileLines, faHome, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../utilities/axios";
import { userContext } from "../../contexts/UserProvider";
import { Employe } from "../../types/models";

const TableauBord = () => {

    const userHolder = useContext(userContext);

    const [user, setUser] = useState<Employe | null>(null); 

    const [nbEmployes, setNbEmployes] = useState(0);
    const [nbCartesgrise, setNbCartesgrise] = useState(0);
    const [nbDemandes, setNbDemandes] = useState(0);
    const [nbVehicules, setNbVehicules] = useState(0);

    useEffect(()=>{
        api.get("employes").then((res)=>{
            setNbEmployes(res.data._embedded.employes.length);
        }).catch(err => console.log(err))
        api.get("cartesgrise").then((res)=>{
            setNbCartesgrise(res.data._embedded.cartesgrise.length);
        }).catch(err => console.log(err))
        api.get("demandes").then((res)=>{
            setNbDemandes(res.data._embedded.demandes.length);
        }).catch(err => console.log(err))
        api.get("vehicules").then((res)=>{
            setNbVehicules(res.data._embedded.vehicules.length);
        }).catch(err => console.log(err))
    }, [])

    useEffect(()=>{
        api.get(`employes/search/findByCin?cin=${userHolder.cin}`).then((res)=>{
            setUser(res.data);
        }).catch(err => console.log(err))
    }, [userHolder])

    return (
        <PageLayout>
            <PageHeader title="Tableau de bord" icon={faHome}></PageHeader>
            <div className="">
                {user != null ? (
                <h1 className="text-3xl text-center font-light">
                    Bienvenue
                    <span className="font-semibold">
                    {user.sexe == "M" ? " Mr." : " Mme"} 
                    <span className="normal-case"> {user.nom}</span> {user.prenom}
                    </span>
                </h1>
                ) : ""}
            </div>
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800">
                        <div className="p-4 md:p-5 flex gap-x-4">
                            <div className="flex-shrink-0 flex justify-center items-center w-[46px] h-[46px] bg-gray-100 rounded-md dark:bg-gray-800">
                                <FontAwesomeIcon icon={faUsers} />
                            </div>

                            <div className="grow">
                                <div className="flex items-center gap-x-2">
                                    <p className="text-xs uppercase tracking-wide text-gray-500">
                                        Nombre employés
                                    </p>
                                </div>
                                <div className="mt-1 flex items-center gap-x-2">
                                    <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200">
                                        {nbEmployes}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800">
                        <div className="p-4 md:p-5 flex gap-x-4">
                            <div className="flex-shrink-0 flex justify-center items-center w-[46px] h-[46px] bg-gray-100 rounded-md dark:bg-gray-800">
                                <FontAwesomeIcon icon={faAddressCard} />
                            </div>

                            <div className="grow">
                                <div className="flex items-center gap-x-2">
                                    <p className="text-xs uppercase tracking-wide text-gray-500">
                                        Nombre cartes grise
                                    </p>
                                </div>
                                <div className="mt-1 flex items-center gap-x-2">
                                    <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200">
                                        {nbCartesgrise}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800">
                        <div className="p-4 md:p-5 flex gap-x-4">
                            <div className="flex-shrink-0 flex justify-center items-center w-[46px] h-[46px] bg-gray-100 rounded-md dark:bg-gray-800">
                                <FontAwesomeIcon icon={faFileLines} />
                            </div>

                            <div className="grow">
                                <div className="flex items-center gap-x-2">
                                    <p className="text-xs uppercase tracking-wide text-gray-500">
                                        Nombre demandes
                                    </p>
                                </div>
                                <div className="mt-1 flex items-center gap-x-2">
                                    <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200">
                                        {nbDemandes}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800">
                        <div className="p-4 md:p-5 flex gap-x-4">
                            <div className="flex-shrink-0 flex justify-center items-center w-[46px] h-[46px] bg-gray-100 rounded-md dark:bg-gray-800">
                                <FontAwesomeIcon icon={faCarRear} />
                            </div>

                            <div className="grow">
                                <div className="flex items-center gap-x-2">
                                    <p className="text-xs uppercase tracking-wide text-gray-500">
                                        Nombre véhicule
                                    </p>
                                </div>
                                <div className="mt-1 flex items-center gap-x-2">
                                    <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200">
                                        {nbVehicules}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </PageLayout>
    );
};

export default TableauBord;

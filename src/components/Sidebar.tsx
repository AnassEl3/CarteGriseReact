import {
    faAngleDown,
    faAngleUp,
    faHome,
    faBuildingColumns,
    faFileLines,
    faCarRear,
    faCircleInfo,
    faUsers,
    faNoteSticky,
    faList,
    faFolderOpen,
    faPeopleGroup,
    faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    type navLinkArgs = {
        isActive: boolean,
        isPending: boolean,
    }
    const navLinkStyling = (args:navLinkArgs):string => {
        let className = "flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300    ";
        if(args.isActive){
            className += "dark:bg-gray-900 bg-gray-100";
        }
        return className;
    }
    return (
        <>
            {/* Sidebar Toggle */}
            <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center py-4">
                    {/* Navigation Toggle */}
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-600"
                        data-hs-overlay="#application-sidebar"
                        aria-controls="application-sidebar"
                        aria-label="Toggle navigation"
                    >
                        <span className="sr-only">Toggle Navigation</span>
                        <svg
                            className="w-5 h-5"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                            />
                        </svg>
                    </button>
                    {/* End Navigation Toggle */}

                    {/* Breadcrumb */}
                    <ol
                        className="ml-3 flex items-center whitespace-nowrap min-w-0"
                        aria-label="Breadcrumb"
                    >
                        <li className="flex items-center text-sm text-gray-800 dark:text-gray-400">
                            App
                            <svg
                                className="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-400 dark:text-gray-600"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </li>
                        <li
                            className="text-sm font-semibold text-gray-800 truncate dark:text-gray-400"
                            aria-current="page"
                        >
                            Tableau de bord
                        </li>
                    </ol>
                    {/* End Breadcrumb */}
                </div>
            </div>
            {/* End Sidebar Toggle */}

            {/* Sidebar */}
            <div
                id="application-sidebar"
                className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[60] w-64 bg-white border-r border-gray-200 pt-7 pb-10 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 dark:scrollbar-y dark:bg-gray-800 dark:border-gray-700"
            >
                <div className="px-6">
                    <NavLink
                        className="flex-none text-xl font-semibold dark:text-white"
                        to="/"
                    >
                        Carte grise
                    </NavLink>
                </div>

                <nav
                    className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
                    data-hs-accordion-always-open
                >
                    <ul className="space-y-1.5">
                        <li>
                            <NavLink
                                to="/app/tablebord"
                                className={navLinkStyling}
                            >
                                <FontAwesomeIcon icon={faHome} />
                                Tableau de bord
                            </NavLink>
                        </li>

                        {/* --------------------------------------------------------- */}

                        <li
                            className="hs-accordion"
                            id="administration-accordion"
                        >
                            <a
                                className="hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white"
                                href="javascript:;"
                            >
                                <FontAwesomeIcon icon={faBuildingColumns} />
                                Administration
                                <FontAwesomeIcon
                                    icon={faAngleDown}
                                    className="hs-accordion-active:hidden ml-auto block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                                />
                                <FontAwesomeIcon
                                    icon={faAngleUp}
                                    className="hs-accordion-active:block ml-auto hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                                />
                            </a>

                            <div
                                id="administration-accordion-child"
                                className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                            >
                                <ul className="pt-2 pl-2">
                                    <li>
                                        <NavLink
                                            to="/app/administration"
                                            className={navLinkStyling}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCircleInfo}
                                            />
                                            Information générale
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/app/employes"
                                            className={navLinkStyling}
                                        >
                                            <FontAwesomeIcon icon={faUsers} />
                                            Employés
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/app/formulaires"
                                            className={navLinkStyling}
                                        >
                                            <FontAwesomeIcon
                                                icon={faNoteSticky}
                                            />
                                            Formulaires
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        {/* --------------------------------------------------------- */}

                        <li className="hs-accordion" id="demandes-accordion">
                            <a
                                className="hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white"
                                href="javascript:;"
                            >
                                <FontAwesomeIcon icon={faFileLines} />
                                Demandes
                                <FontAwesomeIcon
                                    icon={faAngleDown}
                                    className="hs-accordion-active:hidden ml-auto block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                                />
                                <FontAwesomeIcon
                                    icon={faAngleUp}
                                    className="hs-accordion-active:block ml-auto hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                                />
                            </a>

                            <div
                                id="demandes-accordion-child"
                                className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                            >
                                <ul className="pt-2 pl-2">
                                    <li>
                                        <NavLink
                                            to="/app/demandes"
                                            className={navLinkStyling}
                                        >
                                            <FontAwesomeIcon icon={faList} />
                                            Liste de demandes
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/app/documents"
                                            className={navLinkStyling}
                                        >
                                            <FontAwesomeIcon
                                                icon={faFolderOpen}
                                            />
                                            Documents
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/app/citoyens"
                                            className={navLinkStyling}
                                        >
                                            <FontAwesomeIcon
                                                icon={faPeopleGroup}
                                            />
                                            Citoyens
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        {/* --------------------------------------------------------- */}

                        <li className="hs-accordion" id="vehicule-accordion">
                            <a
                                className="hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white"
                                href="javascript:;"
                            >
                                <FontAwesomeIcon icon={faCarRear} />
                                Véhicules
                                <FontAwesomeIcon
                                    icon={faAngleDown}
                                    className="hs-accordion-active:hidden ml-auto block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                                />
                                <FontAwesomeIcon
                                    icon={faAngleUp}
                                    className="hs-accordion-active:block ml-auto hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                                />
                            </a>

                            <div
                                id="vehicule-accordion-child"
                                className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                            >
                                <ul className="pt-2 pl-2">
                                    <li>
                                        <NavLink
                                            to="/app/vehicules"
                                            className={navLinkStyling}
                                        >
                                            <FontAwesomeIcon
                                                icon={faList}
                                            />
                                            Liste de véhicules
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/app/cartegrise"
                                            className={navLinkStyling}
                                        >
                                            <FontAwesomeIcon
                                                icon={faAddressCard}
                                            />
                                            Carte gises
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
            {/* End Sidebar */}
        </>
    );
};

export default Sidebar;

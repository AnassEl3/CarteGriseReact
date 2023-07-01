import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

type ColorType =
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "info"
    | "warning"
    | "danger"
    | undefined;
type Props = {
    children: ReactNode;
    btnClassName?: string;
    btnText?: string;
    btnSize?: string;
    btnColor?: ColorType;
    btnIcon?: IconProp;
    btnShowIcon?: boolean;
    modelKey?: number;
    modelTitle?: string;
};

function Model({
    children,
    btnClassName = "",
    btnText = "",
    btnSize = "md",
    btnColor = "primary",
    btnIcon,
    btnShowIcon = true,
    modelKey = 0,
    modelTitle = "",
}: Props) {
    return (
        <>
            <div className="text-center">
                <button
                    type="button"
                    className={`text-white text-${btnSize} bg-${btnColor} hover:bg-${btnColor}-500 focus:ring-${btnColor}-500 py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 ${btnClassName}`}
                    data-hs-overlay={`#model-n${modelKey}`}
                >
                    {btnShowIcon && btnIcon ? (
                        <FontAwesomeIcon icon={btnIcon} />
                    ) : null}
                    {btnText}
                </button>
            </div>

            <div
                id={`model-n${modelKey}`}
                className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
            >
                <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center justify-center">
                    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                            <h3 className="font-bold text-gray-800 dark:text-white">
                                {modelTitle}
                            </h3>
                            <button
                                type="button"
                                className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                                data-hs-overlay={`#model-n${modelKey}`}
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Model;

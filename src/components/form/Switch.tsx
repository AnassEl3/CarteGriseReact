import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent } from "react";

type inputType = string | number;
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
    className?: string;
    label?: string;
    inlineLabel?: boolean;
    color?: ColorType;
    leadingIcon?: IconProp;
    tailingIcon?: IconProp;
    readOnly?: boolean;
    defaultChecked?: boolean;
    errorMsg?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Switch = ({
    className = "",
    label = "",
    inlineLabel = false,
    color = "primary",
    leadingIcon,
    tailingIcon,
    readOnly = false,
    defaultChecked = false,
    errorMsg,
    onChange,
}: Props) => {
    return (
        <div
            className={`${
                inlineLabel ? "grid gap-2 grid-cols-2" : ""
            } my-2 ${className}`}
        >
            <label className="my-auto font-medium dark:text-white">
                {label}
            </label>
            <div>
                <div className="flex rounded-md shadow-sm">
                    {leadingIcon ? (
                        <div className="px-4 inline-flex items-center min-w-fit rounded-l-md border border-r-0 border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                            <FontAwesomeIcon icon={leadingIcon} />
                        </div>
                    ) : (
                        ""
                    )}

                    {/* <input
                        className={`py-3 px-4 pr-11 block w-full border-gray-200 shadow-sm rounded-md ${
                            leadingIcon ? "rounded-l-none" : ""
                        } ${
                            tailingIcon ? "rounded-r-none" : ""
                        } text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400`}
                        readOnly={readOnly}
                        value={value}
                        onChange={onChange}
                    /> */}
                    <input
                        type="checkbox"
                        className={`relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-${color}-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 border border-transparent ring-1 ring-transparent checked:hover:bg-${color}-600 checked:focus:bg-${color}-600 focus:border-${color}-600 focus:ring-${color}-600 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-${color}-600 dark:focus:ring-offset-gray-800
                        before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-${color}-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-${color}-200`}
                        readOnly={readOnly}
                        onChange={onChange}
                        defaultChecked={defaultChecked}
                    />

                    {tailingIcon ? (
                        <div className="px-4 inline-flex items-center min-w-fit rounded-r-md border border-l-0 border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                            <FontAwesomeIcon icon={tailingIcon} />
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <p className="text-sm text-red-600 font-light italic mt-2">
                    {errorMsg ? errorMsg : ""}
                </p>
            </div>
        </div>
    );
};

export default Switch;

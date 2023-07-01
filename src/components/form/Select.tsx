import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, ChangeEvent } from "react";

type Props = {
    children: ReactNode;
    className?: string;
    label?: string;
    inlineLabel?: boolean;
    leadingIcon?: IconProp;
    tailingIcon?: IconProp;
    placeholder?: string;
    readOnly?: boolean;
    value: string;
    errorMsg?: string;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
};

function Select({
    children,
    className = "",
    label = "",
    inlineLabel = false,
    leadingIcon,
    tailingIcon,
    placeholder = "",
    readOnly = false,
    value,
    errorMsg,
    onChange,
}: Props) {
    return (
        <div
            className={`${
                inlineLabel ? "grid gap-2 grid-cols-2" : ""
            } my-2 ${className}`}
        >
            <label
                htmlFor="hs-select-label"
                className="block text-sm font-medium mb-2 dark:text-white"
            >
                {label}
            </label>
            <div className="flex rounded-md shadow-sm">
                {leadingIcon ? (
                    <div className="px-4 inline-flex items-center min-w-fit rounded-l-md border border-r-0 border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <FontAwesomeIcon icon={leadingIcon} />
                    </div>
                ) : (
                    ""
                )}

                <select
                    className={`py-3 px-4 pr-9 block w-full border-gray-200 rounded-md ${
                        leadingIcon ? "rounded-l-none" : ""
                    } ${
                        tailingIcon ? "rounded-r-none" : ""
                    } text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400`}
                    placeholder={placeholder}
                    disabled={readOnly}
                    value={value}
                    onChange={onChange}
                >
                    {children}
                </select>

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
    );
}

export default Select;

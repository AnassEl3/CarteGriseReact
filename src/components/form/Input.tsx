import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent } from "react";

type inputType = string | number;
type Props = {
    className?: string;
    label?: string;
    inlineLabel?: boolean;
    type?: string;
    leadingIcon?: IconProp;
    tailingIcon?: IconProp;
    placeholder?: string;
    value: inputType;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
    className = "",
    label = "",
    inlineLabel = false,
    type = "text",
    leadingIcon,
    tailingIcon,
    placeholder = "",
    value,
    onChange,
}: Props) => {
    return (
        <div className={`${inlineLabel ? "grid gap-2 grid-cols-2" : ""} my-2 ${className}`}>
            <label className="my-auto font-medium dark:text-white">
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

                <input
                    type={type}
                    className={`py-3 px-4 pr-11 block w-full border-gray-200 shadow-sm rounded-md ${
                        leadingIcon ? "rounded-l-none" : ""
                    } ${
                        tailingIcon ? "rounded-r-none" : ""
                    } text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />

                {tailingIcon ? (
                    <div className="px-4 inline-flex items-center min-w-fit rounded-r-md border border-l-0 border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <FontAwesomeIcon icon={tailingIcon} />
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default Input;

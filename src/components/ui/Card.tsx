import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

type Props = {
    children?: ReactNode;
    title?: string;
    icon?: IconProp;
};

const Card = ({ children, title, icon }: Props) => {
    return (
        <div className="flex flex-col bg-white border shadow-sm rounded-xl p-2 md:p-3 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {icon ? <FontAwesomeIcon icon={icon} className="pe-2" /> : ""}
                {title ? title : ""}
            </h3>
            <div className="mt-1">{children}</div>
        </div>
    );
};

export default Card;

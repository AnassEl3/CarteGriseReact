import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
    children?: ReactNode;
    className?: string;
    href: string;
    color?: string;
    size?: string;
    showIcon?: boolean;
    icon?: IconProp;
    state?: object;
};

const Alink = ({
    children,
    className = "",
    href = "",
    color = "primary",
    size = "md",
    showIcon = true,
    icon,
    state = {},
}: Props) => {
    return (
        <Link
            to={href}
            className={`text-white text-${size} bg-${color} hover:bg-${color}-500 focus:ring-${color}-500 py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 ${className}`}
            state={state}
        >
            {showIcon && icon ? <FontAwesomeIcon icon={icon} /> : null}
            {children}
        </Link>
    );
};

export default Alink;

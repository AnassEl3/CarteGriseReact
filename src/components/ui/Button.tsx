import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, MouseEvent } from "react";

type ButtonType = "button" | "submit" | "reset" | undefined;
type Props = {
    children?: ReactNode;
    className?: string;
    type?: ButtonType;
    color?: string;
    size?: string;
    showIcon?: boolean;
    icon?: IconProp;
    onClick: (e: MouseEvent<HTMLElement>) => void;
};

const Button = ({
    children,
    className = "",
    type = "button",
    color = "primary",
    size = "md",
    showIcon = true,
    icon,
    onClick
}: Props) => {
    return (
        <button
            type={type}
            className={`text-white text-${size} bg-${color} hover:bg-${color}-500 focus:ring-${color}-500 py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 ${className}`}
            onClick = {onClick}
        >
            {showIcon && icon ?<FontAwesomeIcon icon={icon}/> : null}
            {children}
        </button>
    );
};

export default Button;

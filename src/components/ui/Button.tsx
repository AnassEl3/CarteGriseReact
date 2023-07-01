import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, MouseEvent } from "react";

type ButtonType = "button" | "submit" | "reset" | undefined;
type ColorType = "primary" | "secondary" | "tertiary" | "success" | "info" | "warning" | "danger" | undefined;
type Props = {
    children: ReactNode;
    className?: string;
    type?: ButtonType;
    disabled?: boolean;
    color?: ColorType;
    size?: string;
    showIcon?: boolean;
    icon?: IconProp;
    tailingIcon?: IconProp;
    onClick: (e: MouseEvent<HTMLElement>) => void;
};

const Button = ({
    children,
    className = "",
    type = "button",
    disabled = false,
    color = "primary",
    size = "md",
    showIcon = true,
    icon,
    tailingIcon,
    onClick
}: Props) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`text-white text-${size} bg-${color} hover:bg-${color}-500 focus:ring-${color}-500 py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 ${className}`}
            onClick = {onClick}
        >
            {showIcon && icon ?<FontAwesomeIcon icon={icon}/> : null}
            {children}
            {showIcon && tailingIcon ?<FontAwesomeIcon icon={tailingIcon}/> : null}
        </button>
    );
};

export default Button;

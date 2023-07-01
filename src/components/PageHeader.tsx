import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode } from "react";

type Props = {
    children?: ReactNode;
    title: string;
    modificationPage?: boolean;
    icon?: IconProp;
};

const PageHeader = ({
    children,
    title = "",
    modificationPage = false,
    icon,
}: Props) => {
    return (
        <div className="flex flex-wrap justify-between items-center mb-10">
            <h1 className="text-4xl font-bold">
                {icon ? <FontAwesomeIcon icon={icon} className="pe-2"/> : ""}
                {title}
                {modificationPage ? (
                    <span className="text-sm italic font-thin px-2">(Modifier)</span>
                ) : (
                    ""
                )}
            </h1>
            <div className="flex justify-end items-center">{children}</div>
        </div>
    );
};

export default PageHeader;

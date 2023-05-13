import { createContext, useState } from "react";
import { UserContextType } from "../types/contexts";

export const userContext = createContext<UserContextType>({} as UserContextType);

const UserProvider = ({ children }: any) => {
    const [cin, setCin] = useState("");

    return (
        <userContext.Provider value={{ cin, setCin }}>
            {children}
        </userContext.Provider>
    );
};

export default UserProvider;

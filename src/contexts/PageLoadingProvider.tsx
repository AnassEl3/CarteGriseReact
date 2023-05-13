import { createContext, useState } from "react";
import { PageLoadingContextType } from "../types/contexts";

export const PageLodaingContext = createContext<PageLoadingContextType>({} as PageLoadingContextType);

const PageLoadingProvider = ({ children }: any) => {
    const [pageLoading, setPageLoading] = useState(false);

    return (
        <PageLodaingContext.Provider value={{ pageLoading, setPageLoading }}>
            {children}
        </PageLodaingContext.Provider>
    );
};

export default PageLoadingProvider;
import { useContext } from "react";
import SpinnerScreen from "../components/ui/SpinnerScreen";
import { PageLodaingContext } from "../contexts/PageLoadingProvider";

const PageLayout = ({ children }: any) => {
    const pageLoadingHolder = useContext(PageLodaingContext);

    return (
        <main className="relative overflow-hidden h-screen">
            {/* Page loading spinner ... */}
            {pageLoadingHolder.pageLoading ? <SpinnerScreen /> : null}

            <div className="p-7">
                {children}
            </div>
        </main>
    );
};

export default PageLayout;

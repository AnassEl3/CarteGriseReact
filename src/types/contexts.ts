export type UserContextType = {
    cin: string;
    setCin: (user: string) => void;
};

export type PageLoadingContextType = {
    pageLoading: boolean;
    setPageLoading: (loading: boolean) => void;
};
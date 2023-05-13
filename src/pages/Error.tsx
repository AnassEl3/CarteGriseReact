import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error:any = useRouteError();
    console.error(error);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p className="">
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}

import { useEffect } from "react";
import api from "../../utilities/axios";
import PageLayout from "../../layouts/PageLayout";
import {
    faCircleInfo,
    faInfo,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/card";
import Input from "../../components/form/input";

const InfoGenerale = () => {
    useEffect(() => {
        // api
        //     .get("administrations")
        //     .then((res) => {
        //         const data = res.data._embedded;
        //         console.log(res.status, data);
        //     });
    }, []);

    return (
        <>
            <PageLayout>
                <div className="flex flex-wrap justify-between items-center mb-10">
                    <h1 className="text-4xl font-bold">Administration</h1>
                    <div className="flex justify-end items-center">
                        <Button color="success" icon={faPlus}>
                            Ajouter
                        </Button>
                    </div>
                </div>
                <Card title="Information générale" icon={faCircleInfo}>
                    
                    <Input label="Email" inlineLabel={false}/>
                </Card>
            </PageLayout>
        </>
    );
};

export default InfoGenerale;

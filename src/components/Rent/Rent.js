import {Outlet} from "react-router-dom";
import Menutop from "../Header/Menu";
import DefaultLayout from "../Header/DefaultLayout";

export default function Cars(){
    return(
        <DefaultLayout>
            <Outlet/>
        </DefaultLayout>
    );
}
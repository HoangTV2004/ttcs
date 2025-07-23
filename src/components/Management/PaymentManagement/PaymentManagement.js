import {useNavigate} from "react-router-dom";
import Menutop from "../../Header/Menu";
import DefaultLayout from "../../Header/DefaultLayout";
import PaymentList from "./PaymentList";

export default function PaymentManagement() {
    const navigate = useNavigate();
    function handleAdd() {
        navigate("/add-new-payment");
    }

    return(
        <div>
            <DefaultLayout>
                <h1 style={{textAlign:"center"}}></h1>
                {/*<div style={{*/}
                {/*    display: "flex",*/}
                {/*    justifyContent: "right",*/}
                {/*    alignItems: "right",*/}
                {/*    marginRight: "9%",*/}
                {/*}}>*/}
                {/*    <button className="btn1"*/}
                {/*        style={{width:'11%',height:"4%"}}*/}
                {/*        onClick={handleAdd}>Add new payment</button>*/}
                {/*</div>*/}
                <PaymentList />
            </DefaultLayout>
        </div>
    );
}
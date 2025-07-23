import {Outlet, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Menutop from "../../Header/Menu";
import DefaultLayout from "../../Header/DefaultLayout";
import {CloseOutlined} from "@ant-design/icons";
import AddNewUser from "../UserManagement/AddNewUser";
import {Modal} from "antd";
import AddNewCar from "./AddNewCar";
import CarTable from "./CarTable";

export default function CarManagement(){
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    function handleAdd() {
        setModal(true);
    }
    return(
        <div>
            <DefaultLayout>
                <h1 style={{textAlign:"center"}}></h1>
                <div style={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "right",
                    marginRight: "9%",
                }}>
                    <button className="btn1"
                        style={{width:'11%',height:"4%"}}
                        onClick={handleAdd}>Add new car</button>
                </div>
                <Modal
                    open={modal}
                    onCancel={() => setModal(false)}
                    closeIcon={<CloseOutlined />}
                    footer={false}
                    width={"60%"}
                    bodyStyle={{ padding: 24 }}
                    centered
                >
                    <div style={{width:"100%"}}>
                        {/*<Outlet />*/}
                        <AddNewCar onSuccess={() => setModal(false)} />
                    </div>

                </Modal>
                <CarTable/>
            </DefaultLayout>
        </div>
    );
}
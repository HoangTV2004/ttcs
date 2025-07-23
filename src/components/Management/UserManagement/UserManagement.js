import AddNewUser from "./AddNewUser";
import {Outlet, Route, useNavigate} from "react-router-dom";
import Menutop from "../../Header/Menu";
import DefaultLayout from "../../Header/DefaultLayout";
import {useState} from "react";
import {Modal} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import UserTable from "./UserTable";

export default function UserManagement() {
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    function handleAdd() {
        setModal(true);
        //navigate("/add-new-user");
    }

    return(
            <DefaultLayout>
                <h1 style={{textAlign:"center"}}></h1>
                <div style={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "right",
                    marginRight: "9%",
                }}>
                    <button className="btn1"
                        style={{width:'11%',height:'4%'}}
                        onClick={handleAdd}>Add new user</button>
                </div>
                <div>
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
                            <AddNewUser onSuccess={() => setModal(false)} />
                        </div>

                    </Modal>
                </div>
                <UserTable />
            </DefaultLayout>
    );
}
import {Col, Row} from "antd";
import {useEffect, useState} from "react";

export default function UserTable(){
    const [users,setUsers] = useState();
    useEffect(()=>{
        const fecthData = async () => {
            try{
                const response = await fetch("https://94txyl-8080.csb.app/api/users");
                const data = await response.json();
                console.log("data",data);
                setUsers(data);
                console.log("user",users);
            }catch(err){
                console.log(err);
            }

        }
        fecthData();
    },[])
    const handleDelete = async(name) => {
        console.log("name",name);
        try{
            const response = await fetch("https://94txyl-8080.csb.app/api/delete", {
                method: "post",
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name}),
            });
            if(response.ok) console.log("success");
        }catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <h1 style={{textAlign:"center",marginTop:"8px"}}>User List</h1>
            <Row justify="center" gutter={16}>
                <Col lg={16} sm={24}>
                    {users?.length === 0 ? (<h2 style={{textAlign:"center"}}>Empty</h2>)
                        :(users?.map((user) => {
                            return <Row gutter={16} className="bs1" style={{marginTop: "16px", textAlign: "center"}}>
                                <Col lg={12} sm={24}>
                                    <p><strong>Username : </strong>{user.account_name}</p>
                                    <p><strong>Password : </strong>{user.password}</p>
                                    <p><strong>Role : </strong>{user.role}</p>
                                </Col>
                                <Col lg={11} sm={24}>
                                    <p><strong>Full Name : </strong>{user.name}</p>
                                    <p><strong>Phone number : </strong>{user.phone_number}</p>
                                    <p><strong>Email : </strong>{user.email}</p>
                                    <p><strong>Address : </strong>{user.address}</p>
                                </Col>
                                <button
                                    onClick={()=>handleDelete(user.account_name)}
                                >Erase</button>
                            </Row>
                        }))
                    }
                </Col>
            </Row>
        </div>
    );
}
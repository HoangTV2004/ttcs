import {useForm} from "react-hook-form";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Modal} from "antd";

export default function AddNewUser({onSuccess}) {
    const navigate = useNavigate();
    const [mess, setMess] = useState("");
    const [newuser, setNewuser] = useState("");
    const {register,handleSubmit,formState:{errors}, watch,reset} = useForm();
    const onsubmit = async (data) => {
        const account = JSON.stringify({...data, accept_policies:true});
        setMess("");
        try {
            console.log(account)
            const response = await fetch("https://94txyl-8080.csb.app/api/account", {
                    method: "post",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: account,
                }
            )
            const data = await response.json();
            setMess(data.message);
            console.log(data)

            if (response.ok){
                alert("Add user successful");
                reset();
                onSuccess();
                navigate("/user-management");
            }
            else setNewuser("Added failed");
        } catch(error) {
            console.log(error);
            setNewuser("Error adding account");
        }
    }

    return (
            // <div className={"center-form"}>
                <form onSubmit={handleSubmit(onsubmit)}>
                    <h1 className={"center-title"} >USER FORM</h1>
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{display: "block", marginBottom: "5px"}}>Login Name:</label>
                        <input type="text" {...register("account_name", { required: true })} style={{ width: "100%", padding:"6px",border: "1px solid #ccc",borderRadius: "4px"}} />
                        {errors.account_name && <div style={{ color: "red" }}>Login name is required</div>}
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label style={{display: "block", marginBottom: "5px"}}>Password:</label>
                        <input type="password" {...register("password", { required: true })} style={{ width: "100%", padding:"6px",border: "1px solid #ccc",borderRadius: "4px"}} />
                        {errors.password && <div style={{ color: "red" }}>Password is required</div>}
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label style={{display: "block", marginBottom: "5px"}}>Full Name:</label>
                        <input type="text" {...register("name", { required: true })} style={{ width: "100%", padding:"6px",border: "1px solid #ccc",borderRadius: "4px"}} />
                        {errors.name && <div style={{ color: "red" }}>Name is required</div>}
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label style={{display: "block", marginBottom: "5px"}}>Email:</label>
                        <input type="text" {...register("email", { required: true })} style={{ width: "100%", padding:"6px",border: "1px solid #ccc",borderRadius: "4px"}} />
                        {errors.email && <div style={{ color: "red" }}>Email is required</div>}
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label style={{display: "block", marginBottom: "5px"}}>Phone Number:</label>
                        <input type="text" {...register("phone_number", { required: true })} style={{ width: "100%", padding:"6px",border: "1px solid #ccc",borderRadius: "4px"}} />
                        {errors.phone_number && <div style={{ color: "red" }}>Phone number is required</div>}
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label style={{display: "block", marginBottom: "5px"}}>Address:</label>
                        <input type="text" {...register("address", { required: true })} style={{ width: "100%", padding:"6px",border: "1px solid #ccc",borderRadius: "4px"}} />
                        {errors.address && <div style={{ color: "red" }}>Address is required</div>}
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                            <label style={{display: "block", marginBottom: "5px"}}>Role:</label>
                            <select style={{ width:"100%", padding:"6px"}} {...register("role", { required: true })}>
                                <option>Selection</option>
                                <option>Admin</option>
                                <option>Customer</option>
                                <option>Driver</option>
                            </select>
                        {(errors.role || watch().role) === "Selection" && <div style={{ color: "red" }}>You must choose role</div>}
                    </div>
                    <div style={{textAlign:"center"}}>
                        <button className={"btn1"} type={"submit"} style={{ width: "50%", padding: "10px" }}>Create</button>
                    </div>
                    <p style={{ color: "red" }}>{mess}</p>
                    <p>{newuser}</p>
                </form>
            //</div>
    );
}
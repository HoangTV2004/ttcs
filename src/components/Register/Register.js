import {useForm} from "react-hook-form";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Col, Form, Row, message} from "antd";
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'antd/dist/antd.css';

AOS.init();

export default function Register() {
    const [user, setUser] = useState();
    const [mess, setMessage] = useState("");
    const {register,handleSubmit,formState: { errors },} = useForm();
    const navigate = useNavigate();
    const onsubmit = async (data) => {
        const account = JSON.stringify({...data,role:"Customer"});
        console.log(data);
        setMessage("");
        try{
            const response = await fetch("https://94txyl-8080.csb.app/api/account",{
               method: "post",
               headers: {
                   "Accept": "application/json",
                   "Content-Type": "application/json",
               },
               body: account,
            });

            const data = await response.json()
            setMessage(data.message)

            if(response.ok){
                setUser("Registered successful")
                message.success('Registration successfull')
                navigate("/login");
            }
            else{
                message.error("Something went wrong")
                setUser("Regitered fail")
            }
        }catch(error){
            message.error("Something went wrong")
            console.log(error);
            setUser("Regitered fail")
        }
    }
    return (
        <div className={"login"} style={{height:"100hv"}}>
            <Row gutter={16}
                 style={{ display:"flex", alignItems:"center" }}
            >
                <Col
                    lg={16}
                    style={{position:"relative"}}
                >
                    <img
                        data-aos="slide-left"
                        data-aos-duration="1500"
                        style={{width:"100%"}}
                        src={"https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=928&q=80"}
                    />
                </Col>
                <Col
                    lg={7}
                    style={{
                        textAlign:"left",
                        textJustify: "left",
                        padding: "5px",
                    }}
                >
                    <Form layout="vertical"
                          className="login-form"
                          style={{ padding: "5%" }}
                          onSubmitCapture={handleSubmit(onsubmit)}
                    >
                        <h2 style={{ textAlign: "center", color: "white" }}>Register</h2>
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
                            <label style={{display: "block", marginBottom: "5px"}}>Phone Number:</label>
                            <input type="text" {...register("phone_number", { required: true })} style={{ width: "100%", padding:"6px",border: "1px solid #ccc",borderRadius: "4px"}} />
                            {errors.phone_number && <div style={{ color: "red" }}>Phone number is required</div>}
                        </div>

                        <div style={{marginBottom:"15px"}}>
                            <label style={{display:"block", marginBottom:"5px"}}>Email</label>
                            <input type="text" style={{width:"100%",padding:"6px",border: "1px solid #ccc",borderRadius: "4px"}} {...register("email",{required:true})} />
                            {errors.email && <div style={{ color: "red" }}>Email is required</div>}
                        </div>

                        <div style={{ marginBottom: "15px" }}>
                            <label style={{display: "block", marginBottom: "5px"}}>Address:</label>
                            <input type="text" {...register("address", { required: true })} style={{ width: "100%", padding:"6px",border: "1px solid #ccc",borderRadius: "4px"}} />
                            {errors.address && <div style={{ color: "red" }}>Address is required</div>}
                        </div>

                        <div style={{ marginBottom: "15px" }}>
                            <label>
                                <input type="checkbox" {...register("accept_policies", { required: true })} />
                                <span style={{ marginLeft: "8px" }}>Agree with the policies</span>
                            </label>
                            {errors.accept_policies && <div style={{ color: "red" }}>You must accept our policies</div>}
                        </div>

                        <button type="submit" style={{ width: "100%", padding: "10px" }}>Create</button>
                        <p style={{ color: "red" }}>{mess}</p>
                        <p style={{marginBottom:"5px", color:"white"}}>Do you have an account?</p>
                        <Link to={"/login"}>Return login</Link>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}
import React, {useState} from 'react'
import {Row, Col, Form, Input, message} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'antd/dist/antd.css';

AOS.init();

export default function Login({ onLogin }) {
    const [creds, setCreds] = useState({});
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onFinish = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/accounts", {
                method: "post",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(creds),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("user",JSON.stringify(creds));
                localStorage.setItem("role",data.role);
                onLogin && onLogin({ username: creds.username, role: data.role });
                message.success("Login successful");
                navigate("/");
            } else{
                message.error("Something went wrong")
                setError("Invalid username or password!");
            }
        } catch (error) {
            message.error("Something went wrong")
            console.error("Login error:", error);
            setError("Login failed!");
        }
    };

    return (
        <div className="login" style={{ height: "100hv" }}>
            <Row
                gutter={16}
                style={{ display:"flex", alignItems:"center" }}
            >
                <Col lg={16}
                     style={{
                         position: 'relative',
                     }}
                >
                    <img
                        className="w-100"
                        style={{width:"100%"}}
                        data-aos="slide-right"
                        data-aos-duration="1500"
                        src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=928&q=80"
                    />
                </Col>
                <Col lg={7}
                     style={{
                         textAlign:"left",
                         textJustify: "left",
                         padding: "5px",
                     }}
                >
                    <Form layout="vertical"
                          className="login-form"
                          style={{ padding: "5%" }}
                          onFinish={onFinish}
                    >
                        <h1 style={{textAlign: "center", color: "white"}}>Login</h1>
                        <hr />
                        <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                            <Input type="text"
                                   onChange={(e) => setCreds({ ...creds, username: e.target.value })}
                            />
                        </Form.Item>

                        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                            <Input type="password"
                                   onChange={(e) => setCreds({ ...creds, password: e.target.value })}
                            />
                        </Form.Item>
                        <button className="btn1 mt-2" style={{marginTop:'2px',marginBottom:'2px'}} type="submit">
                            Login
                        </button>

                        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

                        <hr />
                        <div style={{ textAlign: "center", color: "white" }}>
                            <p>Don't have an account?</p>
                            <Link to="/register">Create new account</Link>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}
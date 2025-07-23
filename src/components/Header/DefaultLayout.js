import React from "react";
import { Menu, Dropdown, Button, Space , Row , Col } from "antd";
import {Link} from 'react-router-dom'
import ProtectedAdmin from "../control/checkroleadmin";

function DefaultLayout(props) {
    const user = JSON.parse(localStorage.getItem('user'))
    const menu = (
        <Menu>
            <Menu.Item>
                <a

                    href="/"
                >
                    Home
                </a>
            </Menu.Item>
            <Menu.Item>
                <a

                    href="/userbookings"
                >
                    Bookings
                </a>
            </Menu.Item>
            <Menu.Item onClick={()=>{
                localStorage.removeItem('user');
                window.location.href='/login'
            }}>
                <li style={{color:'orangered'}}>Logout</li>
            </Menu.Item>
        </Menu>
    );
    return (
        <div>
            <div className="header bs1">
                <Row gutter={16} justify='center'>
                    <Col lg={20} sm={24} xs={24}>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <h1 ><b><Link to='/' style={{color:'orangered'}}>Home</Link></b></h1>
                            <h1><b><Link to='/about' style={{color:'orangered'}}>About</Link></b></h1>
                            {localStorage.getItem("role") === "Admin" && <h1><b><Link to='/user-management' style={{color:'orangered'}}>User</Link></b></h1>}
                            {localStorage.getItem("role") === "Admin" && <h1><b><Link to='/payment-management' style={{color:'orangered'}}>Payment</Link></b></h1>}
                            {localStorage.getItem("role") === "Admin" && <h1><b><Link to='/car-management' style={{color:'orangered'}}>Car</Link></b></h1>}
                            <Dropdown overlay={menu} placement="bottomCenter">
                                <Button>{user.username}</Button>
                            </Dropdown>
                        </div>
                    </Col>
                </Row>

            </div>
            <div className="content">{props.children}</div>

            <div className="footer" style={{textAlign:"right"}}>
                <p>Hotline: <b>1900 0308</b></p>
            </div>
        </div>
    );
}

export default DefaultLayout;

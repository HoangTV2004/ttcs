import {useEffect, useState} from "react";
import {Col, Row} from "antd";
import moment from "moment";

export default function PaymentList() {
    const [bookings,setBookings] = useState([]);
    const [cars,setCars] = useState([]);
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const response = await fetch("http://localhost:8080/api/payments")
                const data = await response.json();
                setBookings(data);
                console.log(data);
            } catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[]);
    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await fetch("http://localhost:8080/api/cars");
                const data = await response.json();
                //console.log(data);
                setCars(data);
                console.log(data);
            } catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[]);
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch("http://localhost:8080/api/users");
                const data = await response.json();
                setUsers(data);
                console.log(data);
            }catch (err){
                console.log(err);
            }
        }
        fetchData();
    }, []);

    const handlePaid = async (id) => {
        const status = "Paid"
        try{
            const response = await fetch("http://localhost:8080/api/checkout",{
                method:"post",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({status,id}),
            });
            if(response.ok) console.log("success");
        }catch (err){
            console.log(err);
        }
    }

    const handleUnPaid = async (id) => {
        const status = "UnPaid"
        try{
            const response = await fetch("http://localhost:8080/api/checkout",{
                method:"post",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({status,id}),
            });
            if(response.ok) console.log("success");
        }catch (err){
            console.log(err);
        }
    }

    const handleGetCar = async (id) => {
        const status = "Renting"
        try{
            const response = await fetch("http://localhost:8080/api/rent",{
                method:"post",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({status,id}),
            });
            if(response.ok) console.log("success");
        }catch (err){
            console.log(err);
        }
    }

    const handlePaidCar = async(id) => {
        const status = "Rented"
        try{
            const response = await fetch("http://localhost:8080/api/rent",{
                method:"post",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({status,id}),
            });
            if(response.ok) console.log("success");
        }catch (err){
            console.log(err);
        }
    }

    return(
        <div>
            <h1 style={{textAlign:"center",marginTop:"8px"}}>Payment List</h1>
            <Row justify="center" gutter={16}>
                <Col lg={20} sm={24}>
                    {bookings?.length === 0 ? (<h2 style={{textAlign:"center"}}>Empty</h2>)
                        :(bookings?.map((booking) => {
                            return <Row gutter={24} className="bs1" style={{marginTop:"16px", textAlign:"left"}}>
                                <Col lg={7} sm={24}>
                                    {(()=>{
                                        const renter = users.find(user => user.account_name===booking.user_id);
                                        if(!renter) <p>Empty</p>
                                        return(
                                            <div>
                                                <p><b>Renter : </b><br/>{renter?.account_name}</p>
                                                <p><b>Customer id : </b><br/>{renter?.name}</p>
                                                <p><b>Phone number : </b><br/>{renter?.phone_number}</p>
                                                <p><b>Email : </b><br/>{renter?.email}</p>
                                                <p><b>Address : </b><br/>{renter?.address}</p>
                                            </div>
                                        );
                                    })()}
                                </Col>

                                <Col lg={6} sm={24}>
                                    <p><b>{cars.find(car => car.car_id === booking.car_id)?.car_name||"Not found!!!"}</b></p>
                                    <p>Total hours : <b>{moment(booking.paid_date).diff(moment(booking.rental_date),"hours")}</b></p>
                                    <p>Rent per hour : <b><br/>{cars.find(car => car.car_id===booking.car_id)?.price||"Not found!!!"} VND</b></p>
                                    <p>Required Driver : <b>{booking.driver_required?"Yes":"No"}</b></p>
                                    <p>Total amount : <b><br/>{booking.total}</b></p>
                                </Col>

                                <Col lg={5} sm={24}>
                                    <p>Transaction Id : <b>{booking.payment_id}</b></p>
                                    <p>From: <b><br/>{moment(booking.rental_date).format("MM/DD/yyyy HH:mm")}</b></p>
                                    <p>To: <b><br/>{moment(booking.paid_date).format("MM/DD/yyyy HH:mm")}</b></p>
                                    <p>Date of booking: <b>{booking.bookings_date}</b></p>
                                </Col>

                                <Col lg={5} sm={24} className='text-right'>
                                    <img style={{borderRadius:5, padding:"8px"}} src={cars.find(car => car.car_id===booking.car_id)?.car_img||"Not found"}  height="140"/>
                                </Col>
                                <div>
                                    <h3>Transaction status : <b>{booking.checkout_status}</b></h3>
                                    {booking.checkout_status==="UnPaid" && booking.paid_status==="Null" && <h3>Status: <b>You didn't pay transaction to rent car"</b></h3>}
                                    {booking.checkout_status==="Paid" && booking.paid_status==="Null" && <h3>Status: <b>Wait going to get car</b></h3>}
                                    {booking.paid_status!=="Null" && <h3>Status: <b>{booking.paid_status}</b></h3>}
                                </div>
                                <div style={{ width:"100%", display:"flex"}} >
                                    {booking.checkout_status==="Pending" && <button className={"btn1"} onClick={()=>handlePaid(booking.payment_id)} style={{height:"80%",width:"10%",textAlign:"center",marginLeft:"50%"}}>Paid</button>}
                                    {booking.checkout_status==="Pending" && <button className={"btn1"} onClick={()=>handleUnPaid(booking.payment_id)} style={{height:"80%",width:"10%",textAlign:"center",marginLeft:"10%"}}>UnPaid</button>}
                                    {booking.checkout_status==="Paid" && booking.paid_status==="Null" && <button className={"btn1"} onClick={()=>handleGetCar(booking.payment_id)} style={{height:"80%",width:"10%",textAlign:"center",marginLeft:"50%",marginBottom:"2%",padding:"auto"}}>Get Car</button>}
                                    {booking.paid_status==="Renting" && <button className={"btn1"} onClick={()=>handlePaidCar(booking.payment_id)} style={{height:"80%",width:"10%",textAlign:"center",marginLeft:"50%",marginBottom:"2%",padding:"auto"}}>Paid Car</button>}
                                </div>
                            </Row>
                        }))
                    }
                </Col>
            </Row>
        </div>
    );
}
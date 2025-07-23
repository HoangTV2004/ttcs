import DefaultLayout from "../Header/DefaultLayout";
import {useEffect, useState} from "react";
import {Col, Row} from "antd";
import moment from "moment";

export default function BookingsHistory() {
    const [bookings,setBookings] = useState([]);
    const [cars,setCars] = useState([]);
    const [users,setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const creds =JSON.parse(localStorage.getItem("user"));
            console.log(creds);
            const id = creds.username;
            console.log(id);
            const response = await fetch("https://94txyl-8080.csb.app/api/"+id+"/bookings")
            const data = await response.json();
            setBookings(data);
            console.log(data);
        }
        fetchData();
    }, []);
    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await fetch("https://94txyl-8080.csb.app/api/cars");
                const data = await response.json();
                //console.log(data);
                setCars(data);
                console.log(cars);
            } catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[]);
    return (
        <DefaultLayout>
            <h1 style={{textAlign:"center",marginTop:"8px"}}>My Bookings</h1>
            <Row justify="center" gutter={16}>
                <Col lg={16} sm={24}>
                    {bookings.length === 0 ? (<h2 style={{textAlign:"center"}}>Empty</h2>)
                        :(bookings?.map((booking) => {
                            return(
                            <div style={{borderColor:"black",borderWidth:"1px"}}>
                            <Row gutter={16} className="bs1" style={{marginTop:"16px", textAlign:"left"}}>
                                <Col lg={6} sm={24}>
                                    <p><b>{cars.find(car => car.car_id === booking.car_id)?.car_name||"Not found!!!"}</b></p>
                                    <p>Total hours : <b>{moment(booking.paid_date).diff(moment(booking.rental_date),"hours")}</b></p>
                                    <p>Rent per hour : <b>{cars.find(car => car.car_id===booking.car_id)?.price||"Not found!!!"} VND</b></p>
                                    <p>Required Driver : <b>{booking.driver_required?"Yes":"No"}</b></p>
                                    <p>Total amount : <b>{booking.total}</b></p>
                                </Col>

                                <Col lg={12} sm={24}>
                                    <p>Transaction Id : <b>{booking.payment_id}</b></p>
                                    <p>From : <b>{moment(booking.rental_date).format("MM/DD/yyyy HH:mm")}</b></p>
                                    <p>To : <b>{moment(booking.paid_date).format("MM/DD/yyyy HH:mm")}</b></p>
                                    <p>Date of booking : <b>{booking.bookings_date}</b></p>
                                    <p>Paid date : <b>{booking.complete_date==="Null"?"":booking.complete_date}</b></p>
                                </Col>

                                <Col lg={6} sm={24} className='text-right'>
                                    <img style={{borderRadius:5}} src={cars.find(car => car.car_id===booking.car_id)?.car_img||"Not found"}  height="140" className="p-2"/>
                                </Col>
                                <div style={{textAlign:"center",width:"100%"}} >
                                    <h3>Transaction status : <b>
                                        {booking.checkout_status === "Paid" && booking.paid_status==="Null" && (
                                            <p><b>Rent successfully</b><br />Please come to my store to get car in time!</p>
                                        )}
                                        {booking.checkout_status === "UnPaid" && booking.paid_status==="Null" && (
                                            <p><b>Rent failed</b><br />I don't get your money in the banking account!</p>
                                        )}
                                        {booking.checkout_status === "Pending" && booking.paid_status==="Null" && (
                                            <p><b>Status:</b> {booking.checkout_status}</p>
                                        )}
                                        {booking.paid_status==="Renting" && (
                                            <p><b>You are renting car</b><br />Please pay the car in time!</p>
                                        )}
                                        {booking.paid_status==="Rented" && (
                                            <p><b>You rented the car</b><br />Thanks for your rentment!</p>
                                        )}
                                    </b></h3>
                                </div>
                            </Row>
                            </div>
                            )
                        }))
                    }
                </Col>
            </Row>
        </DefaultLayout>
    )
}
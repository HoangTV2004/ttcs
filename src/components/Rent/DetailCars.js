import {Checkbox, Col, DatePicker, Divider, message, Modal, Row} from "antd";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { loadStripe } from '@stripe/stripe-js';
import {useForm} from "react-hook-form";
import {CloseOutlined} from "@ant-design/icons";
import {v4 as uuidv4} from 'uuid';

const { RangePicker } = DatePicker;

AOS.init();

export default function DetailCars() {
    const navigate = useNavigate();
    const {carid} = useParams();
    const [car,setCar] = useState({});
    const [from,setFrom] = useState();
    const [to,setTo] = useState();
    const [totalHours,setTotalHours] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [driverRequired,setDriverRequired] = useState(false);
    const [showmodal,setShowModal] = useState(false);
    const [checkform,setCheckform] = useState(false)
    const {register,handleSubmit,formState:{errors},}=useForm();
    const [id,setId] = useState();
    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await fetch("http://localhost:8080/api/cars/"+carid);
                const data = await response.json();
                console.log(data);
                setCar(data);
                console.log(car);
            } catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[]);

    const onsubmit = async (data) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const payment = JSON.stringify({...data,
                                                    payment_id:id,
                                                    user_id: user.username,
                                                    rental_date:from,
                                                    paid_date:to,
                                                    car_id:car.car_id,
                                                    driver_required:driverRequired,
                                                    checkout_status:"Pending",
                                                    total: totalAmount,
                                                    })
        console.log(payment);
        try{
            const response = await fetch("http://localhost:8080/api/payment", {
                method:"post",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                },
                body:payment,
            });
            if(response.ok){
                alert("Your request was sent successfully" +
                    "\nPlease wait our confirmation after checking your payment. Thanks!!")
                    navigate("/userbookings");
                //message.success("");
            }
            else{

            }
        }catch (err){
            console.log(err);
        }
    }


    console.log(car);

    useEffect(()=>{
        setTotalAmount(totalHours * car.price);
        if(driverRequired){
            setTotalAmount(totalAmount+50*totalHours);
        }
    },[driverRequired, totalHours])

    function selectTimeSlots(values){
        setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
        setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));

        setTotalHours(values[1].diff(values[0],"hours"));
    };

    function handleCheckOut() {
        setCheckform(true);
    }


    return(
            <Row
                justify="center"
                style={{
                    display:"flex",
                    alignItems:"center",
                    minHeight:"90vh"
                }}
            >
                <Col lg={10} sm={24} xs={24}
                     style={{
                         padding:"16px"
                    }}
                >
                    <img src={car.car_img} className="carimg2 bs1" style={{width:"100%"}}/>
                </Col>
                <Col lg={10} sm={24} xs={24} style={{textAlign:"right"}}>
                    <Divider type={"horizontal"} dashed>
                        Car Info
                    </Divider>
                    <div style={{textAlign: "left"}}>
                        <p>Car name: {car.car_name}</p>
                        <p>Type of car: {car.car_seat} seats</p>
                        <p>Description: {car.description===""?"Null":car.description}</p>
                        <p>Price: {car.price} VND Per hour /-</p>
                        <p>Stored: {car.car_amount-car.rented} cars</p>
                    </div>
                    <Divider type="horizontal" dashed>
                    Select Time Slots
                    </Divider>
                    <RangePicker
                        showTime={{format: "HH:mm"}}
                        format="MMM DD yyyy HH:mm"
                        onChange={selectTimeSlots}
                    />
                    <br />
                    {/*<button*/}
                    {/*    className="btn1"*/}
                    {/*    style={{marginTop:"8px"}}*/}
                    {/*    onClick={() => {*/}
                    {/*        setShowModal(true);*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    See Booked Slots*/}
                    {/*</button>*/}
                    {from && to && (
                        <div>
                            <p>
                                Total Hours : <b>{totalHours}</b>
                            </p>
                            <p>
                                VND Per Hour : <b>{car.price}</b>
                            </p>
                            <Checkbox
                                onChange={(e)=>{
                                    if(e.target.checked){
                                        setDriverRequired(true);
                                    }else {
                                        setDriverRequired(false);
                                    }
                                }}
                            >
                                Driver required ( 50 VND/hour )
                            </Checkbox>

                            <h3>Total Amount : {totalAmount} VND</h3><br/>
                            <button className="btn1" onClick={()=>{
                                setId(uuidv4())
                                setCheckform(true)
                            }}>
                                Book Now
                            </button>
                        </div>
                        )
                    }
                </Col>
                {car?.car_name&&
                    <Modal
                        open={checkform}
                        onCancel={()=>setCheckform(false)}
                        footer={false}
                        closeIcon={<CloseOutlined />}
                        title={"CHECKOUT FORM"}
                    >
                        <form onSubmit={handleSubmit(onsubmit)} style={{justifyContent:"center",justifyItems:"center"}}>
                            <p>Please banking into this QR with description:<br/>
                                {/*username: {JSON.parse(localStorage.getItem("user")).username} from: {from} to: {to}*/}
                                {id}
                                <br/>  Price: {totalAmount} VND <br/>
                            </p>
                            <img
                                src={"https://res.cloudinary.com/dvzrywe4v/image/upload/v1748970315/IMG_20250603_234353_lwgylr.jpg"}
                                style={{width:"50%",height:"50%",marginLeft:"22%"}}
                            />
                            <p style={{color:"red"}}>Please only banking enough money for renting. Thanks!!!</p>
                            <div style={{marginTop:"20px",textAlign:"center"}}>
                                <button type="submit" className="btn1">Rent</button>
                            </div>
                        </form>
                    </Modal>
                }
          </Row>
    );
}
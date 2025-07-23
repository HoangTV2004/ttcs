import {useEffect, useState} from "react";
import {Col, Row} from "antd";
import moment from "moment/moment";

export default function CarTable() {
    const [cars,setCars] = useState();
    useEffect(()=>{
        const fecthData = async () => {
            try{
                const response = await fetch("https://94txyl-8080.csb.app/api/cars");
                const data = await response.json();
                console.log("data",data);
                setCars(data);
                console.log("Cars",cars);
            }catch(err){
                console.log(err);
            }

        }
        fecthData();
    },[])
    return(
        <div>
            <h1 style={{textAlign:"center",marginTop:"8px"}}>Car list</h1>
            <Row justify="center" gutter={16}>
                <Col lg={16} sm={24}>

                    {cars?.length === 0 ? (<h2 style={{textAlign:"center"}}>Empty</h2>)
                        :(cars?.map((car) => {
                            return<Row gutter={16} className="bs1" style={{marginTop:"16px", textAlign:"center"}}>
                                <Col lg={6} sm={24}>
                                    <p><strong>Car name : </strong>{car.car_name}</p>
                                    <p><strong>Car type : </strong>{car.car_seat} seats</p>
                                    <p><strong>Fuel type : </strong>{car.fuel_type}</p>
                                    <p><strong>Description : </strong>{car.description}</p>
                                </Col>

                                <Col lg={12} sm={24}>
                                    <p><strong>Rent per hour : </strong>{car.price} VND</p>
                                    <p><strong>Amount : </strong>{car.car_amount}</p>
                                    <p><strong>Rented : </strong>{car.rented}</p>
                                    <p><strong>Stored : </strong>{car.car_amount-car.rented}</p>
                                </Col>

                                <Col lg={6} sm={24} style={{textAlign:"right"}}>
                                    <img style={{borderRadius:5}} src={car.car_img}  height="140" className="p-2"/>
                                </Col>
                                <div >

                                </div>
                            </Row>;
                        }))
                    }

                </Col>
            </Row>
        </div>
    );
}
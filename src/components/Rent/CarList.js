import {useEffect, useState} from "react";
import Menutop from "../Header/Menu";
import {Link} from "react-router-dom";
import {Col, Row} from "antd";

export default function Carlist (){
    const [cars,setCars] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await fetch("https://94txyl-8080.csb.app/api/cars");
                const data = await response.json();
                const carList = Array.isArray(data) ? data : data.cars;
                if (Array.isArray(carList)) setCars(carList);
                else console.error('Dữ liệu không hợp lệ:', carList);
            } catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[]);
    console.log(cars);
    const filteredCars = cars.filter((car) =>
        car.car_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return(
        <div>
            <h1 className={"center-title"}>Car List</h1>

            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <input
                    style = {{
                        marginBottom: "10px",
                    }}
                    type ="text"
                    placeholder ="Tìm theo tên xe..."
                    value = {searchTerm}
                    onChange = {(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Row justify='center' gutter={16}>

                {filteredCars.length === 0 ? (
                            <p className={"center-title"}>Not found car.</p>
                        ) : (
                        filteredCars.map((car) => (
                    <Col lg={7} sm={24} xs={24}>
                        <div className="car bs1" style={{padding:"8px"}}>
                            <img src={car.car_img} className="carimg"/>
                            <div className="car-content"
                                style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}
                            >
                                <div style={{textAlign:"left",paddingLeft:"8px"}}>
                                    <p>{car.car_name}</p>
                                    <p> Rent Per Hour {car.price} /-</p>
                                </div>

                                <div>
                                    {car.car_amount-car.rented>0 && <button className="btn1" style={{marginRight:"8px"}}><Link to={`/${car.car_id}`}>Book Now</Link></button>}
                                    {car.car_amount-car.rented===0&&<p>Stock out</p>}
                                </div>

                            </div>
                        </div>
                    </Col>
                        )))}

            </Row>
        </div>
    );
}

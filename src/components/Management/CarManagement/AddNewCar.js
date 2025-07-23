import {useForm} from "react-hook-form";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function AddNewCar({onSuccess}) {
    const [newcar,setNewCar]=useState("");
    const [message,setMessage]=useState("");
    const navigate = useNavigate();
    const {register,handleSubmit,formState:{errors},watch,reset}=useForm()
    const onsubmit = async(data) =>{
        const car = JSON.stringify(data);
        try{
            const response = await fetch("http://localhost:8080/api/car", {
               method:"post",
               headers:{
                   "Accept":"application/json",
                   "Content-Type":"application/json",
               },
               body:car,
            });
            if(response.ok){
                alert("Add car successfully");
                reset();
                onSuccess();
                navigate("/car-management");
            }
        }catch(err){
            console.log(err)
            setNewCar("Error creating car")
        }
    }


    return (
            <form onSubmit={handleSubmit(onsubmit)}>
                <h1 className={"center-title"}>CAR FORM</h1>

                <div className={"div-form"}>
                    <label className={"label-form"}>Car Image Link:</label>
                    <input className={"input-form"} type={"text"} placeholder={"Please input your car image link"} {...register("car_img",{required: true})} />
                </div>

                <div className={"div-form"}>
                    <label className={"label-form"}>Car Name:</label>
                    <input className={"input-form"} type={"text"} {...register("car_name",{required: true})} />
                    {errors.car_name && <div style={{ color: "red" }}>Car name is required</div>}
                </div>

                <div className={"div-form"}>
                    <label className={"label-form"}>Fuel type:</label>
                    <input className={"input-form"} type={"text"} {...register("fuel_type",{required: true})} />
                    {errors.fuel_type && <div style={{ color: "red" }}>Fuel type is required</div>}
                </div>

                <div className={"div-form"} style={{ display: "flex", alignItems: "center" }}>
                    <label className={"label-form"}>Car type:</label>
                    <input type={"number"} style={{
                        display: "flex",
                        width: "40%",
                        padding:"6px",
                        border: "1px solid #ccc",
                        margin:"3px",
                        borderRadius: "4px"}} min={0} max={45} {...register("car_seat",{required: true})}/><p> seats</p>
                    {errors.car_seat && <div style={{ color: "red" }}>Car number is required</div>}
                </div>

                <div className={"div-form"}>
                    <label className={"label-form"}>Description</label>
                    <textarea className={"input-form"} {...register("description",{required:false})}></textarea>
                </div>

                <div className={"div-form"}>
                    <label className={"label-form"}>Price per hour: </label>
                    <input className={"input-form"} type={"number"} min={0} {...register("price",{required: true})} />
                    {errors.price && <div style={{ color: "red" }}>Price is required</div>}
                </div>

                <div className={"div-form"}>
                    <label className={"label-form"}>Car Amount:</label>
                    <input className={"input-form"} type={"number"} min={0} {...register("car_amount",{required: true})} />
                    {errors.car_amount && <div style={{ color: "red" }}>Car amount is required</div>}
                </div>

                <div style={{textAlign:"center"}}>
                    <button className={"btn1"} type={"submit"} style={{ width: "50%", padding: "10px" }}>Create</button>
                </div>
                <p style={{ color: "red" }}>{message}</p>
                <p>{newcar}</p>

            </form>
    );
}
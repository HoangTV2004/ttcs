import {useForm} from "react-hook-form";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function AddNewPayment() {
    const [message, setMessage] = useState("");
    const [newpayment, SetNewPayment] = useState("");
    const navigate = useNavigate();
    const {register,handleSubmit,formState:{errors},watch} = useForm();
    const onsubmit = async (data) =>  {
        console.log(data);
    }

    function handleCancel() {
        navigate("/payment-management");
    }

    return (
        <div className={"center-form"}>
            <form onSubmit={handleSubmit(onsubmit)}>
                <h1 className={"center-title"} >USER FORM</h1>

                <div className={"div-form"}>
                    <label className={"label-form"}>Car Name:</label>
                    <input className={"input-form"} type={"text"} {...register("car_name",{required: true})} />
                    {errors.car_name && <div style={{ color: "red" }}>Car name is required</div>}
                </div>

                <div className={"div-form"}>
                    <label className={"label-form"}>Car Number:</label>
                    <input className={"input-form"} type={"text"} {...register("car_number",{required: true})} />
                    {errors.car_number && <div style={{ color: "red" }}>Car number is required</div>}
                </div>

                <div className={"div-form"}>
                    <label className={"label-form"}>Customer Name:</label>
                    <input className={"input-form"} type={"text"} {...register("customer_name",{required: true})} />
                    {errors.customer_name && <div style={{ color: "red" }}>Customer name is required</div>}
                </div>

                <div className={"div-form"}>
                    <label className={"label-form"}>Driver Name:</label>
                    <input className={"input-form"} type={"text"} {...register("driver_name",{required: false})} />
                </div>

                <div className={"div-form"}>
                    <label className={"label-form"}>Rental Date:</label>
                    <input className={"input-form"} type={"date"} {...register("rental_date",{required: true})} />
                    {errors.rental_date && <div style={{ color: "red" }}>Rental date is required</div>}
                </div>

                <div className={"div-form"}>
                    <label className={"label-form"}>Paid Date:</label>
                    <input className={"input-form"} type={"date"} {...register("paid_date",{required: true})} />
                    {errors.paid_date && <div style={{ color: "red" }}>Paid date is required</div>}
                </div>

                <div className={"div-form"}>
                    <label className={"label-form"}>Status Payment:</label>
                    <select className={"input-form"} {...register("status",{required: true})} >
                        <option>Selection</option>
                        <option>Pre Rent</option>
                        <option>Rented</option>
                        <option>Renting</option>
                    </select>
                    {(errors.status||watch().status==="Selection") && <div style={{ color: "red" }}>Paid date is required</div>}
                </div>

                <button type={"submit"} style={{ width: "50%", padding: "10px" }}>Create</button>
                <button onClick={handleCancel} style={{ width: "50%", padding: "10px" }}>Cancel</button>
                <p style={{ color: "red" }}>{message}</p>
                <p>{newpayment}</p>

            </form>
        </div>
    );
}
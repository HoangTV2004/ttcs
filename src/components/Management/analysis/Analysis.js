import {useEffect, useState} from "react";
import Menutop from "../../Header/Menu";
import DefaultLayout from "../../Header/DefaultLayout";

export default function Analysis() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://94txyl-8080.csb.app/api/analysis/cars");
                const result = await response.json();
                setCount(result);
            } catch (error) { console.error("Error fetching data:", error);}
        };
        fetchData();
    }, []);
    console.log(count);
    const { Car_count, User_count} = count;
    return(
        <div>
            <DefaultLayout>
                <p>User count: {User_count}</p>
                <p>Car count: {Car_count}</p>
            </DefaultLayout>
        </div>
    );
}
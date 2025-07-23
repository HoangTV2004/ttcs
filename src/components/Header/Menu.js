import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

export default function Menutop(props){
    const [role,setRole]=useState("");
    const [user,setUser] = useState({});
    console.log(user);
    const navigate = useNavigate();
    console.log(localStorage.getItem("user"),localStorage.getItem("role"));
    function logout() {

        console.log()
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        navigate('/login');
    }
    return(
        <nav style={{
            left: 0,
            top: 0,
            margin: 20,
            padding: 20,
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
            display: "flex",
            gap: "15px",
            alignItems: "center"
        }}>
            {<Link to="/" style={{padding: 5}}>Home</Link>}
            {<Link to="/about" style={{padding: 5}}>About</Link>}
            {localStorage.getItem("role") === "Admin" && <Link to="/analysis" style={{padding: "5"}}>Analysis</Link>}
            {localStorage.getItem("role") === "Admin" && <Link to="/car-management" style={{padding: "5"}}>Car Management</Link>}
            {localStorage.getItem("role") === "Admin" && <Link to={"/payment-management"} style={{padding: "5"}}>Payment Management</Link>}
            {localStorage.getItem("role") === "Admin" && <Link to={"/user-management"} style={{padding: "5"}}>User Management</Link>}
            {localStorage.getItem("role") === "Customer" && <Link to={"/cars"} style={{padding: "5"}}>Cars</Link>}
            <span>{localStorage.getItem("user").username}</span>
            <span style={{position:"absolute", right:"13%"}}>|</span>
            <span onClick={logout} style={{cursor:"pointer",position:"absolute",right:"8%"}}>Logout</span>
            <span style={{position:"absolute", right:"7%"}}>|</span>
        </nav>
    );
}
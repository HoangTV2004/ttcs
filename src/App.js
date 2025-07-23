import './App.css';
import {BrowserRouter as Router, Link, Route, Routes, useNavigate} from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NoMatch from "./NoMatch";
import {useState} from "react";
import Analysis from "./components/Management/analysis/Analysis";
import CarManagement from "./components/Management/CarManagement/CarManagement";
import PaymentManagement from "./components/Management/PaymentManagement/PaymentManagement";
import UserManagement from "./components/Management/UserManagement/UserManagement";
import AddNewUser from "./components/Management/UserManagement/AddNewUser";
import AddNewPayment from "./components/Management/PaymentManagement/AddNewPayment";
import AddNewCar from "./components/Management/CarManagement/AddNewCar";
import ProtectedRoute from "./ProtectRoute";
import ProtectedAdmin from "./components/control/checkroleadmin";
import Carlist from "./components/Rent/CarList";
import CarListPage from "./components/Management/CarManagement/testlist";
import ProtectedCustomer from "./components/control/checkrolecustomer";
import Cars from "./components/Rent/Rent";
import DetailCars from "./components/Rent/DetailCars";
import BookingsHistory from "./components/Rent/BookingsHistory";

function AppLayout() {
    const [role,setRole]=useState("");
    const [user,setUser] = useState();
    return (
        <>
            <Routes>
                <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
                <Route path="/login" element={<Login onLogin = {setUser} />} />
                <Route path="/register" element={<Register />} />
                <Route path={"/analysis"} element={<ProtectedAdmin><Analysis /></ProtectedAdmin>} />
                <Route path={"/car-management"} element={<ProtectedAdmin><CarManagement /></ProtectedAdmin>} >
                </Route>
                <Route path={"/payment-management"} element={<ProtectedAdmin><PaymentManagement /></ProtectedAdmin>} />
                <Route path={"/user-management"} element={<ProtectedAdmin><UserManagement /></ProtectedAdmin>} >
                    <Route index element={<ProtectedAdmin><AddNewUser /></ProtectedAdmin>} />
                </Route>
                <Route path="/add-new-payment" element={<ProtectedAdmin><AddNewPayment /></ProtectedAdmin>} />
                <Route path="/add-new-car" element={<ProtectedAdmin><AddNewCar /></ProtectedAdmin>} />
                <Route path="/" element={<ProtectedRoute><Cars/></ProtectedRoute>}>
                    <Route index element={<Carlist/>} />
                    <Route path= ":carid" element={<ProtectedRoute><DetailCars/></ProtectedRoute>} />
                </Route>
                <Route path={"/userbookings"} element={<ProtectedRoute><BookingsHistory/></ProtectedRoute>} />
                <Route path="*" element={<NoMatch/>}/>
            </Routes>
        </>
    );
}

// {user?.role==='admin'?(<AdminLayout/>):(<CustomerLayout/>)}



function CustomerLayout() {
    const [user,setUser] = useState();
    const navigate = useNavigate();
    function logout() {
        setUser(null);
        navigate('/');
    }
    return(
        <>
        </>
    );
}

function App() {
    return(
        <Router>
            <AppLayout />
        </Router>
    );
}

export default App;

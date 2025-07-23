import {Navigate} from "react-router-dom";
function ProtectedCustomer({children}) {
    console.log(localStorage.getItem("role"));
    if(localStorage.getItem("role")!=="Customer") {
        return (
            <Navigate to="/login" replace/>
        );
    }
    return children;
}
export default ProtectedCustomer;
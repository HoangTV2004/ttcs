import {Navigate} from "react-router-dom";
function ProtectedAdmin({children}) {
    console.log(localStorage.getItem("role"));
    if(localStorage.getItem("role")!=="Admin") {
        return (
            <Navigate to="/login" replace/>
        );
    }
    return children;
}
export default ProtectedAdmin;
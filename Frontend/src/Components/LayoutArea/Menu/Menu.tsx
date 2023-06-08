import { NavLink, useNavigate } from "react-router-dom";
import "./Menu.css";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";

function Menu(): JSX.Element {

    // Use navigate:
    const navigate = useNavigate();

    // Logout
    function logout(): void {
        authService.logout();
        notifyService.success("You Have been logged out");
        navigate("/login");
    }


    return (
        <div className="Menu">

            <NavLink to="/vacations">Vacations</NavLink>
            <span> | </span>
            <NavLink to="/add">Add Vacation</NavLink>
            <span> | </span>
            <NavLink to="/report">Report</NavLink>
            <span> | </span>
            <span className="Logout"><button onClick={logout}>Logout</button></span>
        </div>
    );
}

export default Menu;

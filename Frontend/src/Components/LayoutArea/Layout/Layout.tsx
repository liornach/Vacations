import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {

    // Creating state to check if user is logged in:
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    // Function to check if user is logged in:
    function isUserLoggedIn(): boolean {

        // Get user state from auth store:
        const loggedInStatus = authStore.getState().user;

        // If user is  logged in:
        if (loggedInStatus) {
            setIsLoggedIn(true);
            isUserAdmin(loggedInStatus);
            return;
        }

        // if user is not logged in:
        setIsLoggedIn(false);
        setIsAdmin(false);
    }

    // Function to check if user is admin:
    function isUserAdmin(user: UserModel): boolean {
        // If user is admin:
        if (user.role === 1) {
            setIsAdmin(true);
            return;
        }
        // If user is not admin:
        setIsAdmin(false);
    }

    // When routing component is rendering (only)for the first time:
    useEffect(() => {
        isUserLoggedIn();

        // Set changes in states every time user auth state is changed:
        const unsubscribe = authStore.subscribe(() => {
            isUserLoggedIn();
        });

        // Unsubscribe
        return () => unsubscribe();
    }, [])
    return (
        <div className="Layout Content">
            {isAdmin ? <Menu /> : <></>}
            <hr />

            <Routing />

        </div>
    );
}

export default Layout;

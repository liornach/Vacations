import { Navigate, Route } from "react-router-dom";
import "./Protected.css";
import { useEffect, useState } from "react";

interface ProtectedProps{
    isAdmin : boolean;
    children : JSX.Element;
}
// Should try it with key and set the value of is admin to 1 and 0....
function Protected(props : ProtectedProps): JSX.Element {
    
    const [state , setState] = useState(props.isAdmin)

    useEffect(()=>{
        setState(props.isAdmin);
    } , [props.isAdmin])


    const admin = state;
    if(!admin) {return <Navigate to="/" replace />}
    return props.children;
};

export default Protected;

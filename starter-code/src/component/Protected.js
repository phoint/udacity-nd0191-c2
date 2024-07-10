import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";




const Protected = ({children}) => {
    const authedUser = useSelector(state => state.authedUser);
    const location = useLocation();
    
    if (!authedUser.isAuthenticated) {
        return <Navigate to="/login" state={{from: location}} replace/>
    }
    return children;
}

export default Protected;
import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import useAuth from "../custom_hooks/useAuth";

function ProtectedRoute() {
    const {currentUser} = useAuth()

    return currentUser ? <Outlet/> : <Navigate to="/login" />
}

export default ProtectedRoute;

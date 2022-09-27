import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthorization from '../hooks/useAuthorization';

const PrivateRoute = ({ children }) => {
    // custom Hook for checking is authorized
    const isLoggedIn = useAuthorization();
    return isLoggedIn ? children : <Navigate to="/" />
}

export default PrivateRoute
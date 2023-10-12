import React, { useEffect, useState} from 'react'
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({ children } : { children : any }) => {
    
    const [ token, setToken ] = useState<string | null>();

    let location = useLocation();

    useEffect( () => {
        let token = localStorage.getItem('token')
        setToken(token)
    },[token])

    if(token === null) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;
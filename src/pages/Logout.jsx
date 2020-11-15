import React from 'react'
// import { useEffect } from 'react'
// import { useContext } from 'react'
import { Redirect } from 'react-router-dom'
// import { AuthContext } from '../context/AuthContext'
import AuthHandler from '../utils/AuthHandler'
// import { Login } from './Login'




export const Logout = () => {

    AuthHandler.logoutUser();

    return (
        <>
            <Redirect to='/' /> 
        </>
            
        
    )
}

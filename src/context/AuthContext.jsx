import React, { createContext, useState } from 'react'

export const AuthContext = createContext();

const AuthProvider = (props) => {

    const [ismounted, guardarIsmounted] = useState(false);
    
    return (
      <AuthContext.Provider
        value={{ ismounted, guardarIsmounted }}
      >
        {props.children}
      </AuthContext.Provider>
    );
}

export default AuthProvider;
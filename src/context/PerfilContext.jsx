import axios from 'axios';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import AuthHandler from '../utils/AuthHandler';
import Config from '../utils/Config';
import { AlumnosContext } from './AlumnosContext';
import { AuthContext } from './AuthContext';

export const PerfilContext = createContext();

const PerfilProvider = (props) => {
    const {ismounted} = useContext(AuthContext);
    const {idUsuario} = useContext(AlumnosContext);
    const [perfil, guardarPerfil] = useState({});
    useEffect(()=>{
            if(ismounted && idUsuario){
              const obtenerPerfil = async () => {
                try {
                  const url = `http://127.0.0.1:8000/api/usuarios/${idUsuario}/`;
                  const perfilu = await axios.get(url, {
                    headers: {
                      Authorization: `JWT ${localStorage.getItem("token")}`,
                    },
                  });
                  guardarPerfil(perfilu.data);
                  return ;
                } catch (error) {
                  console.error(error);
                  if(error.status!==401) {
                    AuthHandler.logoutUser();
                    window.location = Config.logoutPageUrl;
                }
                }
                
              };
              obtenerPerfil();
            }
            
    },[idUsuario, ismounted])
    return (
      <PerfilContext.Provider
        value={{
          perfil,
        }}
      >
        {props.children}
      </PerfilContext.Provider>
    );
}
export default PerfilProvider;
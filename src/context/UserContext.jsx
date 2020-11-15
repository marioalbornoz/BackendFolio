import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Config from '../utils/Config';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import AuthHandler from '../utils/AuthHandler';

// Creando context
export const UserContext = createContext();

// Provider
const UserProvider = (props) => {
    const {ismounted} = useContext(AuthContext);
    const [usuarios, guardarUsuario] = useState([]);

    // llamado a la api
    useEffect(() => {
        if(ismounted){
          try {
            const obtenerUsuarios = async() => {
              try {
                  const usuarios = await axios(Config.listaUsuarios, {
                      headers: {
                        Authorization: `JWT ${localStorage.getItem("token")}`,
                      },
                    });
                    guardarUsuario(usuarios);
              } catch (error) {
                  console.error(error);
                  AuthHandler.logoutUser();
                  window.location = Config.logoutPageUrl;
              }
          }
          obtenerUsuarios()
          } catch (error) {
            console.error(error);
          }
        }
    }, [ismounted]);

    return (
      <UserContext.Provider value={{ usuarios }}>
        {props.children}
      </UserContext.Provider>
    );
}
export default UserProvider;
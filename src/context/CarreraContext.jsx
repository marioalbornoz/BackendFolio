import React, { createContext, useState, useEffect } from 'react'
import axios from "axios";
import Config from '../utils/Config';
import AuthHandler from '../utils/AuthHandler';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
// import AuthHandler from '../utils/AuthHandler';

//creando el context
export const CarreraContext = createContext();

// Provider
const CarreraProvider = (props) => {
  const {ismounted} = useContext(AuthContext);
  const [facultades, guardarFacultad] = useState([])
  const [escuelas, guardarEscuelas] = useState([])
  const [carreras, guardarCarrera] = useState([])
    
    //ejecutar llamado a la api
    useEffect(()=> {
      if(ismounted){
        try {
          const obtenerFacultades = async() => {
            const facultades = await axios(Config.facultades, {
              headers: {
                Authorization: `JWT ${localStorage.getItem("token")}`,
              }})
            guardarFacultad(facultades.data);
          }
          obtenerFacultades();
        } catch (error) {
          console.error(error);
          AuthHandler.logoutUser();
          window.location = Config.logoutPageUrl;
          
        }
      }
      
      
    }, [ismounted])

    useEffect(()=> {
      if(ismounted){
        try {
          const obtenerEscuelas = async() => {
            const escuelas = await axios(Config.escuelas, {
              headers: {
                Authorization: `JWT ${localStorage.getItem("token")}`,
              }})
            guardarEscuelas(escuelas.data);
          }
          obtenerEscuelas();
        } catch (error) {
          console.error(error);
          AuthHandler.logoutUser();
          window.location = Config.logoutPageUrl;
          
        }
      }
      
      
    }, [ismounted])
  
    useEffect(()=> {
      if(ismounted){
        try {
          const obtenerEscuelas = async() => {
            const carreras = await axios(Config.carreras, {
              headers: {
                Authorization: `JWT ${localStorage.getItem("token")}`,
              }})
            guardarCarrera(carreras.data.data);
          }
          obtenerEscuelas();
        } catch (error) {
          console.error(error);
        }
      }
      
      
    }, [ismounted])
    return (
        <CarreraContext.Provider
            value={{
                carreras,
                escuelas,
                facultades,
            }}
            >
            {props.children}
        </CarreraContext.Provider>
    )
}
export default CarreraProvider;
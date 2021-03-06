import React, { createContext, useState, useEffect, useContext } from 'react'
import axios from "axios";
import AuthHandler from '../utils/AuthHandler';
import { AuthContext } from './AuthContext';
import Config from '../utils/Config';
import { usePagination } from '../hooks/usePagination';

//creando el context
export const AlumnosContext = createContext();

// Provider
const AlumnosProvider = (props) => {
  const { ismounted } = useContext(AuthContext);

  const [alumnos, guardarAlumnosLista] = useState([]);
  const [idUsuario, guardarIdUsuario] = useState(null);

  const {counter, increment, decrement} = usePagination();
  const [previous, setPrevious] = useState(null);
  const [next, setNext] = useState(null);

  const decodePayload = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = token.split(".")[1];
      const cadena = JSON.parse(
        Buffer.from(payload, "base64").toString("utf8")
      );
      guardarIdUsuario(cadena.user_id);
    } else {
      return;
    }
  };

  //ejecutar llamado a la api
  useEffect(() => {
    if (ismounted) {
      
        const obtenerListaAlumnos = async () => {
          try {
          const alumnos = await axios(`${Config.alumnos}?page=${counter}`, 
          {
            headers: {
              Authorization: `JWT ${localStorage.getItem("token")}`,
              "Content-type": "application/json",
            },
          });
          guardarAlumnosLista(alumnos.data.results);
          setPrevious(alumnos.data.previous);
          setNext(alumnos.data.next)
        } catch (error) {
          console.error(error);
          if (error.status !== 401) {
            AuthHandler.logoutUser();
            window.location = Config.logoutPageUrl;
          }
        }
        } 
        obtenerListaAlumnos();
        decodePayload();
      
    }
  }, [ismounted, counter]);
  return (
    <AlumnosContext.Provider
      value={{
        alumnos,
        idUsuario,
        increment,
        decrement,
        previous,
        next
      }}
    >
      {props.children}
    </AlumnosContext.Provider>
  );
}
export default AlumnosProvider;
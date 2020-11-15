import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import Config from "../utils/Config";
import AuthHandler from "../utils/AuthHandler";
import { AuthContext } from "./AuthContext";
import { ObtenerMes } from "../helpers";

//creando el context
export const FolioContext = createContext();
// Provider
const FolioProvider = (props) => {
  const { ismounted } = useContext(AuthContext);
  const [folios, guardarFolioLista] = useState([]);
  const [indice, setindice] = useState({});
  const [actualizar, guardarActuaizar] = useState(false);
  const [contadortotal, guardarContadorTotal] = useState(0);
  const [contadoralumno, guardarContadorAlumno] = useState(0);
  const [foliostotales, guardarContadorFoliosTotales] = useState(0);
  const [foliospriorityone, guardarContadorPriorityOne] = useState([]);
  const [foliosprioritytwo, guardarContadorPriorityTwo] = useState([]);
  // const [foliosmes, guardarFoliosMes] = useState([]);
  const [foliosfiltrados, guardarFoliosFiltrados] = useState([]);
  const [mes, guardarMes] = useState(undefined);
  const [filtrando, guardarFiltrando] = useState(false);
  const [prioridad, guardarPrioridad] = useState(0);

  //ejecutar llamado a la api
  useEffect(() => {
    if (ismounted) {
      const obtenerListaFolio = async () => {
        try {
          const allfolio = await axios.get(Config.listFolios, {
            headers: {
              Authorization: `JWT ${localStorage.getItem("token")}`,
            },
          });
          // se guarda cantidad de folios totales
          guardarContadorFoliosTotales(allfolio.data.data.length);
          //funcion que guarda los folios prioridad 1
          const obtenerFoliosPrioridad1 = allfolio.data.data.filter(
            (data) => data.priority_one === true
          );
          guardarContadorPriorityOne(obtenerFoliosPrioridad1);
          //funcion que guarda los folios prioridad 2
          const obtenerFoliosPrioridad2 = allfolio.data.data.filter(
            (data) => data.priority_one === false
          );
          guardarContadorPriorityTwo(obtenerFoliosPrioridad2);
          // Se guardan todos los folios en el estado
          guardarFolioLista(allfolio.data.data);

          const obtenerFoliosFiltrados = (folios, mes, priority) => {
            if (folios && priority === 0) {
              const meses = folios.filter(
                (dato) => ObtenerMes(dato.created) === mes
              );
              guardarFoliosFiltrados(meses);
            }
            if (!mes && priority === 0) {
              console.log("sin mes y prioridad 0");
              guardarFiltrando(false)
              const filtrado = folios.filter(
                (dato) => dato.priority_one === true && ObtenerMes(dato.created) === ''
              );
              guardarFoliosFiltrados(filtrado);
            }
            if (!mes && priority === 1) {
              console.log("sin mes y prioridad 1");
              const filtrado = folios.filter(
                (dato) => dato.priority_one === true
              );
              guardarFoliosFiltrados(filtrado);
            }
            if (mes && priority === 1) {
              console.log("con mes y prioridad 1");
              const filtrado = folios.filter(
                (dato) =>
                  dato.priority_one === true && ObtenerMes(dato.created) === mes
              );
              guardarFoliosFiltrados(filtrado);
            }
            if (!mes && priority === 2) {
              console.log("sin mes y prioridad 2");
              const filtrado = folios.filter(
                (dato) => dato.priority_two === true
              );
              guardarFoliosFiltrados(filtrado);
            }
            if (mes && priority === 2) {
              console.log("con mes y prioridad 2");
              const filtrado = folios.filter(
                (dato) =>
                  dato.priority_two === true && ObtenerMes(dato.created) === mes
              );
              guardarFoliosFiltrados(filtrado);
            }
          };
          obtenerFoliosFiltrados(allfolio.data.data, mes, parseInt(prioridad));

        } catch (error) {
          console.error(error);
          if (error.status === 401) {
            alert("Tiempo de conexion agotado!");
            AuthHandler.logoutUser();
            window.location = Config.logoutPageUrl;
          }
        }
      };
      obtenerListaFolio();
    }
  }, [actualizar, ismounted, mes, prioridad]);
  return (
    <FolioContext.Provider
      value={{
        folios,
        setindice,
        indice,
        actualizar,
        guardarActuaizar,
        contadortotal,
        guardarContadorTotal,
        contadoralumno,
        guardarContadorAlumno,
        foliostotales,
        foliospriorityone,
        foliosprioritytwo,
        mes,
        guardarMes,
        filtrando,
        guardarFiltrando,
        prioridad,
        guardarPrioridad,
        foliosfiltrados,
      }}
    >
      {props.children}
    </FolioContext.Provider>
  );
};
export default FolioProvider;

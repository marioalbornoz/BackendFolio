import React, { useContext } from "react";
import { AlumnosContext } from "../context/AlumnosContext";
import { FolioContext } from "../context/FolioContext";
import { ContenidoFolio } from "./ContenidoFolio";
import { InputFolio } from "./InputFolio";
import perfilStudent from "../student.png";
import { PerfilContext } from "../context/PerfilContext";
import { useEffect } from "react";

export const ModalFolio = () => {
  const {
    folios,
    indice,
    guardarContadorTotal,
    guardarContadorAlumno,
    guardarMes,
    guardarPrioridad,
    foliosfiltrados
  } = useContext(FolioContext);
  const { id, nombres, apellidos, rut, carrera } = indice;
  const { idUsuario } = useContext(AlumnosContext);
  const { perfil } = useContext(PerfilContext);
  const { guardarActuaizar, filtrando, guardarFiltrando } = useContext(FolioContext);

  // useEffect que se ejecuta cuando se actualizan los folios

  useEffect(() => {
    const contarFoliosTotales = () => {
      let countfilter = 0;
      //permite actualizar el estado a false
      guardarActuaizar(false);
      if (folios) {
        guardarContadorTotal(folios.length);
        for (let i = 0; i < folios.length; i++) {
          if (
            folios[i].alumno.id === id ||
            (folios[i].username === "administrador" &&
              folios[i].user === perfil.id)
          ) {
            countfilter = countfilter + 1;
            guardarContadorAlumno(countfilter);
          }
        }
      }
    };
    contarFoliosTotales();
  }, [folios, guardarContadorTotal, id, perfil, guardarContadorAlumno, guardarActuaizar]);

  // Funcion que trae los folios
  const traerFoliosEspecificos =
    perfil.rol === 4 || perfil.rol === 1
      ? folios && !filtrando
        ? Object.values(folios)
            .filter((foliofilter) => foliofilter.alumno.id === id)
            .map((folioalumno, i) => (
              <ContenidoFolio key={i} folioalumno={folioalumno} />
            ))
        : foliosfiltrados
            .filter((foliofilter) => foliofilter.alumno.id === id)
            .map((folioalumno, i) => (
              <ContenidoFolio key={i} folioalumno={folioalumno} />
            ))
      : folios && !filtrando
      ? Object.values(folios)
          .filter(
            (foliofilter) =>
              foliofilter.alumno.id === id && foliofilter.user === idUsuario
          )
          .map((folioalumno, i) => (
            <ContenidoFolio key={i} folioalumno={folioalumno} />
          ))
      : foliosfiltrados
          .filter(
            (foliofilter) =>
              foliofilter.alumno.id === id && foliofilter.user === idUsuario
          )
          .map((folioalumno, i) => (
            <ContenidoFolio key={i} folioalumno={folioalumno} />
          ));

     // funcion para leer el contenido desde el filtrado
     const obtenerDatosFilter = (e) => {
      if(e.target.value !== ""){
        guardarMes(e.target.value);
        guardarFiltrando(true);
      }
      else guardarFiltrando(false)
  }
    const obtenerDatosPrioridad= (e)=>{
      if((e.target.value)!==0){
        guardarPrioridad(e.target.value);
        guardarFiltrando(true);
      }
      else guardarFiltrando(false)
      
    }
  return (
    <div
      className="modal fade bd-example-modal-lg"
      id="exampleModalLong"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content fondo">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              {nombres} {apellidos}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="col">
              <div className="title p-3 mb-2 bg-success text-white presentacionAlumno">
                <img
                  src={perfilStudent}
                  className="rounded-circle pr-3"
                  alt="hola"
                  height="80"
                />
                <div className="datos">
                  {carrera ? <p>{carrera.nombre}</p> : null}
                  <p>Rut: {rut}</p>
                  {/* <p>Cantidad de folios ingresados: {contadoralumno}</p> */}
                </div>
              </div>
              <InputFolio />
              <form className="form-groups">
                <label>Filtrar</label>
                <div className="form-row">
                  <div className="form-group col-4">
                    <select
                      name="mes"
                      onChange={obtenerDatosFilter}
                      className="form-control form-control-sm"
                    >
                      <option value="">Selecciona un mes</option>
                      <option value="enero">Enero</option>
                      <option value="febrero">Febrero</option>
                      <option value="marzo">Marzo</option>
                      <option value="abril">Abril</option>
                      <option value="mayo">Mayo</option>
                      <option value="junio">Junio</option>
                      <option value="julio">Julio</option>
                      <option value="agosto">Agosto</option>
                      <option value="septiembre">Septiembre</option>
                      <option value="octubre">Octubre</option>
                      <option value="noviembre">Noviembre</option>
                      <option value="diciembre">Diciembre</option>
                    </select>
                  </div>
                  <div className="form-group col-4">
                    <select className="form-control form-control-sm">
                      <option>2020</option>
                      
                    </select>
                  </div>
                  <div className="form-group col-4">
                    <select
                      className="form-control form-control-sm"
                      onChange={obtenerDatosPrioridad}
                    >
                      <option value={0}>Sin Prioridad</option>
                      <option value={1}>Prioridad 1</option>
                      <option value={2}>Prioridad 2</option>
                    </select>
                  </div>
                </div>
              </form>
              {traerFoliosEspecificos}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={
                ()=>{
                  
                }
              }
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react'
import { AlumnosLista } from '../components/AlumnosLista'
// import { RellenoPaginas } from '../components/RellenoPaginas'

export const Alumnos = () => {
  return (
    <div className="p-md-5 col-lg-10 col-md-9">
      <div className="row mb-5 p-3 m-1">
        <h4 className="lead">Lista de alumnos</h4>
        <hr />
        <h4 className="lead">
          Agregar alumno{" "}
          <a href="alumnos/agregar">
            <i className="fas fa-user-plus"></i>
          </a>
        </h4>
      </div>
      <AlumnosLista />
      
    </div>
  );
};

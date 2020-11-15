import React from 'react'
import { AlumnosLista } from '../components/AlumnosLista'
// import { RellenoPaginas } from '../components/RellenoPaginas'

export const Alumnos = () => {
  return (
    <div className="p-md-5 col-lg-10 col-md-9">
       <h2 className="mb-4 p-3 lead ">Lista de alumnos</h2>
      <AlumnosLista />
    </div>
  );
};

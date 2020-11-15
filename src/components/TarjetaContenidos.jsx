import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { PerfilContext } from '../context/PerfilContext';
import { colorTargetHistorial } from '../helpers';
import LoaderTargetContent from './LoaderTargetContent';
// import LoaderTargetContent from '../components/LoaderTargetContent';

export const TarjetaContenidos = ({folio, oculto}) => {
  
  const {perfil} = useContext(PerfilContext)
  console.log(perfil, folio);
  const [loader, guardarLoader]=useState(false)
  useEffect(()=>{
    setTimeout(()=>{
      guardarLoader(true)
    }, 1000)
  },[])
    return loader ? (
      <div
        className={`card shadow m-3 pl-4 pt-3 animate__animated ${colorTargetHistorial(
          folio
        )}`}
      >
        <p className="">
          {" "}
          <span className="fuenteCard">{folio.usuario}</span> :{" "}
          {!oculto && (folio.usuario===perfil.username) ? (
            <span className="">{folio.content}</span>
          ) : (
            <span>"Contenido sensible, ha sido ocultado."</span>
          )}
          <small className="small">
            ({folio.alumno.nombres} {folio.alumno.apellidos})
          </small>
        </p>
      </div>
    ):
    <div className="row" style={{height:81}}>
      <div className="col-xl-12 col-lg-12 col-md-8 col-sm-7 m-3 pl-4 ">
        <LoaderTargetContent />
      </div>
    </div>
}

import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { PerfilContext } from '../context/PerfilContext';
import { colorTargetHistorial } from '../helpers';
import LoaderTargetContent from './LoaderTargetContent';
// import LoaderTargetContent from '../components/LoaderTargetContent';

export const TarjetaContenidos = ({folio, oculto}) => {
  
  const {perfil} = useContext(PerfilContext)
  // console.log(perfil, folio);
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
          {folio.priority_one ? <i class="fas fa-exclamation mr-2"></i> : null}
          {" "}
          <span className="fuenteCard">{folio.alumno.nombres} {folio.alumno.apellidos}</span> :{" "}
          {!oculto && (folio.usuario===perfil.username) ? (
            <span className="">{folio.content}</span>
          ) : (
            <span>"Contenido no accesible, ha sido ocultado en este historial."</span>
          )}
          <small className="small">
            ({folio.usuario})
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

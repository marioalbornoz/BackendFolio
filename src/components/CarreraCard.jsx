import React from 'react';
import FotoCarreras from "../groups.png"
import { obtenerCarreraCodigo } from '../helpers';

export const CarreraCard = ({codigo, nombre}) => {
    return (
      <div
        className="card shadow col-xl-3 col-lg-5 col-md-8 col-sm-12 card-carrera redondeado m-2"
      >
        <img className="card-img-top" src={FotoCarreras} alt="" />
        <div className="card-body codigocarrera">
          <h2 className="card-title">{codigo}</h2>
          <p className="card-text">Carrera {nombre}</p>
          <a
            href={`/alumnos`}
            onClick={() => {
              obtenerCarreraCodigo(codigo);
            }}
            className="btn btn-primary"
          >
            ir a alumnos
          </a>
        </div>
      </div>
    );
}

import React from 'react'
import "./styles.css";
import imgperfil from "../avatarHombre.png"
import { formatofecha } from '../helpers';
import { useContext } from 'react';
import { PerfilContext } from '../context/PerfilContext';
// import { FolioContext } from '../context/FolioContext';

export const ContenidoFolio = ({folioalumno}) => {
  const {perfil} = useContext(PerfilContext)
    console.log(folioalumno);
    return (
      <div className="tarjeta shadow mb-3">
        <div className="picture">
          <img
            className="imagen"
            src={imgperfil}
            alt={`foto de ${folioalumno.alumno}`}
          />
        </div>
        <div className="content">
          <div className="titulo">
            <div className="usuario">
              <h6 className="card-title activator grey-text text-darken-4 font-weight-bold">
                {folioalumno.usuario}
              </h6>
            </div>

            <div className="tarjeta-fecha">
              <p>
                {formatofecha(folioalumno.created).map((tiempo,i) => (
                  <span key={i}>{tiempo}</span>
                ))}
              </p>
            </div>
          </div>

            <div className="row contenido">
              <div className="col">
              {folioalumno.rol ==="sesaes" && perfil.rol!==5 ? folioalumno.priority_one ?(<p className="text-justify text-muted"> Contenido confidencial</p>):<p className="text-justify ">{folioalumno.content}</p> : <p className="text-justify">{folioalumno.content}</p>}
              </div>
            </div>
          </div>
      </div>
    );
}

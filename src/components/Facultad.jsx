import React, { useContext } from 'react';
import { CarreraContext } from '../context/CarreraContext';
import Escuelas from './Escuelas';
// import { Spinner } from './Spinner'

export const Facultad = ({nombreFacultad, perfil}) => {
  const { escuelas } = useContext(CarreraContext);
  const { carrera, escuelanombre, rol } = perfil;
  const nombreEscueladelUsuario = escuelanombre;

  // variable que guarda todas las escuelas por facultad, si la escuela es 'ninguna' manda todas las escuelas, de lo contrario solo arroja la escuela del director, jefe de carrera o academicos
  const escuelaDeEstaFacultad =
    nombreEscueladelUsuario === "Ninguna"
      ? escuelas.filter(
          (escuelafilter) => escuelafilter.facultad === nombreFacultad
        )
      : escuelas.filter(
          (escuelafilter) =>
            escuelafilter.nombre === nombreEscueladelUsuario &&
            (rol === 3 || rol === 4 || rol === 7)
        );

  return (
    <div className="row">
      <div className="col">
        <div className="row">
          <h4 className="lead m-4">
            Carreras de la facultad de {nombreFacultad}
          </h4>
        </div>
        <div className="col">
          {" "}
          <div className="row">
            <Escuelas
              escuela={escuelaDeEstaFacultad}
              carreraUsuario={carrera}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

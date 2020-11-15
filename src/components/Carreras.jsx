import React from 'react'
import { useContext } from 'react';
import { CarreraContext } from '../context/CarreraContext';
import { PerfilContext } from '../context/PerfilContext';
import { Carrera } from './Carrera';

export const Carreras = ({carreras, escuelaNombre}) => {
    const {perfil} = useContext(PerfilContext);
    const {rol, carreranombre} =perfil;
    const {escuelas} = useContext(CarreraContext);
    const carrerasMostradas =
      (rol === 4 || rol === 7)
        ? carreras.filter(carrera => carrera.nombre === carreranombre)
        : carreras.filter(
            (carrerasfilter) => carrerasfilter.escuela === escuelaNombre
          );
    
    return (
      <div className="">
        {carrerasMostradas
          ? escuelas.map((escuela) => (
              <Carrera
                key={escuela.id}
                escuelaNombre={escuela.nombre}
                carrerasMostradas={carrerasMostradas}
              />
            ))
          : null } 
      </div>
    );
}

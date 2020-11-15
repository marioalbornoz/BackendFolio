import React from 'react'
import { CarreraCard } from './CarreraCard'

export const Carrera = ({escuelaNombre, carrerasMostradas}) => {
    
    return (
      <div className="row">
        {carrerasMostradas
          .filter((carrerafilter) => carrerafilter.escuela === escuelaNombre)
          .map((carrera) => (
            <CarreraCard
              key={carrera.id}
              nombre={carrera.nombre}
              codigo={carrera.codigo}
            />
          ))}
      </div>
    );
}

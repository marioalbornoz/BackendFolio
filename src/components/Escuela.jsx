import React from 'react'
import { Carreras } from './Carreras';

export const Escuela = ({escuelaNombre, carreras}) => {
    
    const carreraDeEscuela = carreras.filter(carrera => carrera.nombre !== 'ninguna');
   
    return (
        <div className="ml-3 mb-4" >
            <h6>Escuela de {escuelaNombre}</h6>
            <Carreras carreras={carreraDeEscuela} escuelaNombre={escuelaNombre} />
            
        </div>
    )
}

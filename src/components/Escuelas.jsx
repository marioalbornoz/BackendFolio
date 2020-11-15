import React from 'react'
import { useContext } from 'react';
import { CarreraContext } from '../context/CarreraContext';
import { Escuela } from './Escuela';

export default function Escuelas({escuela}) {

    const {carreras} = useContext(CarreraContext);
   
    return (
      <div>
        { escuela.map(esc => <Escuela key={esc.id} escuelaNombre={esc.nombre} carreras={carreras} />)}
      </div>
    );
}

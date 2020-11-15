import React, { useContext } from 'react';
import { TarjetasHistorial } from '../components/TarjetasHistorial';
import { FolioContext } from '../context/FolioContext'
import { PerfilContext } from '../context/PerfilContext';

export const Academicos = () => {
    const folios = useContext(FolioContext);
    const perfil = useContext(PerfilContext);

    return (
      <TarjetasHistorial folios={folios} perfil={perfil} filtrado="academico" rolfilter={7} />
    );
}

import React from 'react';
import { TarjetaContenidos } from '../components/TarjetaContenidos';


export const TarjetasHistorial = ({folios, perfil, filtrado, rolfilter}) => {
    const {rol} = perfil.perfil
    // console.log(perfil.perfil.rol);

    // usuarios filtrados dependiendo del rol
    const foliosUser = folios ? folios.folios.filter(foliofilter => foliofilter.rol === filtrado):null

    // Return el componente con una condicion oculta, si esta en true o null, siempre y cuando el rol del usuario actual sea igual los usuarios de folioUser
    return (
        <div className="col-lg-9 col-md-8 col-sm-12 m-4">
          <h4 className="lead m-4 animate__animated ">Historial ingresado por {filtrado.toUpperCase()}</h4>
          {rol === rolfilter
            ? foliosUser.map((folio, i) => (
                <TarjetaContenidos key={i} folio={folio} oculto ={null} />
              )) 
              : foliosUser.map((folio, i) => (
                  <TarjetaContenidos key={i} folio={folio} oculto={true} />
             ))
          }
        </div>
      );
}

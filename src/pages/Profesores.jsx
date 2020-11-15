import React, {  useContext } from 'react'
import { UserContext } from '../context/UserContext';
import imagen from "../perfil-clase.png";
import { Spinner } from '../components/Spinner';
import { rolUsuario } from '../helpers';

export const Profesores = () => {

    const { usuarios } = useContext(UserContext);
    
    return (
      <div className="col-lg-9 col-md-9 col-sm-12 ">
        <div className=" row title m-5">
          <h4 className="lead">Usuarios Registrados </h4>
          <hr/>
          <h4 className="lead"><a href="usuarios/agregar"><i className="fas fa-user-plus"></i></a></h4>
          
        </div>
        <div className="row">
          {usuarios.data ? (
            usuarios.data.map((user) => (
              <div
                className={`card text-white usuarios shadow col-lg-3 col-md-5 col-sm-12`}
                key={user.id}
              >
                <div className="card-header">
                  {user ? (rolUsuario(user.rol) ) : null}
                </div>
                <div className="card-body cuerpo">
                  <img src={imagen} alt="hola" className="img-card" />
                  <h6 className="card-title pl-2">{user.username}</h6>
                </div>
              </div>
            ))
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    );
}

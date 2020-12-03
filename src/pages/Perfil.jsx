import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Spinner } from '../components/Spinner';
// import { PerfilContext } from '../context/PerfilContext';
import { UserContext } from '../context/UserContext';
import { rolUsuario } from '../helpers';
import img from '../perfil-clase.png';
export const Perfil = () => {
  // perfil entrega datos de usuario log
  const {usuarios} = useContext(UserContext)
  // const { perfil } = useContext(PerfilContext);
  // const { username, email, rol } = perfil;
  const [idurl, guardarId] = useState();
    
    
    useEffect(()=>{
      var URLactual = window.location.href;
      function obtenerid(URL){
        const id = URL.split("/")[4]
        guardarId(id);
      }
      obtenerid(URLactual);
      
    },[])

    const filtrado = usuarios.data ? usuarios.data.filter(usuario => usuario.id===parseInt(idurl)) : null;   
    return (
      <div className="col-lg-9 col-md-8 mt-5 perfil">
        <div className="title m-3 ml-5 pb-4">
          <h4 className="font-weight-bold">Perfil Usuario</h4>
        </div>
        {filtrado ? filtrado.map((user) => (
          <div key={user.id} className="card shadow redondeado ml-lg-5">
            <div className="perfil-imagen m-2">
              <img src={img} alt="" className="img-perfil" />
            </div>
            <div className="col-lg-9 col-md-8 col-sm-12 pt-4 perfil-cuerpo m-3">
              <p className="lead">
                <span className="font-weight-bold">Usuario</span>:{" "}
                {user.username}
              </p>
             {user.first_name ? (
                <p className="lead">
                  {" "}
                  <span className="font-weight-bold">Nombres</span>{" "}
                  {user.first_name} {user.last_name}
                </p>
              ) : null}
              <p className="lead">
                <span className="font-weight-bold">Rol de Usuario</span>:{" "}
                {rolUsuario(user.rol)}
              </p>
              <p className="lead">
                <span className="font-weight-bold">Correo</span>: {user.email}
              </p>
              {/* {
              user.facultad ?<p><span className="font-weight-bold">Facultad</span>: {user.facultad}</p> : null
            }
            {
              user.escuela ?<p><span className="font-weight-bold">Escuela</span>: {user.escuela}</p> : null
            }
            {
              user.carrera ?<p><span className="font-weight-bold">Carrera</span>: {user.carrera}</p> : null
            } */}
            </div>
            
          </div>
        )): <Spinner />}

      </div>
    );

}

  


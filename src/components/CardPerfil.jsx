import Axios from 'axios';
import React, { useState } from 'react'
import { rolUsuario } from '../helpers';
import img from '../perfil-clase.png';
import Config from '../utils/Config';

export const CardPerfil = ({user, editando, estaEditando, id}) => {

    const [repeat, setRepeat] = useState(false);
    const [datos, setDatos] = useState({
        username:user.username,
        first_name:user.first_name,
        last_name:user.last_name,
        email:user.email,
        password1:"",
        password2:""
    })
    const comparePassword = () => {
        
    }
    const handleInput = (e) => {
      setDatos({
        ...datos,
        [e.target.name]: e.target.value,
      });
      comparePassword();
    };
    const handleSubmit = (e) =>{
        e.preventDefault();
        estaEditando(!editando)
        console.log("usuario editado");
        const enviarDatos = async() => {
            try {
                const url = `${Config.listaUsuarios}${id}/`
                const postear = await Axios.put(url, {
                  username: datos.username.toLowerCase(),
                  email: datos.email,
                  password: datos.password1,
                  first_name: datos.first_name,
                  last_name: datos.last_name,
                },
                {
                    headers: {
                      Authorization: `JWT ${localStorage.getItem("token")}`,
                      "Content-type": "application/json",
                    },
                  }
                ); 
                console.log(`se hicieron cambios en los campos`,postear);
            } catch (error) {
                console.error(error)
            }
        }
        if(datos.password2.trim() === datos.password1.trim()){
            setRepeat(false);
            enviarDatos();
        }else {
          setRepeat(true);
        }

        
    }
    return !editando ? (
      <div className="card shadow redondeado ml-lg-5">
        <div className="perfil-imagen m-2">
          <img src={img} alt="" className="img-perfil" />
        </div>
        <div className="col-lg-9 col-md-8 col-sm-12 pt-4 perfil-cuerpo m-3">
          <p className="lead">
            <span className="font-weight-bold">Usuario</span>: {user.username}
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
            */}
          {user.escuela ? (
            <p className="lead text-capitalize">
              <span className="font-weight-bold">Escuela</span>:{" "}
              {user.escuelanombre}
            </p>
          ) : null}

          {user.carrera ? (
            <p className="lead">
              <span className="font-weight-bold">Carrera</span>:{" "}
              {user.carreranombre}
            </p>
          ) : null}
        </div>
      </div>
    ) : (
      <div className="card shadow redondeado ml-lg-5">
        <div className="perfil-imagen m-2">
          <img src={img} alt="" className="img-perfil" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="col-lg-9 col-md-8 col-sm-12 pt-4 perfil-cuerpo m-3"
        >
          <label>Usuario: </label>
          <input
            type="text"
            className="form-control"
            name="usuario"
            placeholder={user.username}
            onChange={handleInput}
            value={datos.username}
          />

          <>
            <label>Nombres: </label>
            <input
              type="text"
              name="first_name"
              className="form-control"
              placeholder={user.first_name}
              onChange={handleInput}
              value={datos.first_name}
            />
          </>
          <>
            <label>Apellidos</label>{" "}
            <input
              type="text"
              name="last_name"
              className="form-control"
              placeholder={user.last_name}
              onChange={handleInput}
              value={datos.last_name}
            />{" "}
          </>
          <p className="mt-3">
            <span className="font-weight-bold ">Rol de Usuario</span>:{" "}
            {rolUsuario(user.rol)}
          </p>
          <label>Correo: </label>
          <input
            type="text"
            name="email"
            placeholder={user.email}
            className="form-control"
            onChange={handleInput}
            value={datos.email}
          />
          {/* {
              user.facultad ?<p><span className="font-weight-bold">Facultad</span>: {user.facultad}</p> : null
            }
            */}
          {user.escuela ? (
            <p className=" text-capitalize mt-3">
              <span className="font-weight-bold">Escuela</span>:{" "}
              {user.escuelanombre}
            </p>
          ) : null}

          {user.carrera ? (
            <p className="mt-3">
              <span className="font-weight-bold">Carrera</span>:{" "}
              {user.carreranombre}
            </p>
          ) : null}
          <label>Contraseña:</label>
          <input
            className="form-control"
            type="password"
            name="password1"
            onChange={handleInput}
            value={datos.password1}
          />
          <label>Repita contraseña:</label>
          <input
            className="form-control"
            onChange={handleInput}
            type="password"
            name="password2"
            value={datos.password2}
          />
          {repeat ? (
            <div className="alert alert-danger">
              Las claves deben ser similares
            </div>
          ) : null}
         <input type="submit" value="Guardar" /> 

          {/* <button onClick={estaEditando(false)}>Guardar</button> */}
        </form>
      </div>
    );
}

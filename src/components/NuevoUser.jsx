import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { CarreraContext } from '../context/CarreraContext';
import { PerfilContext } from '../context/PerfilContext';
import { carreraPorEscuelas } from '../helpers';
import Config from '../utils/Config';

export const NuevoUser = () => {
    const {perfil} = useContext(PerfilContext);
    const {carreras, escuelas} = useContext(CarreraContext);
    const [status, setStatus] = useState(null);
    const [alerta, guardarAlerta] = useState(false);
    const [datos, guardarDatos] = useState({
        username:"",
        email:"",
        password:"",
        firstname:"",
        lastname:"",
        rol:"",
        facultad: perfil.facultad,
        escuela: perfil.escuela,
        carrera: perfil.carrera

    });
    useEffect(()=>{
      setTimeout(()=>{
        guardarAlerta(false);
      }, 3000)
    }, [alerta])
   const misCarreras = (carreraPorEscuelas(perfil.escuelanombre, carreras));

    const handleInput = (e) => {
        guardarDatos({
          ...datos,
          [e.target.name]: e.target.value,
        });
    }
    
    const handleSubmit = (e) => {
      e.preventDefault();
      const enviarDatos = async () => {
       try {
        const respuesta = await axios.post(
          Config.listaUsuarios,
          {
            username: datos.username,
            email: datos.email,
            password: datos.password,
            first_name: datos.firstname,
            last_name: datos.lastname,
            rol: datos.rol,
            facultad: perfil.facultad,
            escuela: perfil.escuela,
            carrera: perfil.carrera,
          },
          {
            headers: {
              Authorization: `JWT ${localStorage.getItem("token")}`,
              "Content-type": "application/json",
            },
          }
        );
        setStatus(respuesta.status);
        guardarAlerta(true);
        guardarDatos({
          username: "",
          email: "",
          password: "",
          firstname: "",
          lastname: "",
          rol: null,
          facultad: null,
          escuela: null,
          carrera: null,
        });
       } catch (error) {
         console.error(error);
         setStatus(400);
         guardarAlerta(true)
       }
        
      };
      enviarDatos();
    };

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <div className="row">
          <div className="col col-xl-8 col-lg-8 col-md-8 col-sm-12 p-4">
            <h4 className="lead ml-4 m-4">
              Agregar un usuario <i className="fas fa-user-plus"></i>
            </h4>
            <div className="alert alert-info ml-4 mb-3 mr-4 animate__animated animate__delay-1s animate__fadeInDown">
              Te recordamos que solo puedes agregar usuarios que esten bajo tu
              nivel.
            </div>
            {status === 201 && alerta === true ? (
              <div className="alert alert-success ml-4">
                <i className="fas fa-user-check" style={{ height: "80" }}></i>{" "}
                Se agrego correctamente el usuario.
              </div>
            ) : status !== 201 && alerta === true ? (
              <div className="alert alert-danger ml-4">
                <i class="fas fa-exclamation-triangle"></i> Hubo un error al
                ingresar los datos o usuario ya existe
              </div>
            ) : null}

            <form className="form m-4" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control mb-2"
                  type="text"
                  name="username"
                  placeholder="Usuario"
                  onChange={handleInput}
                  value={datos.username}
                  required
                />
                <input
                  className="form-control mb-2"
                  name="email"
                  type="email"
                  placeholder="Correo"
                  onChange={handleInput}
                  value={datos.email}
                  required
                />
                <input
                  className="form-control mb-2"
                  value={datos.password}
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleInput}
                  required
                />
                <input
                  className="form-control mb-2"
                  type="text"
                  name="firstname"
                  placeholder="Nombres"
                  onChange={handleInput}
                  value={datos.firstname}
                  required
                />
                <input
                  className="form-control mb-2"
                  type="text"
                  name="lastname"
                  placeholder="Apellidos"
                  onChange={handleInput}
                  value={datos.lastname}
                  required
                />
                {perfil.rol === 3 ? (
                  <select name="rol" onChange={handleInput} value={datos.rol}>
                    <option value="">---Tipo de usuario---</option>
                    <option value={4}>Jefe de carrera</option>
                  </select>
                ) : perfil.rol === 4 ? (
                  <select name="rol" onChange={handleInput} value={datos.rol}>
                    <option value="">---Tipo de usuario---</option>
                    <option value={7}>Academico</option>
                    <option value={8}>Otro</option>
                  </select>
                ) : perfil.rol === 5 ? (
                  <select name="rol" onChange={handleInput} value={datos.rol}>
                    <option value="">---Tipo de usuario---</option>
                    <option value={5}>Sesaes</option>
                  </select>
                ) : perfil.rol === 1 ? (
                  <select name="rol" onChange={handleInput} value={datos.rol}>
                    <option value="">---Tipo de usuario---</option>
                    <option value={3}>Director de Escuela</option>
                    <option value={5}>Sesaes</option>
                    <option value={9}>Asistente social</option>
                    <option value={6}>Deportes</option>
                  </select>
                ) : null}
                {datos.rol === "4" ? (
                  <select
                    name="carrera"
                    onChange={handleInput}
                    value={datos.carrera}
                  >
                    <option value="">--carrera--</option>
                    {misCarreras.map((carrera) => (
                      <option key={carrera.id} value={carrera.id}>
                        {carrera.nombre}
                      </option>
                    ))}
                  </select>
                ) : datos.rol === "7" || datos.rol === "8" ? (
                  <select
                    name="carrera"
                    onChange={handleInput}
                    value={datos.carrera}
                  >
                    <option value="">--Carrera--</option>
                    <option value={perfil.carrera}>
                      {perfil.carreranombre}
                    </option>
                  </select>
                ) : datos.rol === "3" ? (
                  <>
                    <select name="facultad" onChange={handleInput}>
                      <option value="">--Facultad--</option>
                      {perfil.rol !== 5 ? (
                        <>
                          <option value={1}>Ingenieria</option>
                          <option value={2}>administracion y economia</option>
                          <option value={3}>
                            Ciencias de la construccion y ordenamiento
                            territorial
                          </option>
                          <option value={4}>
                            Ciencias naturales, matematica y medio ambiente
                          </option>
                          <option value={5}>Academico</option>
                          <option value={6}>
                            Humanidades y tecnologias de la comunicacion social
                          </option>{" "}
                        </>
                      ) : (
                        <option value={7}>Todas</option>
                      )}
                    </select>
                    <select
                      name="escuela"
                      onChange={handleInput}
                      value={datos.escuela}
                    >
                      <option value="">--Escuela--</option>
                      {escuelas
                        .filter(
                          (escuela) => escuela.facultadid === parseInt(datos.facultad)
                        )
                        .map((escuela,i) => (
                          <option key={i} value={escuela.id}>
                            {escuela.nombre}
                          </option>
                        ))}
                    </select>
                  </>
                ) : null}
                <input
                  type="submit"
                  className="btn btn-primary my-2 btn-block"
                  value="Agregar"
                />
              </div>
            </form>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 p-5"></div>
        </div>
      </div>
    );
}

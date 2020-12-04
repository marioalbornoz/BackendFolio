import Axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import { CarreraContext } from '../context/CarreraContext';
import { PerfilContext } from '../context/PerfilContext';
import { capitalize } from '../helpers';
import Config from '../utils/Config';

export const AgregarAlumno = () => {
  const {perfil} = useContext(PerfilContext);
  const {carreras, escuelas} = useContext(CarreraContext);
  const [status, setStatus]  = useState(null);
  const [alerta, guardarAlerta]  = useState(false);
  const [alumno, agregarAlumno] = useState({
    nombres : "",
    apellidos: "",
    rut: "",
    facultad:"",
    escuela: "",
    carrera: ""
  })
  
  useEffect(()=>{
    setTimeout(()=>{ 
      guardarAlerta(false);
    }, 3000)
  }, [alerta])

  const handleInput = (e) => {
    agregarAlumno({
      ...alumno,
      [e.target.name]: e.target.value,
    });
  }
  const handleSubmit = e => {
    e.preventDefault();
    const enviarDatos = async() =>{
      try {
        const respuesta = await Axios.post(
          Config.alumnos,
          {
            nombres:capitalize(alumno.nombres),
            apellidos: capitalize(alumno.apellidos),
            rut: alumno.rut,
            is_active: true,
            carrera:alumno.carrera
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
        // Para reiniciar el formulario
        agregarAlumno({
          nombres:"",
          apellidos:"",
          rut:"",
          is_active:true,
          carrera:""
        })
      } catch (error) {
        console.error(error)
        setStatus(400)
        guardarAlerta(true)
      }
    }
    //ejecuta la funcion que envia datos
    enviarDatos();
  }
    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <div className="row">
          <div className="col col-xl-8 col-lg-8 col-md-8 col-sm-12 p-4">
            <h4 className="lead ml-4 m-4">
              Agregar un estudiante a la lista <i className="fas fa-user-plus"></i>
            </h4>
            <div className="alert alert-info ml-4 mb-3 mr-4 animate__animated animate__delay-1s animate__fadeInDown">
              Añade alumnos aquí
            </div>
            <form onSubmit={handleSubmit} className="form m-4">
              <input
                className="form-control mb-2"
                type="text"
                name="nombres"
                placeholder="Nombres"
                onChange={handleInput}
                value={alumno.nombres}
                required
              />
              <input
                className="form-control mb-2"
                type="text"
                name="apellidos"
                placeholder="Apellidos"
                onChange={handleInput}
                value={alumno.apellidos}
                required
              />
              <input
                className="form-control mb-2"
                type="text"
                name="rut"
                placeholder="Rut"
                onChange={handleInput}
                value={alumno.rut}
                required
              />
              {perfil.rol === 1 ? (
                <>
                  <select
                    className="form-control my-2"
                    name="facultad"
                    onChange={handleInput}
                  >
                    <option value="">Facultad</option>
                    <option value={1}>Ingenieria</option>
                    <option value={2}>administracion y economia</option>
                    <option value={3}>
                      Ciencias de la construccion y ordenamiento territorial
                    </option>
                    <option value={4}>
                      Ciencias naturales, matematica y medio ambiente
                    </option>
                    <option value={5}>Academico</option>
                    <option value={6}>
                      Humanidades y tecnologias de la comunicacion social
                    </option>
                  </select>
                  <select
                    name="escuela"
                    onChange={handleInput}
                    value={alumno.escuela}
                    className="form-control"
                  >
                    <option value="">Escuela</option>
                    {escuelas
                      .filter(
                        (escuela) =>
                          escuela.facultadid === parseInt(alumno.facultad)
                      )
                      .map((escuela, i) => (
                        <option key={i} value={escuela.nombre}>
                          {escuela.nombre}
                        </option>
                      ))}
                  </select>
                  <select
                    name="carrera"
                    onChange={handleInput}
                    value={alumno.escuela}
                    className="form-control"
                  >
                    <option value="">Carreras</option>
                    {carreras
                      .filter((carrera) => carrera.escuela === alumno.escuela)
                      .map((carrera, i) => (
                        <option key={i} value={carrera.id}>
                          {carrera.nombre}
                        </option>
                      ))}
                  </select>
                </>
              ) : null}
              {status === 201 && alerta === true ? (
                <div className="alert alert-success my-2">
                  <i className="fas fa-user-check" style={{ height: "80" }}></i>{" "}
                  Exito al agregar al alumno
                </div>
              ) : status === 400 ? (
                <div className="alert alert-danger my-2">
                  <i class="fas fa-exclamation-triangle"></i> Hubo un error al
                  ingresar los datos o usuario ya existe
                </div>
              ) : null}
              <input
                type="submit"
                value="Agregar"
                className=" btn btn-primary btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    );
}

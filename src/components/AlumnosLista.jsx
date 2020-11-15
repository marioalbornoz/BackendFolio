import React, { useContext, useState } from 'react'
import { AlumnosContext } from '../context/AlumnosContext';
import { FolioContext } from '../context/FolioContext';
import { ModalFolio } from './ModalFolio';
import MyLoader from './MyLoader';

const CARRERA = localStorage.getItem('carrera')

export const AlumnosLista = () => {
  const { alumnos, increment, decrement, next, previous } = useContext(
    AlumnosContext
  );
  const { setindice } = useContext(FolioContext);
  const [busqueda, guardarBusqueda] = useState("");
  const seleccionAlumno = (id) => {
    setindice(id);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(busqueda);
  }
  const handleChange = (e) => {
    guardarBusqueda(e.target.value);
  }

  let expresion = new RegExp(`${busqueda}.*`, "i");

  return alumnos ? (
    <div className="col col-12">
      <form onSubmit={handleSearch} className="input-group mb-3 h-200">
        <input
          type="text"
          name="content"
          onChange={handleChange}
          className="form-control redondeado h-200"
          placeholder="Usa este buscador para encotrar a quien buscas (Ejemplo: albornoz)"
          aria-label="Ingresa tu texto aqui"
          aria-describedby="basic-addon2"
        />
        <div className="input-group-append">
          <button className="btn btn-primary redondeado" type="button">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>

      <div className="card table-responsive redondeado shadow">
        <table className="table table-hover">
          <thead className="thead text-white cabecera">
            <tr>
              <th>Alumno</th>
              <th className="rut">Rut</th>
              <th>Carrera</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            { busqueda
              ? CARRERA
                ? alumnos
                    .filter(
                      (alumnofilter) =>
                        expresion.test(alumnofilter.apellidos) &&
                        alumnofilter.carrera.codigo === parseInt(CARRERA)
                    )
                    .map((alumno, i) => (
                      <tr key={i}>
                        <td>
                          {alumno.nombres} {alumno.apellidos}
                        </td>
                        <td className="rut">{alumno.rut}</td>
                        <td>{alumno.carrera.codigo}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => seleccionAlumno(alumno)}
                            className="btn btn-secondary "
                            data-toggle="modal"
                            data-target="#exampleModalLong"
                          >
                            Folio
                          </button>
                          <ModalFolio />
                        </td>
                      </tr>
                    ))
                : alumnos
                    .filter(
                      (alumnofilter) => expresion.test(alumnofilter.apellidos)
                    )
                    .map((alumno, i) => (
                      <tr key={i}>
                        <td>
                          {alumno.nombres} {alumno.apellidos}
                        </td>
                        <td className="rut">{alumno.rut}</td>
                        <td>{alumno.carrera.codigo}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => seleccionAlumno(alumno)}
                            className="btn btn-secondary "
                            data-toggle="modal"
                            data-target="#exampleModalLong"
                          >
                            Folio
                          </button>
                          <ModalFolio />
                        </td>
                      </tr>
                    ))
              : CARRERA
              ? alumnos
                  .filter(
                    (alumnosfilter) =>
                      alumnosfilter.carrera.codigo === parseInt(CARRERA)
                  )
                  .map((alumno, i) => (
                    <tr key={i}>
                      <td>
                        {alumno.nombres} {alumno.apellidos}
                      </td>
                      <td className="rut">{alumno.rut}</td>
                      <td>{alumno.carrera.codigo}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => seleccionAlumno(alumno)}
                          className="btn btn-secondary "
                          data-toggle="modal"
                          data-target="#exampleModalLong"
                        >
                          Folio
                        </button>
                        <ModalFolio />
                      </td>
                    </tr>
                  ))
              : alumnos.map((alumno, i) => (
                  <tr key={i}>
                    <td>
                      {alumno.nombres} {alumno.apellidos}
                    </td>
                    <td className="rut">{alumno.rut}</td>
                    <td>{alumno.carrera.codigo}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => seleccionAlumno(alumno)}
                        className="btn btn-secondary "
                        data-toggle="modal"
                        data-target="#exampleModalLong"
                      >
                        Folio
                      </button>
                      <ModalFolio />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        {next ? (
          <button className="btn btn-block" onClick={() => increment()}>
            Siguiente
          </button>
        ) : null}
        {previous ? (
          <button className="btn btn-block" onClick={() => decrement()}>
            Anterior
          </button>
        ) : null}
      </div>
    </div>
  ) : (
    <MyLoader />
  );
}

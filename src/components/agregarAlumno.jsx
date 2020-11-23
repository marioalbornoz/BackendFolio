import React from 'react'

export const agregarAlumno = () => {
    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <div className="row">
          <div className="col col-xl-8 col-lg-8 col-md-8 col-sm-12 p-4">
            <h4 className="lead ml-4 m-4">
              Agregar un usuario <i className="fas fa-user-plus"></i>
            </h4>
            <div className="alert alert-info ml-4 mb-3 mr-4 animate__animated animate__delay-1s animate__fadeInDown">
              Añade alumnos aquí
            </div>
            <form className="form m-4">
              <input
                className="form-control mb-2"
                type="text"
                name="nombres"
                placeholder="Nombres"
                onChange=""
                value=""
                required
              />
              <input
                className="form-control mb-2"
                type="text"
                name="apellidos"
                placeholder="Apellidos"
                onChange=""
                value=""
                required
              />
              <input
                className="form-control mb-2"
                type="text"
                name="rut"
                placeholder="Rut"
                onChange=""
                value=""
                required
              />
              <input
                className="form-control mb-2"
                type="number"
                name="carrera"
                placeholder="Carrera"
                onChange=""
                required
              />
            </form>
          </div>
        </div>
      </div>
    );
}

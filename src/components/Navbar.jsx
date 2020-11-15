import React, { useContext } from 'react';
import { useEffect } from 'react';
import { AlumnosContext } from '../context/AlumnosContext';
import { AuthContext } from '../context/AuthContext';
import Config from '../utils/Config';
import Avatar from "../avatarHombre.png";
import logo from '../logow.png';
import insignia from '../Logo_UTEM.png';
import { PerfilContext } from '../context/PerfilContext';

export const Navbar = () => {
  const { guardarIsmounted } = useContext(AuthContext);
  const { idUsuario } = useContext(AlumnosContext);
  const {perfil} = useContext(PerfilContext)
  const {username, id} = perfil;
  useEffect(() => {
    guardarIsmounted(true);
  }, [guardarIsmounted]);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark alineado">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <a className="navbar-brand" href="/">
        <img src={logo} className="logo" alt="" />
        <img src={insignia} height={35} alt="" className="insignia"/>
      </a>

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ml-md-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              Inicio <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/reportes">
              Reportes
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="/alumnos"
              onClick={() => {
                localStorage.removeItem("carrera");
              }}
            >
              Alumnos
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle text-capitalize"
              href="!#"
              key={idUsuario}
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {" "}
              {username}{" "}
              <img
                className="rounded-circle"
                src={Avatar}
                alt="perfil"
                style={{ height: 30 }}
              />
            </a>

            <div
              className="dropdown-menu shadow"
              aria-labelledby="navbarDropdownMenuLink"
            >
              
              <a className="dropdown-item" href={`/perfil/${id}`}>
                Perfil
              </a>
              <a className="dropdown-item" href={Config.logoutPageUrl}>
                Cerrar sesion
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

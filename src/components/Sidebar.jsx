import React, { useContext } from 'react'
import { AlumnosContext } from '../context/AlumnosContext';
import { UserContext } from '../context/UserContext';
import Avatar from "../avatarHombre.png";
import { PerfilContext } from '../context/PerfilContext';

export const Sidebar = () => {

  const { idUsuario } = useContext(AlumnosContext);
  const { usuarios } = useContext(UserContext);
  const {perfil} = useContext(PerfilContext)
  const {id} = perfil;
    return (
      <nav
        id="sidebarMenu"
        className="col-md-3 col-lg-2 d-md-block bg-light shadow sidebar collapse"
      >
        <div className="sidebar-sticky pt-3">
          <ul className="nav flex-column">
            <li className="nav-item usuarioSidebar">
              {usuarios.data && idUsuario ? (
                usuarios.data
                  .filter((user) => user.id === idUsuario)
                  .map((usuario) => (
                    <a
                      className="nav-link text-capitalize"
                      href={`/perfil/${id}`}
                      key={idUsuario}
                    >
                      <img
                        className="rounded-circle logo mb-1"
                        src={Avatar}
                        alt="perfil"
                        style={{ height: 30 }}
                      />{" "}
                      {usuario.username}{" "}
                    </a>
                  ))
              ) : (
                <a
                  className="nav-link dropdown-toggle"
                  href="!#"
                  key={idUsuario}
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Tiempo de conexion agotado
                </a>
              )}
            </li>
            <li className="nav-item">
              <a className="nav-link text-secondary" href="/">
                <i className="fas fa-home mr-2" />
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-secondary"
                href="/alumnos"
                onClick={() => {
                  localStorage.removeItem("carrera");
                }}
              >
                <i className="fas fa-user-graduate mr-2" />
                Alumnos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-secondary" href="/academicos">
                <i className="fas fa-chalkboard-teacher mr-2" />
                Academicos
              </a>
            </li>
            

            <li className="nav-item">
              <a className="nav-link text-secondary" href="/sesaes">
                <i className="fas fa-briefcase-medical mr-2" />
                Sesaes
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link text-secondary" href="/reportes">
                <i className="fas fa-chart-bar mr-2" />
                Reportes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-secondary" href="/usuarios">
                <i className="fas fa-user-alt mr-2" />
                Funcionarios activos
              </a>
            </li>
            
            <li className="nav-item mt-4 pt-4">
              <a className="nav-link text-secondary" href={`/perfil/${id}`}>
                Perfil
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-secondary" href="https://www.reko.cl">
                Reko
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-secondary"
                href="https://www.academia.utem.cl"
              >
                Academia
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-secondary" href="!#">
                Acerca de
              </a>
            </li>
            <li className="nav-item mb-4 pb-4">
              <a className="nav-link text-secondary" href="/logout">
                Cerrar sesion
              </a>
            </li>
          </ul>
        </div>
      </nav>
      //     <aside class="col-12 col-md-2 p-0 bg-light">
      //     <nav class="navbar navbar-expand navbar-light bg-light flex-md-column flex-row align-items-start">
      //         <div class="collapse navbar-collapse">
      //             <ul class="flex-md-column flex-row navbar-nav w-100 justify-content-between">
      //                 <hr/>
      //                 <li class="nav-item">
      //                     <a class="nav-link pl-0" href="#">Link</a>
      //                 </li>
      //                 <li class="nav-item">
      //                     <a class="nav-link pl-0" href="#">Link</a>
      //                 </li>
      //                 <li class="nav-item">
      //                     <a class="nav-link pl-0" href="#">Link</a>
      //                 </li>
      //                 <li class="nav-item">
      //                     <a class="nav-link pl-0" href="#">Link</a>
      //                 </li>
      //                 <li class="nav-item">
      //                     <a class="nav-link pl-0" href="#">Link</a>
      //                 </li>
      //             </ul>
      //         </div>
      //     </nav>
      // </aside>
    );
}

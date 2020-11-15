import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AuthHandler from '../utils/AuthHandler';
import Config from '../utils/Config';
import logo from '../logo.png'


export const Login = () => {
  
  const {guardarIsmounted} = useContext(AuthContext);

  const [datos, setdatos] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    guardarIsmounted(false);
  }, [guardarIsmounted])

  const [loginStatus, guardarLoginStatus] = useState(0);

  const guardarDatos = (e) => {
    setdatos({ ...datos, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(datos);
    // guardarUsuario(datos.username);
    guardarLoginStatus(1);
    AuthHandler.login(datos.username, datos.password, handleAjaxResponse);
  };

  // captura un error
  const handleAjaxResponse = (data) => {
    if (data.error === false) {
      console.log("redireccionando");
      window.location = Config.homeUrl;
    } else {
      console.log("no redireccionando");
      guardarLoginStatus(4);
    }
  };
  // Si esta logueado no puede acceder al login
  if (AuthHandler.loggedIn()) {
    return <Redirect to={Config.homeUrl} />;
  }
  return (
    <div className="container">
      {/* Outer Row */}
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5 login">
            <div className="card-body p-0">
              {/* Nested Row within Card Body */}
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image " />
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">
                        Bienvenido a Folio Estudiantil
                      </h1>
                      <img src={logo} className="logo mb-5" alt=""/>
                    </div>
                    {loginStatus === 4 ? (
                      <div className="alert alert-danger">
                        <strong>Datos ingresados no corresponden</strong>
                      </div>
                    ) : null}
                    <form
                      onSubmit={handleSubmit}
                      className="user"
                      method="POST"
                    >
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          name="username"
                          id="id_username"
                          aria-describedby="emailHelp"
                          placeholder="Usuario"
                          onChange={guardarDatos}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          name="password"
                          id="id_password"
                          onChange={guardarDatos}
                          placeholder="Contraseña"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck"
                          >
                            Recuérdame
                          </label>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Acceder
                      </button>
                      <hr />
                      {/* <a href="index.html" class="btn btn-google btn-user btn-block">
                      <i class="fab fa-google fa-fw"></i> Login with Google
                    </a>
                    <a href="index.html" class="btn btn-facebook btn-user btn-block">
                      <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
                    </a> */}
                    </form>
                    <hr />
                    {/* <div class="text-center">
                    <a class="small" href="#">Forgot Password?</a>
                  </div>
                  <div class="text-center">
                    <a class="small" href="r#">Create an Account!</a>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

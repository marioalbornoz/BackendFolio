import React from 'react';
// import { Sidebar } from './components/Sidebar';
import { ContenrHome } from './pages/ContentHome';
import { Navbar } from './components/Navbar';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
// import { home } from './pages/home';
// import './components/sidebar'
import { Alumnos } from './pages/Alumnos';
import { Profesores } from './pages/Profesores';
import AlumnosProvider from './context/AlumnosContext';
import FolioProvider from './context/FolioContext';
import { Login } from './pages/Login';
import { PrivateRoute } from './utils/PrivateRoute';
import { Logout } from './pages/Logout';
import AuthProvider from './context/AuthContext';
import UserProvider from './context/UserContext';
import PerfilProvider from './context/PerfilContext';
import { Perfil } from './pages/Perfil';
import CarreraProvider from './context/CarreraContext';
import { Report } from './pages/Report';
import { Sesaes } from './pages/Sesaes';
import { Academicos } from './pages/Academicos';
import { NuevoUser } from './components/NuevoUser';
// import { Footer } from './components/Footer';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <CarreraProvider>
          <AlumnosProvider>
            <PerfilProvider>
              <UserProvider>
                <FolioProvider>
                  <Navbar />
                  <div className="container-fluid mb-4">
                    <div className="row">
                      <Sidebar />
                      <Switch>
                        <PrivateRoute
                          exact
                          path="/alumnos"
                          component={Alumnos}
                        />
                        <PrivateRoute
                          exact
                          path="/academicos"
                          component={Academicos}
                        />
                        <PrivateRoute
                          exact
                          path="/perfil/:id"
                          component={Perfil}
                        />
                        <PrivateRoute
                          exact
                          path="/sesaes"
                          component={Sesaes}
                        />
                        <PrivateRoute
                          exact
                          path="/reportes"
                          component={Report}
                        />
                        <PrivateRoute
                          exact
                          path="/usuarios"
                          component={Profesores}
                        />
                        <PrivateRoute
                          exact
                          path="/usuarios/agregar"
                          component={NuevoUser}
                        />
                        <PrivateRoute exact path="/" component={ContenrHome} />
                      </Switch>
                    </div>
                  </div>
                </FolioProvider>
              </UserProvider>
            </PerfilProvider>
          </AlumnosProvider>
          </CarreraProvider>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;

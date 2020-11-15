export function formatofecha(date) {
    const dato = date.split(".")[0];
    const fecha = dato.split("T")[0];
    const mes = fecha.split("-")[1];
    const anio = fecha.split("-")[0];
    const dia = fecha.split("-")[2];
    const hora = dato.split("T")[1];
    return [
      hora,
      "  ",
      dia,'/',
      mes,'/',
      anio
    ];
  }
export function ObtenerMes(date){
    const dato = date.split(".")[0];
    const fecha = dato.split("T")[0];
    const mes = fecha.split("-")[1];
    switch (mes) {
        case '1':
            return `enero`;
        case '2':
            return 'febrero';
        case '3':
            return `marzo`;
        case '4':
            return `abril`;
        case '5':
            return `mayo`;
        case '6':
            return `junio`;
        case '7':
            return 'julio';
        case '8':
            return `agosto`;
        case '9':
            return `septiembre`;
        case '10':
            return 'octubre';
        case '11':
            return `noviembre`;
        case '12':
            return `diciembre`;
    
        default:
            return '';
    }
}

export function ObtenerNumMes(date){
    const dato = date.split(".")[0];
    const fecha = dato.split("T")[0];
    const mes = fecha.split("-")[1];
    return mes-1;
}
// funcion que entrega las carreras por escuela
export function carreraPorEscuelas(escuela, carreras){
  const carreraescuela=carreras.filter( carrera => carrera.escuela === (escuela));
  return carreraescuela;
}
// funcion que entrega escuela por facultad
export function escuelasPorFacultad(escuelas, id){
  parseInt(id)
  console.log(id);
  const array = escuelas.filter(escuela => escuela.facultadid === id)
  return array;
}

export const rolUsuario = (rol) => {
    switch (rol) {
      case 1:
        return "Administrador";
      case 2:
        return "Decano";
      case 3:
        return "Director escuela";
      case 4:
        return "Jefe Carrera";
      case 5:
        return "Sesaes";
      case 6:
        return "Deporte";
      case 7:
        return "Academico";
      case 8:
        return "Otro";
      case 9:
        return "Bienestar";
      case undefined:
        return "No definido";
      default:
        return "No definido";
    }

}

export const carreraUsuario = (carrera) => {
    switch (carrera) {
      case 1:
        return "Informatica";
      case 2:
        return "Ing. Civil en Computacion";
      case 3:
        return "Ing. Civil en Ciencia de Datos";
      case 4:
        return "ninguna";
      case 5:
        return "Sesaes";
      case 6:
        return "Deporte";
      case 7:
        return "Academico";
      case 8:
        return "Otro";
      case 9:
        return "Bienestar";
      case undefined:
        return "No definido";
      default:
        return "No definido";
    }

}

export const facultadUsuario = (carrera) => {
  switch (carrera) {
    case 1:
      return "Informatica";
    case 2:
      return "Ing. Civil en Computacion";
    case 3:
      return "Director escuela";
    case 4:
      return "ninguna";
    case 5:
      return "Sesaes";
    case 6:
      return "Deporte";
    case 7:
      return "Academico";
    case 8:
      return "Otro";
    case 9:
      return "Bienestar";
    case undefined:
      return "No definido";
    default:
      return "No definido";
  }

}

export const colorTargetHistorial = (folio) => {
    let clase;
    const {priority_one, priority_two} = folio;
    if (priority_one===true) {
      clase = "alert alert-danger";
    } else if (priority_two === true ) {
      clase = "alert alert-warning";
    } else {
      clase = "alert alert-warning";
    }
    return clase;
  };

export const obtenerCarreraCodigo = (id) => {
  if (id) {
    localStorage.setItem("carrera", id);
  }
  return;
};
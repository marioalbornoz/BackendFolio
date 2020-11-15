import React, { useContext, useState } from 'react'
import { AlumnosContext } from '../context/AlumnosContext';
import Config from '../utils/Config';
import { FolioContext } from '../context/FolioContext';
import { useEffect } from 'react';


export const InputFolio = () => {
  // Utiliza useContext
  const { idUsuario } = useContext(AlumnosContext);
  const { indice, guardarActuaizar } = useContext(FolioContext);
  const [formulario, guardarForm] = useState("");

  //radio
  const [prioridad, guardarPrioridad] = useState({
    nivel:""
  });
  const [nivel1, guardarNivel1]= useState(false);
  const [nivel2, guardarNivel2] = useState(false);

  useEffect(() => {
    const mandarTrueFalse = () => {
      if (prioridad.nivel === "basico") {
        guardarNivel1(true);
        guardarNivel2(false);
      }
      if (prioridad.nivel === "medio") {
        guardarNivel2(true);
        guardarNivel1(false);
      }
    };
    mandarTrueFalse();
  }, [prioridad]);
  const enviarFormulario = async (e) => {
    e.preventDefault();
    // console.log(formulario, indice.id, idUsuario);
    const res = await fetch(Config.listFolios, {
      method: "POST",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        content: formulario,
        user: idUsuario,
        alumno: indice.id,
        priority_one:nivel1,
        priority_two:nivel2
      }),
    });
    const data = await res.json();
    guardarActuaizar(true);
    guardarForm("");
    console.log(data);
  };

  const leerHistoria = (e) => {
    guardarForm(e.target.value);
  };

  const obtenerPrioridad = (e) => {
    guardarPrioridad({...prioridad,
    [e.target.name]:e.target.value,})
  }

  return (
    <form onSubmit={enviarFormulario} className="input-group mb-3 h-200">
      <textarea
        type="text"
        name="content"
        id="content"
        value={formulario}
        onChange={leerHistoria}
        className="form-control inputfolio redondeado h-200"
        placeholder="Ingresa tu texto aqui"
        aria-label="Ingresa tu texto aqui"
        aria-describedby="basic-addon2"
      />
      <div className="check">
        <label className="lead">
          <input
            className="mx-1"
            type="radio"
            name="nivel"
            value="basico"
            checked={prioridad.nivel ==="basico"}
            onChange={obtenerPrioridad}
          />
          Prioridad 1
        </label>
        <label className="lead">
          <input
            className="mx-1"
            type="radio"
            name="nivel"
            value = "medio"
            checked={prioridad.nivel ==="medio"}
            onChange={obtenerPrioridad}
          />
          Prioridad 2</label>
      </div>
      <div className="input-group-append">
        <button className="btn btn-outline-secondary redondeado">Enviar</button>
      </div>
    </form>
  );
}

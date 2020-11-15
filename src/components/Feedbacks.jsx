import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { AlumnosContext } from '../context/AlumnosContext';
import { Spinner } from './Spinner';

export const Feedbacks = () => {
    const { idUsuario } = useContext(AlumnosContext);
    const [comentarios, guardarComentarios] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(loading){
            setTimeout(() => {
              alert(
                "gracias por tu comentario! Estamos trabajando para mejorar el sitio"
              );
            }, 4000);
        }
    }, [loading])
    const getInput = (e) => {
        guardarComentarios(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://127.0.0.1:8000/api/feedback/", {
          method: "POST",
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            comentario: comentarios,
            user: idUsuario,
          }),
        });
        
        setLoading(true);
        console.log(res);
        setTimeout(()=>{
            setLoading(false);
            guardarComentarios("");
        }, 3000)
        
    }
    return (!loading ? (
        <form onSubmit={handleSubmit}>
          <textarea name="feedback" id="feedback" onChange={getInput} value={comentarios}  className="form-control" required></textarea>
          <button className="btn btn-outline-primary btn-block">Enviar</button>
        </form>
      ):
      <Spinner />);
}

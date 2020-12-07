import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { CardPerfil } from '../components/CardPerfil';
import { Spinner } from '../components/Spinner';
import { PerfilContext } from '../context/PerfilContext';
import { UserContext } from '../context/UserContext';
export const Perfil = () => {
  
  const {usuarios} = useContext(UserContext)
  // perfil entrega datos de usuario log
  const { perfil } = useContext(PerfilContext);
   // estado que guarda la id desde la url para usarla en el use effect
  const [idurl, guardarId] = useState();
  //  Estado que guarda el bool si se va a editar
  const [editando, estaEditando] = useState(false);
  // Funcion booleana que indica si el boton editar se presiono 
  const handleEdit = (e) => {
    e.preventDefault();
    estaEditando(true);
  }
    
    useEffect(()=>{
      var URLactual = window.location.href;
      function obtenerid(URL){
        const id = URL.split("/")[4]
        guardarId(id);
      }
      obtenerid(URLactual);
      
    },[])

    const filtrado = usuarios.data ? usuarios.data.filter(usuario => usuario.id===parseInt(idurl)) : null;   
    return (
      <div className="col-lg-9 col-md-8 mt-5 perfil">
        <div className="row m-3 ml-5 pb-4 title">
          <h4 className="font-weight-bold mr-3">Perfil Usuario</h4>
          {
            perfil.id === parseInt(idurl) ? <button onClick={(e)=>handleEdit(e)} type="submit" className="btn btn-primary size">Editar <i className="fas fa-user-edit"></i></button> : null
          }
          
        </div>
        {filtrado ? filtrado.map((user) => (
          // !editando ? <CardPerfil user={user} key={user.id} />: null
          <CardPerfil perfil={perfil} user={user} key={user.id} editando={editando} estaEditando={estaEditando} id={idurl}/>
        )): <Spinner />}

      </div>
    );

}

  


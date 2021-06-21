import React, { useEffect, useState } from "react";
import styles from "../Styles/usuario.module.css";
import axios from "axios";

export default function EditarUsuario() {

  const data = localStorage.getItem('datosUsuario')

  const [Nombre, setNombre] = useState(JSON.parse(data).nombre);
  const [ApellidoPat, setApellidoPat] = useState(JSON.parse(data).apellidoPat);
  const [ApellidoMat, setApellidoMat] = useState(JSON.parse(data).apellidoMat);
  const [NombreUsuario, setnombreUsuario] = useState(JSON.parse(data).usuario);
  const [Contraseña, setContraseña] = useState(JSON.parse(data).contraseña);
  const [Correo, setCorreo] = useState(JSON.parse(data).correo);

  const putUsuario = async () => {
    await axios.put(`http://localhost:4000/api/usuario/${JSON.parse(data).id}`, {
      Nombre,
      ApellidoPat,
      ApellidoMat,
      Correo,
      NombreUsuario,
      Contraseña,
    });
    window.location = '/';
  }

    return (
        <div>
          <div className={styles.tablaUsuarios}> 
          <form>
            <div className="mb-3">
              <label> Nombre </label>
              <input type="text" id="nombre" value={Nombre} onChange={(e) => {setNombre(e.target.value)}}></input>
            </div>
            <div className="mb-3">
              <label> apellidoPat </label>
              <input type="text" id="apellidoPat" value={ApellidoPat} onChange={(e) => {setApellidoPat(e.target.value)}}></input>
            </div>
            <div className="mb-3">
              <label> apellidoMat </label>
              <input type="text" id="apellidoMat" value={ApellidoMat} onChange={(e) => {setApellidoMat(e.target.value)}}></input>
            </div>
            <div className="mb-3">
              <label> correo </label>
              <input type="text" id="correo" value={Correo} onChange={(e) => {setCorreo(e.target.value)}}></input>
            </div>
            <div className="mb-3">
              <label> usuario </label>
              <input type="text" id="usuario" value={NombreUsuario} onChange={(e) => {setnombreUsuario(e.target.value)}}></input>
            </div>
            <div className="mb-3">
              <label> contraseña </label>
              <input type="text" id="contraseña" value={Contraseña} onChange={(e) => {setContraseña(e.target.value)}}></input>
            </div>
            <button onClick={() => putUsuario()}>Submit</button>
          </form>
          <a href='/'><button type="submit" className="btn btn-primary">Regresar</button></a>
        </div>
        </div>
    )
}

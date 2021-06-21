import React, { useEffect, useState } from "react";
import styles from "../Styles/usuario.module.css";
import axios from "axios";

export default function Usuario() {
  const [usuarios, setusuarios] = useState([
    {
      id: "",
      nombre: "",
      apellidoPat: "",
      apellidoMat: "",
      correo: "",
      usuario: "",
      contraseña: "",
    },
  ]);

  const [Nombre, setNombre] = useState('');
  const [ApellidoPat, setApellidoPat] = useState('');
  const [ApellidoMat, setApellidoMat] = useState('');
  const [NombreUsuario, setnombreUsuario] = useState('');
  const [Contraseña, setContraseña] = useState('');
  const [Correo, setCorreo] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const data = await axios.get("http://localhost:4000/api/usuario/");
    setusuarios(data.data);
  }, []);

  const postUsuario = async (nombre, apellidoPat, apellidoMat, correo, usuario, contraseña) => {
    await axios.post("http://localhost:4000/api/usuario", {
      nombre,
      apellidoPat,
      apellidoMat,
      correo,
      usuario,
      contraseña,
    });
    window.location = '/';
  }

  const deleteUsuario = async (id) => {
    await axios.delete(`http://localhost:4000/api/usuario/${id}`);
    window.location = '/';
  }

  return (
    <div>
      <div className={styles.tablaUsuarios}> 
          <form onSubmit={() => postUsuario(Nombre, ApellidoPat, ApellidoMat, Correo, NombreUsuario, Contraseña)}>
            <div className="mb-3">
              <label> Nombre </label>
              <input type="text" class="form-control" id="nombre" value={Nombre} onChange={(e) => {setNombre(e.target.value)}}></input>
            </div>
            <div className="mb-3">
              <label> apellidoPat </label>
              <input type="text" class="form-control" id="apellidoPat" value={ApellidoPat} onChange={(e) => {setApellidoPat(e.target.value)}}></input>
            </div>
            <div className="mb-3">
              <label> apellidoMat </label>
              <input type="text" class="form-control" id="apellidoMat" value={ApellidoMat} onChange={(e) => {setApellidoMat(e.target.value)}}></input>
            </div>
            <div className="mb-3">
              <label> correo </label>
              <input type="text" class="form-control" id="correo" value={Correo} onChange={(e) => {setCorreo(e.target.value)}}></input>
            </div>
            <div className="mb-3">
              <label> usuario </label>
              <input type="text" class="form-control" id="usuario" value={NombreUsuario} onChange={(e) => {setnombreUsuario(e.target.value)}}></input>
            </div>
            <div className="mb-3">
              <label> contraseña </label>
              <input type="text" class="form-control" id="contraseña" value={Contraseña} onChange={(e) => {setContraseña(e.target.value)}}></input>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      <div className={styles.tablaUsuarios}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">nombre</th>
              <th scope="col">apellidoPat</th>
              <th scope="col">apellidoMat</th>
              <th scope="col">correo</th>
              <th scope="col">usuario</th>
              <th scope="col">contraseña</th>
              <th scope="col">Archivos</th>
              <th scope="col">Editar</th>
              <th scope="col">Borrar</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((data) => {
              return (
                <tr>
                  <th scope="row">1</th>
                  <td>{data.nombre}</td>
                  <td>{data.apellidoPat}</td>
                  <td>{data.apellidoMat}</td>
                  <td>{data.correo}</td>
                  <td>{data.usuario}</td>
                  <td>{data.contraseña}</td>
                  <td><a href='/Archivos/' onClick={() => {localStorage.setItem('idUsuario', data._id)}} > Ver </a></td>
                  <td><a href='/EditarUsuario/' onClick={() => {
                    let userData = {
                      id: data._id,
                      nombre: data.nombre,
                      apellidoPat: data.apellidoPat,
                      apellidoMat: data.apellidoMat,
                      correo: data.correo,
                      usuario: data.usuario,
                      contraseña: data.contraseña,
                    } 
                    localStorage.setItem('datosUsuario', JSON.stringify(userData))}}><button> Editar </button></a></td>
                  <td><button onClick={() => deleteUsuario(data._id)}> Borrar </button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

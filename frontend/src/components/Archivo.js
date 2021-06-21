import React, {useEffect, useState} from 'react';
import styles from "../Styles/usuario.module.css";
import axios from "axios";

export default function Archivo() {
  const [archivos, setarchivos] = useState([
    {
      id: "",
      key: "",
      usuarioId: "",
      type: "",
      nombreOriginal: "",
    },
  ]);

  const [File, setFile] = useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const idLocal = localStorage.getItem('idUsuario');
    const data = await axios.get(`http://localhost:4000/api/archivo/${idLocal}`);
    setarchivos(data.data);
  }, []);

  const subirArchivo = async () => {
    const idLocal = localStorage.getItem('idUsuario');
    const data = new FormData();
    data.append("file", File);
    console.log(File);
    await axios.post(`http://localhost:4000/api/archivo/s3/${idLocal}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    window.location = '/Archivos';
  }

  const deleteArchivo = async (key) => {
    console.log(key);
    await axios.delete('http://localhost:4000/api/archivo/', {
      data: {
        key
      }
    });
    window.location = '/Archivos';
  }

    return (
      <div>
        <div className={styles.tablaUsuarios}>
        <div>
          <div className="mb-3">
            <label className="form-label">Ingrese su Archivo</label>
            <input type="file" className="form-control" onChange={(e) => {setFile(e.target.files[0])}}></input>
          </div>
          <button className="btn btn-primary" onClick={()=> subirArchivo()}>Submit</button>
        </div>
        </div>
        <div className={styles.tablaUsuarios}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">IdUsuario</th>
                <th scope="col">key</th>
                <th scope="col">nombreOriginal</th>
                <th scope="col">Tipo</th>
                <th scope="col">Editar</th>
                <th scope="col">Borrar</th>
              </tr>
            </thead>
            <tbody>
              {archivos.map((data) => {
                return (
                  <tr>
                    <th scope="row">1</th>
                    <td>{data.usuarioId}</td>
                    <td>{data.key}</td>
                    <td>{data.nombreOriginal}</td>
                    <td>{data.type}</td>
                    <td><a href='/EditarArchivo' onClick={() => {
                      let referenciaCambios = {
                        key: data.key,
                        nombreOriginal: data.nombreOriginal
                      };
                      localStorage.setItem('datosArchivo', JSON.stringify(referenciaCambios))}}> Editar </a></td>
                    <td><button onClick={() => deleteArchivo(data.key)}> Borrar </button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
}

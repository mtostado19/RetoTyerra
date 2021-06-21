import React, {useState} from 'react';
import styles from "../Styles/usuario.module.css";
import axios from "axios";

export default function EditarArchivo() {

  const [NombreOriginal, setNombreOriginal] = useState({});

  const patchArchivo = async () => {
    const idLocal = localStorage.getItem('idUsuario');
    const data = localStorage.getItem('datosArchivo')
    await axios.patch(`http://localhost:4000/api/archivo/${idLocal}`, {
      key: JSON.parse(data).key,
      nombreOriginal: NombreOriginal,
    })
    window.location = '/Archivos';
  };

    return (
        <div>
          <div className={styles.tablaUsuarios}> 
          <form>
            <div className="mb-3">
              <label> Nombre </label>
              <input type="text" id="nombreOriginal" value={NombreOriginal} onChange={(e) => {setNombreOriginal(e.target.value)}}></input>
            </div>
            <button onClick={() => patchArchivo()}>Submit</button>
          </form>
          <a href='/'><button type="submit" className="btn btn-primary">Regresar</button></a>
        </div>
        </div>
    )
}

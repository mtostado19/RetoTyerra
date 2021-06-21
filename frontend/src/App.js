import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Usuario from './components/Usuario';
import Archivo from './components/Archivo';
import EditarUsuario from './components/EditarUsuario';
import EditarArchivo from './components/EditarArchivo';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Usuario} />
        <Route path="/Archivos" exact component={Archivo} />
        <Route path="/EditarArchivo" exact component={EditarArchivo} />
        <Route path="/EditarUsuario" exact component={EditarUsuario} />
      </Switch>
    </Router>
  );
}

export default App;
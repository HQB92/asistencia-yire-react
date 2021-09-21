import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Footer from './components/footer';
import { Container } from 'react-bootstrap';
import AsisAlumno from './components/asis-alumno'
import Pregunta from './components/preguntaAsistencia';
import Navegacion from './components/navegacion';
function App() {
  return (
    <Container fluid className="body-panddin">
      <Router>
      <Navegacion></Navegacion>
        <Switch>
          <Route exact path='/'>
            <AsisAlumno></AsisAlumno>
          </Route>
          <Route path='/pregunta/:rut'>
            <Pregunta></Pregunta>
          </Route>
        </Switch>
        <Footer></Footer>
      </Router>
    </Container>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/footer';
import { Container } from 'react-bootstrap';
import AsisAlumno from './components/inicio/asis-alumno';
import Pregunta from './components/pregunta/preguntaAsistencia';
import Navegacion from './components/navegacion';
import { Modal } from 'react-bootstrap';
import Validacion from '../src/components/pregunta/validacion.js';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState(true);

  function emptyCache(){
    if('caches' in window){
    caches.keys().then((names) => {
            names.forEach(name => {
                caches.delete(name);
                setCache(false);
            })
            
        });
        setCache(false)
        window.location.reload(false);
    }
  }  

  useEffect(() => {
    setCache(true)
  }, []);

  return (
    cache ? setCache(false):
    <Container fluid className="body-panddin">
      <Router>
        <Navegacion></Navegacion>
        <Switch>
          <Route exact path='/'>
            <AsisAlumno
              loading={loading}
              setLoading={setLoading}
            />
          </Route>
          <Route path='/pregunta/:rut'>
            <Pregunta
              loading={loading}
              setLoading={setLoading}
            />
          </Route>
        </Switch>
        <Footer></Footer>
      </Router>
      <Modal
        show={loading}
        onHide={() => setLoading(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Cargando...
                </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Validacion />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default App;


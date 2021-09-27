import React, { useState } from 'react';
import{Link} from 'react-router-dom'
import { Form, Container, Row, Col} from 'react-bootstrap';
import Button from '@restart/ui/esm/Button';

const AsisAlumno= () =>{
    const [rut, rutAlumno]= useState('');

    const rutChange = e =>{
        rutAlumno(e.target.value);
    };

    return(
        <Container fluid="md" className="justify-content-md-center barra-login">
            <Row className="justify-content-md-center barra-login">
                <Col md="auto"> <h3>Asistencia Presencial a Clase Octubre</h3></Col>
            </Row>
            <Row >
                <Col xs={2} md={2}></Col>
                  <Col xs={8} md={8} >
                    <Form>
                        <Form.Group className="mb-5" >
                            <Form.Label>Ingresear Rut Alumno</Form.Label>
                            <Form.Control type="text" id="rut" name="rut" placeholder="11111111-1" onChange={rutChange}/>
                        </Form.Group>
                    </Form>
                    <Button to={`/pregunta/${rut}`} className="button btn btn-primary">Ingresar</Button>
                </Col>
                <Col xs={4} md={2}></Col>
            </Row>
        </Container>
    )
}

export default AsisAlumno;
import React, { useState } from 'react';
import { withRouter, history } from 'react-router-dom'
import { Form, Container, Row, Col, Alert, Button } from 'react-bootstrap';


const AsisAlumno = ({ setLoading, history }) => {

    const [rut, rutAlumno] = useState('');
    const [error, setError] = useState(false);

    const rutChange = e => {
        rutAlumno(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!!rut) {
            setLoading(true);
            setError(false)
            history.push(`/pregunta/${rut}`);
        } else {
            setError(true)
        }
    }
    return (
        <Container fluid="md" className="justify-content-md-center barra-login">
            <Row className="justify-content-md-center barra-login">
                <Col md="auto"> <h3>Asistencia Presencial a Clase Octubre</h3></Col>
            </Row>
            <Row >
                <Col xs={2} md={2}></Col>
                <Col xs={8} md={8} >
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-5" >
                            <Form.Label>Ingresear Rut Alumno</Form.Label>
                            <Form.Control type="text" id="rut" name="rut" placeholder="11111111-1" onChange={rutChange} />
                        </Form.Group>
                        <Button type={"submit"}>Ingresar</Button>
                    </Form>
                        {error && <Alert variant='danger'>
                        <span>Error, debe ingresar el rut del alumno.</span>
                        </Alert>}
                </Col>
                <Col xs={4} md={2}></Col>
            </Row>
        </Container>
    )
}

export default withRouter(AsisAlumno);

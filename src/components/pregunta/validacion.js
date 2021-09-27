import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';

const Validacion= (props) =>{
    return(
            <Container fluid="md" className="justify-content-md-center barra-login">
                <Row className="justify-content-md-center barra-login">
                    <Col md="auto"> <h2>{props.titulo}</h2></Col>
                </Row>
                <Row className="justify-content-md-center barra-login">
                    <Col md="auto"> <h5>{props.mensaje}</h5></Col>
                </Row>
            </Container>
    )
}
export default Validacion;
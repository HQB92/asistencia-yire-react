import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'

const Validacion= () =>{
    return(
            <Container fluid="md" className="justify-content-md-center barra-login">
                <Row className="justify-content-md-center barra-login">
                <Col xs={1} md={3}></Col>
                    <Col xs={10} md={6} >
                    <Spinner animation="border" className="spiner_hugo" variant="warning"  style={{ width: '3rem', height: '3rem' }} ></Spinner> 
                    </Col>    
                    <Col xs={1} md={3}></Col>
                </Row>
                <Row className="justify-content-md-center barra-login">
                    <h5>Cargando datos...</h5>
                </Row>
               
    
            </Container>
    )
}
export default Validacion;
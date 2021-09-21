import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { Form, Container, Button, Row, Col} from 'react-bootstrap';
import { Link } from '@material-ui/core';

const Pregunta= () =>{

    const [alumno, setAlumno] = useState([]);
    let rutalumno = useParams();
    const datosAPI = async(setAlumno)=>{
        const data = await fetch(`https://portal.yireliceo.com/obtener_alumno_rut.php?rut=${rutalumno.rut}`)
        const datoalumno = await data.json();
        setAlumno(datoalumno);
    }
    useEffect(() => {
        const aux = datosAPI(setAlumno)
    },[]);

    const [carga, setCarga] = useState({
        rut: rutalumno.rut,
        respuesta:''
    })
    const cambioRespuesta = e =>{
        setCarga({
            ...carga,
            [e.target.name]: e.target.value
        });
    }

    const enviarAPI = async(e)=>{
        e.preventDefault();
        const cargaUtil = JSON.stringify(carga);
        const resSql = await fetch(`https://portal.yireliceo.com/guardar_respuesta_alumno.php`,{
            method: "POST",
            body: cargaUtil
        });
        const exitoso = await resSql.json();
        console.log(exitoso)
        if(exitoso){
            console.log("Guardado");
        }else{
            console.log("Error");
        }
    }
    return(
        alumno.rut ?
            !alumno.respuesta  ?
            <Container fluid="md" className="justify-content-md-center barra-login">
                <Row className="justify-content-md-center barra-login">
                    <Col md="auto"> <h2>Asistencia Presencial a Clase</h2></Col>
                </Row>
                <Row >
                    <Col xs={2} md={2}></Col>
                    <Col xs={8} md={8} >
                        <Form onSubmit={enviarAPI}>
                            <Form.Group className="mb-4" >
                                <Form.Label>Nombres</Form.Label>
                                <Form.Control className="bloqueo" disabled type="text" value={alumno.nombre}/>
                            </Form.Group>
                            <Form.Group className="mb-4" >
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control className="bloqueo" disabled type="text" value={alumno.apellidos}/>
                            </Form.Group>
                            <Form.Group className="mb-4" >
                                <Form.Label>Rut</Form.Label>
                                <Form.Control className="bloqueo" disabled type="text" value={alumno.rut} name="rut" onChange={cambioRespuesta}/>
                            </Form.Group>
                            <Form.Group className="mb-4" >
                                <Form.Label>Curso</Form.Label>
                                <Form.Control className="bloqueo" disabled type="text" value={alumno.curso}/>
                            </Form.Group>
                            <Row className="justify-content-md-center ">
                                <Col md="auto"> <h4>¿El Alumno asistira presencialmente al establecimiento?</h4></Col>
                                <fieldset>
                                    <Form.Group as={Row} className="mb-6">
                                    <Form.Label as="legend" column sm={2}>
                                    </Form.Label>
                                    <Col sm={1} >
                                        <Form.Check
                                        type="radio"
                                        label="SI"
                                        name="respuesta"
                                        value="SI"
                                        checked={alumno.respuesta === "SI" ? true:false}
                                        onChange={cambioRespuesta}
                                        />
                                        <Form.Check
                                        type="radio"
                                        label="NO"
                                        name="respuesta"
                                        value="NO"
                                        checked={alumno.respuesta === "NO" ? true:false}
                                        onChange={cambioRespuesta}
                                        />
                                    </Col>
                                    </Form.Group>
                                </fieldset>
                                <Row >
                                    <Link to="www.yirelice.com"className="btn btn-primary" onClick={enviarAPI} href="">Guardar</Link>
                                </Row>
                            </Row>
                        </Form>
                    </Col>
                    <Col xs={4} md={2}></Col>
                </Row>
            </Container>
            :
            <Container fluid="md" className="justify-content-md-center barra-login">
                <Row className="justify-content-md-center barra-login">
                    <Col md="auto"> <h2>Respuesta ya registrada</h2></Col>
                </Row>
                <Row className="justify-content-md-center barra-login">
                    <Col md="auto"> <h5>para cambiar su respuesta comunicarse con su profesor jefe</h5></Col>
                </Row>
            </Container>
        :
        <Container fluid="md" className="justify-content-md-center barra-login">
            <Row className="justify-content-md-center barra-login">
                <Col md="auto"> <h2>RUT INVALIDO</h2></Col>
            </Row>
            <Row className="justify-content-md-center barra-login">
                <Col md="auto"> <h5>ERROR RUT MAL INGRESADO</h5></Col>
            </Row>
        </Container>
    )
}

export default Pregunta;
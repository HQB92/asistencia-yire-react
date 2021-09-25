import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { Form, Container, Button, Row, Col, Toast, ToastContainer} from 'react-bootstrap';

const Pregunta= () =>{

    const [alumno, setAlumno] = useState([]);
    let rutalumno = useParams();
    const datosAPI = async(setAlumno)=>{
        const data = await fetch(`https://portal.yireliceo.com/API/obtener_alumno_rut.php?rut=${rutalumno.rut}`);
        const datoalumno = await data.json();
        setAlumno(datoalumno);
        
    }
    useEffect(() => {
        const aux = datosAPI(setAlumno)
        toast.variante='warning';
        toast.mensaje="Falta responder pregunta";
        toast.titulo="Advertencia";
        setShow(true);
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
    const [show, setShow] = useState(false);
    const [toast, setToast] = useState({
        variante:'',
        mensaje:'',
        titulo:''
    })
    const enviarAPI = async(e)=>{
        if(carga.respuesta === "SI" || carga.respuesta === "NO"){
            e.preventDefault();
            const cargaUtil = JSON.stringify(carga);
            const resSql = await fetch(`https://portal.yireliceo.com/API/guardar_respuesta_alumno.php`,{
                method: "POST",
                body: cargaUtil
            });
            const exitoso = await resSql.json();
            if(exitoso){
                toast.variante='success';
                toast.mensaje="Datos Guardado Exitosamente";
                toast.titulo="Guardado";
                setShow(true);
                setTimeout(redireccionarPagina(),6000);
            }else{
                toast.variante='danger';
                toast.mensaje="Error al intentar guardar los datos";
                toast.titulo="ERROR";
                setShow(true);
            }
        }
    }
    function redireccionarPagina() {
        window.location = "https://www.yireliceo.com";
      }

    return(
        alumno.rut ?
        !alumno.respuesta || alumno.respuesta === "" ?
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
                                    <Form.Group as={Row} className="mb-6">
                                        <Form.Label as="legend" column sm={2}>
                                        </Form.Label>
                                        <Form.Control as="select" name="respuesta"  onChange={cambioRespuesta}  >
                                            <option value="vacio"> </option>
                                            <option value="SI">SI</option>
                                            <option value="NO">NO</option>
                                        </Form.Control>
                                    </Form.Group>
                                <Row >
                                    <Button  type="submit">Guardar</Button>
                                </Row>
                            </Row>
                        </Form>
                    </Col>
                    <Col xs={4} md={2}></Col>
                </Row>
                    <ToastContainer position="bottom-center" className="p-3">
                        <Toast bg={toast.variante} onClose={() => setShow(false)} show={show} delay={5000} autohide>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">{toast.titulo}</strong>
                            <small className="text-muted">Ahora</small>
                        </Toast.Header>
                        <Toast.Body >{toast.mensaje}</Toast.Body>
                        </Toast>
                    </ToastContainer>
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
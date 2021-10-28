import React, { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom'
import { Form, Container, Button, Row, Col, Toast, ToastContainer} from 'react-bootstrap';


const Pregunta = ({ loading: loadingContext, setLoading: setLoadingContext, history }) => {
    const [apiCalled, setApiCalled] = useState(false);
    const [alumno, setAlumno] = useState(undefined);
    let rutalumno = useParams();
    const datosAPI = async (setAlumno) => {
        try {
            const data = await fetch(`https://portal.yireliceo.com/API/obtener_alumno_rut.php?rut=${rutalumno.rut}`);
            const datoalumno = await data.json();
            setAlumno(datoalumno);
            setApiCalled(true)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {

        if (!!alumno && apiCalled) {
            setLoadingContext(false)
            if(alumno.respuesta !== null){
                toast.variante = 'primary';
                toast.mensaje = "Usted ya respondio la encuesta";
                toast.titulo = "Respuesta";
                setShow(true);
                setTimeout(redireccionarPagina(),5000);
            }
        } else {
            if (apiCalled) {
                setLoadingContext(false)
                toast.variante = 'danger';
                toast.mensaje = "Alumno no existe en la base de datos";
                toast.titulo = "ERROR";
                setShow(true);
                setTimeout(redireccionarPagina2(),5000);
            }
        }
    }, [alumno, apiCalled])
    useEffect(() => {
        // setLoanding(true);
        datosAPI(setAlumno)
        // setTimeout((() => { setLoanding(false) }), 5000)
        toast.variante = 'warning';
        toast.mensaje = "Solo podra responder una sola vez por mes";
        toast.titulo = "Advertencia";
        setShow(true);
    }, []);

    const [carga, setCarga] = useState({
        rut: rutalumno.rut,
        respuesta: ''
    });

    const cambioRespuesta = e => {
        setCarga({
            ...carga,
            [e.target.name]: e.target.value
        });
    }

    const [show, setShow] = useState(false);
    const [toast, setToast] = useState({
        variante: '',
        mensaje: '',
        titulo: ''
    });

    const enviarAPI = async (e) => {
        e.preventDefault();
        if (carga.respuesta === "SI" || carga.respuesta === "NO") {
            const cargaUtil = JSON.stringify(carga);
            const resSql = await fetch(`https://portal.yireliceo.com/API/guardar_respuesta_alumno.php`, {
                method: "POST",
                body: cargaUtil
            });
            const exitoso = await resSql.json();
            if (exitoso) {
                toast.variante = 'success';
                toast.mensaje = "Datos Guardado Exitosamente";
                toast.titulo = "Guardado";
                setShow(true);
                await setTimeout(redireccionarPagina(), 5000);
            } else {
                toast.variante = 'danger';
                toast.mensaje = "Error al intentar guardar los datos,por favor intente nuevamente";
                toast.titulo = "ERROR";
            }
        } else {
            toast.variante = 'warning';
            toast.mensaje = "Falta responder pregunta";
            toast.titulo = "Advertencia";
            setShow(true);
        }
    }

    function redireccionarPagina() {
        window.location = "https://www.yireliceo.com";
    }
    function redireccionarPagina2() {
        window.location = "/";
    }

    return (
        !loadingContext &&
        (
                <Container fluid="md" className="justify-content-md-center barra-login">
                    <Row className="justify-content-md-center barra-login">
                        <Col md="auto"> <h3>Asistencia Presencial a Clase</h3></Col>
                    </Row>
                    <Row >
                        <Col xs={1} md={3}></Col>
                        <Col xs={10} md={6} >
                            <Form onSubmit={enviarAPI}>
                                <Form.Group className="mb-4" >
                                    <Form.Label>Nombres</Form.Label>
                                    <Form.Control className="bloqueo" disabled type="text" value={alumno.nombre} />
                                </Form.Group>
                                <Form.Group className="mb-4" >
                                    <Form.Label>Apellidos</Form.Label>
                                    <Form.Control className="bloqueo" disabled type="text" value={alumno.apellidos} />
                                </Form.Group>
                                <Form.Group className="mb-4" >
                                    <Form.Label>Rut</Form.Label>
                                    <Form.Control className="bloqueo" disabled type="text" value={alumno.rut} name="rut" onChange={cambioRespuesta} />
                                </Form.Group>
                                <Form.Group className="mb-4" >
                                    <Form.Label>Curso</Form.Label>
                                    <Form.Control className="bloqueo" disabled type="text" value={alumno.curso} />
                                </Form.Group>
                                <Col> <h5>¿El Alumno asistira presencialmente al establecimiento?</h5></Col>
                                <Form.Group className="mb-4">
                                    <Form.Label as="legend" >
                                    </Form.Label>
                                    <Form.Control as="select" name="respuesta" onChange={cambioRespuesta}  >
                                        <option value="vacio"> </option>
                                        <option value="SI">SI</option>
                                        <option value="NO">NO</option>
                                    </Form.Control>
                                </Form.Group>
                                <Button type="submit">Guardar</Button>
                            </Form>
                        </Col>
                        <Col xs={1} md={3}></Col>
                    </Row>
                    <ToastContainer position="middle-center" className="p-3">
                        <Toast bg={toast.variante} onClose={() => setShow(false)} show={show} delay={5000} autohide>
                            <Toast.Header>
                                <strong className="me-auto">{toast.titulo}</strong>
                                <small className="text-muted">Ahora</small>
                            </Toast.Header>
                            <Toast.Body className="toasttext" >{toast.mensaje}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                </Container>
        )
    )
}

export default withRouter(Pregunta);

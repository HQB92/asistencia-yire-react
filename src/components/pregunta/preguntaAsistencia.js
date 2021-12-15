import React, { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom'
import { FormControl, Container, InputGroup, Row, Col, Toast, Form , ToastContainer, Button} from 'react-bootstrap';



const Pregunta = ({ loading: loadingContext, setLoading: setLoadingContext, history }) => {
    const [apiCalled, setApiCalled] = useState(false);
    const [alumno, setAlumno] = useState(undefined);
    const [datosGenera, setDatosGenera]=useState({
         rut:'' ,
         nombre_alumno:'' ,
         apellidoP_alumno:'' ,
         apellidoM_alumno:'' ,
         Sexo:'',
         fechaNacimiento_alumno:'' ,
         edad_alumno:'' ,
         direccion_alumno : '' ,
         comuna : '' ,
         enfermedad_cronica : '' ,
         medicamento_tratamiento : '' ,
         alergico : '' ,
         establecimineto_procedencia : '' ,
         fecha_ingreso_establecimineto : '' ,
         pie : '' ,
         curso_repetido : '' ,
         causlaes_repetir : '' ,
         rut_padre : '' ,
         nombreCompleto_padre : '' ,
         fechaNacimiento_padre : '' ,
         telefono_padre : '' ,
         estudios_padre : '' ,
         ocupacion_padre : '' ,
         rut_madre : '' ,
         nombreCompleto_madre : '' ,
         fechaNacimiento_madre : '' ,
         telefono_madre : '' ,
         estudios_madre : '' ,
         ocupacion_madre : '' ,
         rut_titular : '' ,
         nombreCompleo_titular : '' ,
         domicilio_titular : '' ,
         telefono_titular : '' ,
         rut_suplente : '' ,
         nombreCompleo_suplente : '' ,
         domicilio_suplente : '' ,
         telefono_suplente : '' ,
         llamado_emergencia:'',
         segurop_privado:'',
         derivacion_centrosalud:'',
         curso:''
    })

    const handleData =  (e) =>{
        setDatosGenera({
            ...datosGenera,
            [e.target.name]: e.target.value
        });
    }
    let rutalumno = useParams();
    const datosAPI = async (setAlumno) => {
        try {
            const data = await fetch(`https://yireliceo.com/portal/API/obtener_alumno_rut_matricula.php?rut=${rutalumno.rut}`);
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
                toast.mensaje = "Usted ya Guardo sus datos";
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
         // eslint-disable-next-line
    }, [datosGenera, apiCalled])
    useEffect(() => {
        datosAPI(setAlumno)
        toast.variante = 'warning';
        toast.mensaje = "Solo podra responder una sola vez.";
        toast.titulo = "Advertencia";
        setShow(true);
         // eslint-disable-next-line
    }, []);

    const [show, setShow] = useState(false);
    const [toast,] = useState({
        variante: '',
        mensaje: '',
        titulo: ''
    });

    const enviarAPI = async (e) => {
        e.preventDefault();
        if (datosGenera.rut_madre !== "" || datosGenera.rut_padre !== "") {
            const cargaUtil = JSON.stringify(datosGenera);
            const resSql = await fetch(`https://portal.yireliceo.com/API/guardar_matricula.php`, {
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
            toast.mensaje = "Falta rellenar los campos de Padre o Madre";
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
                <Form onSubmit={enviarAPI}>
                    <Row className="justify-content-md-center barra-login">
                        <Col md="auto"> <h3>Confirmación Matrícula 2022</h3></Col>
                    </Row>
                    <Row >
                        <h4> I-. Datos Alumno(a)</h4>
                    </Row>
                    <Row>
                        <Col>
                            <InputGroup >
                                <InputGroup.Text id="">Apellido Paterno</InputGroup.Text>
                                    <FormControl
                                    name='apellidoP_alumno'
                                    className="text-uppercase"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={handleData}
                                    />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup className="">
                            <InputGroup.Text id="">Apellido Materno</InputGroup.Text>
                                <FormControl
                                name='apellidoM_alumno'
                                className="text-uppercase"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={handleData}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <InputGroup className="">
                            <InputGroup.Text id="">Nombres</InputGroup.Text>
                                <FormControl
                                name='nombre_alumno'
                                className="text-uppercase"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={handleData}
                                />
                        </InputGroup>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <InputGroup className="">
                                <InputGroup.Text id="">Sexo</InputGroup.Text>
                                <select className="form-select select_matricula" aria-label="Username" name='Sexo'
                                aria-describedby="basic-addon1" onChange={handleData} >
                                    <option> </option>
                                    <option>Hombre</option>
                                    <option>Mujer</option>
                                </select>
                            </InputGroup>
                        </Col>
                        <Col md={3}>
                            <InputGroup className="">
                            <InputGroup.Text id="">Rut</InputGroup.Text>
                                <FormControl
                                name='rut'
                                className="text-uppercase"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={handleData}
                                />
                            </InputGroup>
                        </Col>
                        <Col md={3}>
                            <InputGroup className="">
                            <InputGroup.Text id="">Fecha Nacimeinto</InputGroup.Text>
                                <FormControl
                                name='fechaNacimiento_alumno'
                                className="text-uppercase"
                                aria-label="Username"
                                type='date'
                                aria-describedby="basic-addon1"
                                onChange={handleData}
                                />
                            </InputGroup>
                        </Col>
                        <Col md={3}>
                            <InputGroup className="">
                            <InputGroup.Text id="">Edad</InputGroup.Text>
                                <FormControl
                                name='edad_alumno'
                                className="text-uppercase"
                                aria-label="Username"
                                type='number'
                                aria-describedby="basic-addon1"
                                onChange={handleData}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={8}>
                            <InputGroup className="">
                            <InputGroup.Text id="">Dirección</InputGroup.Text>
                                <FormControl
                                name='direccion_alumno'
                                className="text-uppercase"
                                aria-label="Username"
                                type='text'
                                aria-describedby="basic-addon1"
                                onChange={handleData}
                                />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup className="">
                            <InputGroup.Text id="">Comuna</InputGroup.Text>
                                <select className="form-select select_matricula" aria-label="Username" name='comuna'
                                aria-describedby="basic-addon1" onChange={handleData} >
                                    <option> </option>
                                    <option>COIHUECO</option>
                                </select>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <InputGroup className="">
                            <InputGroup.Text id="">Tiene o ha tenido alguna enfermedad crónica</InputGroup.Text>
                                <FormControl
                                name='enfermedad_cronica'
                                className="text-uppercase"
                                aria-label="Username"
                                type='text'
                                aria-describedby="basic-addon1"
                                onChange={handleData}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <InputGroup className="">
                            <InputGroup.Text id="">Tiene algún medicamento o tratamiento especifico</InputGroup.Text>
                                <FormControl
                                name='medicamento_tratamiento'
                                className="text-uppercase"
                                aria-label="Username"
                                type='text'
                                aria-describedby="basic-addon1"
                                onChange={handleData}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <InputGroup className="">
                            <InputGroup.Text id="">Es alérgico</InputGroup.Text>
                                <FormControl
                                name='alergico'
                                className="text-uppercase"
                                aria-label="Username"
                                type='text'
                                aria-describedby="basic-addon1"
                                onChange={handleData}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row >
                            <h4>II-. Antecedentes Familiares</h4>
                    </Row>
                    <Row>
                        <h5> Antecedentes Padre</h5>
                        <Col lg={3}>
                            <InputGroup className="">
                                <InputGroup.Text id="">Rut</InputGroup.Text>
                                    <FormControl
                                    name='rut_padre'
                                    className="text-uppercase"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={handleData}
                                    />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup className="">
                                <InputGroup.Text id="">Nombre Completo</InputGroup.Text>
                                    <FormControl
                                    name='nombreCompleto_padre'
                                    className="text-uppercase"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={handleData}
                                    />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3}>
                            <InputGroup className="">
                                <InputGroup.Text id="">Fecha Nacimiento</InputGroup.Text>
                                    <FormControl
                                    name='fechaNacimiento_padre'
                                    aria-label="Username"
                                    type='date'
                                    aria-describedby="basic-addon1"
                                    onChange={handleData}
                                    />
                            </InputGroup>
                        </Col>
                        <Col lg={3}>
                            <InputGroup className="">
                                <InputGroup.Text id="">Teléfono</InputGroup.Text>
                                    <FormControl
                                    name='telefono_padre'
                                    type='number'
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={handleData}
                                    />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup className="">
                                <InputGroup.Text id="">Nivel Educacional</InputGroup.Text>
                                <select className="form-select select_matricula" name='estudios_padre'
                                aria-describedby="basic-addon1"  onChange={handleData}>
                                    <option> </option>
                                    <option>Sin Estudio</option>
                                    <option>Basica Incompleta</option>
                                    <option>Basica Completa</option>
                                    <option>Media Incompleta</option>
                                    <option>Media Completa</option>
                                    <option>Universitaria Incompleta</option>
                                    <option>Universitaria Completa</option>
                                </select>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputGroup className="">
                            <InputGroup.Text id="">Ocupación</InputGroup.Text>
                                <FormControl
                                name='ocupacion_padre'
                                className="text-uppercase"
                                aria-label="Username"
                                type='text'
                                aria-describedby="basic-addon1"
                                onChange={handleData}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <h5> Antecedentes Madre</h5>
                        <Col lg={3}>
                            <InputGroup className="">
                                <InputGroup.Text id="">Rut</InputGroup.Text>
                                    <FormControl
                                    name='rut_madre'
                                    className="text-uppercase"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={handleData}
                                    />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup className="">
                                <InputGroup.Text id="">Nombre Completo</InputGroup.Text>
                                    <FormControl
                                    name='nombreCompleto_madre'
                                    className="text-uppercase"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={handleData}
                                    />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3}>
                            <InputGroup className="">
                                <InputGroup.Text id="">Fecha de Nacimiento</InputGroup.Text>
                                    <FormControl
                                    name='fechaNacimiento_madre'
                                    aria-label="Username"
                                    type='date'
                                    aria-describedby="basic-addon1"
                                    onChange={handleData}
                                    />
                            </InputGroup>
                        </Col>
                        <Col lg={3}>
                            <InputGroup className="">
                                <InputGroup.Text id="">Teléfono</InputGroup.Text>
                                    <FormControl
                                    name='telefono_madre'
                                    type='number'
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={handleData}
                                    />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup className="">
                                <InputGroup.Text id="">Nivel Educacional</InputGroup.Text>
                                <select className="form-select select_matricula" name='estudios_madre'
                                aria-describedby="basic-addon1" onChange={handleData}>
                                    <option> </option>
                                    <option>Sin Estudio</option>
                                    <option>Basica Incompleta</option>
                                    <option>Basica Completa</option>
                                    <option>Media Incompleta</option>
                                    <option>Media Completa</option>
                                    <option>Universitaria Incompleta</option>
                                    <option>Universitaria Completa</option>
                                </select>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <InputGroup className="">
                            <InputGroup.Text id="">Ocupación</InputGroup.Text>
                                <FormControl
                                name='ocupacion_madre'
                                className="text-uppercase"
                                aria-label="Username"
                                type='text'
                                aria-describedby="basic-addon1"
                                onChange={handleData}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row >
                            <h4>III-. Apoderado(a) o Tutor(a)</h4>
                    </Row>
                    <Row>
                        <h5>Apoderado(a) Titular</h5>
                        <Col lg={3}>
                            <InputGroup className="">
                                <InputGroup.Text id="">Rut</InputGroup.Text>
                                    <FormControl
                                    name='rut_titular'
                                    className="text-uppercase"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={handleData}
                                    />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup className="">
                                <InputGroup.Text id="">Nombre Completo</InputGroup.Text>
                                    <FormControl
                                    name='nombreCompleo_titular'
                                    className="text-uppercase"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={handleData}
                                    />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <InputGroup className="">
                                <InputGroup.Text id="">Domicilio</InputGroup.Text>
                                    <FormControl
                                    name='domicilio_titular'
                                    className="text-uppercase"
                                    aria-label="Username"
                                    type='text'
                                    aria-describedby="basic-addon1"
                                    onChange={handleData}
                                    />
                            </InputGroup>
                        </Col>
                        <Col >
                            <InputGroup className="">
                                <InputGroup.Text id="">Teléfono</InputGroup.Text>
                                    <FormControl
                                    name='telefono_titular'
                                    type='number'
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={handleData}
                                    />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <h5>Apoderado(a) Suplente</h5>
                        <Col lg={3}>
                            <InputGroup className="">
                                <InputGroup.Text id="">Rut</InputGroup.Text>
                                    <FormControl
                                    name='rut_suplente'
                                    className="text-uppercase"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={handleData}
                                    />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup className="">
                                <InputGroup.Text id="">Nombre Completo</InputGroup.Text>
                                    <FormControl
                                    name='nombreCompleo_suplente'
                                    className="text-uppercase"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={handleData}
                                    />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <InputGroup className="">
                                <InputGroup.Text id="">Domicilio</InputGroup.Text>
                                    <FormControl
                                    name='domicilio_suplente'
                                    className="text-uppercase"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={handleData}
                                    />
                            </InputGroup>
                        </Col>
                        <Col >
                            <InputGroup className="">
                                <InputGroup.Text id="">Teléfono</InputGroup.Text>
                                    <FormControl
                                    name='telefono_suplente'
                                    type='number'
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={handleData}
                                    />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <h5>En caso de emergencia llamar a:</h5>
                        <Col >
                            <InputGroup className="">
                                <select className="form-select select_matricula" name='llamado_emergencia'
                                aria-describedby="basic-addon1" onChange={handleData} >
                                    <option> </option>
                                    <option>Padre</option>
                                    <option>Madre</option>
                                    <option>Apoderado(a) Titular</option>
                                    <option>Apoderado(a) Suplente</option>
                                </select>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <InputGroup className="">
                                <InputGroup.Text id="">¿El estudiante cuenta con algun seguro de salud privado?</InputGroup.Text>
                                    <FormControl
                                    name='segurop_privado'
                                    className="text-uppercase"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={handleData}
                                    />
                            </InputGroup>
                        </Col>
                        <Col >
                            <InputGroup className="">
                                <InputGroup.Text id="">En caso de poserlo,a cual estableciminto de salud debe ser derivado</InputGroup.Text>
                                    <FormControl
                                    name='derivacion_centrosalud'
                                    className="text-uppercase"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={handleData}
                                    />
                            </InputGroup>
                        </Col>
                    </Row>
                <Row>
                    <Col >
                        <Button type="submit">Guardar</Button>
                    </Col>
                </Row>
            </Form>

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

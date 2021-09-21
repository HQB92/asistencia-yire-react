import React from 'react';
import Logo  from '../img/header-footer/logo-yire.png';
import { Navbar, Container} from 'react-bootstrap';
const Navegacion= () =>{
    return(
        <div>
            <Navbar  collapseOnSelect expand="lg" >
            <Container className="header fluid">
            <Navbar.Brand href="/" >
              <img
                alt=""
                src={Logo}
                width="130px"
                height="130px" />
            </Navbar.Brand>
            <h3>Corporación Educacional YIRE</h3>
            </Container>
            </Navbar>
        </div>
    )
}

export default Navegacion;
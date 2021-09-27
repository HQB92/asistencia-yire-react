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
                width="100px"
                height="100px" />
            </Navbar.Brand>
            <h5>Corporación Educacional YIRE</h5>
            </Container>
            </Navbar>
        </div>
    )
}

export default Navegacion;
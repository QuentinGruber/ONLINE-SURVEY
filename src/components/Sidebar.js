
/*eslint-disable*/
import React from "react";
// reactstrap components
import {
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";


class Sidebar extends React.Component {
  
  render() {
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
            {/* Navigation */}
            <Nav className="mb-md-3" navbar>
              <NavItem>
              <NavLink style={{color:"blue"}}href="/">
                  <i className="ni ni-spaceship" />
                  NOUVEAU
                </NavLink>
              </NavItem>
              <NavItem>
              <NavLink style={{color:"blue"}}href="/">
                  <i className="ni ni-palette" />
                  NOUVEAU (depuis template)
                </NavLink>
              </NavItem>
              <NavItem>
              <NavLink style={{color:"blue"}}href="/">
                  <i className="ni ni-ui-04" />
                  MES FORMS
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={{color:"blue"}}href="/">
                  <i className="ni ni-ui-04" />
                  MARKETPLACE
                </NavLink>
              </NavItem>
              <NavItem>
              <NavLink style={{color:"blue"}}href="/">
                  <i className="ni ni-ui-04" />
                  CONTACT
                </NavLink>
              </NavItem>
            </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default Sidebar;
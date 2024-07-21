import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

function ParentsHomeschoolerNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("bg-white");
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (document.documentElement.scrollTop > 399 || document.body.scrollTop > 399) {
        setNavbarColor("");
      } else if (document.documentElement.scrollTop < 400 || document.body.scrollTop < 400) {
        setNavbarColor("bg-white");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return () => {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  }, []);

  return (
    <Navbar className={`fixed-top ${navbarColor}`} expand="lg" color="white">
      <Container fluid>
        <NavbarBrand href="#landing_page">
          <img
            src={require("assets/img/complete_logo.png")}
            alt="it starts logo"
            style={{ maxWidth: "110px" }}
          />
        </NavbarBrand>
        <Collapse isOpen={collapseOpen} navbar>
          <Nav navbar className="mr-auto">
            <NavItem>
              <UncontrolledDropdown nav>
                <DropdownToggle nav caret>
                  CURRICULUM
                </DropdownToggle>
                <DropdownMenu>
                  {/* Your dropdown items */}
                </DropdownMenu>
              </UncontrolledDropdown>
            </NavItem>
            <NavItem>
              <Link to="/login" className="nav-link">
                <i className="now-ui-icons ui-1_bell-53"></i>
              </Link>
            </NavItem>
          </Nav>
          <Nav navbar className="ml-auto">
            <NavItem className="mr-2">
              <InputGroup>
                <Input placeholder="Search..." />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="now-ui-icons ui-1_zoom-bold"></i>
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </NavItem>
            <NavItem className="mr-2">
              <Button className="nav-link" style={{borderRadius:"50px", backgroundColor:"#FF6F42", fontWeight:"bold"}}>
                FIND TUTOR
              </Button>
            </NavItem>
            <NavItem>
              <UncontrolledDropdown nav>
                <DropdownToggle nav caret>
                  DASHBOARD
                </DropdownToggle>
                <DropdownMenu right>
                  {/* Your dashboard dropdown items */}
                </DropdownMenu>
              </UncontrolledDropdown>
            </NavItem>
          </Nav>
        </Collapse>
        <button
          className="navbar-toggler"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(!collapseOpen);
          }}
          aria-expanded={collapseOpen}
          type="button"
        >
          <span className="navbar-toggler-bar top-bar"></span>
          <span className="navbar-toggler-bar middle-bar"></span>
          <span className="navbar-toggler-bar bottom-bar"></span>
        </button>
      </Container>
    </Navbar>
  );
}

export default ParentsHomeschoolerNavbar;

import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

    // const handleLogout = async () => {
    //     await logout();
    //     navigate('./Login');
    // };

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
                <DropdownItem>
                      curriculums.curriculum_name
                    </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </NavItem>
          </Nav>
          <Nav navbar className="ml-auto">
            <NavItem>
              <UncontrolledDropdown nav>
                <DropdownToggle nav caret>
                  DASHBOARD
                </DropdownToggle>
                <DropdownMenu right>
                <DropdownItem>
                      Hi 'user.first_name user.last_name'
                    </DropdownItem>
                    <DropdownItem  /*onClick={handleLogout}*/ target="_blank">
                      Sign out
                    </DropdownItem>
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

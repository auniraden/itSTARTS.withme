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
  UncontrolledTooltip,
} from "reactstrap";

function LoginNavbar() {
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
    <>
      {collapseOpen && (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      )}
      <Navbar className={`fixed-top ${navbarColor}`} expand="lg" color="white">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand href="#landing_page" id="navbar-brand">
              <img
                className="rounded"
                src={require("assets/img/complete_logo.png")}
                alt="it starts logo"
                style={{ maxWidth: "110px" }}
              />
            </NavbarBrand>
            <UncontrolledTooltip placement="bottom" target="#navbar-brand">By auniraden</UncontrolledTooltip>
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
          </div>
          <Collapse className="justify-content-end" isOpen={collapseOpen} navbar>
            <Nav navbar>
              <NavItem>
                <UncontrolledDropdown nav>
                  <DropdownToggle caret color="primary" nav>
                    <i className="now-ui-icons education_hat mr-1"></i>
                    <p>CURRICULUM</p>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem href="https://sppat2.moe.gov.my/cp/spm/cpindex.asp" target="_blank">
                      <i className="now-ui-icons objects_globe mr-1"></i>
                      Lembaga Peperiksaan Malaysia Sijil Pelajaran Malaysia (SPM)
                    </DropdownItem>
                    <DropdownItem href="https://www.cambridgeinternational.org/" target="_blank">
                      <i className="now-ui-icons objects_globe mr-1" ></i>
                      Cambridge Assessment International Education (IGCSE)
                    </DropdownItem>
                    <DropdownItem href="https://qualifications.pearson.com/en/home.html" target="_blank">
                      <i className="now-ui-icons objects_globe mr-1" ></i>
                      Pearson Edexcel (IGCSE)
                    </DropdownItem>
                    <DropdownItem href="https://www.oxfordaqa.com/subjects/" target="_blank">
                      <i className="now-ui-icons objects_globe mr-1"></i>
                      Oxford AQA (IGCSE)
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
              <NavItem>
                <UncontrolledDropdown nav>
                  <DropdownToggle caret color="primary" nav>
                    <i className="now-ui-icons objects_planet mr-1"></i>
                    <p>EXPLORE</p>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem to="/index" tag={Link}>
                      <i className="now-ui-icons education_paper mr-1"></i>
                      Tutors
                    </DropdownItem>
                    <DropdownItem href="#pablo" target="_blank">
                      <i className="now-ui-icons ui-2_favourite-28 mr-1"></i>
                      Read blog
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
              <NavItem>
                <Link  to="/it-starts-roles">
                    <Button
                        className="nav-link btn-neutral"
                        color="white"
                        id="sign-in"
                    >
                    <i className="now-ui-icons arrows-1_share-66 mr-1"></i>
                    <p id="sign-in">SIGN-UP</p>
                    </Button>
                </Link>
                <UncontrolledTooltip placement="bottom"target="sign-in">
                  Don't have an account? Sign up here!
                </UncontrolledTooltip>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default LoginNavbar;

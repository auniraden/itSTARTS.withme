import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
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

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

function ParentsHomeschoolerNavbar() {
  const [navbarColor, setNavbarColor] = useState("bg-white");
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [users, setUser] = useState({ first_name: '', last_name: '' });

  const navigate = useNavigate();

    // const handleLogout = async () => {
    //     await logout();
    //     navigate('./Login');
    // };

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      localStorage.removeItem("accessToken"); // Clear the token from local storage
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
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



  useEffect(() => {
    // Simulating an API call to fetch user data
    axios.get('/sanctum/csrf-cookie').then(() =>{
      const fetchUserData = async () => {
        try {
          // Replace with your actual API call
          const response = await axios.get('/api/user');
          const data = response.json();
          setUser({ first_name: data.first_name, last_name: data.last_name });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }, []);

    })


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
                      Hi {users.first_name} {users.last_name}
                    </DropdownItem>
                    <DropdownItem onClick={handleLogout}>

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

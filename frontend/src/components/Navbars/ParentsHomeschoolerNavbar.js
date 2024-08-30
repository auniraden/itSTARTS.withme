import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {
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
} from "reactstrap";

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Content-Type'] = 'application/json';

function ParentsHomeschoolerNavbar() {
  const [navbarColor, setNavbarColor] = useState("bg-white");
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [userData, setUserData] = useState({ first_name: '', last_name: ''});

  const navigate = useNavigate();

  const getCsrfToken = async () => {
    try {
      await axios.get('/sanctum/csrf-cookie'); // Fetch CSRF token
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await getCsrfToken();

      await axios.post('/api/logout');
      localStorage.removeItem("accessToken"); // Clear the token from local storage
      navigate('/index'); // Redirect to the login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try{
        const token = localStorage.getItem("accessToken");
        if(token){
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get('/api/user');
          setUserData(response.data);
        }
      }catch (error){
        console.error('Error fetching user data:', error);
      }
    }
    fetchUserData();
  }, []);


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
          <Nav navbar className="ml-auto">
            <NavItem>
              <UncontrolledDropdown nav>
                <DropdownToggle nav caret>
                  DASHBOARD
                </DropdownToggle>
                <DropdownMenu right>
                <DropdownItem>
                      Hi, {userData.first_name} {userData.last_name} !
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

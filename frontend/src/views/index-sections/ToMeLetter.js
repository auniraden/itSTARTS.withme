import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Input, Button, Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { DatePicker } from "reactstrap-date-picker";

function ToMeLetter() {
    const [letterContent, setLetterContent] = useState("");
    const [deliveryTime, setDeliveryTime] = useState("6 months");
    const [email, setEmail] = useState("");
    const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
    const [birthdayDropdownOpen, setBirthdayDropdownOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedBirthday, setSelectedBirthday] = useState(null);

    const datePickerRef = useRef(null);
    const birthdayPickerRef = useRef(null);

    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle letter submission logic here
    };

    const toggleDateDropdown = () => setDateDropdownOpen(!dateDropdownOpen);
    const toggleBirthdayDropdown = () => setBirthdayDropdownOpen(!birthdayDropdownOpen);

    const handleDateChange = (value, formattedValue) => {
      setSelectedDate(formattedValue);
      if (formattedValue){
        setDeliveryTime(`on ${formattedValue}`);
      } else{
        setDeliveryTime('');
      }
      setDateDropdownOpen(false);
    };

    const handleBirthdayChange = (value, formattedValue) => {
        setSelectedBirthday(formattedValue);
        // Check if formattedValue is truthy before setting deliveryTime
        if (formattedValue) {
          setDeliveryTime(`on birthday (${formattedValue})`);
        } else {
          // Set deliveryTime to an empty string or a default message if no date is selected
          setDeliveryTime('');
        }
        setBirthdayDropdownOpen(false);
      };

    useEffect(() => {
      function handleClickOutside(event) {
        if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
          setDateDropdownOpen(false);
        }
        if (birthdayPickerRef.current && !birthdayPickerRef.current.contains(event.target)) {
          setBirthdayDropdownOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [datePickerRef, birthdayPickerRef]);

    return (
      <Container className="content-wrapper">
        <h1 className="heading-large text-center mb-4">Dear future me, today I...</h1>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
              <div className="card mb-4" style={{borderRadius:'20px'}}>
                <div className="card-body">
                  <Input
                    type="textarea"
                    value={letterContent}
                    onChange={(e) => setLetterContent(e.target.value)}
                    placeholder="Hey, so today I..."
                    rows={10}
                    className="mb-2"
                  />
                  <small className="text-muted float-right">
                    A letter from {new Date().toDateString()} 🧡
                  </small>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mb-4">
          <Col md={12}>
              <h5 className="mb-3">Deliver: {deliveryTime}</h5>
              {!selectedDate && !selectedBirthday && (
                <>
                  {["6 months", "1 year", "3 years", "5 years", "10 years"].map((time) => (
                    <Button
                      key={time}
                      onClick={() => setDeliveryTime(time)}
                      className="mr-2 mb-2"
                      style={{backgroundColor:deliveryTime === time ? "#FE4632" : "#ECDCD0", borderRadius:'50px'}}
                    >
                      {time}
                    </Button>
                  ))}
                </>
              )}
              <Dropdown isOpen={dateDropdownOpen} toggle={toggleDateDropdown} className="d-inline-block mr-2">
                <DropdownToggle caret color="link">
                  choose a date
                </DropdownToggle>
                <DropdownMenu>
                  <div ref={datePickerRef}>
                    <DatePicker
                      value={selectedDate}
                      onChange={handleDateChange}
                      minDate={new Date()}
                    />
                  </div>
                </DropdownMenu>
                or
              </Dropdown>
              <Dropdown isOpen={birthdayDropdownOpen} toggle={toggleBirthdayDropdown} className="d-inline-block">
                <DropdownToggle caret color="link">
                  birthday
                </DropdownToggle>
                <DropdownMenu>
                  <div ref={birthdayPickerRef}>
                    <DatePicker
                      value={selectedBirthday}
                      onChange={handleBirthdayChange}
                    />
                  </div>
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={8}>
              <p className="mb-2">Make sure your email is correct so your <b>future self receives the letter</b> 😉</p>
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-0"
                style={{backgroundColor:'white', height:'40px'}}
              />
            </Col>
            <Col md={4}>
              <Button
                type="submit"
                block
                style={{
                  borderRadius:'50px',
                  backgroundColor:'#FE4632',
                  fontWeight:'bold',
                  fontSize:'15px',
                  height:'80px'
                }}
              >
                ✨ Send to the future! ✨
              </Button>
            </Col>
          </Row>
        </form>
      </Container>
    );
  }

  export default ToMeLetter;

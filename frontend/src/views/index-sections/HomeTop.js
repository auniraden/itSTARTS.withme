import React, { useRef } from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/animation/diamond.json";
import { Button, Card } from "reactstrap";
import { Link } from "react-router-dom"; // Import useNavigate
import "../../assets/css/hometop.css";

function HomeTop() {
  const diamondRef = useRef();




  return (
    <Card style={{ borderRadius: '10px', paddingTop: '25px' }}>
      <div className="bento-wrapper">
        <div className="grid-item logo">
          <div className="animation">
            <Lottie
              lottieRef={diamondRef}
              animationData={animationData}
              style={{ width: '150px', height: '150px' }}
            />
          </div>
          <img
            src={require("assets/img/itstarts-logo-final.png")}
            alt="it starts logo"
            style={{ maxWidth: "250px" }}
          />
          <h1><span style={{ color: '#FE4632' }}>itSTARTS</span> with me ;)</h1>
        </div>
        <div className="grid-item learning-begins">
          <p style={{ fontWeight: 'bold' }}>Learning Begins With <span style={{ color: '#FE4632' }}>You</span>.</p>
        </div>
        <div className="grid-item about">
          <p>With <span style={{ fontWeight: 'bold' }}>itSTARTS</span>, learning is about <span style={{ color: '#FE4632', fontWeight: 'bold' }}>knowing yourself</span> as much as it is about <span style={{ color: '#FE4632', fontWeight: 'bold' }}>academic success</span>.</p>
        </div>
        <div className="grid-item embark">
          <p style={{ fontWeight: 'bold' }}>Embark on a journey of</p>
        </div>
        <div className="grid-item self-discovery">
          <p style={{ fontWeight: 'bold' }}>Self-discovery</p>
        </div>
        <div className="grid-item empowerment">
          <p style={{ fontWeight: 'bold' }}>Learning empowerment</p>
        </div>
        <div className="grid-item sign-up">
        <Link  to="/it-starts-roles">
          <Button
            size="lg"
            style={{ backgroundColor: '#FE4632', borderRadius: '50px', fontWeight: 'bold' }}

          >
            Sign up
          </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default HomeTop;

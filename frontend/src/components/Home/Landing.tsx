
   
import "./styles.css";
import "./ResponsiveLanding.css";
import Button from '@mui/material/Button';

import LandingImg from "../../assets/DronutLogo.png";

export default function Landing() {
  return (
    <section className="LandingSec">
      <div className="contentWrapper">
        <div className="leftContent">
          <h2>Ready for Trying a new recipe?</h2>
          <div className="handle">
            <input type="text" placeholder="Search healthy recipes" />
            <Button>🔎</Button>
          </div>
        </div>

        <div className="rigthContent">
          <div className="landingImg">
            <img src={LandingImg} alt="Dronuts" />
          </div>
        </div>
      </div>
    </section>
  );
};
import { useNavigate } from "react-router-dom";
import "../../assets/css/howToPlay.css"
export default function HowToPlay(){

 const navigate = useNavigate();

    return (
        
        <section id='how-to-play-content'>
          <h1>How to Play</h1>
          <p>
            {">"}_This is a text based <u>roleplaying game</u> where you review cases to determine each Citizens positive or
            negative impact on The City.
          </p>
          <p>
            {">"}_Navigate a <u>simulated retro futuristic computer</u> terminal via <u>typed commands </u>to explore your new role as an Administrator.
          </p>
        
          <p>
            {">"}_<u>Earn credits</u> by making correct decisions when reviewing cases.
          </p>
          <p>
            {">"}_<u>Buy upgrades</u> to maximize productivity and efficiency.
          </p>
          <p>
            {">"}_Earn enough credits to <u>buy your freedom</u>. <div className="flashing-cursor"></div>
          </p>
         
        <button
          
          className="secondary-button"
          onClick={()=>{navigate("/")}}
        >
          Return to Login
        </button>
        </section>
        
    )
}
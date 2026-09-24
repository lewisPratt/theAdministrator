import { useNavigate } from "react-router-dom";

export default function LoginAbout(){

 const navigate = useNavigate();

    return (
        
        <section id='login-about-content'>
          <p>
            The Administrator is a roleplaying logic game where you determine each Citizens positive or
            negative impact on The City.
          </p>
          <p>
            Correctly identifying positive/negative Citizen behaviour earns
            credits that can be spent in the Voucher Terminal.
          </p>
          <p>Navigate between pages via commands written by the user.</p>
        <button
          
          className="secondary-button"
          onClick={()=>{navigate("/TheAdministrator")}}
        >
          Return to Login
        </button>
        </section>
        
    )
}
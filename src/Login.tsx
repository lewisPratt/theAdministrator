//REACT IMPORTS
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "./context_providers/AdminContext";
import { ScoreContext } from "./context_providers/ScoreContext";
import { ChevronRightCircle } from "lucide-react";

//CSS IMPORTS
import "./assets/css/login.css";

//IMAGE IMPORTS
import CityMap from "./CityMap";


export default function Login() {
  //CONTEXTS
  const { setAdminName } = useContext(AdminContext);
  const { setScoreState } = useContext(ScoreContext);

  //STATES
  const [aboutState, setAboutState] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setScoreState(0);
  });


/** 
* Sets app to logged in state by assigning adminName and redirects to welcome screen
* @param {React.SubmitEvent<HTMLFormElement>} e - event object that triggered the function
*/  
  function doLogin(e: React.SubmitEvent<HTMLFormElement>) : void {
    e.preventDefault();
    const formValues = new FormData(e.target);
    const enteredName  = formValues.get("admin-name")?.toString();

    if (enteredName != "" && enteredName != null) {
      setAdminName(enteredName);
      navigate("/Welcome");
    } else {
      //no name entered so do nothing or show error
    }
  }


/** 
* Toggles the visibility of the game explanation content
*/
  function toggleAbout() :void {
    setAboutState((prev) => !prev);
  }

  return (
    <section id="login">
      <CityMap />

      <h1>Welcome Administrator</h1>
      <form onSubmit={doLogin}>
        <div id="login-typing-container">
          <label htmlFor="admin-name" id="welcome-message">
            Please enter your name
          </label>
        </div>
        <div id="login-input-container">
          <input
            autoFocus
            type="text"
            placeholder="Name"
            id="login-input"
            name="admin-name"
            autoComplete="off"
            
          ></input>
          <button id="command-centre-submit-button">
            <ChevronRightCircle size={28} />
          </button>
        </div>
      </form>
      <div id="about-parent">
        <button
          id="about-header"
          className="secondary-button"
          onClick={toggleAbout}
        >
          What is this?
        </button>
        <div
          id="about-container"
          className={aboutState ? "visible-class" : "non-visible-class"}
        >
          <p>
            The Administrator is a roleplaying logic game where you examine the
            details of Citizen interviews to determine each Citizens positive or
            negative impact on The City.
          </p>
          <p>
            Correctly identifying positive/negative Citizen behaviour earns
            credits that can be spent in the Voucher Terminal.
          </p>
          <p>Navigation between pages via commands written by the user.</p>
        </div>
      </div>
    </section>
  );
}

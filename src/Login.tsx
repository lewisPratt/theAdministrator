import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "./context_providers/AdminContext";
import { ScoreContext } from "./context_providers/ScoreContext";

export default function Login() {
  const [typedName, setTypedName] = useState<string>("");
  const [aboutState, setAboutState] = useState<boolean>(false);
  const { adminName, setAdminName } = useContext(AdminContext);
  const { scoreState, setScoreState } = useContext(ScoreContext);
  const navigate = useNavigate();
  useEffect(() => {
    setScoreState(0);
  });

  function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }
  //sets app to logged in state and sets admin name
  function doLogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (typedName) {
      setAdminName(typedName);
      navigate("/CommandCentre");
    } else {
      //no name entered so do nothing or show error
    }
  }
  function toggleAbout() {

    setAboutState(prev=>!prev)


  }

  return (
    <section id="login">
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
            id="admin-name"
            name="admin-name"
            autoComplete="off"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTypedName(capitalizeFirstLetter(e.currentTarget.value))
            }
          ></input>
          <button id="login-submit-button">@</button>
        </div>
      </form>
      <div id="about-header" onClick={toggleAbout}>
        <h2>What is this?</h2>
      </div>
      {aboutState && (
        <div id="about-container">
          <p>
            The Administrator is a roleplaying logic game that requires you to
            examine the details of Citizen interviews in order to determine each
            Citizens positive or negative impact on The City.
          </p>
          <p>
            By correctly identifying positive/negative
            Citizen behaviour, you will earn credits that can be spent in the
            Voucher Terminal.
          </p>
          <p>
            Navigation between pages is achieved via commands written by the
            user.
          </p>
        </div>
      )}
    </section>
  );
}

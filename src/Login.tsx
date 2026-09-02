import { useState,useContext, type SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "./AdminContext";
import { ScoreContext } from "./ScoreContext";

export default function Login() {
  const [typedName, setTypedName] = useState<string>("");
//   const [adminName, setAdminName] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const {adminName, setAdminName} = useContext(AdminContext)
  const {scoreState, setScoreState} = useContext(ScoreContext)
 const navigate = useNavigate()
useEffect(()=>{
    setScoreState(0)
})

  function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }
  //sets app to logged in state and sets admin name
  function doLogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (typedName) {
      setAdminName(typedName);
      navigate("/CommandCentre")
    } else {
      //no name entered so do nothing or show error
    }
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
    </section>
  );
}

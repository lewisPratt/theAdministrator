//REACT IMPORTS
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context_providers/AdminContext";
import { ScoreContext } from "../../context_providers/ScoreContext";
import { ChevronRightCircle, CircleQuestionMark } from "lucide-react";
import { Tooltip } from "react-tooltip";

//CSS IMPORTS
import "../../assets/css/login.css";

//IMAGE IMPORTS
import CityMap from "./CityMap";


export default function Login() {
  //CONTEXTS
  const { setAdminName } = useContext(AdminContext);
  const { setScoreState } = useContext(ScoreContext);

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
          <button id="command-centre-submit-button" onClick={(e)=>{ e.preventDefault(); navigate("/WhatIsThis")}} data-tooltip-id='login-tooltip' data-tooltip-content='What is this?'>
            <CircleQuestionMark size={28} />
          </button>
        </div>
      </form>
      <Tooltip id='login-tooltip' className='custom-tooltip'/>
    </section>
  );
}

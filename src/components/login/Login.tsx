//REACT IMPORTS
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context_providers/AdminContext";
import { ScoreContext } from "../../context_providers/ScoreContext";
import { ChevronRightCircle } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { newPlayerData } from "../../models/newPlayerData";

//CSS IMPORTS
import "../../assets/css/login.css";

//IMAGE IMPORTS
import CityMap from "./CityMap";
import { PlayerContext } from "../../context_providers/PlayerContext";
import type { playerDataShape } from "../../interfaces/interfaces";
import LoginChoice from "./LoginChoice";

interface loginChoiceShape{
  enteredName: string
  retrievedSave: playerDataShape
}


export default function Login() {
const [loginChoice, setLoginChoice] = useState<loginChoiceShape | null>(null)

  //CONTEXTS
  const { setAdminName } = useContext(AdminContext);
  const { setScoreState } = useContext(ScoreContext);
  const { playerData, setPlayerData } = useContext(PlayerContext);
  const navigate = useNavigate();
  let loginStart = false

  useEffect(() => {
    if(playerData && !loginStart){
      setPlayerData(null)
    }
  },[]);

  /**
   * Sets app to logged in state by assigning adminName and redirects to welcome screen
   * @param {React.SubmitEvent<HTMLFormElement>} e - event object that triggered the function
   */
  function doLogin(e: React.SubmitEvent<HTMLFormElement>): void {
    e.preventDefault();
    loginStart = true
    const formValues = new FormData(e.target);
    const enteredName = formValues.get("admin-name")?.toString();

    // name is not empty string so process login
    if (enteredName != "" && enteredName != null) {
      const savedData = localStorage.getItem("The_Administrator_Game");
      if (!savedData) {
        newPlayerSetup(enteredName);
              

      } else {
        const parsedPlayerData: playerDataShape = JSON.parse(savedData);
        if (parsedPlayerData.player_name === enteredName) {
          setPlayerData(JSON.parse(savedData));
                navigate("/Welcome");

        } else {
          const parsedData : playerDataShape= JSON.parse(savedData)
          //show warning of already having an account saved, only one account at a time. previous accounts will be overwritten. Provide player name and link to login directl to this account
          // no need for feature allowing multiple logins currently. 
         setLoginChoice({enteredName: enteredName, retrievedSave : parsedData })
        }
      }

       
    } else {
      //no name entered so do nothing or show error
    }
  }
   function newPlayerSetup(name: string) {
        let newPlayer = newPlayerData;
        newPlayer.player_name = name;
        localStorage.setItem(
          "The_Administrator_Game",
          JSON.stringify(newPlayer),
        );
        setPlayerData(newPlayer)
        navigate("/Welcome")
      }  

  return (
    <section id="login">
      <CityMap />

      <h1 id="login-header">Welcome Administrator</h1>
      <p>Login below to start your mandatory shift.</p>
      <form onSubmit={doLogin}>
        <label id="login-label" htmlFor="admin-name">
          Administrator Name:
        </label>

        <div id="login-input-container">
          <input
            autoFocus
            type="text"
            placeholder="Name"
            id="login-input"
            name="admin-name"
            autoComplete="name"
          ></input>
          <button id="command-centre-submit-button">
            <ChevronRightCircle size={28} />
          </button>
          {/* <button id="command-centre-submit-button"  data-tooltip-id='login-tooltip' data-tooltip-content='What is this?'>
            <CircleQuestionMark size={28} />
          </button> */}
        </div>
        <button
          id="how-to-play-button"
          className="secondary-button"
          onClick={(e) => {
            e.preventDefault();
            navigate("/HowToPlay");
          }}
        >
          How to play
        </button>
      </form>
      {loginChoice != null && <LoginChoice loginChoiceData={loginChoice} choiceSetter={setLoginChoice} setupNewPlayer={newPlayerSetup}/>}
      <Tooltip id="login-tooltip" className="custom-tooltip" />
    </section>
  );
}

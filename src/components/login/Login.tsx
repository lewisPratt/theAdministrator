//REACT IMPORTS
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRightCircle } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { newPlayerData } from "../../models/newPlayerData";

//CSS IMPORTS
import "../../assets/css/login.css";

//IMAGE IMPORTS
import CityMap from "./CityMap";
import { PlayerContext } from "../../context_providers/PlayerContext";
import type { playerDataShape, playerStatsShape } from "../../interfaces/interfaces";
import LoginChoice from "./LoginChoice";
import { ErrorContext } from "../../context_providers/ErrorContext";
import { isPlayer } from "../../assets/utils/helpers";

interface loginChoiceShape{
  enteredName: string
  retrievedSave: playerDataShape
}


export default function Login() {
const [loginChoice, setLoginChoice] = useState<loginChoiceShape | null>(null)

  //CONTEXTS
  const { setPlayerData } = useContext(PlayerContext);
  const {errorState,setErrorState} = useContext(ErrorContext)
  const navigate = useNavigate();

  /**
   * 
   * @param storageKey key for the item in local storage
   * @returns saved data if successful try. Null if no key found that matches or if JSON is malformed
   */
  function tryParse(storageKey : string){
    try {
          const savedData = localStorage.getItem(storageKey);
          if(savedData === null){
            return null
          }
          return JSON.parse(savedData);

    } catch (error) {
      //Couldn't parse JSON. Returns null so just overwrites malformed JSON
    }
  }

 
  /**
   * Sets app to logged in state by assigning adminName and redirects to welcome screen
   * @param {React.SubmitEvent<HTMLFormElement>} e - event object that triggered the function
   */
  function doLogin(e: React.SubmitEvent<HTMLFormElement>): void {
    e.preventDefault();
    const formValues = new FormData(e.target);
    const enteredName = formValues.get("admin-name")?.toString();

    // name is not empty string so process login
    if (enteredName != "" && enteredName != null) {

      //attempt to get saved data safely
      const savedData :playerDataShape = tryParse("The_Administrator_Game")
      //if no saved data found
      if (!savedData) {
        newPlayerSetup(enteredName);
      } else {
        //returning player, load saved data
        if(isPlayer(savedData)){
          if (savedData.player_name === enteredName) {
            setPlayerData(savedData);
            sessionStorage.setItem("admin_game_status", "logged_in");
            navigate("/Welcome");

          } else {
            //show warning of already having an account saved, only one account at a time. previous accounts will be overwritten. Provide player name and link to login directl to this account
          setLoginChoice({enteredName: enteredName, retrievedSave : savedData })
          }
        }
         else{
          //type guard failed, saved player data does not match expected type
          //CODE #1
          setErrorState("There was an issue with your saved game data. Data Reset. Try again. [#1]")
          localStorage.removeItem("The_Administrator_Game")
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
        sessionStorage.setItem("admin_game_status", "logged_in");
        navigate("/Welcome")

      }  

  return (
    <section id="login">
      <CityMap giveDetails={false}/>

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

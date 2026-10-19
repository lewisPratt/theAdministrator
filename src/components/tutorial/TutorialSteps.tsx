import { X } from "lucide-react";
import { TutorialContext } from "../../context_providers/TutorialContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentSlugContext } from "../../context_providers/CurrentSlugContext";

interface tutorialStepsProps {
  stepNumber: number;
}

export default function TutorialSteps({ stepNumber }: tutorialStepsProps) {
  const { tutorialState, setTutorialState } = useContext(TutorialContext);
  const {setCurrentSlug} = useContext(CurrentSlugContext)
  const navigate = useNavigate();
  let textContent: string = "";
  switch (stepNumber) {
    case 1:
      textContent = "Type commands here to move between screens.";
      break;
    case 2:
       textContent = "Use these commands to navigate around the system.";
      break;
    case 3:
      textContent = "See where you currently are in the system.";
      break;
    case 4:
      textContent = "Toggle system sounds on/off";
      break;
    case 5:
      textContent = "Navigate on any screen by typing commands here.";
      break;
    case 6:
      textContent = "Check available commands.";
      break;
      //Case Review
    case 7:
      textContent = "Select a case to review the details.";
      break;
    case 8:
      textContent = "Review case information collected on Citizens.";
      break;
    case 9:
      textContent = "Decide whether to send for re-education or no further action.";
      break;
    case 10:
      textContent = "Upgrades you have unlocked will show here.";
      break;
    case 11:
      textContent = "Check the rules to remind you what to look for.";
      break;
    case 12:
      textContent = "Earn credits by correctly judging Citizens.";
      break;
      //Upgrade shop
    case 13:
      textContent = "Purchase upgrades to improve performance.";
      break;
    case 14:
      textContent = "View your personal record to see stats and unlocked upgrades.";
      break;
      //Personal Record
      case 15:
      textContent = "View unlocked upgrades and their related effects.";
      break;
      case 16:
      textContent = "Review your performance statistics.";
      break;
      case 17:
      textContent = "Check out your unlocked promotion titles";
      break;
      case 18:
      textContent = "Manage your game data";
      break;
    default:
      break;
  }

  function previousStep() {
    let step: number = 0;
    //close tutorial
    if (tutorialState.tutorialStep <= 1) {
      setTutorialState({ tutorialActive: false, tutorialStep: 0 });
    } else {
        if((tutorialState.tutorialStep - 1)=== 6){
          setCurrentSlug("nav.terminal")
          navigate("/Terminal")

        }
        else if((tutorialState.tutorialStep - 1)=== 12){
          setCurrentSlug("nav.review")
          navigate("/CaseReview")
        }
        else if((tutorialState.tutorialStep - 1)=== 14){
          setCurrentSlug("nav.upgrade")
          navigate("/UpgradeShop")
        }
        else if((tutorialState.tutorialStep - 1)=== 16){
          setCurrentSlug("nav.personal")
          navigate("/PersonalRecord")
        }
      step = tutorialState.tutorialStep - 1;
      setTutorialState({ tutorialActive: true, tutorialStep: step });
    }
  }

  function nextStep() {
    if (tutorialState.tutorialStep + 1 === 7) {
      setCurrentSlug("nav.review")
      navigate("/CaseReview");
    }
    else if(tutorialState.tutorialStep + 1 == 13){
      setCurrentSlug("nav.upgrade")
      navigate("/UpgradeShop")
    }
    else if(tutorialState.tutorialStep + 1 == 15){
      setCurrentSlug("nav.personal")
      navigate("/PersonalRecord")
    }
     else if(tutorialState.tutorialStep + 1 == 19){
      setCurrentSlug("nav.terminal")
      navigate("/Terminal")
    }
    setTutorialState({
      tutorialActive: true,
      tutorialStep: tutorialState.tutorialStep + 1,
    });
  }

  return (
    <>
      {" "}
      <div className="x-container">
        <button
          onClick={() =>
            setTutorialState({ tutorialActive: false, tutorialStep: 0 })
          }
          className="tutorial-close-x"
        >
          <X size={16} />
        </button>{" "}
      </div>
      {textContent}{" "}
      <p className="tutorial-button-container">
        <button className="tutorial-button" onClick={previousStep}>
          {tutorialState.tutorialStep <= 1 ? "Close" : "Previous"}
        </button>
        <button className="tutorial-button" autoFocus onClick={nextStep}>
          Next
        </button>
      </p>
    </>
  );
}

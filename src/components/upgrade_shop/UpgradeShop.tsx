import { useContext, useEffect, useState } from "react";
import { LoaderCircle} from "lucide-react";
import { ScoreContext } from "../../context_providers/ScoreContext";
import { UnlocksContext } from "../../context_providers/unlocksContext";
import type { UpgradeShape, UpgradeListShape } from "../../interfaces/interfaces";
import { playSound } from "react-sounds";
import { allUpgrades} from "../../generator_modules/upgrades";
import { Badge } from "lucide-react";
import { CreditIcon } from "../../assets/custom_icons/credits";
import { useNavigate } from "react-router-dom";
import "../../assets/css/upgradeShop.css"
import { CurrentSlugContext } from "../../context_providers/CurrentSlugContext";
import { TutorialContext } from "../../context_providers/TutorialContext";
import TutorialOverlay from "../TutorialOverlay";
import TutorialSteps from "../tutorial/TutorialSteps";
import { useRef } from "react";
import type { TooltipRefProps } from "react-tooltip";
import { Tooltip } from "react-tooltip";
export default function UpgradeShop() {
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [confirming, setConfirming] = useState<string | null>(null);
  const { scoreState, setScoreState } = useContext(ScoreContext);
  const { playerUnlocks, setPlayerUnlocks } = useContext(UnlocksContext);
  const {setCurrentSlug} = useContext(CurrentSlugContext)
  const {tutorialState, setTutorialState} = useContext(TutorialContext)
  const navigate = useNavigate()
  console.log(playerUnlocks);


  const [errorState, setErrorState] = useState<string | null>(null);
    const hoverClick = () => playSound('ui/button_soft')
    const purchaseSound = () => playSound('ui/success_bling')
    const cantAfford = () => playSound('notification/error')
  const tooltipRef1 = useRef<TooltipRefProps>(null);


  const debug = false;
  const upgrades: UpgradeListShape = allUpgrades

  useEffect(() => {
    setTimeout(setLoadingState, 2000, false);
  });

  // useEffect(()=>{
  //   if(!loadingState){
  //   if(tutorialState.tutorialActive){
  //     setTutorialState({tutorialActive: true, tutorialStep:tutorialState.tutorialStep+1})
  //   }
  // }
  // },[loadingState])
   //manage tutorial activation and progression through steps as well as closure when tutorial is deactivated.
  useEffect(() => {
    if (tutorialState.tutorialActive) {
      
        tooltipRef1.current?.open({
          anchorSelect: "#tutorial-step-"+tutorialState.tutorialStep,
          content: <TutorialSteps stepNumber={tutorialState.tutorialStep} />
        });      
    }
    if(!tutorialState.tutorialActive){
      tooltipRef1.current?.close()
    }
  }, [tutorialState, loadingState]);



  function giveCredits() {
    setScoreState(scoreState + 1000);
  }
   function resetCredits() {
    setScoreState(0);
  }
  function resetUpgrades() {
    setPlayerUnlocks(null);
  }
  function confirmChoice(e: React.MouseEvent<HTMLButtonElement>) {
      setErrorState(null)
    if (
      e.currentTarget.dataset.upgradeName &&
      e.currentTarget.dataset.upgradeIdent
    ) {
      const chosenUpgradeIdent: string = e.currentTarget.dataset.upgradeIdent;
      if(confirming === chosenUpgradeIdent){
        setConfirming(null)
      }
      else{
      const chosenUpgrade: UpgradeShape = upgrades[`${chosenUpgradeIdent}`];
  

      if (chosenUpgrade != undefined) {
        
        setConfirming(chosenUpgradeIdent);
      }
    }
    }
  }

  function purchaseUpgrade() {
  
    if (confirming != null) {
      const selectedUpgrade = upgrades[`${confirming}`];
      if (scoreState < selectedUpgrade.cost) {
        setErrorState("You do not have enough credits");
        cantAfford()
      } else {
        setScoreState(scoreState - selectedUpgrade.cost);
        let updatedUnlocks: string[] = [];
        if (playerUnlocks != null) {
          updatedUnlocks = [...playerUnlocks];
        }
        purchaseSound()
        updatedUnlocks.push(confirming);
        setPlayerUnlocks(updatedUnlocks);
      }
    }
  }

  return (
    <>
      {loadingState ? (
        <p>
          <LoaderCircle className="loader" />
        </p>
      ) : (
        
        <section id="upgrade-shop">
          { tutorialState.tutorialActive && <TutorialOverlay />}
          <div id="upgrade-shop-header">
            <h2>Upgrade Shop</h2>
            <a id="tutorial-step-7"></a>
            {debug &&  <div className="debug-container"><h6>Debug- not for production</h6><button onClick={giveCredits}>Give credits</button><button onClick={resetCredits}>Reset credits</button><button onClick={resetUpgrades}>Reset Upgrades</button></div>}
          </div>
          <div  id="personal-record-button">
          <button onClick={()=>{navigate("/PersonalRecord"); setCurrentSlug("nav.personal")}}>Personal Record</button>
          </div>
          <section id="upgrade-items-container">
            <ol>
              {Object.entries(upgrades).map((upgrade) => {
                return (
                  <li>
                    <button
                      key={upgrade[0]}
                      className={
                        "upgrade-box " +
                        (playerUnlocks?.includes(upgrade[0])
                          ? "purchased-unlock-class"
                          : "unpurchased-unlock-class")
                      }
                      data-upgrade-name={upgrade[1].name}
                      data-upgrade-ident={upgrade[0]}
                      
                      onClick={(e) => {
                        confirmChoice(e)
                        hoverClick();
                      }}
                    >
                        <Badge size={48}>{upgrade[1].icon}</Badge><span className="upgrade-name">{upgrade[1].name}</span> <span>{playerUnlocks?.includes(upgrade[0]) && "[Purchased]"  }  <CreditIcon className="custom-icon" />{upgrade[1].cost}</span>
                    </button>
                    {confirming != null && confirming === upgrade[0] && (
                      <div >
                        <p className="upgrade-desc">{upgrade[1].desc}</p>
                        <p>Effect: {upgrade[1].perkEffect}</p>
                                  {errorState != null && <p id='upgrade-error'>{errorState}</p>}

                        {!playerUnlocks?.includes(upgrade[0]) && (
                            
                          <div className='purchase-button-container'>
                            <button onClick={purchaseUpgrade} ><CreditIcon className="custom-icon"/></button>
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
                              <Tooltip className="custom-tooltip" ref={tooltipRef1} imperativeModeOnly clickable/>

        </section>
      )}
    </>
  );
}

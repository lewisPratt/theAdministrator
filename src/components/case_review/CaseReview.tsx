import { useContext, useEffect, useState } from "react";
import CaseReviewPanel from "./CaseReviewPanel";
import CaseListItem from "./CaseListItem";
import CaseReviewSummary from "./CaseReviewSummary";
import { NIL as NIL_UUID } from "uuid";
import { person } from "../../models/person";
import type {
  reviewShape,
  reviewsCompleteShape,
} from "../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import {LoaderCircle, SquareArrowDown } from "lucide-react";
import NoCurrentTranscript from "./NoCurrentTranscript";
import RulesPanel from "./RulesPanel";
import { checkUpgradeActive, playCustomSound } from "../../assets/utils/helpers";
import { Tooltip } from "react-tooltip";
import "../../assets/css/caseReview.css";

//TUTORIAL IMPORTS
import type { TooltipRefProps } from "react-tooltip";
import { TutorialContext } from "../../context_providers/TutorialContext";
import { useRef } from "react";
import TutorialLogic from "../tutorial/TutorialLogic";
import { PlayerContext } from "../../context_providers/PlayerContext";
import ActiveUpgrades from "../upgrade_shop/ActiveUpgrades";
import NotLoggedIn from "../nav/NotLoggedIn";
import { ErrorContext } from "../../context_providers/ErrorContext";

export default function TranscriptRev() {
  const [availableTranscripts, setAvailableTranscripts] = useState<
    reviewShape[] | null
  >(null);
  const [currentTranscript, setCurrentTranscript] =
    useState<reviewShape | null>(null);
  //triggers re-render even when score is 0 and score updates to 0 (which doesn't rerender)
  const [, setDecisionMade] = useState<boolean>(false);
  const [reviewsComplete, setReviewsComplete] =
    useState<reviewsCompleteShape | null>(null);
  const [reviewDismissed, setReviewDismissed] = useState<boolean>(false)
  const [selectedListItem, setSelectedListItem] = useState<string>(NIL_UUID);
  const [codexState, setCodexState] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [cityMapeState, setCityMapState] = useState<boolean>(false)
  const [nextCase, setNextCase] = useState<reviewShape | null>(null)
  const [juniorCallUsed, setJuniorCallused] = useState<boolean>(false)
  const [seniorCallUsed, setSeniorCallused] = useState<boolean>(false)

  const { tutorialState } = useContext(TutorialContext);
  const {playerData} = useContext(PlayerContext)
  const {errorState} = useContext(ErrorContext)
  const navigate = useNavigate();
  const tooltipRef1 = useRef<TooltipRefProps>(null);


  if (availableTranscripts != null && !reviewsComplete) {
    let effectiveness: number 
    const reviewObj = { count: 0, negative: 0, positive: 0 };
    availableTranscripts.forEach((transcript) => {
      if (transcript.processed) {
        reviewObj.count += 1;
        if (transcript.decisionOutcome) {
          reviewObj.positive += 1;
        } else {
          reviewObj.negative += 1;
        }
      }
    });
    //all avaialble transcripts have been processed
    if (reviewObj.count === availableTranscripts.length) {
      effectiveness = Math.round((reviewObj.positive / reviewObj.count) * 100);
     

      setReviewsComplete({
        numberComplete: reviewObj.count,
        effectivenessRating: effectiveness,
      });
    }
  }


 //new cases are generated when the loading state changes, effectively loading the page (from the user point of view).
  // 
  useEffect(() => {
    /**
 * creates cases to populate the review component. Sorts through possible upgrades and applies their effects if they are relevant to 
 * case wide effects. 
 */
    function triggerCaseCreation(){
      
          const transcriptsArray: reviewShape[] = [];
          let transcriptCount = 8;
          const originalCount = transcriptCount;
          if (playerData?.player_unlocks) {
            if (playerData.player_unlocks.includes("voucher4")) {
              transcriptCount += 3;
            }
            if (playerData.player_unlocks.includes("voucher5")) {
              transcriptCount += 2;
            }
          }

          for (let index = 0; index < transcriptCount; index++) {
            const newPerson: reviewShape = new person();
            const playerUnlocks = playerData?.player_unlocks
            let chance = 0.10

            if (checkUpgradeActive(playerUnlocks, "voucher1") && checkUpgradeActive(playerUnlocks, "voucher2")) {
              //if both vouchers present, increase to 20% chance of reveal
              chance = 0.20
            }
            //if player has either upgrade, trigger chance to reveal legality of item
            if (checkUpgradeActive(playerUnlocks, "voucher1") || checkUpgradeActive(playerUnlocks, "voucher2")) {
              if (Math.random() < chance) {
                newPerson.revealItem = true
              }
            }

            //mark current case as a bonus case granted by upgrade
            if (originalCount != transcriptCount && index >= originalCount) {
              newPerson.bonusCase = true;
            }
            transcriptsArray.push(newPerson);
          }
      
        setAvailableTranscripts(transcriptsArray)
        setLoadingState(false)
    }

    if(loadingState){
      setTimeout(triggerCaseCreation, 2000);
    }
  }, [loadingState,playerData?.player_unlocks]);


  //if the tutorial is active, automatically open the first case in the list to show tooltips within the case details panel
  useEffect(() => {

    function showTutorialCase(availableTranscripts : reviewShape[]){
      setNextCase(availableTranscripts[0])
      setCurrentTranscript(availableTranscripts[0]);
    }
    if(!loadingState){
      if (tutorialState.tutorialActive && availableTranscripts) {
        showTutorialCase(availableTranscripts)
      }
    }
  }, [loadingState]);


  function loadNewShift(reason: string) {
    // loadingStateSetter(true);
    if (reason === "new") {
      setLoadingState(true);
      setTimeout(startNewShift, 1000);
    } else if (reason === "end") {
      endShift();
    }
  }
  function startNewShift() {
    setLoadingState(false);
    setAvailableTranscripts(null);
    setReviewsComplete(null);
    setCurrentTranscript(null);
    setReviewDismissed(false)
  }
  function endShift() {
    //need to workout loop for end of shift
    navigate("/UpgradeShop");
  }

  return (
    <>
      <TutorialLogic loadingState={loadingState} tooltipRef={tooltipRef1} />
      {loadingState ? (
        <p>
          <LoaderCircle className="loader" />
        </p>
      ) : (
        <>
        {/* check if logged in */}
         {playerData && sessionStorage.getItem("admin_game_status")?  (
          <>
          {reviewsComplete && !reviewDismissed && (
            <CaseReviewSummary
              reviewsCompleteSetter={setReviewDismissed}
              efficiency={reviewsComplete.effectivenessRating}
              interviewCount={reviewsComplete.numberComplete}
              startNewShift={loadNewShift}
              
            />
          )}

          <section id="case-review">

            <div id="top-container">
              {availableTranscripts && (
                <div id="case-list-container">
                  <div
                    id="tutorial-step-7"
                    className={
                      (tutorialState.tutorialActive &&
                      tutorialState.tutorialStep === 7
                        ? "tutorial-highlight"
                        : "") + " transcript-list"
                    }
                  >
                    <ActiveUpgrades />
                    <div id="interviews-list-header"><SquareArrowDown /> <h1>Available Cases</h1> <SquareArrowDown /></div>
                   
                    {availableTranscripts.map((listItem) => (
                      <CaseListItem
                        key={
                          listItem.identifier
                        }
                        currentOpenCase={currentTranscript}
                        nextCaseSetter={setNextCase}
                        reviewTranscriptSetter={setCurrentTranscript}
                        currentTranscript={listItem}
                        identifier={selectedListItem}
                        selectedSetter={setSelectedListItem}
                        codexState={codexState}
                        codexStateSetter={setCodexState}
                      />
                    ))}
                    </div>
                    <ol>
                    <li className="rules-list-item">
                       {reviewsComplete && <><button onClick={()=>loadNewShift("new")}>start new shift</button><button onClick={()=>setReviewDismissed(false)}>Summary</button> </>}
                    </li>
                  </ol>
                  <button
                      id="tutorial-step-11"
                      className={
                        tutorialState.tutorialActive &&
                        tutorialState.tutorialStep === 11
                          ? "tutorial-highlight"
                          : ""
                       + " rules-button"}
                      onClick={() => {
                        playCustomSound("buttonPress")
                        if(currentTranscript != null){
                          setCurrentTranscript(null)
                          setSelectedListItem("0");
                        }
                        setCodexState(true);
                      }}
                    >
                      Rules
                    </button>
            
                 
                </div>
              )}
              {codexState && 
                <RulesPanel  codexStateSetter={setCodexState} codexState={codexState} />
              }
              {currentTranscript ? (
                <CaseReviewPanel
                  key={currentTranscript.identifier}
                  nextCaseSetter={setNextCase}
                  nextCase={nextCase}
                  reviewTranscriptSetter={setCurrentTranscript}
                  transcript={currentTranscript}
                  decisionSetter={setDecisionMade}
                  selectedSetter={setSelectedListItem}
                  transcriptList={availableTranscripts}
                  setTranscriptList={setAvailableTranscripts}
                  cityMapState={cityMapeState}
                  cityMapSetter={setCityMapState}
                  juniorCallSetter={setJuniorCallused}
                  juniorCall={juniorCallUsed}
                  seniorCallSetter={setSeniorCallused}
                  seniorCall={seniorCallUsed}
                />
              ) : (
                <>
                 {!codexState && !currentTranscript && <NoCurrentTranscript />}
                 </>
              )}
                   
              <Tooltip id="extra-case-tooltip" className="custom-tooltip" />
            </div>
             <div className="helper-elements">

                
             </div>
          </section>
          </>) :
          <NotLoggedIn soundControls={false} dataError={errorState}/>}
        </>
      )}
    </>
  );
}

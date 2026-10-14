import React, { useContext, useState } from "react";
import type {
  transcriptReviewBoxProps,
} from "../../interfaces/interfaces";
import {
  DoorOpen,
  Backpack,
  CircleCheck,
  CircleX,
  X,
  MapPinned,
  ChevronRight,
  ChevronLeft,
  XCircle,
} from "lucide-react";
import { Tooltip } from "react-tooltip";
import { v4 as uuidv4 } from "uuid";
import { NIL as NIL_UUID } from "uuid";
import { playSound } from "react-sounds";
import { UnlocksContext } from "../../context_providers/unlocksContext";
import { TutorialContext } from "../../context_providers/TutorialContext";
import { PlayerContext } from "../../context_providers/PlayerContext";
import CitizenAvatar from "./CitizenAvatar";
import EvidenceStack from "./EvidenceStack";

//set to 1 to show debug info on weighting
const debug: number = 0;

export default function CaseReviewPanel({
  transcript,
  reviewTranscriptSetter,
  selectedSetter,
  transcriptList,
  setTranscriptList,
  cityMapSetter,
  cityMapState
}: transcriptReviewBoxProps) {
  const [closing, setClosing] = useState<boolean>(false);
  const [showEvidence, setShowEvidence] = useState<Boolean>(false);
  const { playerUnlocks } = useContext(UnlocksContext);
  const { tutorialState } = useContext(TutorialContext);
  const { playerData, setPlayerData } = useContext(PlayerContext);
  const successSound = () => playSound("ui/success_bling");
  const failSound = () => playSound("ui/blocked");
  let itemsToIdentify : number = 0

  let recPassDesc: string = "";
  if (transcript?.recreationPass) {
    recPassDesc = "Valid RecPass";
  } else {
    recPassDesc = "No RecPass";
  }

  //trigger adding of animation class to animate transcript leaving page.
  function closeTranscript() {
    setClosing(true);
  }

 /**
  * reset the state and show the 'no transcript selected' message
  * @param e the event object to detect whether the slide out animation has completed. 
  */
  function handleAnimationEnd(e: React.AnimationEvent<HTMLDivElement>) {
    if (e.animationName === "transcript-slide-out") {
      reviewTranscriptSetter(null);
      selectedSetter(NIL_UUID);
    }
  }
  /**
   * retrieves the index of the currently active case within the transcript list
   * @returns the index(number) of currently active case
   */
  function getCaseIndex() :number {
    let foundIndex : number = 0
    if(transcript && transcriptList){
      foundIndex = transcriptList.findIndex((caseFile)=>{
             return transcript.identifier === caseFile.identifier   
      })
    }
    if(foundIndex > 0){
      return foundIndex
    }else{
      return 0
    }
  }

/**
 * Changes the active case based on the index of the currently active case. can either go back 1 or forwards 1
 * @param direction which direction to move in the transcript list, either "next" or "previous"
 * @returns reviewShape object that holds all the details of the transcript being changed to. 
 */
  function changeCase(direction: string){
    if(transcriptList){
    let currentCaseIndex = getCaseIndex()
       
        if(direction === "next"){
          currentCaseIndex +=1
        } else if(direction === "previous"){
          currentCaseIndex -=1
        }
        if(currentCaseIndex >= transcriptList.length ){
          currentCaseIndex = 0
        }
        if(currentCaseIndex < 0){
          currentCaseIndex = transcriptList.length -1
        }
        selectedSetter(transcriptList[currentCaseIndex].identifier)
        return reviewTranscriptSetter(transcriptList[currentCaseIndex])
      }
  }

  function handleDecision(e: React.MouseEvent<HTMLButtonElement>) {
    if (transcript) {
      const decision = e.currentTarget.dataset.decision;
      const personWeighting: number = transcript.overallWeighting;
      let decisionText = "";

      const wrongAnswer = 170;
      let rightAnswer = 150;

      //work out additional credits to reward based on unlocked perks
      if (playerUnlocks) {
        if (playerUnlocks.includes("voucher6")) {
          rightAnswer += 50;
          console.log("badge 1 ", rightAnswer);
        }
        if (playerUnlocks.includes("voucher7")) {
          rightAnswer += 75;
          console.log("badge 2 ", rightAnswer);
        }
        if (playerUnlocks.includes("voucher8")) {
          rightAnswer += 100;
          console.log("badge 3 ", rightAnswer);
        }
      }

      
      function updateCreditTotal(creditAdjustment: number, direction: boolean, category: string) {
        if (playerData) {
          let newTotal: number = playerData.player_credits;
          let decisionOutcome: boolean = false;
          if (direction) {
            //add credits
            newTotal += creditAdjustment;
            decisionOutcome = true;
            decisionText = "SUCCESS: Citizen processed accurately.";
          } else {
            //minus credits
            decisionOutcome = false;
            decisionText = "ERROR: Citizen incorrectly processed.";
            if (newTotal - creditAdjustment <= 0) {
              newTotal = 0;
            } else {
              newTotal -= creditAdjustment;
            }
          }

          //handle the updating of the transcript with the reward earned and the outcome of the decision.
          if (transcriptList) {
            let allTranscripts = [...transcriptList];
            let foundTranscript = allTranscripts.find(
              (t) => t.identifier === transcript?.identifier,
            );
            if (foundTranscript) {
              foundTranscript.rewardEarned = creditAdjustment;
              foundTranscript.processed = true;
              foundTranscript.decision = decisionText;
              foundTranscript.decisionOutcome = decisionOutcome;
              foundTranscript.outcomeCategory = category
              setTranscriptList(allTranscripts);
              //positive
            }
          }

          //update playerdata with increase/decrease in credits.
          let dataToUpdate = { ...playerData };
          dataToUpdate.player_credits = newTotal;
          dataToUpdate.player_stats.cases_complete += 1;
          if (decisionOutcome) {
            dataToUpdate.player_stats.cases_correct += 1;
            dataToUpdate.player_stats.total_credits_earned += creditAdjustment;
          } else {
            dataToUpdate.player_stats.cases_failed += 1;
            if (newTotal - creditAdjustment >= 0) {
              dataToUpdate.player_stats.total_credits_lost += creditAdjustment;
            }
          }

          setPlayerData(dataToUpdate);
        }
      }

      switch (decision) {
        case "nfa":
          if (personWeighting < 0) {
            //person is bad, negative consequence for wrong decision.
            failSound();
            updateCreditTotal(wrongAnswer, false, "NFA");
          } else if (personWeighting >= 0) {
            //person is good, positive consequences for right decision
            successSound();
            updateCreditTotal(rightAnswer, true, "NFA");
          }
          break;
        case "reeducate":
          if (personWeighting < 0) {
            //person is bad, positive consequence for right decision.
            successSound();
            updateCreditTotal(rightAnswer, true, "Re-educate");
          } else if (personWeighting >= 0) {
            //person is good, negative consequences for wrong deision
            failSound();
            updateCreditTotal(wrongAnswer, false,"Re-educate");
          }
          break;
        default:
          break;
      }
    }
  }
  return (
    <>
      {transcript && (
        <>
        <div className="case-container">
          <div
            id="tutorial-step-10"
            className={
              "transcript-container " +
              (!closing ? "open-transcript-class" : "slide-out-class") +
              " " +
              (tutorialState.tutorialActive && tutorialState.tutorialStep === 10
                ? "tutorial-highlight"
                : "")
            }
            onAnimationEnd={handleAnimationEnd}
          >
            <div
              id="weather-container"
              data-tooltip-id="item-desc"
              data-tooltip-content={transcript.weather.weather}
            >
              {transcript.weather.icon}
            </div>
            <h3>
              {transcript.interviewee.firstName}{" "}
              {transcript.interviewee.lastName}
            </h3>
            <div className="interviewee-details">
             
              <CitizenAvatar key={transcript.identifier} transcript={transcript} cityMapState={cityMapState} cityMapSetter={cityMapSetter}/>
             
              <div className="interviewee-information">
              <div className="details-row">
                <p>
                  <span className="review-box-section-header">Age:</span>{" "}
                  {transcript.age} |{" "}
                  <span className="review-box-section-header">Gender:</span>{" "}
                  {transcript.gender.charAt(0).toUpperCase() +
                    transcript.gender.slice(1)}
                </p>
              </div>

              <div className="details-row">
                <p>
                  <span className="review-box-section-header">Occupation:</span>{" "}
                  {transcript.occupation.name}
                </p>{" "}
              </div>

              <div className="details-row">
                <p>
                  <span className="review-box-section-header">
                    Detained in:
                  </span>{" "}
                  {transcript.location.name}
                </p>
              </div>
              <div className="details-row">
                <p>
                  <span className="review-box-section-header">
                    Behaviour:
                  </span>{" "}
                  {transcript.behaviour}
                </p>
              </div>
              </div>

              {debug === 1 && (
                <>
                  <p>
                    Interview District: {transcript.location.district} -
                    Occupation District: {transcript.occupation.district}{" "}
                    Weighting: {transcript.overallWeighting}
                  </p>
                  <p>
                    {transcript.weightingArray.map((item) => {
                      return <span key={uuidv4()}> {item.evidenceText} |</span>;
                    })}
                  </p>
                </>
              )}
            </div>

            <div className="transcript-text">
              <p>{transcript.personFlavour}</p>
            </div>
            {/* show reward earned from making decision on this case. conditional on whether the case has been procesed */}
            {transcript.processed && (
              <div className="outcome-display">
                <h4>{transcript.outcomeCategory}</h4>
                <p>{transcript.decision}</p>
                <p>
                  Credits:{transcript.decisionOutcome ? "+" : "-"}
                  {transcript.rewardEarned}
                </p>
              </div>
            )}
            <div className="passes-container">
              <div>
                <DoorOpen
                  tabIndex={0}
                  data-tooltip-id="item-desc"
                  data-tooltip-content="A RecPass is needed to visit District 8."
                />
                <div className="recreation-pass-container">
                  <div
                    data-tooltip-id="item-desc"
                    tabIndex={0}
                    data-tooltip-content={recPassDesc}
                    className="recreation-pass badge"
                  >
                    {transcript.recreationPass ? (
                      <p>
                        <CircleCheck />
                      </p>
                    ) : (
                      <p>
                        <CircleX />
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <MapPinned
                  tabIndex={0}
                  data-tooltip-id="item-desc"
                  data-tooltip-content="Authorized to visit these Districts (due to occupation/other)"
                />
                <div className="location-pass-container ">
                  {transcript.authorizedLocations.map((loc) => {
                    const tooltipText = "District " + loc;
                    return (
                      <div
                        key={loc}
                        tabIndex={0}
                        className="badge"
                        data-tooltip-id="item-desc"
                        data-tooltip-content={tooltipText}
                      >
                        {loc}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <Backpack
                  tabIndex={0}
                  data-tooltip-id="item-desc"
                  data-tooltip-content="Items found on interviewee."
                />
                <div className="location-pass-container ">
                  {transcript.items.map((item) => {
                    if(itemsToIdentify >= 0){
                      --itemsToIdentify
                    }
                    return (
                      <div
                        className={ (transcript.revealItem ? (item.legal ? "legal-item " : "illegal-item ") : "")  +" badge"}
                        key={uuidv4()}
                        tabIndex={0}
                        data-tooltip-id="item-desc"
                        data-tooltip-content={item.description + (transcript.revealItem ? (item.legal ? " [Legal]" : " [Illegal]") : "")}
                      >
                        {item.itemComponent}
                        <div className="illegal-item-symbol"><XCircle size={12}/></div>
                        <div className="legal-item-symbol"><CircleCheck size={12}/></div>
                      </div>
                    );
                  })}
                </div>
                <Tooltip id="item-desc" className="custom-tooltip"></Tooltip>
              </div>
            </div>

            <button
              aria-label="Close case details"
              id="transcript-close-button"
              onClick={closeTranscript}
            >
              <X />
            </button>
          </div>
          <div id="tutorial-step-11" className={
              (tutorialState.tutorialActive && tutorialState.tutorialStep === 11
                ? "tutorial-highlight"
                : "") + " decision-container"
            }
          >
            {!transcript.processed ? (
              <div className="decision-buttons-container"> 
              <button onClick={()=>{changeCase("previous")}}><ChevronLeft /></button>
                <button data-decision="nfa" onClick={handleDecision}>
                  No further action
                </button>
                <button data-decision="reeducate" onClick={handleDecision}>
                  Send for re-education
                </button>{" "}
                <button onClick={()=>{changeCase("next")}}><ChevronRight /></button>
              </div>
            ) : (
              <>
              <div className="processed-buttons-container"> 
                <button onClick={()=>{changeCase("previous")}}><ChevronLeft /></button>
              <button onClick={()=>reviewTranscriptSetter(null)}>Close Case Notes</button>
               
               {playerData?.player_unlocks.includes("voucher9") ?
                  <button onClick={() => {setShowEvidence((prev) => !prev);}}>
                    See Evidence
                  </button>
                  :
                  <p className="missing-evidence-upgrade" data-tooltip-id="extra-case-tooltip" data-tooltip-content="unlock via upgrade terminal">
                    Evidence Stack Missing 
                  </p>

                }
                <button onClick={()=>{changeCase("next")}}><ChevronRight /></button>
            </div>
                  {showEvidence && (
                     <EvidenceStack caseDetails={transcript}/> 
                  )}
                
              </>
            )}
          </div>
          </div>
          
        </>
      )}
    </>
  );
}

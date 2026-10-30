import React, { useContext, useEffect, useState, useRef} from "react";
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
  LoaderCircle,
} from "lucide-react";
import { Tooltip } from "react-tooltip";
import { v4 as uuidv4 } from "uuid";
import { NIL as NIL_UUID } from "uuid";
import { playSound } from "react-sounds";
import { TutorialContext } from "../../context_providers/TutorialContext";
import { PlayerContext } from "../../context_providers/PlayerContext";
import CitizenAvatar from "./CitizenAvatar";
import EvidenceStack from "./EvidenceStack";
import { checkUpgradeActive } from "../../assets/utils/helpers";
import DecryptConsole from "./DecryptConsole";

//set to 1 to show debug info on weighting
const debug: number = 0;

export default function CaseReviewPanel({
  transcript,
  reviewTranscriptSetter,
  selectedSetter,
  transcriptList,
  setTranscriptList,
  cityMapSetter,
  cityMapState,
  nextCase,
  nextCaseSetter,
  juniorCallSetter,
  juniorCall,
  seniorCallSetter,
  seniorCall
}: transcriptReviewBoxProps) {
  const [closing, setClosing] = useState<boolean>(false);
  const [showEvidence, setShowEvidence] = useState<Boolean>(false);
  const [inCall, setInCall] = useState<boolean>(false)
  const [callResult, setCallResult] = useState<string>("")
  const [callTalking, setCallTalking] = useState<string>("")
  const [decrypt, setDecrypt] = useState<boolean>(false)
  const { tutorialState } = useContext(TutorialContext);
  const { playerData, setPlayerData } = useContext(PlayerContext);
  const juniorCallRef = useRef(0)
  const successSound = () => playSound("ui/success_bling");
  const failSound = () => playSound("ui/blocked");
  let itemsToIdentify : number = 0

  let recPassDesc: string = "";
  if (transcript?.recreationPass) {
    recPassDesc = "Valid RecPass";
  } else {
    recPassDesc = "No RecPass";
  }
  
  useEffect(()=>{
    if(nextCase != transcript){
      setClosing(true)
    }
  },[nextCase])
  //trigger adding of animation class to animate transcript leaving page.
  function closeTranscript() {
    const timerId = juniorCallRef.current
    clearTimeout(timerId)
    setClosing(true);
  }

 /**
  * reset the state and show the 'no transcript selected' message
  * @param e the event object to detect whether the slide out animation has completed. 
  */
  function handleAnimationEnd(e: React.AnimationEvent<HTMLDivElement>) {
    if (e.animationName === "transcript-slide-out") {
      if(nextCase != transcript && nextCase != null){
        reviewTranscriptSetter(nextCase)
        selectedSetter(nextCase.identifier)
      }else{
      reviewTranscriptSetter(null);
      selectedSetter(NIL_UUID);
      }
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
        return nextCaseSetter(transcriptList[currentCaseIndex])
      }
  }

  function callColleague(colleagueLevel: string){
    if(!inCall){
      if(colleagueLevel === "junior"){
        if(!juniorCall){
        juniorCallSetter(true)
        }
      } else if(colleagueLevel === "senior")
          if(!seniorCall){
          seniorCallSetter(true)
        }
        setInCall(true)
          //logic to simulate a brief call and chance based decision. 
          const callId = setTimeout(() => {
            simCall(colleagueLevel)
          }, 8000);
          juniorCallRef.current = callId;
      
     }
  }

  function simCall(colleagueLevel: string){
    const callId = juniorCallRef.current;
    clearInterval(callId)
    setInCall(false)
    setCallTalking("")
    //make decision
    let chance = 0.60
    if(colleagueLevel === "senior"){
      chance = 0.80
    }
    if(Math.random() < chance){
      //correct decision
      if( transcript && transcript?.overallWeighting >= 0){
        setCallResult("It's definately an NFA")
      } else{
        setCallResult("Re-educate ASAP!")
      }

    }else{
      setCallResult("sorry, it's my first day...")
    }
  }

  function handleCallSim(e : React.AnimationEvent){
    if(e.animationName === "call-ring"){
      setCallTalking("Explaining case details...")
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
      if (playerData?.player_unlocks) {
        if (playerData?.player_unlocks.includes("voucher6")) {
          rightAnswer += 50;
        }
        if (playerData?.player_unlocks.includes("voucher7")) {
          rightAnswer += 75;
        }
        if (playerData?.player_unlocks.includes("voucher8")) {
          rightAnswer += 100;
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
            id="tutorial-step-8"
            className={
              "transcript-container " +
              (!closing ? "open-transcript-class" : "slide-out-class") +
              " " +
              (tutorialState.tutorialActive && tutorialState.tutorialStep === 8
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
            {transcript.encryptedDrive.activeDrive && 
            <>
              <p><button data-tooltip-content="Break Encryption?" data-tooltip-id="item-desc" onClick={()=>{setDecrypt(true)}}>Encrypted drive found</button></p>
            
              <div id="decrypt-container" className={(decrypt ? "decrypt-container-visible" : "decrypt-container-hidden")}>
                <button id="close-decrypt" onClick={()=>{setDecrypt(false)}}><X /></button>

                <p className="mt-20">Enter the encryption key correctly to access the data.</p>

                <DecryptConsole decryptobj={transcript.encryptedDrive}/>
                


              </div>
            </>
            
            }

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
            
                {inCall && <div onAnimationEnd={(e)=>handleCallSim(e)} className="call-sim">
                  
                    {callTalking != "" ? <p>{callTalking} <LoaderCircle className="loader" /></p> : <p>........</p>}
                    
                </div>}
                {callResult != "" && <p className="colleague-call-result">{"\""}{callResult}{"\""}</p>} 
            <div id="colleague-call-container">
              {checkUpgradeActive(playerData?.player_unlocks, "voucher11") &&
                <>
                  {!juniorCall &&
                    <button onClick={()=>callColleague("junior")}>Call Junior Colleague</button>}
                </>
              }
              {checkUpgradeActive(playerData?.player_unlocks, "voucher12") &&
                <>
                  {!seniorCall &&
                    <button onClick={()=>callColleague("senior")}>Call Senior Colleague</button>}
                </>
              }
            </div>
          </div>
          <div id="tutorial-step-9" className={
              (tutorialState.tutorialActive && tutorialState.tutorialStep === 9
                ? "tutorial-highlight"
                : "") + " decision-container"
            }
          >
            {!transcript.processed ? (
              <div className="decision-buttons-container"> 
              <button onClick={()=>{changeCase("previous")}}><ChevronLeft /></button>
                <button id="nfa-button" data-decision="nfa" onClick={handleDecision}>
                  No further action
                </button>
                <button id="reeducate-button" data-decision="reeducate" onClick={handleDecision}>
                  Send for re-education
                </button>{" "}
                
                <button onClick={()=>{changeCase("next")}}><ChevronRight /></button>
               
              </div>
            ) : (
              <>
              <div className="processed-buttons-container"> 
                <button onClick={()=>{changeCase("previous")}}><ChevronLeft /></button>
              <button onClick={()=>nextCaseSetter(null)}>Close Case Notes</button>
               
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

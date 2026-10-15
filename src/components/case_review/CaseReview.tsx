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
import SearchConsole from "./SearchInfo";
import {LoaderCircle } from "lucide-react";
import NoCurrentTranscript from "./NoCurrentTranscript";
import DebugTools from "../DebugTools";
import RulesPanel from "./RulesPanel";
import { checkUpgradeActive } from "../../assets/utils/helpers";
import { Tooltip } from "react-tooltip";
import "../../assets/css/caseReview.css";


//TUTORIAL IMPORTS
import type { TooltipRefProps } from "react-tooltip";
import { TutorialContext } from "../../context_providers/TutorialContext";
import { useRef } from "react";
import TutorialLogic from "../tutorial/TutorialLogic";
import { PlayerContext } from "../../context_providers/PlayerContext";
import CaseReviewMap from "./CaseReviewMap";
import ActiveUpgrades from "../upgrade_shop/ActiveUpgrades";
import NotLoggedIn from "../nav/NotLoggedIn";

export default function TranscriptRev() {
  const [availableTranscripts, setAvailableTranscripts] = useState<
    reviewShape[] | null
  >(null);
  const [currentTranscript, setCurrentTranscript] =
    useState<reviewShape | null>(null);
  //triggers re-render even when score is 0 and score updates to 0 (which doesn't rerender)
  const [_decisionMade, setDecisionMade] = useState<boolean>(false);
  const [reviewsComplete, setReviewsComplete] =
    useState<reviewsCompleteShape | null>(null);
  const [reviewDismissed, setReviewDismissed] = useState<boolean>(false)
  const [selectedListItem, setSelectedListItem] = useState<string>(NIL_UUID);
  const [generatePeople, setGeneratePeople] = useState<boolean>(false);
  const [codexState, setCodexState] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [cityMapeState, setCityMapState] = useState<boolean>(false)
  const [missingPlayerData, setMissingPlayerData] = useState<boolean>(false)
  const [nextCase, setNextCase] = useState<reviewShape | null>(null)
  const [juniorCallUsed, setJuniorCallused] = useState<boolean>(false)
  const [seniorCallUsed, setSeniorCallused] = useState<boolean>(false)

  const { tutorialState } = useContext(TutorialContext);
  const {playerData} = useContext(PlayerContext)
  const navigate = useNavigate();
  const tooltipRef1 = useRef<TooltipRefProps>(null);
  //////////////////////
  // set debug to 1 to see debug tools
  const debug = 0;
  ///////////////////////////

  if (availableTranscripts != null && !reviewsComplete) {
    let effectiveness: number = 0;
    let reviewObj = { count: 0, negative: 0, positive: 0 };
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
  //the delay implemented by the loading state allows time for local data to be loaded from localstorage if playerdata becomes null (on refresh of page for instance)
  // 
  useEffect(() => {
    let transcriptsArray: reviewShape[] = [];
    let transcriptCount = 8;
    let originalCount = transcriptCount;
    if (playerData) {
      setMissingPlayerData(false)
      if (playerData.player_unlocks.includes("voucher4")) {
        transcriptCount += 3;
      }
      if (playerData.player_unlocks.includes("voucher5")) {
        transcriptCount += 2;
      }
    }
    else{
      //missing playerdata
      setMissingPlayerData(true)
    }

/**
 * creates cases to populate the review component. Sorts through possible upgrades and applies their effects if they are relevant to 
 * case wide effects. 
 */
    function createCases() {
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
    }

    createCases()
      
    setAvailableTranscripts(transcriptsArray);

    setTimeout(setLoadingState, 2000, false);
  }, [loadingState, generatePeople]);

  //if the tutorial is active, automatically open the first case in the list to show tooltips within the case details panel
  useEffect(() => {
    if (tutorialState.tutorialActive && availableTranscripts) {
      setNextCase(availableTranscripts[0])
      setCurrentTranscript(availableTranscripts[0]);
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
    setGeneratePeople((prev) => !prev);
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
            {playerData?.player_unlocks.includes("voucher10") && <SearchConsole />}

            {debug ? <DebugTools generatePeople={setGeneratePeople} /> : null}
            {missingPlayerData && <p>Missing player data on load, reload to apply upgrades <button onClick={()=>{setGeneratePeople(prev=>!prev); setMissingPlayerData(false)}}>reload</button></p>}
            <div id="top-container">
              {availableTranscripts && (
                <div id="case-list-container">
                  <ol
                    id="tutorial-step-7"
                    className={
                      (tutorialState.tutorialActive &&
                      tutorialState.tutorialStep === 7
                        ? "tutorial-highlight"
                        : "") + " transcript-list"
                    }
                  >
                    <li id="interviews-list-header">Available Cases</li>

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
                    <li className="rules-list-item">
                       {reviewsComplete && <><button onClick={()=>loadNewShift("new")}>start new shift</button><button onClick={()=>setReviewDismissed(false)}>Summary</button> </>}
                    </li>
                  </ol>
            
                 
                </div>
              )}
              {codexState && 
                <RulesPanel codexStateSetter={setCodexState} codexState={codexState} currentTranscriptSetter={setCurrentTranscript} selectedSetter={setSelectedListItem}/>
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

               <ActiveUpgrades />

                <button
                      id="tutorial-step-9"
                      className={
                        tutorialState.tutorialActive &&
                        tutorialState.tutorialStep === 9
                          ? "tutorial-highlight"
                          : ""
                       + " rules-button"}
                      onClick={() => {
                        setCodexState(true);
                      }}
                    >
                      Rules
                    </button>
             </div>
            {cityMapeState && <CaseReviewMap cityMapSetter={setCityMapState} cityMapState={cityMapeState}/>}
          </section>
          </>) :
          <NotLoggedIn soundControls={false} />}
        </>
      )}
    </>
  );
}

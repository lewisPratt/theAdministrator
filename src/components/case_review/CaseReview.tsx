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
import { Badge, LoaderCircle } from "lucide-react";
import NoCurrentTranscript from "./NoCurrentTranscript";
import DebugTools from "../DebugTools";
import CodexSidePanel from "./CodexSidePanel";
import { getUnlockDetails } from "../../assets/utils/helpers";
import { Tooltip } from "react-tooltip";
import "../../assets/css/caseReview.css";

//TUTORIAL IMPORTS
import type { TooltipRefProps } from "react-tooltip";
import { TutorialContext } from "../../context_providers/TutorialContext";
import { useRef } from "react";
import TutorialLogic from "../tutorial/TutorialLogic";
import { PlayerContext } from "../../context_providers/PlayerContext";

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
  const [selectedListItem, setSelectedListItem] = useState<string>(NIL_UUID);
  const [generatePeople, setGeneratePeople] = useState<boolean>(false);
  const [codexState, setCodexState] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<boolean>(true);

  const { tutorialState } = useContext(TutorialContext);
  const {playerData} = useContext(PlayerContext)
  const navigate = useNavigate();
  const voucherDetails = getUnlockDetails(playerData);
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

  useEffect(() => {
    let transcriptsArray: reviewShape[] = [];
    let transcriptCount = Math.floor(Math.random() * 10) + 3;
    let originalCount = transcriptCount;
    if (playerData) {
      if (playerData.player_unlocks.includes("voucher4")) {
        transcriptCount += 3;
      }
      if (playerData.player_unlocks.includes("voucher5")) {
        transcriptCount += 2;
      }
    }
    for (let index = 0; index < transcriptCount; index++) {
      const newPerson = new person();
      if (originalCount != transcriptCount && index >= originalCount) {
        newPerson.bonusCase = true;
      }
      transcriptsArray.push(newPerson);
    }

    setAvailableTranscripts(transcriptsArray);

    setTimeout(setLoadingState, 2000, false);
  }, [generatePeople]);

  useEffect(() => {
    if (tutorialState.tutorialActive && availableTranscripts) {
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
         
          {reviewsComplete && (
            <CaseReviewSummary
              efficiency={reviewsComplete.effectivenessRating}
              interviewCount={reviewsComplete.numberComplete}
              startNewShift={loadNewShift}
              
            />
          )}

          <section id="case-review">
            {playerData?.player_unlocks.includes("voucher10") && <SearchConsole />}

            {debug ? <DebugTools generatePeople={setGeneratePeople} /> : null}
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
                          listItem.interviewee.firstName +
                          listItem.authorizedLocations
                        }
                        reviewTranscriptSetter={setCurrentTranscript}
                        currentTranscript={listItem}
                        identifier={selectedListItem}
                        selectedSetter={setSelectedListItem}
                        codexState={codexState}
                        codexStateSetter={setCodexState}
                      />
                    ))}
                  </ol>
                  <div>
                    <h6
                      id="tutorial-step-8"
                      className={
                        tutorialState.tutorialActive &&
                        tutorialState.tutorialStep === 8
                          ? "tutorial-highlight"
                          : ""
                      }
                    >
                      Active Upgrades
                    </h6>

                    {voucherDetails &&
                      voucherDetails.map((unlock) => {
                        return (
                          <Badge
                            size="25"
                            data-tooltip-id="extra-case-tooltip"
                            data-tooltip-content={unlock.perkEffect}
                          >
                            {unlock.icon}
                          </Badge>
                        );
                      })}
                  </div>
                  <button
                    id="tutorial-step-9"
                    className={
                      tutorialState.tutorialActive &&
                      tutorialState.tutorialStep === 9
                        ? "tutorial-highlight"
                        : ""
                    }
                    onClick={() => {
                      setCodexState(true);
                    }}
                  >
                    Rules & Regulations
                  </button>
                </div>
              )}
              {codexState && 
                <CodexSidePanel codexStateSetter={setCodexState} codexState={codexState} currentTranscriptSetter={setCurrentTranscript} selectedSetter={setSelectedListItem}/>
              }
              {currentTranscript ? (
                <CaseReviewPanel
                  reviewTranscriptSetter={setCurrentTranscript}
                  transcript={currentTranscript}
                  decisionSetter={setDecisionMade}
                  selectedSetter={setSelectedListItem}
                />
              ) : (
                <>
                 {!codexState && !currentTranscript && <NoCurrentTranscript />}
                 </>
              )}
              <Tooltip id="extra-case-tooltip" className="custom-tooltip" />
            </div>
          </section>
        </>
      )}
    </>
  );
}

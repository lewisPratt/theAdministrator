import { useContext, useEffect, useState } from "react";
import CaseReviewPanel from "./CaseReviewPanel";
import CaseListItem from "./CaseListItem";
import CaseReviewSummary from "./CaseReviewSummary";
import { NIL as NIL_UUID } from "uuid";
import { person } from "../../models/person";
import type {
  reviewShape,
  reviewsCompleteShape,
  scoreContextShape,
} from "../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import SearchConsole from "./SearchInfo";
import { Badge, LoaderCircle } from "lucide-react";
import NoCurrentTranscript from "./NoCurrentTranscript";
import DebugTools from "../DebugTools";
import CodexSidePanel from "./CodexSidePanel";
import { ScoreContext } from "../../context_providers/ScoreContext";
import { UnlocksContext } from "../../context_providers/unlocksContext";
import { getUnlockDetails } from "../../assets/utils/helpers";
import { Tooltip } from "react-tooltip";
import "../../assets/css/caseReview.css";

//TUTORIAL IMPORTS
import type { TooltipRefProps } from "react-tooltip";
import { TutorialContext } from "../../context_providers/TutorialContext";
import { useRef } from "react";
import TutorialLogic from "../tutorial/TutorialLogic";

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
  const [targetState, setTargetState] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const { scoreState, setScoreState }: scoreContextShape =
    useContext(ScoreContext);
  const { tutorialState } = useContext(TutorialContext);
  const { playerUnlocks } = useContext(UnlocksContext);
  const navigate = useNavigate();
  const voucherDetails = getUnlockDetails(playerUnlocks);
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
      if (scoreState >= 200) {
        setTargetState(true);
      }

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
    if (playerUnlocks) {
      if (playerUnlocks.includes("voucher4")) {
        transcriptCount += 3;
      }
      if (playerUnlocks.includes("voucher5")) {
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
      setTimeout(endShift, 1000);
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
    navigate("/VoucherShop");
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
          <CodexSidePanel
            codexState={codexState}
            codexStateSetter={setCodexState}
          />
          {reviewsComplete && (
            <CaseReviewSummary
              efficiency={reviewsComplete.effectivenessRating}
              interviewCount={reviewsComplete.numberComplete}
              startNewShift={loadNewShift}
              targetState={targetState}
            />
          )}

          <section id="case-review">
            {playerUnlocks?.includes("voucher10") && <SearchConsole />}

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
              {currentTranscript ? (
                <CaseReviewPanel
                  reviewTranscriptSetter={setCurrentTranscript}
                  transcript={currentTranscript}
                  scoreSetter={setScoreState}
                  scoreState={scoreState}
                  decisionSetter={setDecisionMade}
                  selectedSetter={setSelectedListItem}
                />
              ) : (
                <NoCurrentTranscript />
              )}
              <Tooltip id="extra-case-tooltip" className="custom-tooltip" />
              {/* <Tooltip className="custom-tooltip" ref={tooltipRef1} imperativeModeOnly clickable/> */}
            </div>
          </section>
        </>
      )}
    </>
  );
}

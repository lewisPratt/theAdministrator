import React, { useContext, useState } from "react";
import type { transcriptReviewBoxProps } from "../../interfaces/interfaces";
import {
  DoorOpen,
  Backpack,
  CircleCheck,
  CircleX,
  X,
  MapPinned,
} from "lucide-react";
import { Tooltip } from "react-tooltip";
import { v4 as uuidv4 } from "uuid";
import { NIL as NIL_UUID } from "uuid";
import { playSound } from "react-sounds";
import { UnlocksContext } from "../../context_providers/unlocksContext";
import { TutorialContext } from "../../context_providers/TutorialContext";
import { PlayerContext } from "../../context_providers/PlayerContext";

//set to 1 to show debug info on weighting
const debug: number = 0;

export default function CaseReviewPanel({
  transcript,
  reviewTranscriptSetter,
  selectedSetter,
  decisionSetter,
}: transcriptReviewBoxProps) {
  const [closing, setClosing] = useState<boolean>(false);
  const [showEvidence, setShowEvidence] = useState<Boolean>(false);
  const { playerUnlocks } = useContext(UnlocksContext);
  const { tutorialState } = useContext(TutorialContext);
  const { playerData, setPlayerData } = useContext(PlayerContext);
  const successSound = () => playSound("ui/success_bling");
  const failSound = () => playSound("ui/blocked");

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

  //reset the state and show the 'no transcript selected' message
  function handleAnimationEnd(e: React.AnimationEvent<HTMLDivElement>) {
    if (e.animationName === "transcript-slide-out") {
      reviewTranscriptSetter(null);
      selectedSetter(NIL_UUID);
    }
  }
  function handleDecision(e: React.MouseEvent<HTMLButtonElement>) {
    if (transcript) {
      const decision = e.currentTarget.dataset.decision;
      const personWeighting: number = transcript.overallWeighting;
      let decisionText = "";
      let decisionOutcome = null;

      const wrongAnswer = 170;
      let rightAnswer = 150;
      const neutralAnswer = 50;

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

      function updateCreditTotal(creditAdjustment: number, direction: boolean) {
        if (playerData) {
          let newTotal: number = playerData.player_credits;
          if (direction) {
            //add credits
            newTotal += creditAdjustment;
          } else {
            //minus credits
            if (newTotal - creditAdjustment <= 0) {
              newTotal = 0;
            } else {
              newTotal -= creditAdjustment;
            }
          }
          let dataToUpdate = { ...playerData };
          dataToUpdate.player_credits = newTotal;
          setPlayerData(dataToUpdate);
        }
      }

      switch (decision) {
        case "nfa":
          if (personWeighting < 0) {
            //person is bad, negative consequence for wrong decision.

            decisionText =
              "ERROR: Non-compliant Citizen incorrectly processed.";
            decisionOutcome = false;
            failSound();
            updateCreditTotal(wrongAnswer, false);
          } else if (personWeighting > 0) {
            //person is good, positive consequences for right decision
            updateCreditTotal(rightAnswer, true);
            decisionText =
              "Productive Citizen identified & processed accurately.";
            decisionOutcome = true;
            successSound();
          } else {
            //person is neutral (0) so no negative or positive consequences
            updateCreditTotal(neutralAnswer, true);
            decisionText = "Average Citizen processed.";
            decisionOutcome = true;
            successSound();
          }
          break;
        case "reeducate":
          if (personWeighting < 0) {
            //person is bad, positive consequence for right decision.
            updateCreditTotal(rightAnswer, true);
            decisionText = "Non-compliant Citizen sent to Re-education";
            decisionOutcome = true;
            successSound();
          } else if (personWeighting > 0) {
            console.log("reeducate good person");
            //person is good, negative consequences for wrong deision
            decisionText = "ERROR: Productive Citizen incorrectly processed.";
            decisionOutcome = false;
            failSound();
            updateCreditTotal(wrongAnswer, false);
            
          } else {
            //person is neutral (0) so negative consequence for bad decision
            decisionText = "ERROR: Average Citizen incorrectly processed.";
            decisionOutcome = false;
            failSound();
            updateCreditTotal(wrongAnswer, false);
            
          }
          break;

        default:
          break;
      }
      decisionSetter((prev) => !prev);
      transcript.processed = true;
      transcript.decision = decisionText;
      transcript.decisionOutcome = decisionOutcome;
    }
  }
  return (
    <>
      {transcript && (
        <>
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
                    Interview Location:
                  </span>{" "}
                  {transcript.location.name}
                </p>
              </div>
              <div className="details-row">
                <p>
                  <span className="review-box-section-header">
                    Response to interview:
                  </span>{" "}
                  {transcript.behaviour}
                </p>
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
                      return <span key={uuidv4()}> {item} |</span>;
                    })}
                  </p>
                </>
              )}
            </div>

            <div className="transcript-text">
              <p>{transcript.personFlavour}</p>
            </div>
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
                    return (
                      <div
                        className="badge"
                        key={uuidv4()}
                        tabIndex={0}
                        data-tooltip-id="item-desc"
                        data-tooltip-content={item.description}
                      >
                        {item.itemComponent}
                      </div>
                    );
                  })}
                </div>
                <Tooltip id="item-desc" className="custom-tooltip"></Tooltip>
              </div>
            </div>

            <button id="transcript-close-button" onClick={closeTranscript}>
              <X />
            </button>
          </div>
          <div
            id="tutorial-step-11"
            className={
              (tutorialState.tutorialActive && tutorialState.tutorialStep === 11
                ? "tutorial-highlight"
                : "") + " decision-container"
            }
          >
            {!transcript.processed ? (
              <>
                <button data-decision="nfa" onClick={handleDecision}>
                  No further action
                </button>
                <button data-decision="reeducate" onClick={handleDecision}>
                  Send for re-education
                </button>{" "}
              </>
            ) : (
              <>
                <div id="evidence-box">
                  <button
                    onClick={() => {
                      setShowEvidence((prev) => !prev);
                    }}
                  >
                    {" "}
                    See Evidence{" "}
                  </button>
                  {showEvidence && (
                    <ol>
                      {transcript.weightingArray.map((item) => {
                        return <li key={uuidv4()}> {item} </li>;
                      })}
                    </ol>
                  )}
                </div>
                <p id="processed-text">
                  {transcript.decisionOutcome ? (
                    <span className="positive-text">
                      {transcript.decision}{" "}
                    </span>
                  ) : (
                    <span className="negative-text">
                      {transcript.decision}{" "}
                    </span>
                  )}
                </p>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

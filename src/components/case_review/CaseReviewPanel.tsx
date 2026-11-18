import React, { useContext, useState, useRef } from "react";
import type { transcriptReviewBoxProps } from "../../interfaces/interfaces";
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
  FolderKey,
} from "lucide-react";
import { Tooltip } from "react-tooltip";
import { v4 as uuidv4 } from "uuid";
import { NIL as NIL_UUID } from "uuid";
import { playSound, } from "react-sounds";
import { TutorialContext } from "../../context_providers/TutorialContext";
import { PlayerContext } from "../../context_providers/PlayerContext";
import CitizenAvatar from "./CitizenAvatar";
import EvidenceStack from "./EvidenceStack";
import {
  checkUpgradeActive,
  playCustomSound,
} from "../../utilities/helperFunctions";
import DecryptConsole from "./DecryptConsole";
import CaseReviewMap from "./CaseReviewMap";
import SearchConsole from "./SearchConsole";
import failSound from "../../assets/sounds/error.mp3";
import successfulSound from "../../assets/sounds/success_bling.mp3";


/**
 * 
 * @param param0 
 * @returns Individual case information for the player to review and make a judgement on. 
 */
export default function CaseReviewPanel({
  CurrentCase,
  CurrentCaseSetter,
  CurrentSelectedSetter,
  transcriptList,
  setTranscriptList,
  nextCase,
  nextCaseSetter,
  juniorCallSetter,
  juniorCall,
  seniorCallSetter,
  seniorCall,
  closingState,
  closingStateSetter,
  CheckComplete
}: transcriptReviewBoxProps) {
  const [showEvidence, setShowEvidence] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [inCall, setInCall] = useState<boolean>(false);
  const [callResult, setCallResult] = useState<string>("");
  const [callTalking, setCallTalking] = useState<string>("");
  const [decrypt, setDecrypt] = useState<boolean>(false);
  const { tutorialState } = useContext(TutorialContext);
  const { playerData, setPlayerData } = useContext(PlayerContext);
  const [cityMapState, setCityMapState] = useState<boolean>(false);
  const juniorCallRef = useRef(0);
  const successSound = () =>
    playSound(successfulSound, { volume: 0.5, loop: false });
  const failureSound = () => playSound(failSound, { volume: 0.5, loop: false });

  
  let itemsToIdentify: number = 0;

  let recPassDesc: string;
  if (CurrentCase?.recreationPass) {
    recPassDesc = "Valid RecPass";
  } else {
    recPassDesc = "No RecPass";
  }

  /**
   * Trigger adding of animation class to open case to animate case leaving page.
   */
  function closeTranscript() {
    const timerId = juniorCallRef.current;
    clearTimeout(timerId);

    closingStateSetter(true);
  }

  /**
   * listens for the end of the case close animation and shows the next case or sets the no open case view.
   */
  function handleAnimationEnd(e: React.AnimationEvent<HTMLDivElement>) {
    if (e.animationName === "transcript-slide-out") {
      if (nextCase != CurrentCase && nextCase != null) {
        CurrentCaseSetter(nextCase);
        CurrentSelectedSetter(nextCase.identifier);
      } else {
        CurrentCaseSetter(null);
        CurrentSelectedSetter(NIL_UUID);
      }
      closingStateSetter(false);
    }
  }
  /**
   * retrieves the index of the currently active case within the transcript list
   * @returns the index(number) of currently active case
   */
  function getCaseIndex(): number {
    let foundIndex: number = 0;
    if (CurrentCase && transcriptList) {
      foundIndex = transcriptList.findIndex((caseFile) => {
        return CurrentCase.identifier === caseFile.identifier;
      });
    }
    if (foundIndex > 0) {
      return foundIndex;
    } else {
      return 0;
    }
  }

  /**
   * Changes the active case based on the index of the currently active case. can either go back 1 or forwards 1
   * @param direction which direction to move in the transcript list, either "next" or "previous"
   * @returns reviewShape object that holds all the details of the transcript being changed to.
   */
  function changeCase(direction: string) {
    if (transcriptList) {
      let currentCaseIndex = getCaseIndex();

      if (direction === "next") {
        currentCaseIndex += 1;
      } else if (direction === "previous") {
        currentCaseIndex -= 1;
      }
      if (currentCaseIndex >= transcriptList.length) {
        currentCaseIndex = 0;
      }
      if (currentCaseIndex < 0) {
        currentCaseIndex = transcriptList.length - 1;
      }
      closingStateSetter(true);
      return nextCaseSetter(transcriptList[currentCaseIndex]);
    }
  }

  function callColleague(colleagueLevel: string) {
    if (!inCall) {
      if (colleagueLevel === "junior") {
        if (!juniorCall) {
          juniorCallSetter(true);
        }
      } else if (colleagueLevel === "senior")
        if (!seniorCall) {
          seniorCallSetter(true);
        }
      setInCall(true);
      playCustomSound("callContent");
      //logic to simulate a brief call and chance based decision.
      const callId = setTimeout(() => {
        simCall(colleagueLevel);
      }, 8000);
      juniorCallRef.current = callId;
    }
  }

  function simCall(colleagueLevel: string) {
    const callId = juniorCallRef.current;
    clearInterval(callId);
    setInCall(false);
    setCallTalking("");
    //make decision
    let chance = 0.6;
    if (colleagueLevel === "senior") {
      chance = 0.8;
    }
    if (Math.random() < chance) {
      //correct decision
      if (CurrentCase && CurrentCase?.overallWeighting >= 0) {
        setCallResult("It's definately an NFA");
      } else {
        setCallResult("Re-educate ASAP!");
      }
    } else {
      setCallResult("sorry, it's my first day...");
    }
  }

  function handleCallSim(e: React.AnimationEvent) {
    if (e.animationName === "call-ring") {
      setCallTalking("Explaining case details...");
    }
  }
  function handleDecision(e: React.MouseEvent<HTMLButtonElement>) {
    playCustomSound("buttonPress");
    if (CurrentCase) {
      if(decrypt) {setDecrypt(false)}
      const decision = e.currentTarget.dataset.decision;
      const personWeighting: number = CurrentCase.overallWeighting;
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

      function updateCreditTotal(
        creditAdjustment: number,
        direction: boolean,
        category: string,
      ) {
        if (playerData) {
          let newTotal: number = playerData.player_credits;
          let decisionOutcome: boolean;
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
            const allTranscripts = [...transcriptList];
            const foundTranscript = allTranscripts.find(
              (t) => t.identifier === CurrentCase?.identifier,
            );
            if (foundTranscript) {
              foundTranscript.rewardEarned = creditAdjustment;
              foundTranscript.processed = true;
              foundTranscript.decision = decisionText;
              foundTranscript.decisionOutcome = decisionOutcome;
              foundTranscript.outcomeCategory = category;
              setTranscriptList(allTranscripts);
              //positive
            }
          }

          //update playerdata with increase/decrease in credits.
          const dataToUpdate = { ...playerData };
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
            failureSound();
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
            failureSound();
            updateCreditTotal(wrongAnswer, false, "Re-educate");
          }
          break;
        default:
          break;
      }
    }
    CheckComplete()
  }
  return (
    <>
      {CurrentCase && (
        <>
          <div className="case-container">
            <div
              id="tutorial-step-9"
              className={
                "transcript-container " +
                (!closingState ? "open-transcript-class" : "slide-out-class") +
                " " +
                (tutorialState.tutorialActive &&
                tutorialState.tutorialStep === 9
                  ? "tutorial-highlight"
                  : "")
              }
              onAnimationEnd={handleAnimationEnd}
            >
              <button
                aria-label="Close case details"
                id="transcript-close-button"
                onClick={() => {
                  closeTranscript();
                  playCustomSound("buttonPress");
                }}
              >
                <X />
              </button>
              <div
                id="case-map-container"
                className={
                  cityMapState
                    ? "map-container-visible"
                    : "map-container-hidden"
                }
              >
                {cityMapState &&
                  <CaseReviewMap />
                }
                <button
                tabIndex={(cityMapState ? 0 : -1)}
                  className="close-button"
                  onClick={() => {
                    setCityMapState(false);
                    playCustomSound("buttonPress");
                  }}
                >
                  <X />
                </button>
              </div>
              <h2>
                {CurrentCase.interviewee.firstName}{" "}
                {CurrentCase.interviewee.lastName}
              </h2>
              <div className="interviewee-details">
                <CitizenAvatar
                  key={CurrentCase.identifier}
                  transcript={CurrentCase}
                  cityMapState={cityMapState}
                  cityMapSetter={setCityMapState}
                />

                <div className="interviewee-information">
                  <div className="details-row">
                    <p>
                      <span className="review-box-section-header">Age:</span>{" "}
                      {CurrentCase.age} |{" "}
                      <span className="review-box-section-header">Gender:</span>{" "}
                      {CurrentCase.gender.charAt(0).toUpperCase() +
                        CurrentCase.gender.slice(1)}
                    </p>
                  </div>

                  <div className="details-row">
                    <p>
                      <span className="review-box-section-header">
                        Occupation:
                      </span>{" "}
                      {CurrentCase.occupation.name}
                    </p>{" "}
                  </div>

                  <div className="details-row">
                    <p>
                      <span className="review-box-section-header">
                        Detained in:
                      </span>{" "}
                      {CurrentCase.location.name}
                    </p>
                  </div>
                  <div className="details-row">
                    <p>
                      <span className="review-box-section-header">
                        Behaviour:
                      </span>{" "}
                      {CurrentCase.behaviour}
                    </p>
                  </div>
                </div>
              </div>

              {/* show reward earned from making decision on this case. conditional on whether the case has been procesed */}
              {CurrentCase.processed ? (
                <div className="outcome-display">
                  <p>{CurrentCase.outcomeCategory}</p>
                  <p>{CurrentCase.decision}</p>
                  <p>
                    Credits:{CurrentCase.decisionOutcome ? "+" : "-"}
                    {CurrentCase.rewardEarned}
                  </p>
                </div>
              ) : (
                <div className="transcript-text">
                  <p>{CurrentCase.personFlavour}</p>
                </div>
              )}
              {CurrentCase.encryptedDrive.activeDrive && (
                <>
                  <p>
                    <button
                      className="drive-found-button"
                      onClick={() => {
                        setDecrypt(true);
                        playCustomSound("buttonPress");
                      }}
                    >
                      {CurrentCase.encryptedDrive.driveLocked ? (
                        <FolderKey>
                          <X />
                        </FolderKey>
                      ) : (
                        <FolderKey />
                      )}{" "}
                      Encrypted drive found{" "}
                    </button>
                  </p>

                  
                </>
              )}
               <div
                    id="decrypt-container"
                    className={
                      decrypt
                        ? "decrypt-container-visible"
                        : "decrypt-container-hidden"
                    }
                  >
                    <button
                      tabIndex={(decrypt ? 0: -1)}
                      id="close-decrypt"
                      onClick={() => {
                        setDecrypt(false);
                        playCustomSound("buttonPress");
                      }}
                    >
                      <X />
                    </button>
                      {decrypt && 
                        <DecryptConsole
                          decryptobj={CurrentCase.encryptedDrive}
                          transcript={CurrentCase}
                          setTranscriptList={setTranscriptList}
                          transcriptList={transcriptList}
                          decryptConsoleOpen={decrypt}
                        />
                      }
                  </div>
              <div className="passes-container">
                <div >
                  <div tabIndex={0}
                    data-tooltip-id="item-desc"
                    data-tooltip-content="A RecPass is needed to visit District 8.">
                  <DoorOpen
                  />
                  </div>
                  <div className="recreation-pass-container">
                    <div
                      data-tooltip-id="item-desc"
                      tabIndex={0}
                      data-tooltip-content={recPassDesc}
                      className="recreation-pass badge"
                    >
                      {CurrentCase.recreationPass ? (
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
                  <div tabIndex={0}
                    data-tooltip-id="item-desc"
                    data-tooltip-content="Authorized to visit these Districts"><MapPinned/></div>
                  <div className="location-pass-container ">
                    {CurrentCase.authorizedLocations.map((loc) => {
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
                  <div tabIndex={0}
                    data-tooltip-id="item-desc"
                    data-tooltip-content="Items found on interviewee."><Backpack/></div>
                  <div className="location-pass-container ">
                    {CurrentCase.items.map((item) => {
                      if (itemsToIdentify >= 0) {
                        --itemsToIdentify;
                      }
                      return (
                        <div
                          className={
                            (CurrentCase.revealItem
                              ? item.legal
                                ? "legal-item "
                                : "illegal-item "
                              : "") + " badge"
                          }
                          key={uuidv4()}
                          tabIndex={0}
                          data-tooltip-id="item-desc"
                          data-tooltip-content={
                            item.description +
                            (CurrentCase.revealItem
                              ? item.legal
                                ? " [Legal]"
                                : " [Illegal]"
                              : "")
                          }
                        >
                          {item.itemComponent}
                          <div className="illegal-item-symbol">
                            <XCircle size={12} />
                          </div>
                          <div className="legal-item-symbol">
                            <CircleCheck size={12} />
                          </div>
                        </div>
                      );
                    })}
                 
                  </div>
                    
                  <Tooltip id="item-desc" className="custom-tooltip"></Tooltip>
                </div>
              </div>

              

              {inCall && (
                <div
                  onAnimationEnd={(e) => handleCallSim(e)}
                  className="call-sim"
                >
                  {callTalking != "" ? (
                    <p>
                      {callTalking} <LoaderCircle className="loader" />
                    </p>
                  ) : (
                    <p>........</p>
                  )}
                </div>
              )}
              {callResult != "" && (
                <p className="colleague-call-result">
                  {'"'}
                  {callResult}
                  {'"'}
                </p>
              )}
              <div id="colleague-call-container">
                {checkUpgradeActive(
                  playerData?.player_unlocks,
                  "voucher11",
                ) && (
                  <>
                    {!juniorCall && (
                      <button onClick={() => callColleague("junior")}>
                        Call Junior Colleague
                      </button>
                    )}
                  </>
                )}
                {checkUpgradeActive(
                  playerData?.player_unlocks,
                  "voucher12",
                ) && (
                  <>
                    {!seniorCall && (
                      <button onClick={() => callColleague("senior")}>
                        Call Senior Colleague
                      </button>
                    )}
                  </>
                )}
              </div>
              {playerData?.player_unlocks.includes("voucher10") && (
                <button
                  onClick={() => {
                    setShowSearch(true);
                    playCustomSound("buttonPress");
                  }}
                  id="search-button"
                >
                  Search Console
                </button>
              )}
              <div
                id="search-container"
                className={showSearch ? "search-visible" : "search-hidden"}
              >
                <button
                tabIndex={(showSearch ? 0:-1)}
                  id="close-search"
                  onClick={() => {
                    setShowSearch(false);
                    playCustomSound("buttonPress");
                  }}
                >
                  <X />
                </button>
                {playerData?.player_unlocks.includes("voucher10") && showSearch &&  (
                  <SearchConsole />
                )}
              </div>
              <div
                id="evidence-container"
                className={
                  showEvidence ? "evidence-visible" : "evidence-hidden"
                }
              >
                <button
                tabIndex={(showEvidence ? 0:-1)}
                  id="close-evidence"
                  onClick={() => {
                    setShowEvidence(false);
                  }}
                >
                  <X />
                </button>
                <EvidenceStack caseDetails={CurrentCase} />
              </div>
            </div>
            <div
              id="tutorial-step-10"
              className={
                (tutorialState.tutorialActive &&
                tutorialState.tutorialStep === 10
                  ? "tutorial-highlight"
                  : "") + " decision-container"
              }
            >
              {!CurrentCase.processed ? (
                <div className="decision-buttons-container">
                  <button
                    onClick={() => {
                      changeCase("previous");
                      playCustomSound("buttonPress");
                    }}
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    id="nfa-button"
                    data-decision="nfa"
                    onClick={handleDecision}
                  >
                    No further action
                  </button>
                  <button
                    id="reeducate-button"
                    data-decision="reeducate"
                    onClick={handleDecision}
                  >
                    Send for re-education
                  </button>{" "}
                  <button
                    onClick={() => {
                      changeCase("next");
                      playCustomSound("buttonPress");
                    }}
                  >
                    <ChevronRight />
                  </button>
                </div>
              ) : (
                <>
                  <div className="processed-buttons-container">
                    <button
                      onClick={() => {
                        changeCase("previous");
                      }}
                    >
                      <ChevronLeft />
                    </button>
                    <button onClick={() => closeTranscript()}>
                      Close Case Notes
                    </button>

                    {playerData?.player_unlocks.includes("voucher9") ? (
                      <button
                        onClick={() => {
                          setShowEvidence((prev) => !prev);
                        }}
                      >
                        See Evidence
                      </button>
                    ) : (
                      <p
                        className="missing-evidence-upgrade"
                        data-tooltip-id="extra-case-tooltip"
                        data-tooltip-content="unlock via upgrade terminal"
                      >
                        Evidence Stack Missing
                      </p>
                    )}
                    <button
                      onClick={() => {
                        changeCase("next");
                      }}
                    >
                      <ChevronRight />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

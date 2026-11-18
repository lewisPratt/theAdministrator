import { playCustomSound } from "../../utilities/helperFunctions";
import type { reviewShape, transcriptListItemProps } from "../../interfaces/interfaces";
import {FolderTree } from "lucide-react";

/**
 * One entry in the case list: shows a citizen's case summary and opens it for review when selected.
 * @param props.ReviewTranscriptSetter sets the current case that is being reviewed
 * @param props.CurrentSelectedSetter sets the identifier of the current case being reviewed, for use in parent component
 * @param props.CurrentCaseIdentifier the identifier of the currently selected case, used for conditionally displaying visual effect to identify returned caseListItem as the currently selected item
 * @param props.RulesPanelState current state (open or closed) of the rules panel
 * @param props.RulesPanelStateSetter sets current state (open or closed) of the rules panel
 * @param props.CurrentOpenCase parent components (CaseReview) currently open case. 
 * @param props.CaseClosingStateSetter triggers currently open case to start close animation when set to true
 * @returns A single case row for the case review case list
 */
export default function CaseListItem({
  CurrentTranscript,
  ReviewTranscriptSetter,
  CurrentSelectedSetter,
  CurrentCaseIdentifier,
  RulesPanelState,
  NextCaseSetter,
  CurrentOpenCase,
  RulesPanelStateSetter,
  CaseClosingStateSetter
}: transcriptListItemProps) {
    
  /**
   * triggers the closure of any currently open case and opens the case associated with the list item the user clicked on. Also closes rule panel if open
   * @param transcript The case that will be displayed
   */
  function openTranscript(transcript: reviewShape) {
    if(RulesPanelState){
      RulesPanelStateSetter(false)
    }
    
    if(CurrentOpenCase === null){
      CurrentSelectedSetter(transcript.identifier)
      ReviewTranscriptSetter(transcript);
      NextCaseSetter(transcript)
    }else{
    NextCaseSetter(transcript)
    CaseClosingStateSetter(true)
    }
  }
 
  return (
    <>
    {CurrentTranscript &&
    <button
    aria-label="Open case details"
      className={(CurrentTranscript.bonusCase ? "bonus-case ":"")+(CurrentCaseIdentifier === CurrentTranscript.identifier ? "current-selected-item ": "") + (CurrentTranscript.processed && !CurrentTranscript.decisionOutcome ? "negative-processed-item" :"")+" transcript-list-item "+ (CurrentTranscript.processed && CurrentTranscript.decisionOutcome ? "positive-processed-item":"" ) }
      key={CurrentTranscript.interviewee.firstName + CurrentTranscript.age}
      onClick={() => {openTranscript(CurrentTranscript);playCustomSound("buttonPress")}}
    >
      
      <img  alt="" src={CurrentTranscript.avatar} onError={(e) => {
          if (e.currentTarget.dataset.default != "set") {
            e.currentTarget.src = "src/assets/images/default-avatar.wep";
            e.currentTarget.dataset.default = "set";
          } else {
            if (e.currentTarget.parentElement) {
              e.currentTarget.style.cssText =
                "background-color: #a2eaa2;";
            }
            e.currentTarget.before("Avatar Not Found");
           
          }
        }} />
      <span className="desktop-case-element">{CurrentTranscript.interviewee.firstName[0]}. {CurrentTranscript.interviewee.lastName}</span>  
      {CurrentTranscript.bonusCase === true ? <span className="desktop-case-element"> <FolderTree data-tooltip-id="extra-case-tooltip" data-tooltip-content="Bonus case from upgrade." /></span>  : ""}
    </button>}
    </>
  );
}

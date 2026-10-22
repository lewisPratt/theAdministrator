import type { reviewShape, transcriptListItemProps } from "../../interfaces/interfaces";
import {FolderTree } from "lucide-react";

export default function CaseListItem({
  currentTranscript,
  reviewTranscriptSetter,selectedSetter,
  identifier,
  codexState,
  nextCaseSetter,
  currentOpenCase,
  codexStateSetter
}: transcriptListItemProps) {
    
  function openTranscript(transcript: reviewShape) {
    if(codexState){
      codexStateSetter(false)
    }
    console.log(currentTranscript)
    if(currentOpenCase === null){
      selectedSetter(transcript.identifier)
      reviewTranscriptSetter(transcript);
      nextCaseSetter(transcript)
    }else{
    nextCaseSetter(transcript)
    }
  }
 
  return (
    <>
    {currentTranscript &&
    <button
    aria-label="Open case details"
      className={(currentTranscript.bonusCase ? "bonus-case ":"")+(identifier === currentTranscript.identifier ? "current-selected-item ": "") + (currentTranscript.processed && !currentTranscript.decisionOutcome ? "negative-processed-item" :"")+" transcript-list-item "+ (currentTranscript.processed && currentTranscript.decisionOutcome ? "positive-processed-item":"" ) }
      key={currentTranscript.interviewee.firstName + currentTranscript.age}
      onClick={() => openTranscript(currentTranscript)}
    >
      <div className="mobile-case-element"><span><img src={currentTranscript.avatar} 
       onError={(e) => {
          if (e.currentTarget.dataset.default != "set") {
            e.currentTarget.src = "default-avatar.webp";
            e.currentTarget.dataset.default = "set";
          } else {
            if (e.currentTarget.parentElement) {
              e.currentTarget.parentElement.style.cssText =
                "background-color: #a2eaa2;";
            }
            e.currentTarget.before("Avatar Not Found");
           
          }
        }}
      
      /></span></div>
      <div className="desktop-case-element">
      <img  alt="Citizen Avatar" src={currentTranscript.avatar} onError={(e) => {
          if (e.currentTarget.dataset.default != "set") {
            e.currentTarget.src = "default-avatar.webp";
            e.currentTarget.dataset.default = "set";
          } else {
            if (e.currentTarget.parentElement) {
              e.currentTarget.parentElement.style.cssText =
                "background-color: #a2eaa2;";
            }
            e.currentTarget.before("Avatar Not Found");
           
          }
        }} />
      <p>{currentTranscript.interviewee.firstName[0]}. {currentTranscript.interviewee.lastName}</p>  
      <p>{currentTranscript.bonusCase === true ? <FolderTree data-tooltip-id="extra-case-tooltip" data-tooltip-content="Bonus case from upgrade." /> : ""}</p>
    </div>
    </button>}
    </>
  );
}

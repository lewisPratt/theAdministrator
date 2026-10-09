import type{ CodexSidePanelProps } from "../../interfaces/interfaces";

export default function CodexSidePanel({
  codexState,
  codexStateSetter,
  currentTranscriptSetter,
  selectedSetter
}: CodexSidePanelProps) {

  currentTranscriptSetter(null)
  selectedSetter("0");
  return (
    <div
      id="side-panel"
      className={"" + (codexState ? "codex-enter" : "codex-exit")}
    >
      <section id="rules-section">
        <div className="rules-content">
        <div id="codex-console-header">
          <h3>What to look out for</h3>
        </div>
        <ol id="codex-list">
          <li>
            <span className='codex-section-title'>1 :</span>  Citizens are authorized to enter/visit districts that
            are higher (numerically) than their occupation District, but should
            not enter a lower (numerically) District, unless the following
            applies.
            <ul>
              <li>
                <span className='codex-section-title'>1.1 :</span> The Citizen has specific authorization to enter this
                District, as noted on their case notes.
              </li>
              <li>
                <span className='codex-section-title'>1.2 :</span> All Citizens are authorized to be in District 5,
                Habitation and Residential.
              </li>
              <li>
                <span className='codex-section-title'>1.3 :</span> All Citizens are authorized to be in District 8 if they
                hold a valid RecPass.
              </li>
            </ul>
          </li>
          <li>
            <span className='codex-section-title'>2 :</span> Citizens behaviour (compliance/non-compliance) during interview will
            factor into Administrators final decision.
          </li>
          <li>
            <span className='codex-section-title'>3 :</span> The possession of illegal/contraband items will negatively impact Citizens standing.
          </li>
        </ol>
         <button
        onClick={() => {
          codexStateSetter(false);
        }}
      >
        Close rules
      </button>
      </div>
      </section>
     
    </div>
  );
}

import type { Dispatch, SetStateAction } from "react";
interface CodexSidePanelProps {
  codexState: boolean;
  codexStateSetter: Dispatch<SetStateAction<boolean>>;
}

export default function CodexSidePanel({
  codexState,
  codexStateSetter,
}: CodexSidePanelProps) {
  return (
    <div
      id="side-panel"
      className={"" + (codexState ? "codex-enter" : "codex-exit")}
    >
      <section id="codex">
        <div id="codex-console-header">
          <h3>Regulatory Codex</h3>
        </div>
    <p>You are required to memorize the following rules in order to undertake your duty. </p><p>Failure to do so may result in Re-education.</p>
        <ol id="codex-list">
          <li>
            <span className='codex-section-title'>Section 1 :</span>  Citizens are authorized to enter/visit districts that
            are higher (numerically) than their occupation District, but should
            not enter a lower (numerically) District, unless the following
            applies.
            <ul>
              <li>
                <span className='codex-section-title'>1.1 :</span> The Citizen has specific authorization to enter this
                District, as noted on their transcript readout.
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
            <span className='codex-section-title'>Section 2 :</span> Minor infractions will be judged using Administrators
            discretion. Multiple infractions must not be ignored and will be
            dealt with accordingly.
          </li>
          <li>
            <span className='codex-section-title'>Section 3 :</span> Citizens observed behaviour during interview will
            factor into Administrators final decision.
          </li>
          <li>
            <span className='codex-section-title'>Section 4 :</span> The possession of illegal/contraband items will factor
            into Administrators final decision.
          </li>
        </ol>
        <p>Once you have accumulated 1000 Credits you can end your shift and exchange Credits for recreation vouchers.</p>
         <button
        onClick={() => {
          codexStateSetter(false);
        }}
      >
        Acknowledge
      </button>
      </section>
     
    </div>
  );
}

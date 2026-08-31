import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function RegulationsCodex() {
  const [codexState, setCodexState] = useState<boolean>(false);
  return (
    <section id="codex">
      <div id="codex-console-header">
        <p>Regulatory Codex</p>
        <div
          onClick={() => {
            setCodexState((prev) => !prev);
          }}
        >
          {!codexState ? <ChevronDown /> : <ChevronUp />}
        </div>
      </div>
      {codexState && (
        <>
          <p>Regulatory Codex</p>
          <ol id="codex-list">
            <li>
              Section 1 : Citizens are authorized to enter/visit districts that
              are higher (numerically) than their occupation District, but
              should not enter a lower (numerically) District, unless the
              following applies.
              <ul>
                <li>
                  1.1 : The Citizen has specific authorization to enter this
                  District, as noted on their transcript readout.
                </li>
                <li>
                  1.2 : All Citizens are authorized to be in District 5,
                  Habitation and Residential
                </li>
                <li>
                  1.3 : All Citizens are authorized to be in District 8 if they
                  hold a valid RecPass
                </li>
              </ul>
            </li>
            <li>
              Section 2 : Minor infractions will be judged using Administrators
              discretion. Multiple infractions must not be ignored and will be
              dealt with accordingly.
            </li>
            <li>
              Section 3 : Citizens presenting behaviour during interview will
              factor into Administrators final decision.
            </li>
            <li>
              Section 4 : The possession of illegal/contraband items will factor
              into Administrators final decision.
            </li>
          </ol>
        </>
      )}
    </section>
  );
}

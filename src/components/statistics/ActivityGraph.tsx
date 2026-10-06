import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Tooltip } from "react-tooltip";
import type { nodeShape } from "../../interfaces/interfaces";


export default function ActivityGraph() {
  let nodes: nodeShape[] = [];
  const [graphNodes, setGraphNodes] = useState<nodeShape[]>(nodes);
  const intensities = [1,1,2,2,2,2,2,2,2,2,2,2,2,3,3]

  useEffect(() => {
    for (let index = 0; index < 300; index++) {
      nodes.push({
        identifier: uuid().slice(0,8),
        intensity: intensities[Math.floor(Math.random() * intensities.length) ],
      });
    }
    const firstNodes = [...nodes]
    setGraphNodes(firstNodes);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      changeIntensity();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  function changeIntensity() {

    const amount = Math.floor(Math.random() * 100) + 1;
    let currentNodes = [...graphNodes];
    console.log(currentNodes.length);
    for (let index = 0; index < amount; index++) {
      currentNodes[Math.floor(Math.random() * 300)].intensity =
        intensities[Math.floor(Math.random() * intensities.length) ];
    }
    setGraphNodes(currentNodes);
  }

  return (
    <>
      <div id="activity-graph-container">
            <div className="activity-grid-header"><h2>Administrator Activity Tracker</h2></div>

        {graphNodes.map((thisNode) => {
          return (
            <div
              key={thisNode.identifier}
              data-tooltip-id="activity-tooltip"
              data-tooltip-content={"Administrator #" + thisNode.identifier + (thisNode.intensity === 1 ? " Under Scrutiny": "")+ (thisNode.intensity === 2 ? " Reviewing case files" : "")+ (thisNode.intensity === 3 ? " Being Assessed" : "")}
              className={
                "node " +
                (thisNode.intensity === 1 ? "intensity-1" : "") +
                (thisNode.intensity === 2 ? "intensity-2" : "") +
                (thisNode.intensity === 3 ? "intensity-3" : "")
              }
            ></div>
          );
        })}
        <div id="graph-key">
          <div id="key-header"><h2>Key</h2></div>
          <div id="key-element-container">
            
            <div className="node intensity-1"></div> <p>Under Scrutiny</p>
            <div className="node intensity-2"></div><p>Reviewing case files.</p>
            <div className="node intensity-3"></div><p>Being Assessed</p>
          </div>
        </div>
        <Tooltip id="activity-tooltip" className="custom-tooltip" />
      </div>
    </>
  );
}

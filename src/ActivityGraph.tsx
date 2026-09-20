import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Tooltip } from "react-tooltip";

interface nodeShape {
  intensity: number;
  identifier: string;
}
export default function ActivityGraph() {
  let nodes: nodeShape[] = [];
  const [graphNodes, setGraphNodes] = useState<nodeShape[]>(nodes);
  const intensities = [1,1,2,2,2,2,2,2,2,2,2,2,2,3,3]

  useEffect(() => {
    for (let index = 0; index < 300; index++) {
      nodes.push({
        identifier: uuid(),
        intensity: intensities[Math.floor(Math.random() * intensities.length) ],
      });
    }
    setGraphNodes(nodes);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      changeIntensity();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  function changeIntensity() {
    console.log("change");
    console.log(graphNodes[0]);
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
        {graphNodes.map((thisNode) => {
          return (
            <div
              key={thisNode.identifier}
              data-tooltip-id="activity-tooltip"
              data-tooltip-content={"Administrator #" + thisNode.identifier}
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
          <div id="key-element-container">
            <p><div className="node intensity-1"></div> Under Scrutiny</p>
            <p><div className="node intensity-2"></div> Reviewing case files.</p>
            <p><div className="node intensity-3"></div> In Review</p>
          </div>
        </div>
        <Tooltip id="activity-tooltip" className="custom-tooltip" />
      </div>
    </>
  );
}

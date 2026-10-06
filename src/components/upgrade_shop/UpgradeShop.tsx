import { useContext, useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import type {
  UpgradeShape,
  UpgradeListShape,
} from "../../interfaces/interfaces";
import { playSound } from "react-sounds";
import { allUpgrades } from "../../generator_modules/upgrades";
import { Badge } from "lucide-react";
import { CreditIcon } from "../../assets/custom_icons/credits";
import {useNavigate } from "react-router-dom";
import "../../assets/css/upgradeShop.css";
import { CurrentSlugContext } from "../../context_providers/CurrentSlugContext";
import { TutorialContext } from "../../context_providers/TutorialContext";

import { useRef } from "react";
import type { TooltipRefProps } from "react-tooltip";
import TutorialLogic from "../tutorial/TutorialLogic";
import { PlayerContext } from "../../context_providers/PlayerContext";
export default function UpgradeShop() {
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [confirming, setConfirming] = useState<string | null>(null);
  const { setCurrentSlug } = useContext(CurrentSlugContext);
  const { tutorialState } = useContext(TutorialContext);
  const { playerData, setPlayerData } = useContext(PlayerContext);
  const navigate = useNavigate();

  const [errorState, setErrorState] = useState<string | null>(null);
  const hoverClick = () => playSound("ui/button_soft");
  const purchaseSound = () => playSound("ui/success_bling");
  const cantAfford = () => playSound("notification/error");
  const tooltipRef1 = useRef<TooltipRefProps>(null);

  const debug = false;
  const upgrades: UpgradeListShape = allUpgrades;

  useEffect(() => {
    setTimeout(setLoadingState, 2000, false);
  });

  function giveCredits() {
    if (playerData) {
      let dataToUpdate = { ...playerData };
      dataToUpdate.player_credits = dataToUpdate.player_credits + 1000;
      setPlayerData(dataToUpdate);
    }
  }
  function resetCredits() {
     if (playerData) {
      let dataToUpdate = { ...playerData };
      dataToUpdate.player_credits = 0;
      setPlayerData(dataToUpdate);
    }
  }
  function resetUpgrades() {
    if (playerData) {
      let dataToUpdate = { ...playerData };
      dataToUpdate.player_unlocks = []
      setPlayerData(dataToUpdate);
    }
  }
  function confirmChoice(e: React.MouseEvent<HTMLButtonElement>) {
    setErrorState(null);
    if (
      e.currentTarget.dataset.upgradeName &&
      e.currentTarget.dataset.upgradeIdent
    ) {
      const chosenUpgradeIdent: string = e.currentTarget.dataset.upgradeIdent;
      if (confirming === chosenUpgradeIdent) {
        setConfirming(null);
      } else {
        const chosenUpgrade: UpgradeShape = upgrades[`${chosenUpgradeIdent}`];

        if (chosenUpgrade != undefined) {
          setConfirming(chosenUpgradeIdent);
        }
      }
    }
  }

  function purchaseUpgrade() {
    if (confirming != null) {
      const selectedUpgrade = upgrades[`${confirming}`];
      if (playerData) {
        if (playerData.player_credits < selectedUpgrade.cost) {
          setErrorState("You do not have enough credits");
          cantAfford();
        } else {
          //purchase made, update plyerdata with credit balance and unlocks then set playerdata and store local data
          let dataToUpdate = { ...playerData };
          dataToUpdate.player_credits =
            dataToUpdate.player_credits - selectedUpgrade.cost;
          let updatedUnlocks: string[] = [];
          if (dataToUpdate.player_unlocks != null) {
            updatedUnlocks = [...dataToUpdate.player_unlocks];
          }
          purchaseSound();
          updatedUnlocks.push(confirming);
          dataToUpdate.player_unlocks = updatedUnlocks
          setPlayerData(dataToUpdate);
          // saveLocalData(dataToUpdate);
        }
      } else {
        //error: no player data currently set
      }
    }
  }

  return (
    <>
      <TutorialLogic loadingState={loadingState} tooltipRef={tooltipRef1} />

      {loadingState ? (
        <p>
          <LoaderCircle className="loader" />
        </p>
      ) : (
        <section id="upgrade-shop">
          <div id="upgrade-shop-header">
            <h2>Upgrade Terminal</h2>

            {debug && (
              <div className="debug-container">
                <h6>Debug- not for production</h6>
                <button onClick={giveCredits}>Give credits</button>
                <button onClick={resetCredits}>Reset credits</button>
                <button onClick={resetUpgrades}>Reset Upgrades</button>
              </div>
            )}
          </div>
          <div id="personal-record-button">
            <button
              id="tutorial-step-14"
              className={
                tutorialState.tutorialActive &&
                tutorialState.tutorialStep === 14
                  ? "tutorial-highlight"
                  : ""
              }
              onClick={() => {
                navigate("/PersonalRecord");
                setCurrentSlug("nav.personal");
              }}
            >
              Personal Record
            </button>
          </div>
          <section
            id="tutorial-step-13"
            className={
              (tutorialState.tutorialActive && tutorialState.tutorialStep === 13
                ? "tutorial-highlight"
                : "") + " upgrade-items-container"
            }
          >
            <ol>
              {Object.entries(upgrades).map((upgrade) => {
                return (
                  <li>
                    <button
                      key={upgrade[0]}
                      className={
                        "upgrade-box " +
                        (playerData?.player_unlocks.includes(upgrade[0])
                          ? "purchased-unlock-class"
                          : "unpurchased-unlock-class")
                      }
                      data-upgrade-name={upgrade[1].name}
                      data-upgrade-ident={upgrade[0]}
                      onClick={(e) => {
                        confirmChoice(e);
                        hoverClick();
                      }}
                    >
                      <Badge size={48}>{upgrade[1].icon}</Badge>
                      <span className="upgrade-name">
                        {upgrade[1].name}
                      </span>{" "}
                      <span>
                        {playerData?.player_unlocks.includes(upgrade[0]) &&
                          "[Purchased]"}{" "}
                        <CreditIcon className="custom-icon" />
                        {upgrade[1].cost}
                      </span>
                    </button>
                    {confirming != null && confirming === upgrade[0] && (
                      <div>
                        <p className="upgrade-desc">{upgrade[1].desc}</p>
                        <p>Effect: {upgrade[1].perkEffect}</p>
                        {errorState != null && (
                          <p id="upgrade-error">{errorState}</p>
                        )}

                        {!playerData?.player_unlocks.includes(upgrade[0]) && (
                          <div className="purchase-button-container">
                            <button onClick={purchaseUpgrade}>
                              <CreditIcon className="custom-icon" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        </section>
      )}
    </>
  );
}

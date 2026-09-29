import UnlockedUpgrades from "./UnlockedUpgrades";
import "../../assets/css/personalRecord.css";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { LoaderCircle } from "lucide-react";
import { CurrentSlugContext } from "../../context_providers/CurrentSlugContext";

export default function PersonalRecord() {
  const navigate = useNavigate();
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const { setCurrentSlug } = useContext(CurrentSlugContext);
  //turn off loading indicator after set interval
  useEffect(() => {
    setTimeout(setLoadingState, 2000, false);
  }, []);
  return (
    <>
      {loadingState ? (
        <p>
          <LoaderCircle className="loader" />
        </p>
      ) : (
        <section id="personal-record">
          <p>View your mediocre personal achievements & upgrades.</p>

          {/* //upgrades unlocked component */}
          <UnlockedUpgrades />
          <button
            id="visit-upgrades-button"
            onClick={() => {
              navigate("/UpgradeShop");
              setCurrentSlug("nav.upgrade");
            }}
          >
            Upgrade Terminal
          </button>
          {/* //total cases reviewed component */}

          {/* //pass/fail ratio */}

          {/* //reset data component */}
          <Tooltip id="unlocks-tooltip" className="custom-tooltip" />
        </section>
      )}
    </>
  );
}

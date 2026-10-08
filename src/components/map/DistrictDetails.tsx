import type { Dispatch, SetStateAction } from "react";
import type {
  districtDetails,
  locationsShape,
  occupationsShape,
} from "../../interfaces/interfaces";
import { X } from "lucide-react";
import { getDetailsForDistrict } from "../../assets/utils/helpers";

interface districtDetailsProps {
  districtDetails: districtDetails | null;
  setDistrictDetails: Dispatch<SetStateAction<districtDetails | null>>;
}

export default function DistrictDetails({
  districtDetails,
  setDistrictDetails,
}: districtDetailsProps) {
    if(districtDetails){
    const previousDistrict : number = districtDetails.districtNumber -1 > 0 ? districtDetails.districtNumber -1 : 13
    const nextDistrict : number = districtDetails.districtNumber +1 <= 13 ? districtDetails.districtNumber +1 : 1
    
  let listToShow: occupationsShape[] | locationsShape[] | null = null;
  if (districtDetails?.activeList === "occupations") {
    listToShow = districtDetails.occupations;
  } else if (districtDetails?.activeList === "locations") {
    listToShow = districtDetails.locations;
  }

  function setListActive(listToSet: string) {
    if (districtDetails) {
      let districtData: districtDetails = { ...districtDetails };
      districtData.activeList = listToSet;
      setDistrictDetails(districtData);
    }
  }


  return (
    <>
      {districtDetails && districtDetails != null && listToShow && (
        <div className="map-details-container">
          <div className="exit-details-button-container">
            <button
              className="close-district-details-button"
              aria-label="Close District Details"
              onClick={() => setDistrictDetails(null)}
            >
              <X size={16} />
            </button>
          </div>
          <div className="district-details-title">
            <div className="info-swap-buttons">
              <button
                onClick={() => setListActive("occupations")}
                className={
                  districtDetails.activeList === "occupations"
                    ? "active-details"
                    : ""
                }
              >
                Occupations
              </button>
              <button
                onClick={() => setListActive("locations")}
                className={
                  districtDetails.activeList === "locations"
                    ? "active-details"
                    : ""
                }
              >
                Locations
              </button>
            </div>
            <h1>District {districtDetails.activeList}</h1>
            <h2>District {districtDetails.districtNumber}</h2>
            <button className="previous-district" onClick={()=>{setDistrictDetails(getDetailsForDistrict(previousDistrict))}}>prev</button>
            <button className="next-district" onClick={()=>{setDistrictDetails(getDetailsForDistrict(nextDistrict))}}>next</button>
          </div>
          <ul>
            {listToShow.map((occupation) => {
              return (
                <>
                  <li>{occupation.name}</li> <hr></hr>
                </>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );}
  else{
    return (<p>No details</p>)
  }
}

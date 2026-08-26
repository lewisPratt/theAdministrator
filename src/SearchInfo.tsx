import { useState } from "react";
import { locations } from "./LocationGenerator";
import type { locationsShape } from "./interfaces";
interface searchResultShape {
  resultName: string;
  resultDistrict: number;
  resultLegality: boolean;
}
export default function SearchConsole() {
  const [searchResult, setSearchResult] = useState<searchResultShape[] | null>(
    null,
  );
  let searchDebounce :number  

  async function debounceSearch(e: React.ChangeEvent<HTMLInputElement>){
    clearTimeout(searchDebounce)
    const searchTerm = e.currentTarget.value
     if (searchTerm === "") {
      setSearchResult(null);
      return;
    }
    if (searchTerm.length >= 3) {
     searchDebounce = setTimeout(()=>{performSearch(searchTerm)}, 2000);
    }
  }

  function performSearch(searchTerm: string) {
    
    const enteredTerm = searchTerm.toLowerCase();
   
    
      const locationResult: locationsShape[] = locations.filter(searchForMatch);
      function searchForMatch(item: locationsShape) {
        let re = new RegExp(String.raw`${enteredTerm}`, "gi");
        return item.name.match(re);
      }

      if (locationResult) {
        console.log(locationResult);
        let results: searchResultShape[] = [];
        locationResult.forEach((location) => {
          results.push({
            resultName: location.name,
            resultDistrict: location.district,
            resultLegality: true,
          });
        });

        setSearchResult(results);
      }
    
  }

  return (
    <>
      <input type="text" onChange={debounceSearch}></input>
      {searchResult &&
        searchResult.map((item) => {
          return (
            <p>
              {item.resultName} - District {item.resultDistrict}
            </p>
          );
        })}
    </>
  );
}

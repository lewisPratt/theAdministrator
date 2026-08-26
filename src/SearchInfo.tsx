import { useState } from "react";
import { locations } from "./LocationGenerator";
import { occupations } from "./OccupationGenerator";
import type { locationsShape, occupationsShape } from "./interfaces";
import { LoaderCircle } from "lucide-react";
import { useRef } from "react";
interface searchResultShape {
  resultName: string;
  resultDistrict: number;
  resultLegality: boolean;
}
export default function SearchConsole() {
  const [searchResult, setSearchResult] = useState<searchResultShape[] | null>(
    null,
  );
  const [searchLoadState, setSearchLoadState] = useState<boolean>(false);

  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function debounceSearch(e: React.ChangeEvent<HTMLInputElement>) {
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }
    setSearchResult(null);
    const searchTerm: string = e.currentTarget.value;
    if (searchTerm === "") {
      setSearchResult(null);
      setSearchLoadState(false);
      return;
    }
    if (searchTerm.length >= 3) {
      setSearchLoadState(true);
      const searchType: string = e.currentTarget.dataset.searchType ?? "";

      searchDebounceRef.current = setTimeout(() => {
        performSearch(searchTerm, searchType);
      }, 2000);
    } else if (searchTerm.length < 3) {
      setSearchLoadState(false);
    }
  }

  function performSearch(searchTerm: string, searchType: string) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    let results: searchResultShape[] = [];
    //search for location
    if (searchType === 'district') {
      const locationResult: locationsShape[] = locations.filter((item) => {
        let re = new RegExp(String.raw`${lowerSearchTerm}`, "gi");
        return item.name.match(re);
      });

      if (locationResult) {
        locationResult.forEach((location) => {
          results.push({
            resultName: location.name,
            resultDistrict: location.district,
            resultLegality: true,
          });
        });
      }
    }
    //search for occupation
    else if(searchType === 'occupation'){
        const occupationResult: occupationsShape[] = occupations.filter((item) => {
        let re = new RegExp(String.raw`${lowerSearchTerm}`, "gi");
        return item.name.match(re);
      });

      if (occupationResult) {
        occupationResult.forEach((occupation) => {
          results.push({
            resultName: occupation.name,
            resultDistrict: occupation.district,
            resultLegality: true,
          });
        });
      }
    }
      setSearchLoadState(false);
      setSearchResult(results);
    
  }

  return (
    <>
      <input
        className="search-input"
        type="text"
        onChange={debounceSearch}
        placeholder="District Lookup"
        data-search-type="district"
      ></input>
      <input
        className="search-input"
        type="text"
        onChange={debounceSearch}
        placeholder="Occupation Lookup"
        data-search-type="occupation"
      ></input>

      {searchLoadState && (
        <p>
          <LoaderCircle className="loader" />
        </p>
      )}
      {searchResult &&
        searchResult.map((item) => {
          return (
            <p key={item.resultName + item.resultDistrict}>
              {item.resultName} - District {item.resultDistrict}
            </p>
          );
        })}
    </>
  );
}

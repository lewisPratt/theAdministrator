import { useState } from "react";
import { locations } from "./LocationGenerator";
import { occupations } from "./OccupationGenerator";
import type { carryableItemsShape, locationsShape, occupationsShape } from "./interfaces";
import { ChevronDown, ChevronUp, LoaderCircle, X, MapPinned, HandCoins } from "lucide-react";
import { useRef } from "react";
import { carryableItems } from "./CarryableItems";
interface searchResultShape {
  resultName: string;
  resultDistrict: number;
  resultLegality: boolean;
  resultType: string;
}
interface normalizedResultsShape {
  name: string
  district: number
  category: string
}
export default function SearchConsole() {
  const [searchResult, setSearchResult] = useState<searchResultShape[] | null>(
    null,
  );
  const [searchLoadState, setSearchLoadState] = useState<boolean>(false);
  const [searchConsoleState, setSearchConsoleState] = useState<boolean>(false);
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function debounceSearch(e: React.ChangeEvent<HTMLInputElement>) {
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
    if (searchType === "district") {
      const locationResult: locationsShape[] = locations.filter((item) => {
        let re = new RegExp(String.raw`${lowerSearchTerm}`, "gi");
        return item.name.match(re);
      });
        const occupationResult: occupationsShape[] = occupations.filter(
        (item) => {
          let re = new RegExp(String.raw`${lowerSearchTerm}`, "gi");
          return item.name.match(re);
        },
      );
      let locationSearchResults :normalizedResultsShape[] = []
      let occupationSearchResults :normalizedResultsShape[] = []

      locationResult.forEach(location => {
        locationSearchResults.push({name: location.name, district: location.district, category: 'location'})
      });
      occupationResult.forEach(location => {
        occupationSearchResults.push({name: location.name, district: location.district, category: 'occupation'})
      });

      const allResults = [...locationSearchResults, ...occupationSearchResults]
      

      if (allResults) {
        allResults.forEach((result) => {
          results.push({
            resultName: result.name,
            resultDistrict: result.district,
            resultLegality: true,
            resultType: result.category,
          });
        });
      }
    }
    //search for occupation
    else if (searchType === "item") {
      const occupationResult: carryableItemsShape[] = carryableItems.filter(
        (item) => {
          let re = new RegExp(String.raw`${lowerSearchTerm}`, "gi");
          return item.description.match(re);
        },
      );
      console.log(occupationResult)
      if (occupationResult) {
        occupationResult.forEach((occupation) => {
          results.push({
            resultName: occupation.description,
            resultDistrict: 0,
            resultLegality: occupation.legal,
            resultType: "item",
          });
        });
      }
    }
    setSearchLoadState(false);
    setSearchResult(results);
  }

  function toggleSearchConsole() {
    setSearchResult(null);
    setSearchConsoleState((prev) => !prev);
  }

  return (
    <div id="search-console-container">
      <div id="search-console-header">
        <p>Search Console</p>
        <div onClick={toggleSearchConsole}>
          {!searchConsoleState ? <ChevronDown /> : <ChevronUp />}
        </div>
      </div>
      {searchConsoleState && (
        <>
          <div id="search-input-container">
            <label htmlFor="occupation-search">Item Search</label>
            <input
              id="occupation-search"
              className="search-input"
              type="text"
              onChange={debounceSearch}
              placeholder="Item name"
              data-search-type="item"
            ></input>
            <label htmlFor="location-search">Location / Occupation Search</label>
            <input
              id="location-search"
              className="search-input"
              type="text"
              onChange={debounceSearch}
              placeholder="Location name"
              data-search-type="district"
            ></input>
            <div id='search-key'> Search Key: <HandCoins size={18}/> = Occuaption <MapPinned size={18}/> = Location</div>
          </div>
          <div id="search-result-container">
            {searchLoadState && (
              <p>
                <LoaderCircle className="loader" />
              </p>
            )}
            {searchResult && (
              <li id="search-results-header">
                Returned {searchResult.length}{" "}
                
                result{searchResult.length > 1 && "s"}
              </li>
            )}
            <ul>
              {searchResult ? (
                searchResult.map((item) => {
                  return (
                    <li
                      className="search-result-item"
                      key={item.resultName + item.resultDistrict}
                    >
                      {(item.resultType === 'location' ? <MapPinned/> : <HandCoins /> )}{item.resultName} - District {item.resultDistrict}
                    </li>
                  );
                })
              ) : (
                <li>Waiting for input...</li>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

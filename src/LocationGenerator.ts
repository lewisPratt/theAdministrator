import type { locationsShape } from "./interfaces";
const locations = [
  // District 1 — Central Administration
  { name: "Central Checkpoint", district: 1 },
  { name: "District Registry Office", district: 1 },
  { name: "Ration Distribution Center", district: 1 },
  { name: "Municipal Archive", district: 1 },
  { name: "Border Gate East", district: 1 },
  { name: "District Court", district: 1 },
  { name: "Loyalty Office", district: 1 },
  { name: "Ration Card Printing House", district: 1 },
  { name: "Registry basement archives", district: 1 },
  { name: "Highway checkpoint", district: 1 },
  { name: "Riverside checkpoint", district: 1 },
  { name: "Border interpreter's booth", district: 1 },
  { name: "District gate west", district: 1 },
  { name: "Old post office (defunct)", district: 1 },
  { name: "Municipal records vault", district: 1 },

  // District 2 — Detention & Security
  { name: "Detention Facility", district: 2 },
  { name: "Curfew Watchtower", district: 2 },
  { name: "Vagrant Processing Center", district: 2 },
  { name: "Bunker entrance - 'Shelter 12'", district: 2 },
  { name: "Interrogation Wing", district: 2 },
  { name: "Barracks Row", district: 2 },
  { name: "Detention transport bay", district: 2 },
  { name: "Detention camp perimeter", district: 2 },
  { name: "Curfew siren tower", district: 2 },

  // District 3 — Industrial / Power / Manufacturing
  { name: "Power Substation", district: 3 },
  { name: "Grid Control Hub", district: 3 },
  { name: "Textile Factory", district: 3 },
  { name: "Chem Lab Complex", district: 3 },
  { name: "Grain silo district", district: 3 },
  { name: "Municipal incinerator", district: 3 },
  { name: "Reactor cooling tower", district: 3 },
  { name: "Municipal greenhouse", district: 3 },
  { name: "Chemical storage depot", district: 3 },
  { name: "Grid workers' canteen", district: 3 },

  // District 4 — Water & Sewage
  { name: "Water Treatment Plant", district: 4 },
  { name: "Sewer Access Tunnel", district: 4 },
  { name: "Rooftop water tanks", district: 4 },

  // District 5 — Housing & Residential
  { name: "Housing Block 7", district: 5 },
  { name: "Public Bathhouse", district: 5 },
  { name: "Tenement Courtyard", district: 5 },
  { name: "Old Cathedral (Repurposed)", district: 5 },
  { name: "Bathhouse annex", district: 5 },
  { name: "District school (closed)", district: 5 },
  { name: "Municipal laundry", district: 5 },
  { name: "Housing office queue hall", district: 5 },

  // District 6 — Markets & Trade (legitimate)
  { name: "Shopping Mall", district: 6 },
  { name: "Underpass Market", district: 6 },
  { name: "Fish market - 'Salt Row'", district: 6 },
  { name: "Currency Exchange Booth", district: 6 },
  { name: "Vending arcade", district: 6 },
  { name: "Alley market - 'Pipe Row'", district: 6 },
  { name: "Tailor shop - 'Thread & Static'", district: 6 },
  { name: "Alley barber - 'Close Shave'", district: 6 },

  // District 7 — Black Market / Underground Trade
  { name: "Pawn shop - 'Last Resort Loans'", district: 7 },
  { name: "Scrap Yard", district: 7 },
  { name: "Gambling den - 'Fortune's Ledge'", district: 7 },
  { name: "Print shop - 'Grey Ink'", district: 7 },
  { name: "Smuggler's Dock", district: 7 },
  { name: "Chop shop - 'Torn Metal'", district: 7 },
  { name: "Black market alley", district: 7 },
  { name: "District pawn exchange", district: 7 },

  // District 8 — Nightlife & Vice
  { name: "Dive bar - 'The Choking Snake'", district: 8 },
  { name: "Nightclub - 'The Static Room'", district: 8 },
  { name: "Tattoo parlor - 'Barcode & Bone'", district: 8 },
  { name: "Skyline Rooftop Bar", district: 8 },
  { name: "Bootleg cinema - 'Flicker House'", district: 8 },
  { name: "Underground fight pit", district: 8 },
  { name: "Old cinema marquee district", district: 8 },

  // District 9 — Food & Dining
  { name: "Noodle stall - 'Auntie Ren's'", district: 9 },
  { name: "Diner - 'The Last Light'", district: 9 },
  { name: "Butcher's row", district: 9 },
  { name: "Riverside fish smokehouse", district: 9 },

  // District 10 — Medical & Health
  { name: "Back-alley clinic - 'Doc Halvorsen's'", district: 10 },
  { name: "Municipal Clinic", district: 10 },
  { name: "Quarantine Ward", district: 10 },
  { name: "Cybernetics clinic - 'New Hands'", district: 10 },
  { name: "Municipal pharmacy", district: 10 },
  { name: "Municipal morgue", district: 10 },

  // District 11 — Transport & Freight
  { name: "Train Terminal", district: 11 },
  { name: "Freight Yard", district: 11 },
  { name: "Cold Storage Warehouse", district: 11 },
  { name: "Elevated Rail Platform", district: 11 },
  { name: "Traffic Control Booth", district: 11 },
  { name: "Old subway platform", district: 11 },
  { name: "Salvage docks", district: 11 },
  { name: "Freight elevator shaft", district: 11 },
  { name: "Rail maintenance yard", district: 11 },

  // District 12 — Communications & Broadcast
  { name: "Broadcast Tower", district: 12 },
  { name: "Antenna Farm", district: 12 },
  { name: "Signal jamming station", district: 12 },
  { name: "Broadcast studio (state-run)", district: 12 },
  { name: "Rooftop antenna maze", district: 12 },

  // District 13 — Outskirts & Slums
  { name: "Rooftop Farm District", district: 13 },
  { name: "Alleyway - 'Rust Row'", district: 13 },
  { name: "Riverside Slum", district: 13 },
  { name: "Rooftop pigeon coops", district: 13 },
  { name: "Alley shrine", district: 13 },
  { name: "Fortune teller's tent", district: 13 },
  { name: "Vagrant shelter", district: 13 },
  { name: "Ash-covered plaza", district: 13 },
];

function shuffleLocations(a: locationsShape[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}

export default function createLocation() {
    shuffleLocations(locations)
  return locations[0]
}

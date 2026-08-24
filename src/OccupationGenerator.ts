

export const occupations = [
  "Data Courier", "Ration Clerk", "Grid Technician", "Synth-Meat Vendor", "Checkpoint Guard",
  "Air Filtration Engineer", "Street Medic", "Signal Jammer Repairman", "Municipal Archivist", "Drone Pilot",
  "Curfew Enforcer", "Black Market Trader", "Power Relay Operator", "Facial Scan Technician", "Housing Inspector",
  "Pipe Welder", "Noodle Stall Cook", "Freight Loader", "Surveillance Analyst", "Print Forger",
  "Tenement Landlord", "Water Ration Auditor", "Neon Sign Installer", "Pawnbroker", "Transit Conductor",
  "Chem Lab Assistant", "Registry Clerk", "Vagrant Processor", "Scrap Metal Dealer", "Vaccine Runner",
  "Pest Control Operative", "Hydroponics Farmer", "Municipal Debt Collector", "Elevator Mechanic", "Border Interpreter",
  "Undercover Informant", "Antenna Rigger", "Ration Card Printer", "Alley Vendor", "Cybernetics Fitter",
  "Broadcast Censor", "Sewage Technician", "Loyalty Auditor", "Textile Weaver", "Streetlamp Repairer",
  "Contraband Sniffer", "Records Clerk", "Prosthetics Technician", "Wastewater Recycler", "Fingerprint Analyst",
  "Bunker Custodian", "Cargo Inspector", "Firmware Cracker", "Propaganda Illustrator", "Currency Exchanger",
  "Skyline Window Cleaner", "Detention Clerk", "Vending Machine Restocker", "Reactor Janitor", "ID Verification Officer",
  "Smuggler's Contact", "Rooftop Farmer", "Cable Splicer", "Traffic Signal Operator", "Barcode Tattooist",
  "Riot Cleanup Crew", "Meat Ration Butcher", "Alley Locksmith", "Municipal Herbalist", "Terminal Operator",
  "Freight Dock Foreman", "Radiation Sweeper", "Interrogation Clerk", "Fabric Dyer", "Cold Storage Attendant",
  "Chip Implant Technician", "Underpass Beggar", "District Announcer", "Loudspeaker Repairman", "Night Shift Welder",
  "Ration Line Marshal", "Synth Fuel Attendant", "Rooftop Pigeon Keeper", "Alleyway Fortune Teller", "Salvage Diver",
  "Municipal Tailor", "Compound Interest Broker", "Checkpoint Translator", "Vent Shaft Cleaner", "Battery Reclaimer",
  "District Cartographer", "Bootlegger", "Signal Tower Climber", "Ash Filter Changer", "Municipal Barber",
  "Quarantine Officer", "Freight Train Brakeman", "Neon Bulb Trader", "Alley Cook", "Detention Camp Cook",
  "Waste Sorter", "Grid Maintenance Supervisor"
];
function shufflejobs(a: string[]) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  }

export function CreateOccupation(){
    shufflejobs(occupations)
    return occupations[0]

}


function shuffleWords(a: string[]) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  }
export const firstNames = [
  "Aris", "Nyla", "Kael", "Sora", "Dax", "Vela", "Orin", "Zeta", "Ilan", "Nova",
  "Ryn", "Cass", "Theo", "Mira", "Juno", "Kade", "Lira", "Enzo", "Sena", "Vex",
  "Talia", "Rion", "Nyx", "Adric", "Wren", "Zael", "Cora", "Ashen", "Ivo", "Sable",
  "Kira", "Doran", "Elin", "Yara", "Mako", "Sylas", "Nadia", "Corin", "Thess", "Vale",
  "Odessa", "Kian", "Aveline", "Rex", "Senna", "Torin", "Lys", "Marek", "Priya", "Osric",
  "Nima", "Callix", "Ember", "Rael", "Vesna", "Jorin", "Skye", "Anwar", "Talon", "Iris",
  "Cyrus", "Halo", "Bren", "Sable", "Quinn", "Adair", "Fenn", "Lior", "Marisol", "Ozzy",
  "Zephyr", "Neve", "Adley", "Rasa", "Ceres", "Yusuf", "Indira", "Ronan", "Sable", "Malik",
  "Aisling", "Corvin", "Tessa", "Idris", "Nova", "Braxton", "Suri", "Emrys", "Delia", "Kaius",
  "Ansel", "Pia", "Voss", "Naomi", "Cade", "Selene", "Turo", "Amaya", "Rhen", "Isla"
];

export const lastNames = [
  "Voss", "Kessler", "Marlow", "Draven", "Onyeka", "Cortez", "Halden", "Reyes", "Aldric", "Sorin",
  "Marek", "Vance", "Idris", "Kestrel", "Osei", "Renner", "Sable", "Torvik", "Amari", "Blackwood",
  "Kade", "Solari", "Nyland", "Farrow", "Corvus", "Halvorsen", "Ibarra", "Weiss", "Dunmore", "Aral",
  "Vesper", "Okafor", "Landry", "Marchetti", "Serrano", "Kovacs", "Rourke", "Adeyemi", "Bracken", "Tanaka",
  "Voskuijlen", "Grier", "Osman", "Callahan", "Dresden", "Vantage", "Halloran", "Nakamura", "Estrada", "Ferro",
  "Winslow", "Aoki", "Barrow", "Delacroix", "Novak", "Amadi", "Rask", "Thorne", "Ilić", "Cassidy",
  "Marlowe", "Solomon", "Vidal", "Okonkwo", "Hargrove", "Kestner", "Duval", "Ashby", "Rennick", "Osei-Bonsu",
  "Faraday", "Corrin", "Blythe", "Nazari", "Wexler", "Almeida", "Draper", "Kirov", "Yamada", "Halston",
  "Renwick", "Adair", "Voskresenskiy", "Larkspur", "Osborn", "Marsh", "Torrance", "Kalani", "Fenwick", "Baptiste",
  "Halloway", "Serrat", "Nkemelu", "Dashwood", "Voronin", "Ambrose", "Kestrel", "Rowlands", "Adisa", "Marchetti"
];
  export function createName(){
shuffleWords(firstNames)
shuffleWords(lastNames)
 
    return firstNames[0] +' '+ lastNames[0]
  }
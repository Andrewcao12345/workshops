// Mock data for the prototype. Everything here is hardcoded on purpose.
// Floor plan coordinates are percentages of the floor-plan box.
// status: "occupied" (eating), "finishing" (check dropped, frees up soon), "reserved"
window.RESTAURANTS = {
  "bella-notte": {
    name: "Bella Notte",
    cuisine: "Italian Trattoria",
    emoji: "🍝",
    accent: "#c2410c",
    partiesAhead: 6,          // hardcoded place in line = partiesAhead + 1
    minutesPerParty: 4,       // hardcoded average turn time per party
    tables: [
      { id: "1",  seats: 2, x: 8,  y: 12, shape: "round", status: "occupied" },
      { id: "2",  seats: 2, x: 30, y: 12, shape: "round", status: "finishing" },
      { id: "3",  seats: 4, x: 54, y: 12, shape: "square", status: "occupied" },
      { id: "4",  seats: 4, x: 78, y: 12, shape: "square", status: "reserved" },
      { id: "5",  seats: 6, x: 8,  y: 48, shape: "long",  status: "occupied" },
      { id: "6",  seats: 4, x: 42, y: 48, shape: "square", status: "finishing" },
      { id: "7",  seats: 2, x: 66, y: 48, shape: "round", status: "occupied" },
      { id: "8",  seats: 8, x: 30, y: 72, shape: "long",  status: "finishing" },
      { id: "9",  seats: 2, x: 72, y: 72, shape: "round", status: "occupied" }
    ]
  },
  "sakura-house": {
    name: "Sakura House",
    cuisine: "Sushi & Ramen",
    emoji: "🍣",
    accent: "#be185d",
    partiesAhead: 3,
    minutesPerParty: 6,
    tables: [
      { id: "B1", seats: 1, x: 6,  y: 10, shape: "round", status: "occupied" },
      { id: "B2", seats: 1, x: 20, y: 10, shape: "round", status: "finishing" },
      { id: "B3", seats: 1, x: 34, y: 10, shape: "round", status: "occupied" },
      { id: "B4", seats: 1, x: 48, y: 10, shape: "round", status: "occupied" },
      { id: "T1", seats: 2, x: 70, y: 10, shape: "square", status: "occupied" },
      { id: "T2", seats: 4, x: 8,  y: 45, shape: "square", status: "finishing" },
      { id: "T3", seats: 4, x: 36, y: 45, shape: "square", status: "occupied" },
      { id: "T4", seats: 2, x: 66, y: 45, shape: "round", status: "finishing" },
      { id: "T5", seats: 6, x: 20, y: 72, shape: "long",  status: "occupied" },
      { id: "T6", seats: 4, x: 66, y: 72, shape: "square", status: "reserved" }
    ]
  },
  "smoke-and-oak": {
    name: "Smoke & Oak",
    cuisine: "BBQ Smokehouse",
    emoji: "🍖",
    accent: "#92400e",
    partiesAhead: 11,
    minutesPerParty: 3,
    tables: [
      { id: "A", seats: 4, x: 8,  y: 10, shape: "square", status: "occupied" },
      { id: "B", seats: 4, x: 32, y: 10, shape: "square", status: "finishing" },
      { id: "C", seats: 4, x: 56, y: 10, shape: "square", status: "occupied" },
      { id: "D", seats: 2, x: 80, y: 10, shape: "round", status: "occupied" },
      { id: "E", seats: 8, x: 8,  y: 46, shape: "long",  status: "occupied" },
      { id: "F", seats: 6, x: 52, y: 46, shape: "long",  status: "finishing" },
      { id: "G", seats: 2, x: 8,  y: 72, shape: "round", status: "finishing" },
      { id: "H", seats: 2, x: 30, y: 72, shape: "round", status: "occupied" },
      { id: "I", seats: 4, x: 56, y: 72, shape: "square", status: "reserved" },
      { id: "J", seats: 2, x: 80, y: 72, shape: "round", status: "occupied" }
    ]
  }
};

// "Guess" a table: the smallest table that fits the party, preferring ones
// that are finishing up soon, then occupied ones. Reserved tables are skipped.
window.guessTable = function (restaurant, partySize) {
  const rank = { finishing: 0, occupied: 1 };
  const fits = restaurant.tables
    .filter(t => t.seats >= partySize && t.status in rank)
    .sort((a, b) => (a.seats - b.seats) || (rank[a.status] - rank[b.status]));
  return fits[0] || restaurant.tables.reduce((a, b) => (b.seats > a.seats ? b : a));
};

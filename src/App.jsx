// src/App.jsx

import { useState } from "react";
import "./App.css";
// initial state values
const initialZombieFighters = [
  {
    name: "Survivor",
    price: 12,
    strength: 6,
    agility: 4,
    img: "https://via.placeholder.com/150/92c952",
  },
  {
    name: "Scavenger",
    price: 10,
    strength: 5,
    agility: 5,
    img: "https://via.placeholder.com/150/771796",
  },
  {
    name: "Shadow",
    price: 18,
    strength: 7,
    agility: 8,
    img: "https://via.placeholder.com/150/24f355",
  },
  {
    name: "Tracker",
    price: 14,
    strength: 7,
    agility: 6,
    img: "https://via.placeholder.com/150/d32776",
  },
  {
    name: "Sharpshooter",
    price: 20,
    strength: 6,
    agility: 8,
    img: "https://via.placeholder.com/150/1ee8a4",
  },
  {
    name: "Medic",
    price: 15,
    strength: 5,
    agility: 7,
    img: "https://via.placeholder.com/150/66b7d2",
  },
  {
    name: "Engineer",
    price: 16,
    strength: 6,
    agility: 5,
    img: "https://via.placeholder.com/150/56acb2",
  },
  {
    name: "Brawler",
    price: 11,
    strength: 8,
    agility: 3,
    img: "https://via.placeholder.com/150/8985dc",
  },
  {
    name: "Infiltrator",
    price: 17,
    strength: 5,
    agility: 9,
    img: "https://via.placeholder.com/150/392537",
  },
  {
    name: "Leader",
    price: 22,
    strength: 7,
    agility: 6,
    img: "https://via.placeholder.com/150/602b9e",
  },
];
const initialTeamStats = {
  totalStrength: 0,
  totalAgility: 0,
};
const App = () => {
  const [team, setTeam] = useState([]);
  const [money, setMoney] = useState(100);
  const [zombieFighters, setZombieFighters] = useState(initialZombieFighters);
  const [teamStats, setTeamStats] = useState(initialTeamStats);

  // add to team handler function
  const handleAddToTeam = (fighter) => {
    if (money - fighter.price >= 0) {
      setTeam([...team, fighter]);
      setTeamStats((prev) => ({
        totalStrength: prev.totalStrength + fighter.strength,
        totalAgility: prev.totalAgility + fighter.agility,
      }));
      setMoney((prev) => prev - fighter.price);
      const filterOutFighterFromAvailableFighters = zombieFighters.filter(
        (selectedFighter) => fighter.name !== selectedFighter.name
      );
      setZombieFighters(filterOutFighterFromAvailableFighters);
    } else {
      console.log("Not enough money");
    }
  };

  // remove from team handler function
  const handleRemoveFromTeam = (fighter) => {
    const filterFighterFromTeam = team.filter(
      (selectedFighter) => selectedFighter.name !== fighter.name
    );
    setTeam(filterFighterFromTeam);
    setMoney((prev) => prev + fighter.price);
    setTeamStats((prev) => ({
      totalStrength: prev.totalStrength - fighter.strength,
      totalAgility: prev.totalAgility - fighter.agility,
    }));

    setZombieFighters([...zombieFighters, fighter]);
  };
  return (
    <>
      <h1>World War Ziprecruiter</h1>
      {/* available fighters list */}
      <ul>
        {zombieFighters.map((fighter, idx) => {
          return (
            <li key={fighter.name + idx}>
              <FighterCard
                fighter={fighter}
                handleTeamMembership={handleAddToTeam}
                action="add"
              />
            </li>
          );
        })}
      </ul>
      <hr />

      <h2 style={{ textAlign: "center", margin: "2rem auto" }}>
        {team.length === 0 ? "Add Fighters!" : "Here are you fighters"}
      </h2>
      <div className="team-stats-container">
        <h3>Team Stats</h3>
        <span className="team-stats">Money Left: ${money}</span>{" "}
        <span className="team-stats">
          total strength: {teamStats.totalStrength}
        </span>
        <span className="team-stats">
          total agility: {teamStats.totalAgility}
        </span>
      </div>
      <hr />
      {/* team list */}
      <ul>
        {team.map((fighter, idx) => {
          return (
            <li key={fighter.name + idx + "team-member"}>
              <FighterCard
                fighter={fighter}
                handleTeamMembership={handleRemoveFromTeam}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default App;

// fighter card component
export const FighterCard = ({ fighter, handleTeamMembership, action }) => {
  return (
    <div className="fighter-card">
      <h3> {fighter.name}</h3>
      <img src={fighter.img} alt={fighter.name} />
      <div className="fighter-details-container">
        <span className="fighter-details">Price: {fighter.price}</span>
        <span className="fighter-details">strength: {fighter.strength}</span>
        <span className="fighter-details">agility: {fighter.agility} </span>
      </div>

      <button onClick={() => handleTeamMembership(fighter)}>
        {action === "add" ? "add fighter" : "remove fighter"}
      </button>
    </div>
  );
};

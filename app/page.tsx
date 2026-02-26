"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [points, setPoints] = useState(0);
  const [checkedIn, setCheckedIn] = useState(false);

  useEffect(() => {
    const savedPoints = localStorage.getItem("points");
    const lastCheck = localStorage.getItem("lastCheck");
    const today = new Date().toDateString();

    if (savedPoints) {
      setPoints(parseInt(savedPoints));
    }

    if (lastCheck === today) {
      setCheckedIn(true);
    }
  }, []);

  const handleCheckIn = () => {
    const today = new Date().toDateString();

    if (checkedIn) return;

    const newPoints = points + 10;

    setPoints(newPoints);
    setCheckedIn(true);

    localStorage.setItem("points", newPoints.toString());
    localStorage.setItem("lastCheck", today);
  };

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>🔥 Daily Check-In Mini App</h1>

      <h2>Total Points: {points}</h2>

      {checkedIn ? (
        <p>✅ Already checked in today</p>
      ) : (
        <button
          onClick={handleCheckIn}
          style={{
            padding: 12,
            background: "black",
            color: "white",
            borderRadius: 8,
            cursor: "pointer"
          }}
        >
          Check In (+10)
        </button>
      )}
    </div>
  );
}
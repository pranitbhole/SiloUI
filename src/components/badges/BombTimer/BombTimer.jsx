import { useEffect, useState } from "react";
import "./BombTimer.css";

function SevenSegmentDigit({ value }) {
  const segments = {
    0: ["a","b","c","d","e","f"],
    1: ["b","c"],
    2: ["a","b","g","e","d"],
    3: ["a","b","g","c","d"],
    4: ["f","g","b","c"],
    5: ["a","f","g","c","d"],
    6: ["a","f","g","c","d","e"],
    7: ["a","b","c"],
    8: ["a","b","c","d","e","f","g"],
    9: ["a","b","c","d","f","g"]
  };

  return (
    <div className="digit">
      {["a","b","c","d","e","f","g"].map((seg) => (
        <div
          key={seg}
          className={`segment ${seg} ${
            segments[value]?.includes(seg) ? "on" : ""
          }`}
        />
      ))}
    </div>
  );
}

function BombTimer({ duration = 40 }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [booting, setBooting] = useState(true);
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setBooting(false);
    }, 2000);
    return () => clearTimeout(bootTimer);
  }, []);

  useEffect(() => {
    if (booting || exploded) return;
    if (timeLeft <= 0) {
      setExploded(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, booting, exploded]);

  const formatDigits = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return [
      Math.floor(minutes / 10),
      minutes % 10,
      ":",
      Math.floor(seconds / 10),
      seconds % 10
    ];
  };

  const state =
    timeLeft <= 10 ? "critical" :
    timeLeft <= 20 ? "warning" :
    "normal";

  return (
    <div className={`bomb-board ${state}`}>
      
      {exploded && <div className="explosion-flash" />}

      {/* Wires */}
      <div className="wires">
        <div className="wire red" />
        <div className="wire blue" />
        <div className="wire yellow" />
      </div>

      {/* LED indicator */}
      {/* <div className="status-led" /> */}

      {/* LCD */}
      <div className="lcd-container">
        <div className="lcd-screen">
          {booting ? (
            <div className="boot-text">INITIALIZING...</div>
          ) : (
            <div className="lcd-digits">
              {formatDigits().map((char, i) =>
                char === ":" ? (
                  <div key={i} className="colon">:</div>
                ) : (
                  <SevenSegmentDigit key={i} value={char} />
                )
              )}
            </div>
          )}

          {/* Dust overlay */}
          <div className="lcd-noise" />
        </div>
      </div>

      {/* Side bumps */}
      <div className="side-bumps">
        <div className="bump" />
        <div className="bump" />
        <div className="bump" />
        <div className="bump" />
      </div>
    </div>
  );
}

export default BombTimer;

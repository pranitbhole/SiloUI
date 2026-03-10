import { useState, useEffect } from "react";
import "./CoreConsole.css";

export default function CoreConsole() {
  const [power, setPower] = useState(65);
  const [radiation, setRadiation] = useState(32);
  const [systemOn, setSystemOn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setRadiation((r) => {
        let next = r + (Math.random() * 4 - 2);
        return Math.max(0, Math.min(100, next));
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const needleRotation = power * 1.8 - 90;

  return (
    <div className="nuke-room">
      <div className="console-panel">

        <div className="panel-header">
          REACTOR CONTROL SECTOR B-12
        </div>

        <div className="panel-grid">

          {/* ANALOG GAUGE */}
          <div className="panel-module">
            <div className="gauge-container">
              <div className="gauge-face">
                <div
                  className="gauge-needle"
                  style={{ transform: `rotate(${needleRotation}deg)` }}
                />
                <div className="gauge-pivot" />
              </div>
              <div className="module-label">POWER OUTPUT</div>
            </div>
          </div>

          {/* CRT RADIATION SCREEN */}
          <div className="panel-module crt-module">
            <div className="crt-screen">
              <div className="scanline" />
              <div className="crt-content">
                RADIATION
                <div className="crt-value">
                  {Math.round(radiation)}%
                </div>
              </div>
            </div>
          </div>

          {/* TOGGLE WITH SAFETY COVER */}
          <div className="panel-module">
            <div className="safety-guard">
              <div className="glass-cover" />
              <div
                className={`lever ${systemOn ? "on" : ""}`}
                onClick={() => setSystemOn(!systemOn)}
              />
            </div>
            <div className="module-label">MAIN SYSTEM</div>
          </div>

        </div>

        {/* EMERGENCY STRIP */}
        <div className="emergency-strip">
          <button
            className="industrial-shutdown"
            onClick={() => {
              setPower(0);
              setSystemOn(false);
            }}
          >
            EMERGENCY SCRAM
          </button>
        </div>

        {/* Rivets */}
        <div className="rivet tl" />
        <div className="rivet tr" />
        <div className="rivet bl" />
        <div className="rivet br" />

      </div>
    </div>
  );
}

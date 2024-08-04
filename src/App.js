import { useEffect, useState } from "react";

const initial_time = { hours: 0, minutes: 0, seconds: 0 };

export default function App() {
  return (
    <div className="App">
      <h1>Timer App</h1>
      <Timer />
    </div>
  );
}

function Timer() {
  const [time, setTime] = useState(initial_time);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          let { hours, minutes, seconds } = prevTime;

          if (seconds > 0) seconds--;
          else if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
          }

          return { hours, minutes, seconds };
        });
      }, 1000);
    } else if (
      !isRunning &&
      (time.hours !== 0 || time.minutes !== 0 || time.seconds !== 0)
    ) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  function handleChange(e) {
    const { name, value } = e.target;

    setTime((prevTime) => ({
      ...prevTime,
      [name]: Number(value),
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleStart();
  }

  function handleStart() {
    setIsRunning(true);
  }

  function handlePause() {
    setIsRunning(false);
  }

  function handleReset() {
    setIsRunning(false);
    setTime(initial_time);
  }
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter hours"
          name="hours"
          value={time.hours === 0 ? "" : time.hours}
          onChange={handleChange}
        />
        :
        <input
          type="number"
          name="minutes"
          placeholder="Enter minutes"
          value={time.minutes === 0 ? "" : time.minutes}
          onChange={handleChange}
        />
        :
        <input
          type="number"
          name="seconds"
          placeholder="Enter seconds"
          value={time.seconds === 0 ? "" : time.seconds}
          onChange={handleChange}
        />
        <Button onClick={handleStart}>Start</Button>
        <Button onClick={handlePause}>Pause</Button>
        <Button onClick={handleReset}>Reset</Button>
      </form>

      <section>
        <span>{String(time.hours).padStart(2, "0")}:</span>
        <span>{String(time.minutes).padStart(2, "0")}:</span>
        <span>{String(time.seconds).padStart(2, "0")}</span>
      </section>
    </main>
  );
}

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

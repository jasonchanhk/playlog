import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { accessTimerState, start, reset, set } from '../slices/timerSlice';

const CountdownTimer: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [inputMinutes, setInputMinutes] = useState('');
  const [inputSeconds, setInputSeconds] = useState('');
  const [inputQuarter, setInputQuarter] = useState('');

  const dispatch = useAppDispatch();
  const { timeLeft, currentQuarter } = useAppSelector(accessTimerState);
  //   useEffect(() => {
  //     let interval: NodeJS.Timer;

  //     const handleSpacebarPress = (event) => {
  //       if (event.code === 'Space') {
  //         event.preventDefault();
  //         toggleTimer();
  //       }
  //     };

  //     document.addEventListener('keydown', handleSpacebarPress);

  //     return () => {
  //       document.removeEventListener('keydown', handleSpacebarPress);
  //       clearInterval(interval);
  //     };
  //   }, []);

  useEffect(() => {
    let interval: NodeJS.Timer | undefined = undefined;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        dispatch(start());
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsRunning(false);
      dispatch(reset());
      // Timer reached 0, perform any actions here
    }

    return () => clearInterval(interval); // Cleanup on unmount
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    setIsRunning((prevState) => !prevState);
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleresetCountdown = () => {
    setIsRunning(false);
    dispatch(reset());
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    const newMinutes = parseInt(inputMinutes, 10) || 0;
    const newSeconds = parseInt(inputSeconds, 10) || 0;
    const newTime = (newMinutes * 60) + newSeconds;
    dispatch(set({ newTime, newQuarter: inputQuarter }));
    setEditMode(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <h1>
        {editMode ? (
          <div>
            <input
              type="number"
              placeholder="Minutes"
              value={inputMinutes}
              onChange={(e) => setInputMinutes(e.target.value)}
            />
            :
            <input
              type="number"
              placeholder="Seconds"
              value={inputSeconds}
              onChange={(e) => setInputSeconds(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <span onClick={handleEdit}>
            Countdown: {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            (Click to edit)
          </span>
        )}
      </h1>
      <div>
        {editMode ? (
          <div>
            <input
              type="number"
              placeholder="Quarter"
              value={inputQuarter}
              onChange={(e) => setInputQuarter(e.target.value)}
            />
          </div>
        ) : (
          <span>
            currentQuarter: {currentQuarter}
          </span>
        )}
      </div>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleresetCountdown}>Reset</button>
      </div>
      
    </div>
  );
};

export default CountdownTimer;

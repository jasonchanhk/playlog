import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { accessTimerState, start, reset, set } from '../slices/timerSlice';

import { IoPauseCircleOutline, IoPlayCircleOutline, IoStopCircleOutline } from "react-icons/io5";

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
      <div>
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
          <div className='flex flex-col' onClick={handleEdit}>
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
                <div className='w-full border-gray-200 bg-gray-100 font-bold border-b-0 border text-xs leading-none text-center tracking-wide'>
                  Q{currentQuarter}
                </div>
              )}
            </div>
            <div className='flex'>
              <div className='border-gray-200 border w-10 h-10 flex items-center border-e-0'>
                <div className='w-full text-center text-xl font-bold'>{minutes < 10 ? `0${minutes}` : minutes}</div>
              </div>

              <div className='border-gray-200 border w-10 h-10 flex items-center'>
                <div className='w-full text-center text-xl font-bold'>{seconds < 10 ? `0${seconds}` : seconds}</div>
              </div>
            </div>

          </div>
        )}
      </div>

      <div className='text-center border border-gray-200 border-t-0 flex justify-center'>

        <button onClick={handleStart}><IoPlayCircleOutline /></button>
        <button onClick={handleStop}><IoPauseCircleOutline/></button>
        <button onClick={handleresetCountdown}><IoStopCircleOutline /></button>
      </div>

    </div>
  );
};

export default CountdownTimer;

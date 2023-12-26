import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'

import { accessCurrentVideoElement } from '../slices/videoSlice';
import { made, missed } from '../slices/gameSlice'
import { useAppDispatch, useAppSelector } from '../hooks';

import { FaCheck, FaCheckSquare, FaWindowClose } from "react-icons/fa";
import { PiNumberOneFill, PiNumberTwoFill, PiNumberThreeFill } from "react-icons/pi";
import { GiWhistle } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { accessTimeLeft } from '../slices/timerSlice'
import { IconContext } from "react-icons"

interface props {
    home: boolean;
    id: string;
}

const ButtonList: React.FC<props> = ({ home, id }) => {
    const dispatch = useAppDispatch();
    const getCurrentVideoElement = useAppSelector(accessCurrentVideoElement);
    const timeLeft = useAppSelector(accessTimeLeft);

    const buttonList: string[] = ['Made 2', 'Missed 2', 'Made 3', 'Missed 3'];

    const handleClick = (action: string, id: string) => {

        switch (action) {
            case 'Made 1':
                dispatch(made({ home, id, point: 'onePoint', videoElapsedTimeStamp: getCurrentVideoElement.target.getCurrentTime(), timeLeft }))
                break;
            case 'Missed 1':
                dispatch(missed({ home, id, point: 'onePoint', videoElapsedTimeStamp: getCurrentVideoElement.target.getCurrentTime(), timeLeft }))
                break;
            case 'Made 2':
                dispatch(made({ home, id, point: 'twoPoint', videoElapsedTimeStamp: getCurrentVideoElement.target.getCurrentTime(), timeLeft }))
                break;
            case 'Missed 2':
                dispatch(missed({ home, id, point: 'twoPoint', videoElapsedTimeStamp: getCurrentVideoElement.target.getCurrentTime(), timeLeft }))
                break;
            case 'Made 3':
                dispatch(made({ home, id, point: 'threePoint', videoElapsedTimeStamp: getCurrentVideoElement.target.getCurrentTime(), timeLeft }))
                break;
            case 'Missed 3':
                dispatch(missed({ home, id, point: 'threePoint', videoElapsedTimeStamp: getCurrentVideoElement.target.getCurrentTime(), timeLeft }))
                break;
        }
    }

    return (
        <div className='static flex flex-row rounded shadow-lg p-1 bg-gray-100 h-fit w-fit z-50 gap'>
            <div className='group/made'>
                <span className='absolute invisible group-hover/made:visible rounded shadow-lg bg-gray-100 p-1 -mt-20 w-6 z-50'>
                    <div className='w-4 h-5 inline-block text-md font-medium cursor-pointer bg-green-600 rounded-sm text-white leading-tight text-center' onClick={() => handleClick('Made 3', id)}>3</div>
                    <div className='w-4 h-5 inline-block text-md font-medium cursor-pointer bg-green-600 rounded-sm text-white leading-tight text-center' onClick={() => handleClick('Made 2', id)}>2</div>
                    <div className='w-4 h-5 inline-block text-md font-medium cursor-pointer bg-green-600 rounded-sm text-white leading-tight text-center' onClick={() => handleClick('Made 1', id)}>1</div>
                </span>

                <IconContext.Provider value={{ color: 'white', className: 'inline-block text-xl flex h-full item-center mr-1 z-40 w-6 bg-green-600 p-1 rounded-sm' }}>
                    <FaCheck />
                </IconContext.Provider>
            </div>
            <div className='group/missed'>
                <div className='absolute invisible group-hover/missed:visible rounded shadow-lg bg-gray-100 p-1 -mt-20 w-6 z-50'>
                    <div className='w-4 h-5 inline-block text-md font-medium cursor-pointer bg-red-600 rounded-sm text-white leading-tight text-center' onClick={() => handleClick('Missed 3', id)}>3</div>
                    <div className='w-4 h-5 inline-block text-md font-medium cursor-pointer bg-red-600 rounded-sm text-white leading-tight text-center' onClick={() => handleClick('Missed 2', id)}>2</div>
                    <div className='w-4 h-5 inline-block text-md font-medium cursor-pointer bg-red-600 rounded-sm text-white leading-tight text-center' onClick={() => handleClick('Missed 1', id)}>1</div>
                </div>

                <IconContext.Provider value={{ color: 'white', className: 'inline-block text-2xl flex h-full item-center mr-1 z-40 w-6 bg-red-600 p-1.5 rounded-sm' }}>
                    <ImCross />
                </IconContext.Provider>
            </div>
            <div>
                <IconContext.Provider value={{ color: 'white', className: 'inline-block text-2xl flex h-full item-center mr-1 z-40 w-6 bg-gray-400 p-0.5 rounded-sm' }}>
                    <GiWhistle />
                </IconContext.Provider>
            </div>
            <div >
                <div className='text-md font-semibold flex h-full item-center z-40 w-6 bg-gray-400 p-0.5 rounded-sm leading-tight tracking-tighter text-white'>
                    T0
                </div>
            </div>
        </div>
    )
}

export default ButtonList
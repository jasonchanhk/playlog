import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'

import { accessCurrentVideoElement } from '../slices/videoSlice';
import { shot } from '../slices/gameSlice'
import { useAppDispatch, useAppSelector } from '../hooks';

import { FaCheckSquare, FaWindowClose } from "react-icons/fa";
import { PiNumberOneFill, PiNumberTwoFill, PiNumberThreeFill } from "react-icons/pi";
import { toggleAssistModal } from '../slices/modalSlice'
import { IconContext } from "react-icons"

interface props {
    home: boolean;
    id: string;
}

const ButtonList: React.FC<props> = ({ home, id }) => {
    const dispatch = useAppDispatch();
    const getCurrentVideoElement = useAppSelector(accessCurrentVideoElement);

    const buttonList: string[] = ['Made 2', 'Missed 2', 'Made 3', 'Missed 3'];

    const handleClick = (action: string, id: string) => {

        switch (action) {
            case 'Made 1':
                dispatch(toggleAssistModal());
                dispatch(shot({ home, id, type: 'made', point: 'onePoint', videoElapsedTimeStamp: getCurrentVideoElement.target.getCurrentTime() }))
                break;
            case 'Missed 1':
                dispatch(shot({ home, id, type: 'missed', point: 'onePoint', videoElapsedTimeStamp: getCurrentVideoElement.target.getCurrentTime() }))
                break;
            case 'Made 2':
                dispatch(shot({ home, id, type: 'made', point: 'twoPoint', videoElapsedTimeStamp: getCurrentVideoElement.target.getCurrentTime() }))
                break;
            case 'Missed 2':
                dispatch(shot({ home, id, type: 'missed', point: 'twoPoint', videoElapsedTimeStamp: getCurrentVideoElement.target.getCurrentTime() }))
                break;
            case 'Made 3':
                dispatch(shot({ home, id, type: 'made', point: 'threePoint', videoElapsedTimeStamp: getCurrentVideoElement.target.getCurrentTime() }))
                break;
            case 'Missed 3':
                dispatch(shot({ home, id, type: 'missed', point: 'threePoint', videoElapsedTimeStamp: getCurrentVideoElement.target.getCurrentTime() }))
                break;
        }
    }

    return (
        <div className='static flex flex-row rounded shadow-lg p-1 bg-gray-100 h-fit w-fit '>
            <div className='group/made'>
                <span className='absolute invisible group-hover/made:visible rounded shadow-lg bg-gray-100 pb-1 -mt-20 w-6'>
                    <IconContext.Provider value={{ color: 'green', className: 'inline-block text-2xl' }}>
                        <PiNumberThreeFill onClick={() => handleClick('Made 3', id)}/>
                        <PiNumberTwoFill onClick={() => handleClick('Made 2', id)} />
                        <PiNumberOneFill onClick={() => handleClick('Made 1', id)}/>
                    </IconContext.Provider>
                </span>

                <IconContext.Provider value={{ color: 'green', className: 'inline-block text-2xl flex h-full item-center mr-1' }}>
                    <FaCheckSquare />
                </IconContext.Provider>
            </div>
            <div className='group/missed'>
                <span className='absolute invisible group-hover/missed:visible rounded shadow-lg bg-gray-100 pb-1 -mt-20 w-6'>
                    <IconContext.Provider value={{ color: 'red', className: 'inline-block text-2xl' }}>
                    <PiNumberThreeFill onClick={() => handleClick('Missed 3', id)}/>
                        <PiNumberTwoFill onClick={() => handleClick('Missed 2', id)} />
                        <PiNumberOneFill onClick={() => handleClick('Missed 1', id)}/>
                    </IconContext.Provider>
                </span>

                <IconContext.Provider value={{ color: 'red', className: 'inline-block text-2xl flex h-full item-center' }}>
                    <FaWindowClose />
                </IconContext.Provider>
            </div>
        </div>
    )
}

export default ButtonList
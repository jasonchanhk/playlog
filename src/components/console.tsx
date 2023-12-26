import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks';
import { showModalStatus, set, save, next } from '../slices/modalSlice'
import { showBothTeam } from '../slices/gameSlice'
import { IoCaretBackSharp, IoCaretForwardSharp, IoSave } from "react-icons/io5";
import { IconContext } from "react-icons"
import {pointTranslater} from "../utils/gameHelper"

const Console: React.FC = () => {

    const { actionType, point, playerId, home, page, assist, rebound, foul, shotType } = useAppSelector(showModalStatus);
    const whole = useAppSelector(showModalStatus);
    const getBothTeam = useAppSelector(showBothTeam);

    const ownTeam = home ? getBothTeam.home : getBothTeam.away;
    const oppTeam = home ? getBothTeam.away : getBothTeam.home;

    const dispatch = useAppDispatch();
    const shotTypeSample = ['Layup', 'Shot', 'Dunk', 'Put Back'];

    const ShotTypeComponent: React.FC = () => {
        return (
            <div className='mb-1'>
                <h2 className='font-semibold text-sm py-2'>Shot type</h2>
                <div className='flex'>
                    {shotTypeSample.map((type) => {
                        return <div className='px-2 py-1 mr-2 bg-slate-100 rounded-lg'>{type}</div>
                    })}
                </div>
            </div>
        )
    }

    const FoulComponent: React.FC = () => {
        return (
            <div className='mb-1'>
                <h2 className='font-semibold text-sm py-2'>Foul</h2>
                <div className='flex justify-between'>
                    <div className='flex'>
                        {oppTeam.players.filter((player) => player.id != playerId).map(({ name, jersey, id }) => {
                            return <button className={`w-10 mr-2 flex flex-col items-center `} onClick={() => dispatch(set({ category: 'foul', playerId: id }))}>
                                <div className={`flex flex-col items-center border border-b-0 w-full py-1 ${foul == id ? `bg-${oppTeam.colour} text-white border-0` : null}`}>
                                    <div className='italic font-bold text-xl leading-tight '>{jersey}</div>
                                    <div className='leading-tight text-xs'>{name.slice(0, 3).toUpperCase()}</div>
                                </div>
                                <div className={`bg-${oppTeam.colour} h-0.5 w-full`}></div>
                            </button>
                        })}
                    </div>
                    <button className={`border flex flex-col justify-center w-10 items-center ${foul == 'skip' ? 'bg-gray-400 border-0 text-white font-semibold' : null}`} onClick={() => dispatch(set({ category: 'foul', playerId: 'skip' }))}>
                        <div className='text-xs'>Skip</div>
                    </button>
                </div>
            </div>
        )
    }

    const AssistComponent: React.FC = () => {
        return (
            <div className='mb-4'>
                <h2 className='font-semibold text-sm py-2'>Assist by</h2>
                <div className='flex flex-row justify-between'>
                    <div className='flex'>
                        {ownTeam.players.filter((player) => player.id != playerId).map(({ name, jersey, id }) => {
                            return <button className={`w-10 mr-2 flex flex-col items-center `} onClick={() => dispatch(set({ category: 'assist', playerId: id }))}>
                                <div className={`flex flex-col items-center border border-b-0 w-full py-1 ${assist == id ? `bg-${ownTeam.colour} text-white border-0` : null}`}>
                                    <div className='italic font-bold text-xl leading-tight '>{jersey}</div>
                                    <div className='leading-tight text-xs'>{name.slice(0, 3).toUpperCase()}</div>
                                </div>
                                <div className={`bg-${ownTeam.colour} h-0.5 w-full`}></div>
                            </button>
                        })}
                    </div>
                    <button className={`border flex flex-col justify-center w-10 items-center ${assist == 'skip' ? 'bg-gray-400 border-0 text-white font-semibold' : null}`} onClick={() => dispatch(set({ category: 'assist', playerId: 'skip' }))}>
                        <div className='text-xs'>Skip</div>
                    </button>
                </div>
            </div>
        )
    }

    const ReboundComponent: React.FC = () => {
        return (
            <div className='mb-4'>
                <h2 className='font-semibold text-sm py-2'>Rebound by</h2>
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-between mb-2'>
                        <div className='flex'>
                            {ownTeam.players.map(({ name, jersey, id }) => {
                                return <button className={`w-10 mr-2 flex flex-col items-center `} onClick={() => dispatch(set({ category: 'rebound', playerId: id }))}>
                                    <div className={`flex flex-col items-center border border-b-0 w-full py-1 ${rebound == id ? `bg-${ownTeam.colour} text-white border-0` : null}`}>
                                        <div className='italic font-bold text-xl leading-tight '>{jersey}</div>
                                        <div className='leading-tight text-xs'>{name.slice(0, 3).toUpperCase()}</div>
                                    </div>
                                    <div className={`bg-${ownTeam.colour} h-0.5 w-full`}></div>
                                </button>
                            })}
                        </div>
                        <button className={`border flex flex-col justify-center w-10 items-center ${rebound == 'skip' ? 'bg-gray-400 border-0 text-white font-semibold' : null}`} onClick={() => dispatch(set({ category: 'rebound', playerId: 'skip' }))}>
                            <div className='text-xs'>Skip</div>
                        </button>
                    </div>
                    <div className='flex'>
                        {oppTeam.players.map(({ name, jersey, id }) => {
                            return <button className={`w-10 mr-2 flex flex-col items-center `} onClick={() => dispatch(set({ category: 'rebound', playerId: id }))}>
                                <div className={`flex flex-col items-center border border-b-0 w-full py-1 ${rebound == id ? `bg-${oppTeam.colour} text-white border-0` : null}`}>
                                    <div className='italic font-bold text-xl leading-tight '>{jersey}</div>
                                    <div className='leading-tight text-xs'>{name.slice(0, 3).toUpperCase()}</div>
                                </div>
                                <div className={`bg-${oppTeam.colour} h-0.5 w-full`}></div>
                            </button>
                        })}
                    </div>
                </div>
            </div>
        )
    }

    const renderPage = () => {
        switch (page) {
            case 1:
                return (
                    <div className="text-sm">
                        <ShotTypeComponent />
                    </div>);
            case 2:
                return <>
                    {
                        actionType == 'made' ? (
                            <div className="text-sm">
                                {/* <FoulComponent /> */}
                                <AssistComponent />
                            </div>
                        ) : (null)
                    }
                    {
                        actionType == 'missed' ? (
                            <div className="text-sm">
                                {/* <FoulComponent /> */}
                                <ReboundComponent />
                            </div>
                        ) : null
                    }
                </>;
            default:
                return <div>default</div>;
        }
    };

    return (
        <div className="border flex flex-col w-full bg-white">
            {/*header*/}
            {
                page == 0
                    ?
                    null
                    :
                    <div className="flex items-center justify-between text-sm p-2">
                        {
                            page <= 1
                                ?
                                null
                                :
                                <button onClick={() => dispatch(next(-1))}> <IoCaretBackSharp /></button>
                        }

                        <div className="flex font-semibold w-full justify-center">
                            {actionType} {pointTranslater(1, point!)}
                        </div>
                        {
                            page < 2
                                ?
                                (page != 0 ? <button onClick={() => dispatch(next(1))}><IoCaretForwardSharp /></button> : null)
                                :
                                <button className='text-xs font-bold' onClick={() => dispatch(save(whole))}>Save</button>
                        }

                    </div>
            }


            {/*body*/}
            <div className="relative px-2 flex-auto">
                {renderPage()}
            </div>

            {/*footer*/}
            {/* <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => dispatch(save())}
                    >
                        Close
                    </button>
                    <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => dispatch(save())}
                    >
                        Save
                    </button>
                </div> */}
        </div>
    )
}

export default Console
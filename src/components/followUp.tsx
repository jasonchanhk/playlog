

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks';
import { showModalStatus, reset } from '../slices/modalSlice'
import { showBothTeam } from '../slices/gameSlice'




const FollowUp: React.FC = () => {

    const { assistModal, reboundModal, point, id, home } = useAppSelector(showModalStatus);
    const getBothTeam = useAppSelector(showBothTeam);

    const ownTeam = home ? getBothTeam.home : getBothTeam.away;
    const oppTeam= home ? getBothTeam.away : getBothTeam.home;

    const dispatch = useAppDispatch();
    const shotType = ['Layup', 'Shot', 'Dunk', 'Put Back'];

    const ShotTypeComponent: React.FC = () => {
        return (
            <div className='mb-4'>
                <h2 className='font-semibold text-xl py-2'>Shot type</h2>
                <div className='flex'>
                    {shotType.map((type) => {
                        return <div className='px-4 py-2 mr-2 bg-slate-100 rounded-lg'>{type}</div>
                    })}
                </div>
            </div>
        )
    }

    const FoulComponent: React.FC = () => {
        return (
            <div className='mb-4'>
                <h2 className='font-semibold text-xl py-2'>Foul</h2>
                <div className='flex justify-between'>
                    <div className='flex'>
                        {oppTeam.players.filter((player) => player.id != id).map(({ name, jersey }) => {
                            return <div className={`px-4 py-2 mr-2 rounded-lg ${oppTeam.colour}`}>{jersey}. {name}</div>
                        })}
                    </div>
                    <div className='px-4 py-2 bg-slate-100 rounded-lg ml-2'>Skip</div>
                </div>
            </div>
        )
    }

    const AssistComponent: React.FC = () => {
        return (
            <div className='mb-4'>
                <h2 className='font-semibold text-xl py-2'>Assist by</h2>
                <div className='flex flex-row justify-between'>
                    <div className='flex'>
                        {ownTeam.players.filter((player) => player.id != id).map(({ name, jersey }) => {
                            return <div className={`px-4 py-2 mr-2 rounded-lg ${ownTeam.colour}`}>{jersey}. {name}</div>
                        })}
                    </div>
                    <div className='px-4 py-2 bg-slate-100 rounded-lg ml-2'>Skip</div>
                </div>
            </div>
        )
    }

    const ReboundComponent: React.FC = () => {
        return (
            <div className='mb-4'>
                <h2 className='font-semibold text-xl py-2'>Rebound by</h2>
                <div className='flex flex-col'>
                    <div className='flex mb-2'>
                        {ownTeam.players.map(({ name, jersey }) => {
                            return <div className={`px-4 py-2 mr-2 rounded-lg ${ownTeam.colour}`}>{jersey}. {name}</div>
                        })}
                    </div>
                    <div className='flex'>
                        {oppTeam.players.map(({ name, jersey }) => {
                            return <div className={`px-4 py-2 mr-2 rounded-lg ${oppTeam.colour}`}>{jersey}. {name}</div>
                        })}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {assistModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Made {point == 'onePoint' ? '1' : (point == 'twoPoint' ? '2' : '3')}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => dispatch(reset())}
                                    >
                                        <span className="text-blackh-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>

                                {/*body*/}
                                <div className="relative p-6 flex-auto border-t border-solid border-blueGray-200">
                                    <p className="text-blueGray-500 text-lg leading-relaxed">
                                        <ShotTypeComponent />
                                        <FoulComponent />
                                        <AssistComponent />
                                    </p>
                                </div>

                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => dispatch(reset())}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => dispatch(reset())}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
            {reboundModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Missed { }
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => dispatch(reset())}
                                    >
                                        <span className="text-blackh-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>

                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <p className="text-blueGray-500 text-lg leading-relaxed">
                                        <ShotTypeComponent />
                                        <FoulComponent />
                                        <ReboundComponent />
                                    </p>
                                </div>

                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => dispatch(reset())}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => dispatch(reset())}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}

export default FollowUp


import React from 'react'
import { useAppSelector, useAppDispatch } from '../hooks';
import { showModalStatus, reset } from '../slices/modalSlice'
import { showBothTeam } from '../slices/gameSlice'

const Console: React.FC = () => {

    const { assistModal, reboundModal, point, id, home } = useAppSelector(showModalStatus);
    const getBothTeam = useAppSelector(showBothTeam);

    const ownTeam = home ? getBothTeam.home : getBothTeam.away;
    const oppTeam = home ? getBothTeam.away : getBothTeam.home;

    const dispatch = useAppDispatch();
    const shotType = ['Layup', 'Shot', 'Dunk', 'Put Back'];

    const ShotTypeComponent: React.FC = () => {
        return (
            <div className='mb-1'>
                <h2 className='font-semibold text-sm py-2'>Shot type</h2>
                <div className='flex'>
                    {shotType.map((type) => {
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
                        {oppTeam.players.filter((player) => player.id != id).map(({ name, jersey }) => {
                            return <div className={`w-10 mr-2 flex flex-col items-center`}>
                                <div className='flex flex-col items-center border border-b-0 w-full py-1'>
                                    <div className='italic font-bold text-xl leading-tight '>{jersey}</div>
                                    <div className='leading-tight text-xs'>{name.slice(0, 3).toUpperCase()}</div>
                                </div>
                                <div className={`${oppTeam.colour} h-0.5 w-full`}></div>
                            </div>
                        })}
                    </div>
                    <div className='border flex flex-col justify-center w-10 items-center'>
                        <div className='text-xs'>Skip</div>
                    </div>
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
                        {ownTeam.players.filter((player) => player.id != id).map(({ name, jersey }) => {
                            return <div className={`w-10 mr-2 flex flex-col items-center`}>
                                <div className='flex flex-col items-center border border-b-0 w-full py-1'>
                                    <div className='italic font-bold text-xl leading-tight '>{jersey}</div>
                                    <div className='leading-tight text-xs'>{name.slice(0, 3).toUpperCase()}</div>
                                </div>
                                <div className={`${ownTeam.colour} h-0.5 w-full`}></div>
                            </div>
                        })}
                    </div>
                    <div className='border flex flex-col justify-center w-10 items-center'>
                        <div className='text-xs'>Skip</div>
                    </div>


                    {/* <div className='flex'>
                        {ownTeam.players.filter((player) => player.id != id).map(({ name, jersey }) => {
                            return <div className={`px-2 py-1 mr-2 rounded-lg ${ownTeam.colour}`}>{jersey}. {name}</div>
                        })}
                    </div>
                    <div className='px-2 py-1 bg-slate-100 rounded-lg ml-2'>Skip</div> */}
                </div>
            </div>
        )
    }

    const ReboundComponent: React.FC = () => {
        return (
            <div className='mb-4'>
                <h2 className='font-semibold text-sm py-2'>Rebound by</h2>
                <div className='flex flex-col'>
                    <div className='flex mb-2'>
                        {ownTeam.players.map(({ name, jersey }) => {
                            return <div className={`px-2 py-1 mr-2 rounded-lg ${ownTeam.colour}`}>{jersey}. {name}</div>
                        })}
                    </div>
                    <div className='flex'>
                        {oppTeam.players.map(({ name, jersey }) => {
                            return <div className={`px-2 py-1 mr-2 rounded-lg ${oppTeam.colour}`}>{jersey}. {name}</div>
                        })}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="">
            <div className="border flex flex-col w-full bg-white">
                {/*header*/}
                <div className="flex items-start justify-between p-2">
                    <h3 className="text-sm font-semibold">
                        Made {point == 'onePoint' ? '1' : (point == 'twoPoint' ? '2' : '3')}
                    </h3>
                    <button
                        className="ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => dispatch(reset())}
                    >
                        <span className="text-blackh-6 w-6 text-xs block outline-none focus:outline-none">
                            ×
                        </span>
                    </button>
                </div>

                {/*body*/}
                <div className="relative p-2 flex-auto ">
                    <div className="text-sm">
                        {/* <ShotTypeComponent /> */}
                        <FoulComponent />
                        <AssistComponent />
                    </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => dispatch(reset())}
                    >
                        Close
                    </button>
                    <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => dispatch(reset())}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Console
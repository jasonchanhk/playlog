import React, { useState, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks';
import { showBothTeam, showAllScoredMoment, GameState } from '../slices/gameSlice';
import { showAllPlayer } from '../slices/playerSlice';
import { formatElapsedTime } from '../utils/datetimeHelper';
import { shotShortTermDeserialiser } from '../utils/gameHelper';
import html2canvas from "html2canvas";
import { FaCheck } from "react-icons/fa6";

export interface Moment {
    videoElapsedTimeStamp: string;
    playerName: string;
    playerShotType: string;
}

export interface ScoreMoments {
    home: Moment[];
    away: Moment[];
}

export interface CopyButtonProps {
    additionalOnClick: () => void
}

export const CopyButton: React.FC<CopyButtonProps> = ({ additionalOnClick }) => {
    const [buttonText, setButtonText] = useState<boolean>(true)
    const confirmCopied = () => {
        additionalOnClick();
        setButtonText(false);
        setTimeout(() => {
            setButtonText(true);
        }, 2000);
    }

    return <button className='h-10 border w-14 flex justify-center items-center text-sm' onClick={confirmCopied}>{buttonText ? 'Copy' : <FaCheck />}</button>
}

export const SummaryTable: React.FC<{ moments: Moment[], playbackOffset: string }> = ({ moments, playbackOffset }) => {
    const componentRef = useRef<HTMLTableElement>(null);
    const copyImageToClipboard = () => {
        if (!componentRef.current) return;

        html2canvas(componentRef.current)
            .then((canvas) => {
                canvas.toBlob((blob) => {
                    if (!blob) return;

                    navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
                }, 'image/png');
            })
    };

    return (
        <div>
            <div className='mr-auto my-6 h-64 overflow-auto' >
                <table className='' ref={componentRef}>
                    <tr className='border'>
                        <th className='border p-2'>Timecodes</th>
                        <th className='border p-2'>Name</th>
                        <th className='border p-2'>Score</th>
                    </tr>
                    {moments.map((moment, key) => {
                        return (
                            <tr key={key}>
                                <td className='border p-2'>{formatElapsedTime(moment.videoElapsedTimeStamp, playbackOffset)}</td>
                                <td className='border p-2'>{moment.playerName}</td>
                                <td className='border p-2'>{moment.playerShotType[0]}</td>
                            </tr>)
                    })}
                </table>
            </div>
            <div className='flex justify-end'>
                <CopyButton additionalOnClick={copyImageToClipboard} />
            </div>
        </div>
    )
}

export const SummaryList: React.FC<{ moments: Moment[], playbackOffset: string }> = ({ moments, playbackOffset }) => {
    const copyListToClipboard = () => {
        const textToCopy = document.getElementById('textToCopy')?.innerText;
        if (!textToCopy) return;

        navigator.clipboard.writeText(textToCopy);
    }

    return (
        <div>
            <div className='my-6 h-64 overflow-auto' id="textToCopy">
                <div className='w-fit'>
                    {moments.map((moment) => {
                        return <div className='py-1'>{formatElapsedTime(moment.videoElapsedTimeStamp, playbackOffset)} &nbsp; {moment.playerName} +{moment.playerShotType}</div>
                    })}
                </div>
            </div>
            <div className='flex justify-end'>
                <CopyButton additionalOnClick={copyListToClipboard} />
            </div>
        </div>
    )
}

export const TeamSumary: React.FC<{ team: 'home' | 'away', moments: Moment[], playbackOffset: string }> = ({ team, moments, playbackOffset }) => {
    const getBothTeam: GameState = useAppSelector(showBothTeam);

    const [displaySwitch, setDisplaySwitch] = useState<boolean>(true)
    return (
        <div>
            <div className='flex justify-between border-b pb-2'>
                <div className='text-3xl tracking-tighter leading-tight flex items-center capitalize'>
                    <div>
                        <h3 className='leading-none tracking-tight text-sm'>{team}</h3>
                        <h1 className='font-bold text-3xl leading-none tracking-tight'>{getBothTeam[team].name}</h1>
                    </div>
                </div>
                <div className='flex items-center'>
                    <button className='h-10 border w-14 text-sm flex justify-center items-center' onClick={e => setDisplaySwitch(!displaySwitch)}>{displaySwitch == true ? 'Text' : 'Table'}</button>
                </div>
            </div>
            {
                displaySwitch ?
                    <SummaryTable moments={moments} playbackOffset={playbackOffset} /> :
                    <SummaryList moments={moments} playbackOffset={playbackOffset} />
            }
        </div>
    )
}

const ActionExport: React.FC = () => {

    const getAllScoreMoment = useAppSelector(showAllScoredMoment);
    const getAllPlayer = useAppSelector(showAllPlayer);

    const [scoreMoments, setScoreMoments] = useState<ScoreMoments>({ home: [], away: [] })
    const [playbackOffset, setPlaybackOffset] = useState<string>('5')

    const findPlayerDetails = (playerId: string) => getAllPlayer.find((player) => player.id == playerId);

    const processAllMoment = () => {
        const scoreMoments: ScoreMoments = { home: [], away: [] };
        getAllScoreMoment.forEach((moment) => {
            // add player info
            const scoringPlayer = findPlayerDetails(moment.shortRecords[0].actionPlayer)
            // filter home & away team
            if (scoringPlayer?.home) {
                scoreMoments.home.push({
                    videoElapsedTimeStamp: moment.videoElapsedTimeStamp,
                    playerName: scoringPlayer?.name,
                    playerShotType: shotShortTermDeserialiser(moment.shortRecords[0].actionShortTerm)
                })
            } else {
                scoreMoments.away.push({
                    videoElapsedTimeStamp: moment.videoElapsedTimeStamp,
                    playerName: scoringPlayer?.name || '',
                    playerShotType: shotShortTermDeserialiser(moment.shortRecords[0].actionShortTerm)
                })
            }
        })
        scoreMoments.home.sort((a, b) => parseInt(a.videoElapsedTimeStamp) - parseInt(b.videoElapsedTimeStamp))
        scoreMoments.away.sort((a, b) => parseInt(a.videoElapsedTimeStamp) - parseInt(b.videoElapsedTimeStamp))
        setScoreMoments(scoreMoments)
    }

    useEffect(() => {
        processAllMoment()
    }, [getAllScoreMoment])

    return (
        <section className='my-16 py-8 h-auto'>
            <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
                3. Export All Action History
            </h2>
            <div className='flex space-x-2'>
                <div className='flex-1 border p-4'>
                    <TeamSumary team='home' moments={scoreMoments.home} playbackOffset={playbackOffset} />
                </div>
                <div className='flex-1 border p-4'>
                    <TeamSumary team='away' moments={scoreMoments.away} playbackOffset={playbackOffset} />
                </div>
                <div className='flex flex-col w-72 h-full border p-4'>
                    <h3 className='text-3xl font-bold tracking-tighter leading-tight flex items-center'>
                        Filter
                    </h3>
                    <div className='font-bold flex items-center'>Offset</div>
                    <select className='w-24 py-1.5 flex' onChange={e => setPlaybackOffset(e.target.value)}>
                        <option value="5" selected>5s</option>
                        <option value="10">10s</option>
                        <option value="15">15s</option>
                    </select>

                    <div className='font-bold flex items-center'>Quarter</div>
                    <select className='w-24 py-1.5 flex'>
                        <option value="all" selected>All</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
            </div>
        </section >
    )
}

export default ActionExport
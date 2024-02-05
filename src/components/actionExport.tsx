import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks';
import { registerVideoUrl, accessCurrentVideoId } from '../slices/videoSlice';
import { FaAngleDown, FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons";
import { shortRecord, showAllScoredMoment } from '../slices/gameSlice';
import { showAllPlayer } from '../slices/playerSlice';
import { formatElapsedTime } from '../utils/datetimeHelper';

export interface Moment {
    videoElapsedTimeStamp: string;
    playerName: string;
    playerShotType: string;
}

const ActionExport: React.FC = () => {

    const getAllScoreMoment = useAppSelector(showAllScoredMoment);
    const getAllPlayer = useAppSelector(showAllPlayer);

    const findPlayerDetails = (playerId: string) => getAllPlayer.find((player) => player.id == playerId);
    const homeScoreMoment = getAllScoreMoment.filter((moment) => {
        const scoringPlayer = findPlayerDetails(moment.shortRecords[0].actionPlayer)
        if (scoringPlayer?.home) {
            return moment
        }
    })
    const [homeMoments, setHomeMoments] = useState<Moment[]>([])
    const [awayMoments, setAwayMoments] = useState<Moment[]>([])
    const processAllMoment = () => {
        const home: Moment[] = [];
        const away: Moment[] = [];
        getAllScoreMoment.forEach((moment) => {
            // add player info
            const scoringPlayer = findPlayerDetails(moment.shortRecords[0].actionPlayer)
            // filter home & away team
            if (scoringPlayer?.home) {
                home.push({
                    videoElapsedTimeStamp: moment.videoElapsedTimeStamp,
                    playerName: scoringPlayer?.name,
                    playerShotType: moment.shortRecords[0].actionShortTerm
                })
            } else {
                away.push({
                    videoElapsedTimeStamp: moment.videoElapsedTimeStamp,
                    playerName: scoringPlayer?.name || '',
                    playerShotType: moment.shortRecords[0].actionShortTerm
                })
            }
        })

        // Sorted in descending order\
        setHomeMoments(home.sort((a, b) => parseInt(b.videoElapsedTimeStamp) - parseInt(a.videoElapsedTimeStamp)))
        setAwayMoments(away.sort((a, b) => parseInt(b.videoElapsedTimeStamp) - parseInt(a.videoElapsedTimeStamp)))

    }
    // filter how & away team
    const [playbackOffset, setPlaybackOffset] = useState<string>('5')

    useEffect(() => {
        processAllMoment()
    }, [getAllScoreMoment])

    return (
        <section className='my-16 py-8'>
            <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
                3. Export All Action History
            </h2>
            <div>
                <h3>Search </h3>
                <div></div>
            </div>
            <div className='flex'>
                {/* <select className='rounded-md w-36 py-1.5 border shadow-sm mt-2 ml-2'>
                    <option value="" disabled selected>Quarter</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="all">All</option>
                </select> */}
                <select className='rounded-md w-36 py-1.5 border shadow-sm' onChange={e => setPlaybackOffset(e.target.value)}>
                    <option value="" disabled selected>Playback</option>
                    <option value="5">5s</option>
                    <option value="10">10s</option>
                    <option value="15">15s</option>
                </select>
            </div>
            playback: {playbackOffset}
            <div className='flex w-80 border'>
                <div className='flex-1'>
                    Home
                    {homeMoments.map((moment) => {
                        return <div>{formatElapsedTime(moment.videoElapsedTimeStamp, playbackOffset)} {moment.playerName} {moment.playerShotType}</div>
                    })}
                </div>
                <div className='flex-1'>
                    Away
                    {awayMoments.map((moment) => {
                        return <div>{formatElapsedTime(moment.videoElapsedTimeStamp, playbackOffset)} {moment.playerName} {moment.playerShotType}</div>
                    })}
                </div>
            </div>
        </section>
    )
}

export default ActionExport
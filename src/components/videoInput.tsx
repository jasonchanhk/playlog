import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks';
import { registerVideoUrl, accessCurrentVideoId } from '../slices/videoSlice';
import { FaYoutube, FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons";

const VideoInput: React.FC = () => {

    const [localUrl, setLocalUrl] = useState<string>('https://www.youtube.com/watch?v=TT-Wul8DD48')
    const dispatch = useAppDispatch();
    const videoId = useAppSelector(accessCurrentVideoId);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(registerVideoUrl(localUrl));
        setLocalUrl('');
    }

    return (
        <section className='my-16 py-8'>
            <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
                1. Paste youtube link
            </h2>
            <form onSubmit={handleSubmit} className='flex'>
                <div className="relative mt-2 rounded-md shadow-sm flex-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <IconContext.Provider value={{ size: '30px' }}>
                            <FaYoutube />
                        </IconContext.Provider>
                    </div>
                    <input type='input'
                        value={localUrl}
                        onChange={(e) => setLocalUrl(e.target.value)}
                        placeholder='Youtube URL'
                        className="block w-full p-4 rounded-lg border py-4 pl-14 pr-20 text-gray-900 sm:text-sm sm:leading-6 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button type='submit' className='flex-none block rounded-md px-10 py-1.5 border shadow-sm mt-2 ml-2'>
                    <IconContext.Provider value={{ size: '20px' }}>
                        <FaSearch />
                    </IconContext.Provider>
                </button>
            </form>
        </section>
    )
}

export default VideoInput
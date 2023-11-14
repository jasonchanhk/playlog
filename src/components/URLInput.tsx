import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks';
import { registerVideoUrl, accessCurrentVideoId } from '../slices/videoSlice';
import { FaYoutube } from "react-icons/fa";

const URLInput: React.FC = () => {

    const [localUrl, setLocalUrl] = useState<string>('')
    const dispatch = useAppDispatch();
    const videoId = useAppSelector(accessCurrentVideoId);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(registerVideoUrl(localUrl));
        setLocalUrl('');
    }

    return (
        <div className='my-16 py-8 bg-yellow-200'>
            <form onSubmit={handleSubmit} className='flex'>
                <div className="relative mt-2 rounded-md shadow-sm flex-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <span><FaYoutube /></span>
                    </div>
                    <input type='input'
                        value={localUrl}
                        onChange={(e) => setLocalUrl(e.target.value)}
                        placeholder='Youtube URL'
                        className="block w-full rounded-md border py-1.5 pl-10 pr-20 text-gray-900 sm:text-sm sm:leading-6"
                    />
                </div>
                <button type='submit' className='flex-none block rounded-md px-10 py-1.5 border shadow-sm mt-2 ml-2'>Go</button>
            </form>
        </div>
    )
}

export default URLInput
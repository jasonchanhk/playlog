import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks';
import { registerVideoUrl, accessCurrentVideoId } from '../slices/videoSlice';

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
        <div>
            ---FORM---
            <form onSubmit={handleSubmit}>
                <input type='input' value={localUrl} onChange={(e) => setLocalUrl(e.target.value)} placeholder='Youtube URL' />
                <button type='submit'>Go</button>
            </form>
            Video Id: {videoId}
            <br />
            ---END---
        </div>
    )
}

export default URLInput
import React, { useState } from 'react'

interface props {
    url: String;
    setUrl: React.Dispatch<React.SetStateAction<string>>;
}

const URLInput: React.FC<props> = ({ url, setUrl }) => {

    const [localUrl, setLocalUrl] = useState<string>('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        extractVideoIdFromUrl(localUrl);
        setLocalUrl('');
    }

    const extractVideoIdFromUrl = (url: string) => {
        try {
            const urlObject = new URL(url);
            if (urlObject.host === "www.youtube.com" || urlObject.host === "youtube.com") {
                const searchParams = new URLSearchParams(urlObject.search);
                const videoId = searchParams.get("v");
                if (videoId != null) {
                    setUrl(videoId);
                } else {
                    throw new Error('Sorry, for some reasons we cannot find the video id')
                }
            } else {
                // Handle invalid or unsupported URL
                throw new Error('Sorry, the url you sent was not from youtube')
            }
        } catch (error) {
            // Handle invalid URLs or parsing errors
            if (error instanceof Error) {
                alert(error.message)
            }
        }
    }


    return (
        <div>
            ---FORM---
            <form onSubmit={handleSubmit}>
                <input type='input' value={localUrl} onChange={(e) => setLocalUrl(e.target.value)} placeholder='Youtube URL' />
                <button type='submit'>Go</button>
            </form>
            Video Id: {url}
            <br />
            ---END---
        </div>
    )
}

export default URLInput
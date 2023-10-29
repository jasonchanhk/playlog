import React, { useState } from 'react'

interface props {
    url: String;
    setUrl: React.Dispatch<React.SetStateAction<string>>;
}

const URLInput: React.FC<props> = ({ url, setUrl }) => {

    const [localUrl, setLocalUrl] = useState<string>('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setUrl(localUrl);
    }

    return (
        <div>
            ---FORM---
            <form onSubmit={handleSubmit}>
                <input type='input' value={localUrl} onChange={(e) => setLocalUrl(e.target.value)} placeholder='Youtube URL' />
                <button type='submit'>Go</button>
            </form>
            Current URL: {url}
            <br/>
            ---END---
        </div>
    )
}

export default URLInput
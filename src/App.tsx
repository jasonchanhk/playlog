import React, { useState } from 'react';
import './App.css';
import URLInput from './components/URLInput';
import YTplayer from './components/YouTubePlayer';
import Controlpanel from './components/ControlPanel';
import ActionHistory from './components/ActionHistory';

function App() {
  const [url, setUrl] = useState<string>('')

  return (
    <div className="App">
      <ActionHistory />
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <URLInput url={url} setUrl={setUrl}/>
      <YTplayer url={url}/>
      <Controlpanel />
    </div>
  );
}

export default App;

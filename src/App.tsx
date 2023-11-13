import React from 'react';
import './App.css';
import URLInput from './components/URLInput';
import Controlpanel from './components/ControlPanel';
import ActionHistory from './components/ActionHistory';
import Container from './components/container';
import Intro from './components/intro';
import MainPanel from './components/mainPlanel';

function App() {

  return (
    <div className="App">
      <ActionHistory />
      <Container>
        <Intro />

        <URLInput />
        <MainPanel />
      </Container>
      <Controlpanel />
    </div>
  );
}

export default App;

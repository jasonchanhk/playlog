import React from 'react';
import './App.css';
import VideoInput from './components/videoInput';
import Container from './components/container';
import Intro from './components/intro';
import MainPanel from './components/mainPlanel';
import Footer from './components/footer';
import ActionExport from './components/actionExport';

const App: React.FC = () => {

  return (
    <div className="App">
      <Container>
        <Intro />
        <VideoInput />
        <MainPanel />
        <ActionExport />
      </Container>
      <Footer />
    </div>
  );
}

export default App;

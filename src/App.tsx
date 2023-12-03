import React from 'react';
import './App.css';
import URLInput from './components/urlInput';
import Container from './components/container';
import Intro from './components/intro';
import MainPanel from './components/mainPlanel';
import FollowUp from './components/followUp';
import Footer from './components/footer';

function App() {

  return (
    <div className="App">
      <Container>
        <Intro />
        <URLInput />
        <MainPanel />
        <FollowUp />
      </Container>
      <Footer />
    </div>
  );
}

export default App;

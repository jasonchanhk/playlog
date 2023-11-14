import React from 'react';
import './App.css';
import URLInput from './components/URLInput';
import Container from './components/container';
import Intro from './components/intro';
import MainPanel from './components/mainPlanel';
import Footer from './components/footer';

function App() {

  return (
    <div className="App">
      <Container>
        <Intro />
        <URLInput />
        <MainPanel />
      </Container>
      <Footer/>
    </div>
  );
}

export default App;

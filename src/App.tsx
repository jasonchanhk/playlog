import React from 'react';
import './App.css';
import URLInput from './components/urlInput';
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
        <URLInput />
        <MainPanel />
        <ActionExport />
      </Container>
      <Footer />
    </div>
  );
}

export default App;

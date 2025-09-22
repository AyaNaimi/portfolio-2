import React from 'react';
import PixelBlast from './components/PixelBlast';
import './App.css'; // Assuming you might have an App.css later

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>PixelBlast Component Example</h1>
        <PixelBlast>Click to Blast Pixels!</PixelBlast>
      </header>
    </div>
  );
}

export default App;


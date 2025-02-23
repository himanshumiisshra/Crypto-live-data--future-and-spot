import React from 'react';
import './styles.css';
import LiveChart from './components/LiveChart';

const App = () => {
  return (
    <div className="App">
      <h1>Live Crypto Data</h1>
      <LiveChart />
    </div>
  );
};

export default App;

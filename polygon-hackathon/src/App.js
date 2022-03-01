import React, { useEffect, useState } from 'react';
import './App.css';
import ConnectMetaMask from './connectMetaMask';

function App() {
  return (
    <div className="App">
      <ConnectMetaMask/>
    </div>
  );
}

export default App;
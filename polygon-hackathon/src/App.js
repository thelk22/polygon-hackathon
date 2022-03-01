import React from "react";
import "./App.css";
import ConnectMetaMask from "./components/ConnectMetaMask.js";
import UploadFile from "./components/UploadFile.js";

function App() {
  return (
    <div className="App">
      <ConnectMetaMask />
      <UploadFile />
    </div>
  );
}

export default App;

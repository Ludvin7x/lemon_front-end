import React from "react";
import Nav from "./components/Nav";
import Main from "./components/Main";

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <div className="Nav">
          <Nav />
        </div>
        <div className="content">
          <Main />
        </div>
      </div>
    </div>
  );
}

export default App;

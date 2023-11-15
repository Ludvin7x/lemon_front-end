import React from "react";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Main from "./components/Main";

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <div className="top">
          <div className="header"> <Header /> </div>
          <Nav />
        </div>
        <div className="content">
          <Main />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;

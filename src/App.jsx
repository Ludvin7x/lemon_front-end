import React from "react";
import Nav from "./components/Nav";
import Main from "./components/Main";
import Footer from "./components/Footer";
import HomePage from "./components/Pages/HomePage";

function App() {
  return (
    <div className="app">
      <nav className="app__nav">
        <Nav />
      </nav>
      <main className="app__main">
        <HomePage />
      </main>
      <footer className="app__footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;

import './App.css';
import logo from './img/Logo.svg';
import Header from './Header.js'
import Nav from './Nav.js'
import Main from './Main.js'
import Footer from './Footer'
import { ReactComponent as Logo } from './img/Logo.svg';

function App() {
  return (
    <div className="App">
      <Header>
        <img src={logo} alt="Logo"/>
        <meta name="description" content="Webpage of Little Lemon Restaurant"/>
        <meta name="og:title" content="Little Lemon"/>
        <meta name="og:description" content="Little Lemon Aplication"/>
        <meta name="og:image" content={logo}/>
        <Logo />
        </Header>
      <Nav>
        <ul>
          <li>hola</li>
          <li>hola</li>
          <li>hola</li>
        </ul>
      </Nav>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
}

export default App;

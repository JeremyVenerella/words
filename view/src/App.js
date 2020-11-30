import logo from './logo.svg';
import './App.css';
import SignIn from './components/SignIn';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './routes/routes';
import Auth from "./utils/Auth";
import { useState } from 'react';

function App() {
  const [auth, setAuth] = useState(false);

  return (
    <div className="App">
      <Auth.Provider value={{auth, setAuth}}>
        <Router>
          <Routes />
        </Router>
      </Auth.Provider>
    </div>
  );
}

export default App;

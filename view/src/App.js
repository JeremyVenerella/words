import logo from './logo.svg';
import './App.css';
import SignIn from './components/SignIn';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './routes/routes';
import Auth from "./utils/Auth";
import { useEffect, useState } from 'react';
import { hasSignedIn } from './components/authApi';
import 'bulma/css/bulma.css'

function App() {
  const [auth, setAuth] = useState(false);

  const session = async () => {
    const res = await hasSignedIn();
    if(res.data.auth){
      setAuth(true);
    }
  }
  useEffect(() => {
    session();
  }, []);

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

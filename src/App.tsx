import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import DataStore from './components/DataStore';
import Footer from './components/Footer';
import Header from './components/Header';
import Nav from './components/Nav';
import UserContext from './contexts/user';
import RouterManager from './RouterManager';

function App() {
  const [user, setUser] = useState(true);

  return (
    <div className="App">
      <UserContext.Provider value={[user, setUser]}>
        <DataStore>
          <Router>
            <Header>
              <Nav />
            </Header>
            <main>
              <RouterManager />
            </main>
            <Footer />
          </Router>
        </DataStore>
      </UserContext.Provider>
    </div>
  );
}

export default App;

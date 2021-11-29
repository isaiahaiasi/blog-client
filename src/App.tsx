import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import DataStore from './components/DataStore';
import Footer from './components/Footer';
import Header from './components/Header';
import Nav from './components/Nav';
import UserContext from './contexts/user';
import RouterManager from './RouterManager';
import { testUser } from './__fixtures__/APIData';

function App() {
  const [user, setUser] = useState(testUser);

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

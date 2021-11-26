import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import UserContext from './contexts/user';
import Dashboard from './pages/Dashboard';
import Discover from './pages/Discover';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Register from './pages/Register';

interface AppProps {}

function App({}: AppProps) {
  const [user, setUser] = useState(true);

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <Router>
          <Nav />
          <main>
            <Routes>
              <Route path="/discover" element={<Discover />} />
              {user ? (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                </>
              ) : (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </>
              )}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Nav from './components/Nav';
import UserContext from './contexts/user';
import Dashboard from './pages/Dashboard';
import Discover from './pages/Discover';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Register from './pages/Register';

interface AppProps {}

// NOTE <Redirect> removed in react-router v6
// current solution involves Navigate, but there may be issues
// see gist: https://gist.github.com/mjackson/b5748add2795ce7448a366ae8f8ae3bb
function App({}: AppProps) {
  const [user, setUser] = useState(true);

  return (
    <div className="App">
      <UserContext.Provider value={[user, setUser]}>
        <Router>
          <Header>
            <Nav />
          </Header>
          <main>
            <Routes>
              <Route path="/" element={<Navigate replace to="/discover" />} />
              <Route path="/discover" element={<Discover />} />
              {user ? (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route
                    path="/login"
                    element={<Navigate replace to="/discover" />}
                  />
                  <Route
                    path="/register"
                    element={<Navigate replace to="/discover" />}
                  />
                </>
              ) : (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/dashboard"
                    element={<Navigate replace to="/login" />}
                  />
                  <Route
                    path="/profile"
                    element={<Navigate replace to="/login" />}
                  />
                </>
              )}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;

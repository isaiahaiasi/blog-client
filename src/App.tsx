import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Nav from './components/Nav';
import { FetchedDataContext } from './contexts/fetchedData';
import UserContext from './contexts/user';
import BlogPage from './pages/BlogPage';
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

  // ! TEMP
  const testBlog = {
    _id: 'testid',
    title: 'testblog',
    content: 'test test test',
    publishDate: new Date(),
    author: {
      _id: 'authorid',
      username: 'johnny test',
    },
  };

  const [blogData, setBlogData] = useState([testBlog]);

  return (
    <div className="App">
      <UserContext.Provider value={[user, setUser]}>
        <FetchedDataContext.Provider value={{ blogs: blogData }}>
          <Router>
            <Header>
              <Nav />
            </Header>
            <main>
              <Routes>
                <Route path="/" element={<Navigate replace to="/discover" />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/blog/:blogid" element={<BlogPage />} />
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
        </FetchedDataContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;

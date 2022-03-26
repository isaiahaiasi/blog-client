import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Nav from './components/Nav';
import UserContext from './contexts/user';
import useStickyState from './hooks/useStickyState';
import type { UserData } from './interfaces/APIDataInterfaces';
import RouterManager from './RouterManager';

const queryClient = new QueryClient();

function App() {
  const userState = useStickyState<UserData | null>(null, 'user_session_info');

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={userState}>
          <Router>
            <Header>
              <Nav />
            </Header>
            <main>
              <RouterManager />
            </main>
            <Footer />
          </Router>
        </UserContext.Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;

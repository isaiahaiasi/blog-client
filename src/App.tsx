import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Nav from './components/Nav';
import UserContext from './contexts/user';
import type { UserData } from './interfaces/APIDataInterfaces';
import RouterManager from './RouterManager';

const queryClient = new QueryClient();

function App() {
  const userState = useState<UserData | null>(null);

  // TODO: replace UserContext & DataStore with react-query
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

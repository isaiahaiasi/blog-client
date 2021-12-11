import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Nav from './components/Nav';
import UserContext from './contexts/user';
import RouterManager from './RouterManager';
import { testUser } from './__fixtures__/APIData';

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState<UserData | null>(testUser);

  // TODO: replace UserContext & DataStore with react-query
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={[user, setUser]}>
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

import * as React from 'react';
import { expect } from 'chai';
import UserContext from '../contexts/user';
import { testUser } from '../__fixtures__/APIData';
import Profile from './Profile';
import { renderWithRouter } from '../utils/testUtils';
import {
  getEditUserRoute,
  getUserFeedRoute,
  loginRoute,
  logoutRoute,
  profileRoute,
} from '../utils/routeGetters';
import { act } from 'react-dom/test-utils';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

describe('<Profile>', () => {
  it("Links to the logged in user's blog feed", () => {
    const { getByText } = renderWithRouter(
      <UserContext.Provider value={[testUser]}>
        <Profile />
      </UserContext.Provider>,
    );

    const userFeedLink = getByText(testUser.username).closest('a');
    expect(userFeedLink?.pathname).to.be.equal(getUserFeedRoute(testUser._id));
  });

  it('Links to the Logout page', () => {
    const { getByText } = renderWithRouter(
      <UserContext.Provider value={[testUser]}>
        <Profile />
      </UserContext.Provider>,
    );

    const logoutLink = getByText(/logout/i).closest('a');
    expect(logoutLink?.pathname).to.be.equal(logoutRoute);
  });

  it('Links to the EditProfile page', () => {
    const { getByText } = renderWithRouter(
      <UserContext.Provider value={[testUser]}>
        <Profile />
      </UserContext.Provider>,
    );

    const editProfLink = getByText(/edit/i).closest('a');
    expect(editProfLink?.pathname).to.be.equal(getEditUserRoute(testUser._id));
  });

  // TODO: cannot figure out how to test redirects
  // (window.location hasn't updated)
  xit('Redirects if user is not logged in', async () => {
    // This should never happen anyway due to Router configuration,
    // but I'm consuming UserContext so I need to handle the case
    // where UserContext is null/default.
    act(() => {
      const { getByText } = renderWithRouter(
        <Routes>
          <Route path={loginRoute} element={<div>Login</div>} />
          <Route
            path={profileRoute}
            element={
              <UserContext.Provider value={null}>
                <Profile />
              </UserContext.Provider>
            }
          />
        </Routes>,
        { route: profileRoute },
      );

      // expect(getByText(/login/i)).to.be.false;
      expect(window.location.pathname).to.be.equal('aefawef');
    });
  });
});

import { render } from '@testing-library/react';
import { expect } from 'chai';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Nav from '../components/Nav';
import UserContext from '../contexts/user';
import { testUser } from '../__fixtures__/APIData';

describe('<Nav>', () => {
  it('Renders correct links when logged out', () => {
    const { getByText, queryByText } = render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>,
    );

    // Should be present
    const login = getByText(/Login/i);
    const register = getByText(/Register/i);
    const discover = getByText(/Discover/i);

    expect(document.body.contains(login));
    expect(document.body.contains(register));
    expect(document.body.contains(discover));

    // Should NOT be present
    const dashboard = queryByText(/Dashboard/i);

    expect(document.body.contains(dashboard)).to.be.false;
  });

  it('Renders correct links when logged in', () => {
    const { getByText, queryByText } = render(
      <BrowserRouter>
        <UserContext.Provider value={[testUser, () => {}]}>
          <Nav />
        </UserContext.Provider>
      </BrowserRouter>,
    );

    // Should be present
    const dashboard = getByText(/Dashboard/i);
    const discover = getByText(/Discover/i);
    const profile = getByText(/Profile/i);

    expect(document.body.contains(dashboard));
    expect(document.body.contains(discover));
    expect(document.body.contains(profile));

    // Should NOT be present
    const login = queryByText(/Login/i);
    const register = queryByText(/Register/i);

    expect(document.body.contains(login)).to.be.false;
    expect(document.body.contains(register)).to.be.false;
  });
});

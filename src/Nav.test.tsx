import * as React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import Nav from './Nav';

describe('<Nav>', () => {
  it('(LOGGED OUT) renders Discover, Login, & Register, and NOT Dashboard', () => {
    const { getByText, queryByText } = render(<Nav />);
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
  xit('When logged in, renders Dashboard, Discover, and Profile links', () => {});
});

import { render } from '@testing-library/react';
import { expect } from 'chai';
import fetchMock from 'fetch-mock/esm/client';
import * as React from 'react';
import Login from '../pages/Login';
import { getLoginEndpoint } from '../utils/routeGetters';

describe('<Login>', () => {
  it('Renders a submit button that sends a login request to the API', () => {
    const { getByRole } = render(<Login />);

    const form = getByRole('form');
    const button = getByRole('button', { name: 'Log in' });
    expect(form);
    expect(form.contains(button));

    fetchMock.mock(getLoginEndpoint(), 200);

    // TODO
    // simulate hitting the submit button
    // TODO
    // test to see if mock fetch was called
  });

  it('Redirects to the homepage if a successful response is returned', () => {});
});

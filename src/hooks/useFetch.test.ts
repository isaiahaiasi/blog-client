import { renderHook } from '@testing-library/react-hooks/dom';
import { expect } from 'chai';
import fetchMock from 'fetch-mock/esm/client';
import useFetch from './useFetch';

const stubbedData = [
  { name: 'Canada', capital: 'Ottawa' },
  { name: 'Italy', capital: 'Rome' },
];

const url = 'api/demo-url';

describe('useFetch()', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should return data after fetch', async () => {
    fetchMock.mock(url, JSON.stringify(stubbedData));
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(url, { current: true }, {}),
    );

    await waitForNextUpdate();

    expect(result.current.isLoading).to.be.false;
    expect(result.current.error).to.be.null;
    expect(result.current.response?.body).to.deep.equal(stubbedData);
  });

  it('should set error state appropriately and set isLoading to False', async () => {
    const errMsg = 'Oops!';

    fetchMock.mock(
      'error-url',
      new Promise(() => {
        throw errMsg;
      }),
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch('error-url', { current: true }, {}),
    );

    await waitForNextUpdate();

    expect(result.current.isLoading).to.be.false;
    expect(result.current.response).to.be.null;
    expect(result.current.error).to.be.equal(errMsg);
  });

  it("should be able to parse body even if it isn't JSON", async () => {
    const body = 'Unauthorized, for example';
    const url = 'text-response-url';

    fetchMock.mock(url, body);

    // TODO: figure out why this is calling parseBody 6 times
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(url, { current: true }, {}),
    );

    await waitForNextUpdate();

    expect(result.current.response?.body).to.be.equal(body);
  });

  it('should not fetch data if current ref is falsy', async () => {
    const url = 'should-not-be-called';
    fetchMock.mock(url, 'res');
    const { result } = renderHook(() => useFetch(url, { current: false }, {}));

    expect(fetchMock.called(url)).to.be.false;
    expect(result.current).to.be.deep.equal({
      isLoading: true,
      response: null,
      error: null,
    });
  });

  xit('should not throw an error if ref is unmounted before fetch returns', () => {});
  xit('should set isLoading to True if no response or error are received', () => {});

  xit('should provide Response properties (eg, ok, statusCode, etc.)', () => {
    // NOTE: not sure how feasible this is with current mocking lib
  });
});

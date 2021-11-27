import { renderHook } from '@testing-library/react-hooks/dom';
import useFetch from './useFetch';
import { expect } from 'chai';
import fetchMock from 'fetch-mock/esm/client';

const stubbedData = [
  { name: 'Canada', capital: 'Ottawa' },
  { name: 'Italy', capital: 'Rome' },
];

const stubbedFetchUrl = 'api/countries-url-mocked';

describe('useFetch()', () => {
  it('should return data after fetch', async () => {
    fetchMock.mock(stubbedFetchUrl, JSON.stringify(stubbedData));

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(stubbedFetchUrl, { current: true }, {}),
    );

    await waitForNextUpdate();

    expect(result.current.isLoading).to.be.false;
    expect(result.current.error).to.be.null;
    expect(result.current.response?.body).to.deep.equal(stubbedData);
  });
});

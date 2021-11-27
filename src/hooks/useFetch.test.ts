import { renderHook } from '@testing-library/react-hooks/dom';
import useFetch from './useFetch';
import { expect } from 'chai';

const stubbedContries = [
  { name: 'Slovakia', capital: 'Bratislava' },
  { name: 'Germany', capital: 'Berlin' },
];

const stubbedFetchUrl = 'api/countries-url-mocked';

// afterEach(() => {
//   Jest: (need chai equivalent)
//   global.fetch.mockClear();
// });

// (afterAll is Jest, not Chai)
// afterAll(() => {
//    Jest: (need chai equivalent)
//    global.fetch.mockRestore()
// })

describe('useFetch()', () => {
  xit('should return data after fetch', async () => {
    // TODO: mock API

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(stubbedFetchUrl, { current: true }, {}),
    );

    await waitForNextUpdate();

    expect(result.current).to.be.equal({
      isLoading: true,
      data: stubbedContries,
      error: null,
    });
  });
});

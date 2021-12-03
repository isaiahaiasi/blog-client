import { act, renderHook } from '@testing-library/react-hooks/dom';
import { expect } from 'chai';
import useStickyReducer from '../hooks/useStickyReducer';

describe('useStickyReducer()', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  const key = 'key';
  const obj = { a: 123 };
  const objString = JSON.stringify(obj);

  it('window.localStorage exists in test env', () => {
    window.localStorage.setItem(key, objString);
    expect(window.localStorage.getItem(key)).to.be.equal(objString);
  });

  it('sets state from the localStorage value on mount, if it exists', async () => {
    window.localStorage.setItem(key, objString);

    const { result } = renderHook(() =>
      useStickyReducer((val: any) => val, { notObj: true }, key),
    );

    expect(result.current[0]).to.deep.equal(obj);
  });

  it('sets the localStorage value on mount, if it does not exist', () => {
    const defaultObj = { notObj: true };
    const { result } = renderHook(() =>
      useStickyReducer((val: any) => val, defaultObj, key),
    );

    expect(result.current[0]).to.deep.equal(defaultObj);
  });

  it('updates localStorage when state is changed', () => {
    const initialObj = { count: 2 };
    const resultObj = { count: 3 };
    const actionCmd = 'increment';

    function reducerFn(prevState: { count: number }, action: string) {
      if (action === actionCmd) return { count: prevState.count + 1 };
      return prevState;
    }

    const { result } = renderHook(() =>
      useStickyReducer(reducerFn, initialObj, key),
    );

    expect(result.current[0]).to.deep.equal(initialObj);

    const [, dispatch] = result.current;

    act(() => dispatch(actionCmd));

    const localStorageResult = JSON.parse(
      window.localStorage.getItem(key) ?? '',
    );

    expect(result.current[0]).to.deep.equal(resultObj);
    expect(localStorageResult).to.deep.equal(resultObj);
  });

  it("doesn't override localStorage value with default value", async () => {
    window.localStorage.setItem(key, objString);

    const defaultObj = { bad: 'no good' };
    const { result } = renderHook(() =>
      useStickyReducer((_: any, newVal: any) => newVal, defaultObj, key),
    );

    expect(result.current[0]).to.deep.equal(obj);
    expect(window.localStorage.getItem(key)).to.equal(objString);
  });
});

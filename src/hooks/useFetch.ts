// https://stackoverflow.com/questions/55647287/how-to-send-request-on-click-react-hooks-way
import { useState } from 'react';
import { useAsyncFn } from './useAsync';

interface RequestInfo extends RequestInit {
  body?: any;
}

interface UseFetchInterface {
  (url: string, options: Partial<RequestInfo>): {
    isLoading: boolean;
    error: unknown;
    response: ParsedResponse | null;
    doFetch: () => void;
  };
}

// replaces Body with the "parsed" body, as either a string or parsed JSON
// Removes all methods for reading the body
export type ParsedResponse = Omit<
  Response,
  'body' | 'bodyUsed' | 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'text'
> & { body: string | Record<string, any> };

const useFetch: UseFetchInterface = (url, options = {}) => {
  const [error, setError] = useState<unknown>(null);
  const [response, setResponse] = useState<ParsedResponse | null>(null);

  const [isLoading, doFetch] = useAsyncFn(async () => {
    console.log('hmmmmm');
    try {
      const res = await fetch(url, getFetchOptions(options));
      const body = await parseBody(res);
      setResponse({ ...res, body });
    } catch (err) {
      setError(err);
    }
  }, [url, options]);

  return {
    isLoading,
    error,
    response,
    doFetch,
  };
};

async function parseBody(body: Body | null) {
  if (!body) {
    return null;
  }

  const responseText = await body.text();

  try {
    return JSON.parse(responseText);
  } catch (err) {
    // console.error(`Could not parse fetch response ${responseText} as JSON`);
    return responseText;
  }
}

function getFetchOptions(options: Partial<RequestInfo>): RequestInit {
  // first, merge static headers, headers passed into hook, & reqInfo-based headers
  const headers = {
    'Access-Control-Allow-Methods': options.method ?? 'GET',
    'Content-Type': 'application/json',
  };

  // if reqInfo.body is JSON-serializable, JSONify it; otherwise, leave it alone
  let body = options.body;
  console.log(body);
  try {
    body = JSON.stringify(body);
  } catch (_) {
    console.log('Request body not serializable as JSON', body);
  }

  return {
    ...options,
    headers: { ...headers, ...options.headers },
    body,
  };
}

export default useFetch;

import { useState } from 'react';
import { useAsyncFn } from 'react-use';

interface RequestInfo extends RequestInit {
  body?: any;
}

// replaces Body with the "parsed" body, as either a string or parsed JSON
// Removes all methods for reading the body
export type ParsedResponse = Omit<
  Response,
  'body' | 'bodyUsed' | 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'text'
> & { body: string | Record<string, any> };

const useFetch = (url: string, options: Partial<RequestInfo> = {}) => {
  const [error, setError] = useState<unknown>(null);

  const [fetchState, doFetch] = useAsyncFn(async () => {
    try {
      const res = await fetch(url, getFetchOptions(options));
      const body = await parseBody(res);

      return { ...res, body };
    } catch (err) {
      setError(err);
    }
  }, [url, options]);

  return {
    error,
    doFetch,
    fetchState,
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

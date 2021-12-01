import { MutableRefObject, useEffect, useState } from 'react';

type RequestMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';

interface RequestInfo {
  method: RequestMethod;
  body?: any;
}

interface UseFetchInterface {
  (url: string, ref: MutableRefObject<any>, options: Partial<RequestInit>): {
    isLoading: boolean;
    error: unknown;
    response: ParsedResponse | null;
    callFetch: (requestInfo: RequestInfo | null) => void;
  };
}

// replaces Body with the "parsed" body, as either a string or parsed JSON
// Removes all methods for reading the body
export type ParsedResponse = Omit<
  Response,
  'body' | 'bodyUsed' | 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'text'
> & { body: string | Record<string, any> };

const useFetch: UseFetchInterface = (url, ref, options = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [response, setResponse] = useState<ParsedResponse | null>(null);
  const [requestInfo, setRequestInfo] = useState<RequestInfo | null>(null);

  useEffect(() => {
    if (ref.current) {
      (async () => {
        try {
          const res = await fetch(
            url,
            requestInfo ? getFetchOptions(options, requestInfo) : options,
          );

          const body = await parseBody(res);

          if (ref.current) {
            const parsedResponse: ParsedResponse = {
              ...res,
              body,
            };
            setResponse(parsedResponse);
          }
        } catch (err) {
          if (ref.current) {
            setError(err);
          }
        } finally {
          if (ref.current) {
            setIsLoading(false);
          }
        }
      })();
    }

    return () => {
      ref.current = false;
    };
  }, [url, ref, options, requestInfo]);

  return {
    isLoading,
    error,
    response,
    callFetch: setRequestInfo,
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

function getFetchOptions(
  options: RequestInit,
  reqInfo: RequestInfo,
): RequestInit {
  // first, merge static headers, headers passed into hook, & reqInfo-based headers
  const headers = {
    'Access-Control-Allow-Methods': reqInfo.method,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // if reqInfo.body is JSON-serializable, JSONify it; otherwise, leave it alone
  let body = reqInfo.body;
  try {
    console.log(body);
    body = JSON.stringify(body);
  } catch (_) {
    console.log('Request body not serializable as JSON', body);
  }

  return {
    ...options,
    method: reqInfo.method,
    headers,
    body,
  };
}
export default useFetch;

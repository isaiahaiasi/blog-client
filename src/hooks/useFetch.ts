import { MutableRefObject, Ref, RefObject, useEffect, useState } from 'react';

interface UseFetchInterface {
  (url: string, ref: MutableRefObject<any>, options: Partial<RequestInit>): {
    isLoading: boolean;
    error: unknown;
    response: ParsedResponse | null;
  };
}

// replaces Body with the "parsed" body, as either a string or parsed JSON
// Removes all methods for reading the body
type ParsedResponse = Omit<
  Response,
  'body' | 'bodyUsed' | 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'text'
> & { body: string | Record<string, any> };

const useFetch: UseFetchInterface = (url, ref, options = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [response, setResponse] = useState<ParsedResponse | null>(null);

  useEffect(() => {
    if (ref.current) {
      (async () => {
        try {
          const res = await fetch(url, options);

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
  }, [url, ref, options]);

  return {
    isLoading,
    error,
    response,
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

export default useFetch;

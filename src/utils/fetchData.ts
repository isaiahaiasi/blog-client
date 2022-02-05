interface RequestInfo extends RequestInit {
  body?: any;
}

function getFetchOptions(options: Partial<RequestInfo>): RequestInit {
  // first, merge static headers, headers passed into hook, & reqInfo-based headers
  const headers = {
    'Access-Control-Allow-Methods': options.method ?? 'GET',
    'Content-Type': 'application/json',
  };

  // if reqInfo.body is JSON-serializable, JSONify it; otherwise, leave it alone
  let { body } = options;
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

export default async function fetchData(
  url: string,
  options: Partial<RequestInfo> = {},
) {
  const res = await fetch(url, getFetchOptions(options));

  const body = await parseBody(res);

  if (body.success) {
    return body;
  }
  throw body;
}

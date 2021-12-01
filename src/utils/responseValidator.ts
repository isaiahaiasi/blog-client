import type { ParsedResponse } from '../hooks/useFetch';

export function validateResponse(response: ParsedResponse, fields: string[]) {
  if (
    response == null ||
    response.body == null ||
    typeof response.body !== 'object' ||
    response.body.content == null ||
    typeof response.body.content !== 'object'
  ) {
    return false;
  }

  console.log(response);

  console.log(response.body);

  return fields.every((field) => (response.body as any).content[field]);
}

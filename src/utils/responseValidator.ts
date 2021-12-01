import type { ParsedResponse } from '../hooks/useFetch';

export function validateResponse(response: ParsedResponse, fields: string[]) {
  if (
    response == null ||
    typeof response.body !== 'object' ||
    typeof response.body.content !== 'object'
  ) {
    return false;
  }

  return fields.every((field) => (response.body as any).content[field]);
}

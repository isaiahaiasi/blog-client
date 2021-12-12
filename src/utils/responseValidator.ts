export function validateResponse(data: any, fields: string[]) {
  console.log('data', data);
  console.log('fields', fields);
  if (
    data == null ||
    data.content == null ||
    typeof data.content !== 'object'
  ) {
    return false;
  }

  return fields.every((field) => data.content[field] !== undefined);
}

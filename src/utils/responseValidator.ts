// TODO: replace with Joi
export default function validateResponse(data: any, fields: string[]) {
  if (
    data == null ||
    data.content == null ||
    typeof data.content !== 'object'
  ) {
    return false;
  }

  return fields.every((field) => data.content[field] !== undefined);
}

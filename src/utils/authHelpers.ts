// currently expects userContext to be in the form of at LEAST:
// [userData]
// TODO: simplify w try/catch
export default function isLoggedIn(userContext: any) {
  return (
    userContext &&
    Array.isArray(userContext) &&
    userContext[0] !== null &&
    typeof userContext[0] === 'object' &&
    userContext[0].username !== undefined &&
    userContext[0]._id !== undefined
  );
}

export const UNAUTHORIZED_RESPONSE = 'Unauthorized';

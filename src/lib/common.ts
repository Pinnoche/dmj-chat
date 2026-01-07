export function getErrorMessage(
  error: any,
  fallback = "An unexpected error occurred, please try again later."
) {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.message) {
    return error.message;
  }
  return fallback;
}

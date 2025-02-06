export default defineEventHandler(async (event) => {
  // Read the request body
  const body = await readBody(event);
  const config = useRuntimeConfig();
  let baseURL = config.public.baseURL
  const token = getCookie(event, 'token');

  if (!token) {
    return { error: 'Token not found' };
  }


  // Simulate an API call to an external service
  const response = await $fetch(`${baseURL}files/uploads`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body:body
  });

  // Return the response
  return response;
});
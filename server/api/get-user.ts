export default defineEventHandler(async (event) => {
  // Read the request body
  const config = useRuntimeConfig();
  let baseURL = config.public.baseURL
  const token=getCookie(event, 'token');

  // Simulate an API call to an external service
  const response = await $fetch(`/external/users/me`, {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    }
  });

  // Return the response
  return response;
});
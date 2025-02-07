export default defineEventHandler(async (event) => {
  // Read the request body
  const config = useRuntimeConfig();
  let baseURL = config.public.baseURL

  // Simulate an API call to an external service
  const response = await $fetch(`${baseURL}home`, {
    method: 'GET'
  });

  // Return the response
  return response;
});
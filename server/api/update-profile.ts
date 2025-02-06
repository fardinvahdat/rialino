export default defineEventHandler(async (event) => {
  // Read the request body
  const body = await readBody(event);
  const config = useRuntimeConfig();
  let baseURL = config.public.baseURL
  const token = body.token

  // Simulate an API call to an external service
  const response = await $fetch(`${baseURL}users/update`, {
    method: 'POST',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
    body:{
        first_name:body.first_name,
        last_name:body.last_name,
        email:body.email,
    },
  });

  // Return the response
  return response;
});
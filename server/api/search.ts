export default defineEventHandler(async (event) => {
  // Read the request body
  const body = await readBody(event);
  const config = useRuntimeConfig();
  let baseURL = config.public.baseURL

  // Validate the body (optional but recommended)
  if (!body.url||!body.site_name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'URL and Site Name required',
    });
  } 

  // Simulate an API call to an external service
  const response = await $fetch(`${baseURL}search`, {
    method: 'POST',
    body: body,
  });

  // Return the response
  return response;
});
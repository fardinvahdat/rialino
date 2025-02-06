export default defineEventHandler(async (event) => {
  // Read the request body
  const body = await readBody(event);
  const config = useRuntimeConfig();
  let baseURL = config.public.baseURL

  // Validate the body (optional but recommended)
  if (!body.mobile) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Mobile number is required',
    });
  } 

  // Simulate an API call to an external service
  const response = await $fetch(`${baseURL}auth/login`, {
    method: 'POST',
    body: {
      mobile: body.mobile,
    },
  });

  // Return the response
  return response;
});
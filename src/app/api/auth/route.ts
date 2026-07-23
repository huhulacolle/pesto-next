export async function GET() {
  return new Response("Authentication Required!", {
    status: 404,
    headers: {
      "WWW-Authenticate": "Basic realm='private_pages'",
    },
  });
}

export async function GET() {
  return Response.json({
    status: "healthy",
    service: "UA Portfolio",
    timestamp: new Date().toISOString(),
  });
}
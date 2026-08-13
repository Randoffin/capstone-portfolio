async function getHealthData() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/health`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch health data");
  }

  return response.json();
}

export default async function Health() {
  const data = await getHealthData();

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-heading text-4xl font-bold text-[#1F2937]">
        Health Check
      </h1>

      <p className="mt-4 font-body text-[#1F2937]">
        The application is successfully fetching data from its API.
      </p>

      <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6">
        <p className="font-body">
          <strong>Status:</strong> {data.status}
        </p>

        <p className="mt-2 font-body">
          <strong>Service:</strong> {data.service}
        </p>

        <p className="mt-2 font-body">
          <strong>Last checked:</strong> {data.timestamp}
        </p>
      </div>
    </main>
  );
}
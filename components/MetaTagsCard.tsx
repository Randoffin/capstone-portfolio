type MetaTagsResult = {
    url: string;
    title: string | null;
    description: string | null;
    canonical: string | null;
    ogTitle: string | null;
    ogDescription: string | null;
    ogImage: string | null;
    twitterCard: string | null;
};

type MetaTagsCardProps = {
    result: MetaTagsResult;
};

function MetadataRow({
    label,
    value,
}: {
    label: string;
    value: string | null;
}) {
    return (
        <div className="grid gap-1 border-b border-gray-100 py-3 last:border-b-0 sm:grid-cols-[140px_1fr] sm:gap-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {label}
            </dt>

            <dd className="break-words text-sm text-gray-800">
                {value ? value : "Not found"}
            </dd>
        </div>
    );
}

function StatusBadge({ found }: { found: boolean }) {
    return (
        <span
            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                found
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
            }`}
        >
            {found ? "Found" : "Not found"}
        </span>
    );
}

export default function MetaTagsCard({
    result,
}: MetaTagsCardProps) {
    return (
        <section
            aria-label="Meta tag analysis"
            className="mt-3 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
        >
            <header className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h3 className="font-semibold text-gray-900">
                            Meta Tag Analysis
                        </h3>

                        <p className="mt-1 break-all text-xs text-gray-500">
                            {result.url}
                        </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                        Complete
                    </span>
                </div>
            </header>

            <dl className="px-4">
                <MetadataRow
                    label="Page title"
                    value={result.title}
                />

                <MetadataRow
                    label="Description"
                    value={result.description}
                />

                <MetadataRow
                    label="Canonical URL"
                    value={result.canonical}
                />

                <MetadataRow
                    label="Open Graph title"
                    value={result.ogTitle}
                />

                <MetadataRow
                    label="Open Graph description"
                    value={result.ogDescription}
                />

                <MetadataRow
                    label="Twitter card"
                    value={result.twitterCard}
                />

                <div className="flex items-center justify-between border-b border-gray-100 py-3">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Open Graph image
                    </dt>

                    <dd>
                        <StatusBadge found={Boolean(result.ogImage)} />
                    </dd>
                </div>
            </dl>
        </section>
    );
}
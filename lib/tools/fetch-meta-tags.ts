import { tool } from "ai";
import { z } from "zod";

const fetchMetaTagsSchema = z.object({
    url: z
        .string()
        .url("Please provide a valid URL.")
        .describe("The public webpage URL to inspect."),
});

export const fetchMetaTags = tool({
    description:
        "Fetch a public webpage and extract its title, description, canonical URL, Open Graph metadata, and Twitter card metadata.",

    inputSchema: fetchMetaTagsSchema,

    execute: async ({ url }) => {
        const response = await fetch(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (compatible; PortfolioAI/1.0; +https://example.com)",
            },
            signal: AbortSignal.timeout(10000),
        });

        if (!response.ok) {
            throw new Error(
                `The webpage returned HTTP ${response.status}.`,
            );
        }

        const contentType = response.headers.get("content-type") ?? "";

        if (!contentType.includes("text/html")) {
            throw new Error("The URL does not return an HTML webpage.");
        }

        const html = await response.text();

        const getMetaContent = (
            attribute: "name" | "property",
            value: string,
        ): string | null => {
            const escapedValue = value.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&",
            );

            const pattern = new RegExp(
                `<meta[^>]+${attribute}=["']${escapedValue}["'][^>]+content=["']([^"']*)["'][^>]*>`,
                "i",
            );

            const reversePattern = new RegExp(
                `<meta[^>]+content=["']([^"']*)["'][^>]+${attribute}=["']${escapedValue}["'][^>]*>`,
                "i",
            );

            return pattern.exec(html)?.[1]?.trim() ??
                reversePattern.exec(html)?.[1]?.trim() ??
                null;
        };

        const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);

        const canonicalMatch = html.match(
            /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i,
        );

        return {
            url,
            title: titleMatch?.[1]?.trim() ?? null,
            description: getMetaContent("name", "description"),
            canonical: canonicalMatch?.[1]?.trim() ?? null,
            ogTitle: getMetaContent("property", "og:title"),
            ogDescription: getMetaContent("property", "og:description"),
            ogImage: getMetaContent("property", "og:image"),
            twitterCard: getMetaContent("name", "twitter:card"),
        };
    },
});
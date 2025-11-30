let cachedVersion: string | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 60 * 60 * 1000;

export async function getRohasVersion(): Promise<string> {
  const now = Date.now();
  if (cachedVersion && now - cacheTimestamp < CACHE_DURATION) {
    return cachedVersion;
  }

  try {
    const response = await fetch(
      "https://api.github.com/repos/rohas-dev/rohas/tags",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }

    const tags = await response.json();

    if (!Array.isArray(tags) || tags.length === 0) {
      throw new Error("No tags found");
    }

    const latestTag = tags[0]?.name;

    if (!latestTag) {
      throw new Error("Latest tag name is empty");
    }

    const version = latestTag.startsWith("v") ? latestTag.slice(1) : latestTag;

    cachedVersion = version;
    cacheTimestamp = now;

    return version;
  } catch (error) {
    console.warn("Failed to fetch rohas version from GitHub:", error);

    if (cachedVersion) {
      return cachedVersion;
    }

    return "0.1.0";
  }
}

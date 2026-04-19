import { readFile } from "node:fs/promises";
import path from "node:path";

import type { LanguageSlug } from "@/lib/site";

export type FillerContentSection = {
  heading: string;
  content: string;
};

export async function getLanguageFillerContent(
  languageSlug: LanguageSlug
): Promise<FillerContentSection[]> {
  const filePath = path.join(
    process.cwd(),
    "public",
    "filler-content",
    `${languageSlug}.json`
  );

  try {
    const fileContents = await readFile(filePath, "utf8");
    const parsed = JSON.parse(fileContents) as Record<string, string>;

    return Object.entries(parsed)
      .filter(
        ([heading, content]) =>
          typeof heading === "string" &&
          heading.trim().length > 0 &&
          typeof content === "string" &&
          content.trim().length > 0
      )
      .map(([heading, content]) => ({
        heading: heading.trim(),
        content: content.trim(),
      }));
  } catch {
    return [];
  }
}

import type { FillerContentSection } from "@/lib/filler-content";

type FillerContentAccordionProps = {
  languageLabel: string;
  sections: FillerContentSection[];
};

export function FillerContentAccordion({
  languageLabel,
  sections,
}: FillerContentAccordionProps) {
  if (sections.length === 0) {
    return null;
  }

  return (
    <section className="neo-surface rounded-[2rem] p-6 sm:p-8">
      <div className="max-w-3xl">
        <p className="theme-accent text-sm font-semibold uppercase tracking-[0.22em]">
          Explore More
        </p>
        <h2 className="theme-text mt-3 text-3xl font-semibold">
          More about {languageLabel} movies on OTT
        </h2>
        <p className="theme-text-muted mt-3 text-base leading-8">
          Click any topic below to expand and read more about trends, audience
          demand, and the OTT market for {languageLabel} cinema.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {sections.map((section, index) => (
          <details
            key={section.heading}
            className="neo-soft group overflow-hidden rounded-[1.5rem]"
            open={index === 0}
          >
            <summary className="theme-text flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-lg font-semibold marker:hidden">
              <span>{section.heading}</span>
              <span className="neo-button theme-accent grid h-9 w-9 shrink-0 place-items-center rounded-full transition-transform duration-200 group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="px-5 py-5">
              <p className="theme-text-muted text-base leading-8">
                {section.content}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

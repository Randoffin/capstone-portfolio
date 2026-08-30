const projects = [
  {
    title: "Settings Form",
    category: "Featured Case Study",
    description:
      "A settings form developed through structured AI-assisted development, with a focus on clear requirements, validation, usability, and responsive design.",
    technologies: ["React", "JavaScript", "HTML", "CSS", "AI-assisted development"],
    featured: true,
  },
  {
    title: "MovieApp",
    category: "Web Application",
    description:
      "A movie application built to demonstrate practical frontend development, API integration, responsive design, and user-focused interfaces.",
    technologies: ["React", "JavaScript", "API", "CSS"],
    featured: false,
  },
  {
    title: "Mortar / Blockwork Estimator",
    category: "Practical Software Tool",
    description:
      "A practical estimation tool that combines software development with Quantity Surveying knowledge to support faster and more structured construction calculations.",
    technologies: ["JavaScript", "HTML", "CSS", "Quantity Surveying"],
    featured: false,
  },
];

export default function Work() {
  return (
    <main className="bg-[#F9FAFB]">
      {/* Page Introduction */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="font-body text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
          Selected Work
        </p>

        <h1 className="mt-3 font-heading text-4xl font-bold text-[#1F2937] md:text-6xl">
          Practical software built around real requirements.
        </h1>

        <p className="mt-6 max-w-2xl font-body text-lg leading-8 text-[#1F2937]">
          A selection of projects demonstrating software development,
          AI-assisted workflows, data-driven thinking, and practical
          problem-solving.
        </p>
      </section>

      {/* Projects */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="space-y-8">
          {projects.map((project) => (
            <article
              key={project.title}
              className={`overflow-hidden rounded-2xl border border-gray-200 bg-white ${
                project.featured ? "shadow-sm" : ""
              }`}
            >
              <div className="p-8 md:p-10">
                <p className="font-body text-sm font-semibold uppercase tracking-wide text-[#10B981]">
                  {project.category}
                </p>

                <h2 className="mt-3 font-heading text-3xl font-bold text-[#1F2937] md:text-4xl">
                  {project.title}
                </h2>

                <p className="mt-4 max-w-3xl font-body text-base leading-7 text-[#1F2937]">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full bg-[#F9FAFB] px-3 py-1.5 font-body text-sm text-[#1F2937]"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                {project.featured && (
                  <div className="mt-8 grid gap-6 md:grid-cols-3">
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-[#1F2937]">
                        Challenge
                      </h3>
                      <p className="mt-2 font-body text-sm leading-6 text-[#1F2937]">
                        Translate a clear set of requirements into a usable,
                        validated settings interface.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-heading text-lg font-semibold text-[#1F2937]">
                        Approach
                      </h3>
                      <p className="mt-2 font-body text-sm leading-6 text-[#1F2937]">
                        Use structured AI prompting alongside development and
                        review to refine the implementation.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-heading text-lg font-semibold text-[#1F2937]">
                        Focus
                      </h3>
                      <p className="mt-2 font-body text-sm leading-6 text-[#1F2937]">
                        Requirements, validation, responsiveness, and
                        maintainable implementation.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Future Projects */}
      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-heading text-3xl font-bold text-[#1F2937]">
            Future Projects
          </h2>

          <p className="mt-4 max-w-2xl font-body leading-7 text-[#1F2937]">
            More practical projects and case studies will be added as they are
            completed.
          </p>

          <a
            href="/contact"
            className="mt-8 inline-block rounded-md bg-[#2563EB] px-6 py-3 font-body font-medium text-white transition hover:bg-[#1D4ED8]"
          >
            Invite me for a job interview
          </a>
        </div>
      </section>
    </main>
  );
}
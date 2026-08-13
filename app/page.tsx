export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-body text-sm font-medium text-[#2563EB]">
        Software Developer
      </p>

      <h1 className="mt-3 font-heading text-4xl font-bold text-[#1F2937] md:text-6xl">
        I use structured AI prompting to develop practical software that meets
        real requirements.
      </h1>

      <p className="mt-6 max-w-2xl font-body text-lg text-[#1F2937]">
        I combine software development, AI-assisted workflows, data analytics,
        and practical problem-solving to build useful software solutions.
      </p>

      <a
        href="/contact"
        className="mt-8 inline-block rounded-md bg-[#2563EB] px-6 py-3 font-body font-medium text-white transition hover:bg-[#1D4ED8]"
      >
        Invite me for a job interview
      </a>
    </main>
  );
}

"use client";

import { FormEvent, useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);

    // Temporary frontend-only submission.
    // Real email delivery can be added later.
    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  }

  return (
    <main className="bg-[#F9FAFB]">
      {/* Page Introduction */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="font-body text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
          Contact
        </p>

        <h1 className="mt-3 font-heading text-4xl font-bold text-[#1F2937] md:text-6xl">
          Let&apos;s work together.
        </h1>

        <p className="mt-6 max-w-2xl font-body text-lg leading-8 text-[#1F2937]">
          Have a project, opportunity, or question? I&apos;d be happy to hear
          from you. Use the form below to get in touch.
        </p>
      </section>

      {/* Contact Content */}
      <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-20 md:grid-cols-[0.8fr_1.2fr]">
        {/* Contact Information */}
        <aside className="rounded-2xl border border-gray-200 bg-white p-8 md:p-10">
          <p className="font-body text-sm font-semibold uppercase tracking-wide text-[#10B981]">
            Get in touch
          </p>

          <h2 className="mt-3 font-heading text-2xl font-bold text-[#1F2937] md:text-3xl">
            Open to meaningful opportunities.
          </h2>

          <p className="mt-4 font-body leading-7 text-[#1F2937]">
            I am interested in opportunities involving software development,
            data analytics, AI-assisted development, and practical technology
            solutions.
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="font-heading text-base font-semibold text-[#1F2937]">
                Software Development
              </h3>
              <p className="mt-1 font-body text-sm leading-6 text-gray-600">
                Frontend development, practical web applications, and
                AI-assisted software development.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-base font-semibold text-[#1F2937]">
                Data &amp; Analytics
              </h3>
              <p className="mt-1 font-body text-sm leading-6 text-gray-600">
                Data analysis, visualization, structured problem-solving, and
                data-driven applications.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-base font-semibold text-[#1F2937]">
                Collaboration
              </h3>
              <p className="mt-1 font-body text-sm leading-6 text-gray-600">
                Open to discussing projects, professional opportunities, and
                practical technology solutions.
              </p>
            </div>
          </div>
        </aside>

        {/* Contact Form */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 md:p-10">
          <h2 className="font-heading text-2xl font-bold text-[#1F2937] md:text-3xl">
            Send a message
          </h2>

          <p className="mt-3 font-body text-sm leading-6 text-gray-600">
            Fill in the form and provide a few details about your message.
          </p>

          {submitted ? (
            <div
              className="mt-8 rounded-xl border border-[#10B981] bg-green-50 p-6"
              role="status"
              aria-live="polite"
            >
              <h3 className="font-heading text-lg font-semibold text-[#1F2937]">
                Message received
              </h3>

              <p className="mt-2 font-body text-sm leading-6 text-[#1F2937]">
                Thank you for reaching out. Your message has been received by
                this contact form.
              </p>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-5 rounded-md bg-[#2563EB] px-5 py-2.5 font-body text-sm font-medium text-white transition hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
              aria-label="Contact form"
            >
              <div>
                <label
                  htmlFor="name"
                  className="font-body text-sm font-medium text-[#1F2937]"
                >
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-3 font-body text-sm text-[#1F2937] outline-none transition placeholder:text-gray-400 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="font-body text-sm font-medium text-[#1F2937]"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-3 font-body text-sm text-[#1F2937] outline-none transition placeholder:text-gray-400 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="font-body text-sm font-medium text-[#1F2937]"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  className="mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-3 font-body text-sm text-[#1F2937] outline-none transition placeholder:text-gray-400 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                  placeholder="What would you like to discuss?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="font-body text-sm font-medium text-[#1F2937]"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="mt-2 w-full resize-y rounded-md border border-gray-300 bg-white px-4 py-3 font-body text-sm text-[#1F2937] outline-none transition placeholder:text-gray-400 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                  placeholder="Tell me a little about your project, opportunity, or question."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-[#2563EB] px-6 py-3 font-body font-medium text-white transition hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}









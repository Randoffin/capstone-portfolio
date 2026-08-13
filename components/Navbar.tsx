import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-[#F9FAFB]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-heading text-xl font-bold text-[#2563EB]"
        >
          UA
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="font-body text-sm font-medium text-[#1F2937] transition hover:text-[#2563EB]"
          >
            Home
          </Link>

          <Link
            href="/work"
            className="font-body text-sm font-medium text-[#1F2937] transition hover:text-[#2563EB]"
          >
            Work
          </Link>

          <Link
            href="/about"
            className="font-body text-sm font-medium text-[#1F2937] transition hover:text-[#2563EB]"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="font-body text-sm font-medium text-[#1F2937] transition hover:text-[#2563EB]"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
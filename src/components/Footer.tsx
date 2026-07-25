import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" border-t-2 border-black dark:border-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16">
        <div className="flex flex-col gap-4">
          <p className="font-departure-mono text-2xl">
            <span
              className="px-2 py-1 -rotate-1 inline-block border-2 border-black dark:border-white"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--accent-contrast)",
              }}
            >
              HtooMyatDev
            </span>
          </p>
          <p className="font-departure-mono font-extrabold text-sm leading-6 max-w-xs">
            Fullstack developer building web apps that hold up under real
            workflows, not just demos.
          </p>
          <p className="font-departure-mono font-black text-xs uppercase flex items-center gap-2 text-green-500">
            <span className="inline-block w-2 h-2 animate-pulse bg-green-500"></span>
            Available for work
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-4">
          <p
            className="font-departure-mono font-bold uppercase tracking-widest text-xs"
            style={{ color: "var(--accent-contrast)" }}
          >
            Navigate
          </p>
          <nav className="flex flex-col gap-2">
            {[
              { label: "Home", href: "/" },
              { label: "About", href: "/#about" },
              { label: "Blogs", href: "/blogs" },
              { label: "Projects", href: "/projects" },
              { label: "Contact", href: "/#contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-departure-mono text-sm w-fit hover:translate-x-1 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Socials / contact */}
        <div className="flex flex-col gap-4">
          <p
            className="font-departure-mono font-bold uppercase tracking-widest text-xs"
            style={{ color: "var(--accent-contrast)" }}
          >
            Connect
          </p>
          <nav className="flex flex-col gap-2">
            {[
              { label: "GitHub", href: "https://github.com/htoomyatdev" },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/htoo-myat-aung-609997310/",
              },
              { label: "Email", href: "mailto:itshtunyk@gmail.com" },
            ].map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  social.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="font-departure-mono text-sm w-fit hover:text-primary hover:translate-x-1 transition-all"
              >
                {social.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import LegalPageShell from "@/components/landing/legal-page-shell";

export const metadata = {
  title: "Cookie Policy | Interview AI",
  description: "How Interview AI uses cookies and similar technologies.",
};

export default function CookiesPage() {
  return (
    <LegalPageShell
      title="Cookie Policy"
      description="This policy explains how we use cookies and similar technologies."
      lastUpdated="June 14, 2026"
    >
      <section>
        <h2>1. What are cookies?</h2>
        <p className="mt-2">
          Cookies are small text files stored on your device when you visit a
          website. They help us remember your preferences and keep you signed
          in.
        </p>
      </section>

      <section>
        <h2>2. Cookies we use</h2>
        <ul className="mt-2">
          <li>
            <strong className="text-foreground">Essential cookies</strong> —
            required for authentication and core functionality
          </li>
          <li>
            <strong className="text-foreground">Preference cookies</strong> —
            remember settings such as theme or session state
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Managing cookies</h2>
        <p className="mt-2">
          You can control cookies through your browser settings. Disabling
          essential cookies may prevent you from signing in or using certain
          features.
        </p>
      </section>

      <section>
        <h2>4. Updates</h2>
        <p className="mt-2">
          We may update this Cookie Policy periodically. Check this page for the
          latest information.
        </p>
      </section>
    </LegalPageShell>
  );
}

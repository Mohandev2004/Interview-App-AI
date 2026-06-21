import LegalPageShell from "@/components/landing/legal-page-shell";

export const metadata = {
  title: "Terms of Service | Interview AI",
  description: "Terms and conditions for using Interview AI.",
};

export default function TermsPage() {
  return (
    <LegalPageShell
      title="Terms of Service"
      description="Please read these terms carefully before using Interview AI."
      lastUpdated="June 14, 2026"
    >
      <section>
        <h2>1. Acceptance of terms</h2>
        <p className="mt-2">
          By accessing or using Interview AI, you agree to be bound by these
          Terms of Service. If you do not agree, do not use the service.
        </p>
      </section>

      <section>
        <h2>2. Use of the service</h2>
        <p className="mt-2">
          Interview AI is provided for personal interview preparation. You agree
          to use the service lawfully and not to misuse, reverse engineer, or
          attempt to disrupt the platform.
        </p>
      </section>

      <section>
        <h2>3. Accounts</h2>
        <p className="mt-2">
          You are responsible for maintaining the confidentiality of your account
          credentials and for all activity under your account. Notify us
          immediately of any unauthorized use.
        </p>
      </section>

      <section>
        <h2>4. AI-generated content</h2>
        <p className="mt-2">
          AI responses are generated for educational purposes and may contain
          errors. Interview AI does not guarantee interview outcomes. You are
          responsible for verifying information before relying on it.
        </p>
      </section>

      <section>
        <h2>5. Limitation of liability</h2>
        <p className="mt-2">
          Interview AI is provided &ldquo;as is&rdquo; without warranties of any
          kind. We are not liable for indirect, incidental, or consequential
          damages arising from your use of the service.
        </p>
      </section>

      <section>
        <h2>6. Changes</h2>
        <p className="mt-2">
          We may update these terms from time to time. Continued use of the
          service after changes constitutes acceptance of the updated terms.
        </p>
      </section>
    </LegalPageShell>
  );
}

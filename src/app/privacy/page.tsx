import LegalPageShell from "@/components/landing/legal-page-shell";

export const metadata = {
  title: "Privacy Policy | Interview AI",
  description: "How Interview AI collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      description="Your privacy matters. This policy explains what data we collect and how we use it."
      lastUpdated="June 14, 2026"
    >
      <section>
        <h2>1. Information we collect</h2>
        <p className="mt-2">
          When you create an account, we collect your name, email address, and
          optional profile information. When you use the service, we store your
          interview sessions, questions, answers, and progress data.
        </p>
      </section>

      <section>
        <h2>2. How we use your information</h2>
        <ul className="mt-2">
          <li>Provide and improve interview preparation features</li>
          <li>Generate AI-powered questions and feedback</li>
          <li>Maintain your account and session history</li>
          <li>Communicate important service updates</li>
        </ul>
      </section>

      <section>
        <h2>3. AI processing</h2>
        <p className="mt-2">
          Content you submit (such as session details and questions) may be
          processed by third-party AI services to generate responses. We do not
          sell your personal data to third parties.
        </p>
      </section>

      <section>
        <h2>4. Data storage and security</h2>
        <p className="mt-2">
          We use industry-standard measures to protect your data, including
          encrypted connections and secure authentication. Data is stored in
          protected databases accessible only to authorized systems.
        </p>
      </section>

      <section>
        <h2>5. Your rights</h2>
        <p className="mt-2">
          You may request access to, correction of, or deletion of your personal
          data by contacting us. You can delete sessions from your dashboard at
          any time.
        </p>
      </section>

      <section>
        <h2>6. Contact</h2>
        <p className="mt-2">
          For privacy-related questions, contact us at privacy@interviewai.app.
        </p>
      </section>
    </LegalPageShell>
  );
}

import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="October 8, 2026">
      <p>
        This policy explains what information KZN Games Inc. (&ldquo;KZN Games&rdquo;, &ldquo;we&rdquo;) collects
        through kzngames.me and how we use it.
      </p>
      <h2>Information we collect</h2>
      <p>
        When you join our waitlist we collect the email address you provide and the platform you select (iOS,
        Android, or investor/publisher inquiry). We do not collect payment information on this website.
      </p>
      <h2>How we use it</h2>
      <ul>
        <li>To send you early-access invitations, build announcements, and studio news.</li>
        <li>To respond to publishing, partnership, or investment inquiries.</li>
      </ul>
      <p>We do not sell your personal information.</p>
      <h2>Your choices</h2>
      <p>
        You can unsubscribe from our emails at any time, or ask us to access or delete your data by writing to{" "}
        <a href="mailto:support@kzngames.me">support@kzngames.me</a>.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent to <a href="mailto:support@kzngames.me">support@kzngames.me</a>.
      </p>
    </LegalPage>
  );
}

import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="October 8, 2026">
      <p>
        By using kzngames.com you agree to these terms. If you do not agree, please do not use the website.
      </p>
      <h2>Website content</h2>
      <p>
        All game titles, artwork, logos, and text on this website are the property of KZN Games Inc. and may not be
        reproduced without permission. Games shown are in development; features, names, and timelines may change.
      </p>
      <h2>Early access</h2>
      <p>
        Joining the waitlist does not guarantee access to any beta or pre-release build. Pre-release builds may be
        unstable and are provided as-is.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to <a href="mailto:support@kzngames.com">support@kzngames.com</a>.
      </p>
    </LegalPage>
  );
}

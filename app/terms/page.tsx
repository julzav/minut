import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions – minut',
  description: 'The terms and conditions governing your use of minut.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between px-8 py-4 border-b border-border">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">M</span>
          </div>
          <span className="text-xl font-semibold text-foreground">minut</span>
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-semibold text-foreground mb-2">Terms &amp; Conditions</h1>
        <p className="text-sm text-muted-foreground mb-12">Last updated: February 26, 2026</p>

        <div className="space-y-10 text-foreground">

          <section>
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using minut (&ldquo;the Service&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), you agree to be bound by these Terms &amp; Conditions. If you do not agree to these terms, you must not use the Service. We reserve the right to update these terms at any time; continued use of minut following any changes constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              minut is a browser-based video conferencing platform with AI-powered meeting transcription and summarization capabilities. The Service allows users to create and join real-time video meetings and, where available, receive automatically generated meeting transcripts, minutes, and action items.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              minut is currently in active development. Features may change, be added, or be removed without notice. We do not guarantee availability or uninterrupted access to the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Eligibility</h2>
            <p className="text-muted-foreground leading-relaxed">
              You must be at least 13 years old to use minut. By using the Service, you represent that you meet this requirement. If you are using minut on behalf of an organisation, you represent that you have authority to bind that organisation to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed">You agree not to use minut to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
              <li>Conduct, facilitate, or promote any unlawful activity</li>
              <li>Harass, threaten, abuse, or harm any individual or group</li>
              <li>Transmit any content that is defamatory, obscene, hateful, or discriminatory</li>
              <li>Record or transcribe meetings without the knowledge and consent of all participants</li>
              <li>Impersonate another person or misrepresent your identity or affiliation</li>
              <li>Attempt to gain unauthorised access to the Service, other users&rsquo; data, or any connected systems</li>
              <li>Distribute malware, spam, or any other harmful or disruptive content</li>
              <li>Interfere with or degrade the performance of the Service for others</li>
              <li>Violate any applicable local, national, or international law or regulation</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We reserve the right to terminate or restrict access to the Service for any user who violates these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Meeting Content and Consent to Recording</h2>
            <p className="text-muted-foreground leading-relaxed">
              When AI transcription is active in a meeting, audio and video content is processed to generate transcripts and summaries. <strong>You are solely responsible for obtaining the informed consent of all meeting participants before enabling AI transcription or any recording features.</strong> Laws regarding consent to recording vary by jurisdiction; ensure you comply with all applicable laws.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              minut does not monitor meeting content in real time. You retain ownership of the content you share in meetings, but by using the Service you grant us a limited licence to process that content as necessary to deliver the Service (e.g., to generate transcripts).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All rights, title, and interest in and to minut — including the software, design, branding, and documentation — are owned by or licensed to us. These Terms do not grant you any right to use our trademarks, logos, or other brand elements.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              You retain all intellectual property rights in the content you contribute during meetings. You grant minut a non-exclusive, worldwide, royalty-free licence to store, process, and display that content solely to provide the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              minut relies on third-party infrastructure and services, including LiveKit for real-time communications and AI providers for transcription. Your use of the Service is also subject to any applicable terms of those providers. We are not responsible for the acts or omissions of third-party service providers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Disclaimers</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
              <li>The Service will be error-free, uninterrupted, or available at all times</li>
              <li>AI-generated transcripts, summaries, or minutes will be accurate or complete</li>
              <li>Any defects in the Service will be corrected</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              AI-generated content is provided for convenience only and should not be relied upon as a verbatim or legally binding record of any meeting.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the fullest extent permitted by applicable law, minut and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including loss of data, loss of profits, or business interruption — arising out of or related to your use of or inability to use the Service, even if we have been advised of the possibility of such damages.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Our total aggregate liability for any claims arising from these terms or the Service shall not exceed the amount you have paid to us in the twelve months preceding the claim, or £100 (GBP), whichever is greater.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Indemnification</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to indemnify, defend, and hold harmless minut and its operators from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising from your use of the Service, your violation of these Terms, or your violation of any rights of a third party.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your use of minut is also governed by our{' '}
              <Link href="/privacy" className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity">
                Privacy Policy
              </Link>
              , which is incorporated into these Terms by reference.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">12. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may suspend or terminate your access to the Service at any time, with or without notice, for any reason including violation of these Terms. Upon termination, your right to use the Service ceases immediately. Provisions of these Terms that by their nature should survive termination will do so.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">13. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms are governed by and construed in accordance with applicable law. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts of the applicable jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">14. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms, please contact us at:
            </p>
            <address className="not-italic mt-3 text-muted-foreground">
              <strong className="text-foreground">minut</strong><br />
              legal@minut.app
            </address>
          </section>

        </div>
      </main>

      <footer className="border-t border-border py-8 px-8 text-center text-muted-foreground mt-16">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
          <p>&copy; 2026 minut.</p>
          <span className="hidden sm:block">&middot;</span>
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <span className="hidden sm:block">&middot;</span>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms &amp; Conditions</Link>
        </div>
      </footer>
    </div>
  );
}

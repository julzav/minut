import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';

export const metadata = {
  title: 'Privacy Policy – minut',
  description: 'How minut collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-14">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">M</span>
            </div>
            <span className="font-semibold text-foreground tracking-tight">minut</span>
          </Link>
          <ModeToggle />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-semibold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-12">Last updated: February 26, 2026</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-10 text-foreground">

          <section>
            <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to minut (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). We are committed to protecting your privacy and handling your personal data with care and transparency. This Privacy Policy explains what information we collect, how we use it, and your rights regarding that information when you use our video conferencing and AI-powered meeting intelligence platform.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              By using minut, you agree to the practices described in this policy. If you do not agree, please do not use the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
            <h3 className="text-base font-medium mb-2 mt-4">2.1 Information You Provide</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Participant name entered before joining a meeting</li>
              <li>Meeting room codes you create or enter</li>
              <li>Any content you share during a meeting (audio, video, screen shares, chat)</li>
            </ul>

            <h3 className="text-base font-medium mb-2 mt-4">2.2 Information Collected Automatically</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Browser type, operating system, and device information</li>
              <li>IP address and approximate geographic region</li>
              <li>Pages and features you interact with, and usage timestamps</li>
              <li>WebRTC connection metadata (e.g., network quality, connection state)</li>
            </ul>

            <h3 className="text-base font-medium mb-2 mt-4">2.3 Meeting Content and AI Processing</h3>
            <p className="text-muted-foreground leading-relaxed">
              When AI transcription is enabled for a meeting, audio streams are processed to generate real-time transcripts, speaker labels, and meeting summaries. This processing may occur on our servers or via third-party AI providers. Meeting recordings, transcripts, and summaries are stored and associated with the meeting room ID.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>To provide, operate, and improve the minut service</li>
              <li>To connect participants in real-time video meetings via LiveKit</li>
              <li>To generate AI-powered transcripts, meeting minutes, and summaries</li>
              <li>To monitor service performance, diagnose technical issues, and ensure reliability</li>
              <li>To comply with legal obligations</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We do not sell your personal information to third parties. We do not use meeting content to train AI models without your explicit consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Data Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may share your information with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
              <li><strong>LiveKit</strong> – our real-time video and audio infrastructure provider, which processes WebRTC streams to facilitate meetings</li>
              <li><strong>AI service providers</strong> – third-party providers used to power transcription and summarization features</li>
              <li><strong>Cloud hosting providers</strong> – infrastructure services for storing and serving the application</li>
              <li><strong>Law enforcement or regulators</strong> – where required by applicable law or legal process</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              All third-party providers are contractually required to handle your data securely and only for the purposes we specify.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              Meeting connection metadata is retained for up to 90 days for troubleshooting and service improvement. Transcripts and meeting summaries are retained for as long as your account is active, or as needed to provide the service. You may request deletion of your meeting data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              minut uses end-to-end encryption for video and audio streams via LiveKit&rsquo;s secure WebRTC infrastructure. Access tokens (JWTs) are short-lived and scoped to specific meeting rooms. We implement industry-standard measures to protect data in transit and at rest, though no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Cookies and Local Storage</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use browser local storage to remember your theme preference (light or dark mode). We do not currently use tracking cookies or third-party advertising cookies. If this changes, we will update this policy and request your consent where required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Children&rsquo;s Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              minut is not directed at children under 13 years of age. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us and we will promptly delete it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              Depending on your jurisdiction, you may have rights including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
              <li>The right to access the personal data we hold about you</li>
              <li>The right to request correction of inaccurate data</li>
              <li>The right to request deletion of your data</li>
              <li>The right to object to or restrict certain processing</li>
              <li>The right to data portability</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              To exercise these rights, please contact us at the address below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of material changes by updating the &ldquo;Last updated&rdquo; date at the top of this page. Continued use of minut after any changes constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
            </p>
            <address className="not-italic mt-3 text-muted-foreground">
              <strong className="text-foreground">minut</strong><br />
              privacy@minut.app
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

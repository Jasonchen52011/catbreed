import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - WhatBreedIsMyCat',
  description: 'Privacy Policy for WhatBreedIsMyCat - Learn how we protect your data and respect your privacy.',
  metadataBase: new URL('https://whatbreedismycat.app'),
  alternates: {
    canonical: '/privacy-policy'
  },
  openGraph: {
    title: 'Privacy Policy - WhatBreedIsMyCat',
    description: 'Learn how WhatBreedIsMyCat protects your data and respects your privacy - comprehensive privacy policy for our AI cat breed identification service.',
    url: 'https://whatbreedismycat.app/privacy-policy',
    type: 'website',
    images: [
      {
        url: '/page/catbreed.jpg',
        width: 1200,
        height: 630,
        alt: 'Privacy Policy - WhatBreedIsMyCat Cat Breed Identifier'
      }
    ],
    locale: 'en_US',
    siteName: 'WhatBreedIsMyCat'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - WhatBreedIsMyCat',
    description: 'Learn how WhatBreedIsMyCat protects your data and respects your privacy in our AI cat breed identification service.',
    images: ['/page/catbreed.jpg'],
    creator: '@catbreedai'
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1
  },
  keywords: [
    'cat breed identifier privacy',
    'AI cat identification privacy policy',
    'whatbreedismycat data protection',
    'cat breed app privacy',
    'GDPR compliance cat identification',
    'pet photo privacy'
  ]
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600 text-lg">
              <strong>Effective Date:</strong> May 29, 2025
            </p>
          </header>

          <div className="prose prose-gray max-w-none">
            <div className="mb-8">
              <p className="text-lg leading-relaxed text-gray-700">
                Thank you for using WhatBreedIsMyCat (<a href="https://whatbreedismycat.app" className="text-blue-600 hover:text-blue-800">https://whatbreedismycat.app</a>). 
                We care about your privacy and are committed to handling your data in a transparent, respectful, and secure way.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 mt-4">
                This Privacy Policy explains how we collect, process, and protect your information. We also explain your rights under the 
                General Data Protection Regulation (GDPR) and other applicable privacy laws.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Who We Are</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                WhatBreedIsMyCat is owned and operated by an independent development team focused on providing AI-powered cat breed analysis. 
                For GDPR purposes, we act as the Data Controller.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Data Controller Contact Info:</strong></p>
                <p className="text-gray-700">Email: hello@whatbreedismycat.app</p>
                <p className="text-gray-700">Website: <a href="https://whatbreedismycat.app" className="text-blue-600 hover:text-blue-800">https://whatbreedismycat.app</a></p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. What Personal Data We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not collect or request any personal information such as your name, email address, or location unless you voluntarily contact us.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                When using our cat breed identifier tool, we temporarily process the following information:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>The photo of your cat (for AI analysis only)</li>
                <li>Basic technical data such as browser type, device type, and anonymized IP (for analytics)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We do not link this data to any user identity.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Data</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We only use your photo to:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Detect possible cat breeds using AI</li>
                <li>Generate on-screen results for you to view or share</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">Any technical data (such as device/browser info) is used only for:</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Monitoring site performance</li>
                <li>Improving usability</li>
                <li>Protecting the service against misuse or abuse</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. How Long We Keep Your Data</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We follow a strict no-storage policy for uploaded photos:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Your cat photo is processed in real time</li>
                <li>It is automatically deleted immediately after the results are generated</li>
                <li>We do not keep backups, archives, or copies of your photo</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Analytics data (non-personal) may be retained for a limited time for performance tracking.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Legal Bases for Processing (GDPR Article 6)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We process data under the following legal bases:</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li><strong>Consent</strong> – You give us permission by uploading a photo for breed analysis</li>
                <li><strong>Legitimate Interest</strong> – We process non-personal technical data to operate and improve the service efficiently and safely</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights Under GDPR</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you are in the European Economic Area (EEA), you have the right to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Access</strong> – Request a copy of your personal data (if any)</li>
                <li><strong>Rectification</strong> – Ask us to correct inaccurate information</li>
                <li><strong>Erasure</strong> – Request deletion of your data ("right to be forgotten")</li>
                <li><strong>Restriction</strong> – Ask us to stop using your data in specific ways</li>
                <li><strong>Objection</strong> – Object to how we use your data if based on legitimate interest</li>
                <li><strong>Data Portability</strong> – Receive your data in a machine-readable format</li>
                <li><strong>Withdraw Consent</strong> – At any time, with no effect on past processing</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                To exercise your rights, please contact us at: <a href="mailto:hello@whatbreedismycat.app" className="text-blue-600 hover:text-blue-800">hello@whatbreedismycat.app</a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Automated Decision-Making</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our AI tool uses automated decision-making to analyze your cat's physical traits and suggest possible breeds.
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>This is fully automated and based on visual comparison</li>
                <li>It does not result in legal or significant effects</li>
                <li>It's meant for informational and educational purposes only</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cookies and Analytics</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We use minimal cookies to:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Enable basic website functionality</li>
                <li>Collect anonymous traffic statistics using privacy-friendly tools (e.g., Plausible or Google Analytics with IP anonymization)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">We do not use cookies for:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Advertising</li>
                <li>Behavioral tracking</li>
                <li>Selling data to third parties</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You can control cookies through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our service is intended for general audiences. We do not knowingly collect data from children under 13. 
                If we become aware that we've unintentionally collected data from a child, we'll delete it immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. International Data Transfers</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our servers may be located outside the EEA. When this occurs, we ensure data is:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Transferred using Standard Contractual Clauses (SCCs)</li>
                <li>Processed securely and in compliance with GDPR</li>
                <li>Deleted immediately after temporary use</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                No personal data is permanently stored on international servers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Data Security Measures</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We take your data security seriously. We use:</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>HTTPS encryption for all communication</li>
                <li>Temporary, secure photo processing</li>
                <li>No persistent storage of sensitive information</li>
                <li>Regular audits of our systems and processes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not share your data with third parties for advertising or marketing.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We may use carefully selected third-party services (e.g., cloud processing or analytics platforms) under strict agreements 
                that comply with privacy regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this policy occasionally to reflect service updates or legal changes. When we do:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>We'll update the "Last Updated" date</li>
                <li>We may notify users via the website footer or pop-up</li>
                <li>Continued use of the service means you accept the updated policy</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or how we handle data, feel free to reach out:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-gray-700">Email: <a href="mailto:hello@whatbreedismycat.app" className="text-blue-600 hover:text-blue-800">hello@whatbreedismycat.app</a></p>
                <p className="text-gray-700">Website: <a href="https://whatbreedismycat.app" className="text-blue-600 hover:text-blue-800">https://whatbreedismycat.app</a></p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We'll respond within 30 days, especially for GDPR-related requests.
              </p>
            </section>

            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-center text-lg text-blue-900 font-medium">
                Thank you for trusting WhatBreedIsMyCat. Your privacy is our priority.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
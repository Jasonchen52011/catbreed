import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - WhatBreedIsMyCat',
  description: 'Terms of Service for WhatBreedIsMyCat - Read our terms and conditions for using our AI-powered cat breed identification service.',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-gray-600 text-lg">
              <strong>Effective Date:</strong> May 29, 2025
            </p>
          </header>

          <div className="prose prose-gray max-w-none">
            <div className="mb-8">
              <p className="text-lg leading-relaxed text-gray-700">
                Welcome to WhatBreedIsMyCat (<a href="https://whatbreedismycat.app" className="text-blue-600 hover:text-blue-800">https://whatbreedismycat.app</a>). 
                These Terms of Service ("Terms") govern your access to and use of our website and services. By using our site, you agree to these Terms. 
                If you do not agree, please do not use the website.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 mt-4">
                Please read them carefully.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. About WhatBreedIsMyCat</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                WhatBreedIsMyCat is an AI-powered web tool that allows users to upload a photo of a cat and receive an estimate of its possible breeds. 
                The tool uses computer vision and machine learning models trained on data from reputable sources like The International Cat Association (TICA).
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our service is provided free of charge, without registration, and is intended for informational and educational purposes only.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Eligibility</h2>
              <p className="text-gray-700 leading-relaxed mb-4">You may use this website if:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>You are at least 13 years old, or have the consent of a parent or legal guardian</li>
                <li>You agree to comply with these Terms</li>
                <li>You use the service only for personal, non-commercial purposes</li>
                <li>You do not reside in a jurisdiction that prohibits such services</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We may block or remove access if we believe these conditions are not met.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Description of the Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">WhatBreedIsMyCat allows you to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Upload a photo of your cat (PNG, JPG, JPEG, or WEBP, max 10MB)</li>
                <li>Automatically receive an AI-generated result showing the top 3 likely cat breeds, each with:
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>A match percentage</li>
                    <li>Brief breed traits (personality, physical features)</li>
                    <li>General care tips</li>
                  </ul>
                </li>
                <li>Download or share your result</li>
              </ul>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-4">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Please Note:</h3>
                <ul className="list-disc pl-6 space-y-2 text-yellow-700">
                  <li>The breed results are estimates based on visual similarities, not genetic testing.</li>
                  <li>Our AI cannot verify purebred status or lineage.</li>
                  <li>For confirmed results, we recommend third-party DNA test providers like Basepaws or Wisdom Panel.</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Your Use of the Website</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree to use WhatBreedIsMyCat only for lawful and respectful purposes. You must not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Upload photos that contain people, copyrighted images, or other animals</li>
                <li>Submit offensive, explicit, violent, or unlawful content</li>
                <li>Attempt to reverse-engineer, disrupt, or exploit the AI service</li>
                <li>Mislead others by falsifying breed results</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to remove content, block users, or limit access if the service is misused.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Uploaded Content</h2>
              <p className="text-gray-700 leading-relaxed mb-4">By uploading a photo, you agree:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>You own the photo or have permission to use it</li>
                <li>You grant us temporary, limited permission to process the image using our AI</li>
                <li>Your photo will be automatically deleted from our systems after processing</li>
                <li>We will not store, save, reuse, or share your uploaded photo for any purpose</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                For more, see our full <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The design, features, branding, and content on this website—including the AI tool, breed descriptions, and cat breed chart—are the intellectual property of WhatBreedIsMyCat.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">You may not:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Copy, reproduce, or modify any part of the website</li>
                <li>Sell, resell, or redistribute the AI results or breed chart</li>
                <li>Use our branding or assets without written permission</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You may share your own results (e.g., on social media) for personal, non-commercial purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Privacy and Data Protection</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We take privacy seriously. Here's a quick summary:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>We do not store or save uploaded photos</li>
                <li>We do not require account creation or collect personal data</li>
                <li>We use basic cookies for website functionality and anonymous analytics</li>
                <li>We comply with GDPR and other privacy regulations</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                See our full <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800">Privacy Policy</a> for more.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Disclaimer of Warranties</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                WhatBreedIsMyCat is offered on an "as-is" and "as-available" basis. We do not guarantee:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>The accuracy of breed identification results</li>
                <li>That the service will be error-free, uninterrupted, or always available</li>
                <li>That the results will match official DNA or breeder records</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Using the tool is at your own discretion and risk.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To the fullest extent permitted by law, WhatBreedIsMyCat shall not be liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Errors in breed predictions</li>
                <li>Loss of data or images</li>
                <li>Any decisions made based on AI results</li>
                <li>Damages or harm resulting from using or relying on the service</li>
              </ul>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                <p className="text-red-700 font-medium">
                  This tool is for educational and entertainment use only.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Third-Party Links</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our site may occasionally link to trusted third-party services, such as:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>DNA test providers (e.g., Basepaws, Wisdom Panel)</li>
                <li>Breed standard resources (e.g., TICA)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                These links are provided for convenience only. We are not responsible for their content, terms, or privacy policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Modifications to the Service</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update, pause, or discontinue parts of the website or features at any time without prior notice. 
                This includes updates to the AI model, layout, breed database, or results format.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to These Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We may revise these Terms periodically. If we do:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>We'll update the "Last Updated" date at the top</li>
                <li>Continued use of the site means you accept the new version</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms are governed by the laws of the State of California, USA, without regard to conflict of law rules. 
                Any disputes must be handled in appropriate California courts.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have questions about these Terms, our service, or anything else, reach out:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-2">📧 Email: contact@whatbreedismycat.app</p>
                <p className="text-gray-700">🌐 Website: <a href="https://whatbreedismycat.app" className="text-blue-600 hover:text-blue-800">https://whatbreedismycat.app</a></p>
              </div>
            </section>

            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-center text-lg text-blue-900 font-medium">
                Thanks for using WhatBreedIsMyCat! We're here to help you discover the story behind your cat's unique features. 🐱
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
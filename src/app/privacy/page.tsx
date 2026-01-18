import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | PromptGenie',
    description: 'Privacy Policy for PromptGenie AI Prompt Library.',
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl" style={{ marginTop: '2rem' }}>
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

            <div className="space-y-6 text-gray-700">
                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">1. Introduction</h2>
                    <p>
                        Welcome to PromptGenie ("we," "our," or "us"). We are committed to protecting your privacy
                        and ensuring you have a positive experience on our website. This Privacy Policy explains
                        how we collect, use, and safeguard your information when you visit our website
                        [https://promptgenie.kr](https://promptgenie.kr).
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">2. Information We Collect</h2>
                    <p className="mb-2">We may collect the following types of information:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Personal Information:</strong> Name, email address, or other details you voluntarily provide (e.g., when submitting a prompt or contacting us).</li>
                        <li><strong>Usage Data:</strong> Information about your device, browser, IP address, and how you interact with our site.</li>
                        <li><strong>Cookies:</strong> We use cookies to enhance your experience and serve personalized ads (Google AdSense).</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">3. Google AdSense & Third-Party Cookies</h2>
                    <p>
                        We use Google AdSense to display advertisements. Google uses cookies to serve ads based on
                        your prior visits to our website or other websites. Google's use of advertising cookies
                        enables it and its partners to serve ads to users based on their visit to your sites
                        and/or other sites on the Internet.
                    </p>
                    <p className="mt-2">
                        Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Ad Settings</a>.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">4. How We Use Your Information</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>To provide and maintain our service.</li>
                        <li>To monitor the usage of our service and detect issues.</li>
                        <li>To serve relevant advertisements.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">5. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:support@promptgenie.kr" className="text-blue-600 hover:underline">support@promptgenie.kr</a> (or your actual contact email).
                    </p>
                </section>
            </div>
        </div>
    );
}

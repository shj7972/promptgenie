import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | PromptGenie',
    description: 'Terms of Service for PromptGenie AI Prompt Library.',
};

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl" style={{ marginTop: '2rem' }}>
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

            <div className="space-y-6 text-gray-700">
                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using PromptGenie website ([https://promptgenie.kr](https://promptgenie.kr)), you accept and agree
                        to be bound by the terms and provision of this agreement.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">2. Use License</h2>
                    <p>
                        Permission is granted to temporarily download one copy of the materials (information or software)
                        on PromptGenie's website for personal, non-commercial transitory viewing only.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">3. Disclaimer</h2>
                    <p>
                        The materials on PromptGenie's website are provided on an 'as is' basis. PromptGenie makes no
                        warranties, expressed or implied, and hereby disclaims and negates all other warranties including,
                        without limitation, implied warranties or conditions of merchantability, fitness for a particular
                        purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">4. Limitations</h2>
                    <p>
                        In no event shall PromptGenie or its suppliers be liable for any damages (including, without limitation,
                        damages for loss of data or profit, or due to business interruption) arising out of the use or
                        inability to use the materials on PromptGenie's website.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">5. Modifications</h2>
                    <p>
                        PromptGenie may revise these terms of service for its website at any time without notice.
                        By using this website you are agreeing to be bound by the then current version of these Terms of Service.
                    </p>
                </section>
            </div>
        </div>
    );
}

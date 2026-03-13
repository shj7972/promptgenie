'use server';

interface GenerateRequest {
    provider: 'openai' | 'gemini' | 'claude';
    apiKey: string;
    systemPrompt: string;
    userPrompt: string;
}

export async function generateBlogPost({ provider, apiKey, systemPrompt, userPrompt }: GenerateRequest) {
    try {
        let content = '';

        if (provider === 'openai') {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: userPrompt }
                    ],
                    temperature: 0.7
                })
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error.message);
            content = data.choices?.[0]?.message?.content || '';

        } else if (provider === 'gemini') {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }]
                    }]
                })
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error.message);
            content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

        } else if (provider === 'claude') {
            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'x-api-key': apiKey,
                    'anthropic-version': '2023-06-01',
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    model: "claude-3-haiku-20240307",
                    max_tokens: 4000,
                    system: systemPrompt,
                    messages: [
                        { role: "user", content: userPrompt }
                    ]
                })
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error.message);
            content = data.content?.[0]?.text || '';
        }

        return { success: true, content };

    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

const fs = require('fs');
const path = require('path');

const locales = ['ja', 'es', 'zh', 'ar'];
const baseDir = 'c:/Users/seohy/workspace_antigravity/ai_prompt/src/dictionaries';

locales.forEach(locale => {
    const filePath = path.join(baseDir, `${locale}.json`);
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        JSON.parse(content);
        console.log(`✅ ${locale}.json is valid JSON.`);
    } catch (err) {
        console.error(`❌ ${locale}.json is invalid:`, err.message);
        process.exit(1);
    }
});

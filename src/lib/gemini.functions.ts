import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

export const engineStatus = createServerFn({ method: 'GET' }).handler(async () => ({ configured: Boolean(process.env['GEMINI_API_KEY']) }));

export const runGemini = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => z.object({ task: z.enum(['script', 'fix']), title: z.string().max(200).optional(), niche: z.string().max(100).optional(), language: z.enum(['Telugu', 'Tamil', 'Hindi', 'Kannada', 'English']).optional(), style: z.string().max(100).optional(), text: z.string().min(1).max(10000) }).parse(input))
  .handler(async ({ data }) => {
    const key = process.env['GEMINI_API_KEY'];
    if (!key) return { text: '', error: 'Live Gemini is not configured. Add GEMINI_API_KEY securely in Lovable Cloud, or use Offline Mock Engine.' };
    const prompt = data.task === 'script'
      ? `Generate a localized influencer script in ${data.language} for ${data.title}, niche ${data.niche}, style ${data.style}. Brief: ${data.text}. Return only JSON with string fields visual, hook, body, hashtags. Include #ad and avoid unsubstantiated claims. Preserve authentic regional language and respectful cultural context.`
      : `Rewrite this influencer script to include clear #ad disclosure, remove absolute unsubstantiated claims, and remove culturally insensitive language. Keep the original language and intent. Return only the corrected script: ${data.text}`;
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: data.task === 'script' ? { responseMimeType: 'application/json' } : {} }),
    });
    if (!response.ok) return { text: '', error: `Gemini request failed (${response.status}). Check your key, model access, and Google AI quota.` };
    const reader = response.body?.getReader();
    if (!reader) return { text: '', error: 'Gemini returned no response stream.' };
    const decoder = new TextDecoder(); let buffer = ''; let text = '';
    while (true) {
      const chunk = await reader.read(); buffer += decoder.decode(chunk.value, { stream: !chunk.done });
      const lines = buffer.split('\n'); buffer = lines.pop() ?? '';
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const payload = JSON.parse(line.slice(6));
        if (payload.promptFeedback?.blockReason) return { text: '', error: 'Gemini declined this request.' };
        for (const candidate of payload.candidates ?? []) {
          if (candidate.finishReason === 'SAFETY') return { text: '', error: 'Gemini declined this request.' };
          for (const part of candidate.content?.parts ?? []) if (part.text) text += part.text;
        }
      }
      if (chunk.done) break;
    }
    return { text, error: text ? '' : 'Gemini returned no generated text.' };
  });
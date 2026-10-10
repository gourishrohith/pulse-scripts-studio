import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const GATEWAY_URL = 'https://ai.gateway.lovable.dev/v1/chat/completions';
const MODEL = 'google/gemini-3.8-flash';

export const engineStatus = createServerFn({ method: 'GET' }).handler(async () => ({ configured: Boolean(process.env['LOVABLE_API_KEY']) }));

export const runGemini = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => z.object({ task: z.enum(['script', 'fix']), title: z.string().max(200).optional(), niche: z.string().max(100).optional(), language: z.enum(['Telugu', 'Tamil', 'Hindi', 'Kannada', 'English']).optional(), style: z.string().max(100).optional(), text: z.string().min(1).max(10000) }).parse(input))
  .handler(async ({ data }) => {
    const key = process.env['LOVABLE_API_KEY'];
    if (!key) return { text: '', error: 'Lovable AI is not configured for this project. Use Offline Mock Engine.' };
    const prompt = data.task === 'script'
      ? `Generate a localized influencer script in ${data.language} for ${data.title}, niche ${data.niche}, style ${data.style}. Brief: ${data.text}. Return only JSON with string fields visual, hook, body, hashtags. Include #ad and avoid unsubstantiated claims. Preserve authentic regional language and respectful cultural context.`
      : `Rewrite this influencer script to include clear #ad disclosure, remove absolute unsubstantiated claims, and remove culturally insensitive language. Keep the original language and intent. Return only the corrected script: ${data.text}`;
    const response = await fetch(GATEWAY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        messages: [{ role: 'user', content: prompt }],
        ...(data.task === 'script' ? { response_format: { type: 'json_object' } } : {}),
      }),
    });
    if (!response.ok) {
      if (response.status === 429) return { text: '', error: 'Lovable AI is rate limited right now. Try again in a moment.' };
      if (response.status === 402) return { text: '', error: 'Lovable AI credits are exhausted. Add credits or use Offline Mock Engine.' };
      return { text: '', error: `Lovable AI request failed (${response.status}). Try again or use Offline Mock Engine.` };
    }
    const reader = response.body?.getReader();
    if (!reader) return { text: '', error: 'Lovable AI returned no response stream.' };
    const decoder = new TextDecoder(); let buffer = ''; let text = '';
    while (true) {
      const chunk = await reader.read(); buffer += decoder.decode(chunk.value, { stream: !chunk.done });
      const lines = buffer.split('\n'); buffer = lines.pop() ?? '';
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const payload = line.slice(6).trim();
        if (payload === '[DONE]') continue;
        try {
          const parsed = JSON.parse(payload);
          for (const choice of parsed.choices ?? []) {
            const delta = choice.delta?.content;
            if (typeof delta === 'string') text += delta;
          }
        } catch { /* partial SSE chunk */ }
      }
      if (chunk.done) break;
    }
    return { text, error: text ? '' : 'Lovable AI returned no generated text.' };
  });

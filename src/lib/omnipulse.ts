export const languages = ['Telugu', 'Tamil', 'Hindi', 'Kannada', 'English'] as const;
export const niches = ['Tech', 'Beauty', 'Finance', 'Lifestyle', 'Food'];
export const styles = ['High-Energy Reel Hook', 'Storytelling', 'Unboxing Review', 'Humorous Skit'];
export type ScriptInput = { title: string; niche: string; brief: string; language: string; style: string };
export type Script = { visual: string; hook: string; body: string; hashtags: string };
const hooks: Record<string, string> = {
  Telugu: 'ఒక్కసారి చూడండి! మీ రోజును మార్చే చిన్న విషయం ఇది.',
  Tamil: 'ஒரு நிமிடம்! உங்கள் நாளுக்கான ஒரு புதிய கண்டுபிடிப்பு.',
  Hindi: 'एक मिनट! आपके दिन के लिए कुछ नया लेकर आए हैं।',
  Kannada: 'ಒಂದು ನಿಮಿಷ! ನಿಮ್ಮ ದಿನಕ್ಕಾಗಿ ಒಂದು ಹೊಸ ಪರಿಚಯ.',
  English: 'Wait a second. This deserves a spot in your everyday routine.',
};
const captions: Record<string, string> = {
  Telugu: 'ఇది నా అనుభవం. పూర్తి వివరాలు తెలుసుకుని, మీకు సరిపోతుందో చూడండి.',
  Tamil: 'இது என் அனுபவம். முழு விவரங்களைப் பார்த்து உங்களுக்கு ஏற்றதா என்பதை முடிவு செய்யுங்கள்.',
  Hindi: 'यह मेरा अनुभव है। पूरी जानकारी देखें और तय करें कि यह आपके लिए सही है या नहीं।',
  Kannada: 'ಇದು ನನ್ನ ಅನುಭವ. ಸಂಪೂರ್ಣ ವಿವರಗಳನ್ನು ನೋಡಿ ನಿಮಗೆ ಸೂಕ್ತವೇ ಎಂದು ನಿರ್ಧರಿಸಿ.',
  English: 'Here is my experience. Explore the full details and decide whether it is right for you.',
};
export function mockScript(input: ScriptInput): Script {
  const cues: Record<string, string> = {
    'High-Energy Reel Hook': 'Quick close-up → product reveal → three fast cuts. Open with direct eye contact.',
    Storytelling: 'Start with an everyday moment. Cut to the product, then finish with a personal reflection.',
    'Unboxing Review': 'Overhead unboxing shot → packaging detail → honest first-impression close-up.',
    'Humorous Skit': 'Two-character split-screen. Set up an everyday problem, then reveal the product with a playful reaction.',
  };
  return { visual: cues[input.style] ?? 'Start with an everyday moment.', hook: `${hooks[input.language] ?? hooks['English']} ${input.title}`, body: `${captions[input.language] ?? captions['English']}\n\n${input.brief}`, hashtags: `#ad #${input.language}Creators #${input.niche} #BracoOmniPulse` };
}
export const scriptText = (s: Script) => `Visual / Camera Cue\n${s.visual}\n\nRegional Hook\n${s.hook}\n\nBody Caption\n${s.body}\n\nHashtags\n${s.hashtags}`;
export function auditScript(text: string) {
  const disclosure = /(?:^|\s)#(?:ad|sponsored)\b|\bpaid partnership\b/i.test(text);
  const claims = ['100% cure', 'guaranteed earnings', 'miracle fix'].filter(t => text.toLowerCase().includes(t));
  const cultural = ['inferior caste', 'backward community', 'religious slur'].filter(t => text.toLowerCase().includes(t));
  const flags = [...(!disclosure ? [{ term: 'Missing disclosure', detail: 'Add #ad, #sponsored, or Paid Partnership prominently.' }] : []), ...claims.map(term => ({ term, detail: 'Replace the absolute claim with a qualified, substantiated statement.' })), ...cultural.map(term => ({ term, detail: 'Remove discriminatory language and request a human review.' }))];
  const score = Math.max(0, 100 - (!disclosure ? 30 : 0) - claims.length * 25 - cultural.length * 35);
  return { score, flags, disclosure, claims, cultural, status: claims.length || cultural.length ? 'Flagged' : !disclosure ? 'Action Required' : 'Approved' };
}
export function fixOffline(text: string) {
  let fixed = text.replace(/100% cure/gi, 'may help; individual results vary').replace(/guaranteed earnings/gi, 'potential earnings; outcomes are not guaranteed').replace(/miracle fix/gi, 'a possible option; results vary').replace(/inferior caste|backward community|religious slur/gi, '[removed for respectful language]');
  if (!auditScript(fixed).disclosure) fixed = `#ad\n${fixed}`;
  return fixed;
}
export const languageReach = [{ language: 'Telugu', value: 40 }, { language: 'Tamil', value: 35 }, { language: 'Hindi', value: 25 }];
export type Creator = { name: string; handle: string; language: string; secondary: string; niche: string; followers: string; engagement: string; trust: number; photo: number; location: string };
export const creators: Creator[] = [
  { name: 'Ananya Reddy', handle: '@ananya.creates', language: 'Telugu', secondary: 'English, Hindi', niche: 'Lifestyle', followers: '248K', engagement: '6.8', trust: 98, photo: 0, location: 'Hyderabad' },
  { name: 'Arjun Kumar', handle: '@arjun.tech', language: 'Tamil', secondary: 'English', niche: 'Tech', followers: '186K', engagement: '5.4', trust: 96, photo: 1, location: 'Chennai' },
  { name: 'Priya Sharma', handle: '@priya.glow', language: 'Hindi', secondary: 'English, Punjabi', niche: 'Beauty', followers: '312K', engagement: '7.2', trust: 99, photo: 2, location: 'Mumbai' },
  { name: 'Karthik Gowda', handle: '@karthik.eats', language: 'Kannada', secondary: 'English, Telugu', niche: 'Food', followers: '142K', engagement: '8.1', trust: 94, photo: 3, location: 'Bengaluru' },
  { name: 'Meera Iyer', handle: '@meera.money', language: 'Tamil', secondary: 'English, Hindi', niche: 'Finance', followers: '204K', engagement: '5.9', trust: 97, photo: 4, location: 'Coimbatore' },
  { name: 'Rohan Mehta', handle: '@rohan.daily', language: 'English', secondary: 'Hindi', niche: 'Lifestyle', followers: '165K', engagement: '6.2', trust: 92, photo: 5, location: 'Pune' },
];
export function filterCreators(language: string, niche: string, trust: number, search = '') {
  return creators.filter(c => (language === 'All languages' || c.language === language) && (niche === 'All niches' || c.niche === niche) && c.trust >= trust && `${c.name} ${c.handle}`.toLowerCase().includes(search.toLowerCase()));
}
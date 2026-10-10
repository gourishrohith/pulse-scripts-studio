import { describe, it, expect } from 'vitest';
import { auditScript, fixOffline, filterCreators, languageReach, mockScript } from '@/lib/omnipulse';
describe('Disclosure screening', () => {
  for (const tag of ['#ad', '#sponsored', 'Paid Partnership']) it(`recognizes ${tag}`, () => expect(auditScript(`${tag} My honest experience`).score).toBe(100));
  it('requires a disclosure', () => expect(auditScript('My honest experience').status).toBe('Action Required'));
  for (const term of ['100% cure', 'guaranteed earnings', 'miracle fix']) it(`flags ${term}`, () => expect(auditScript(`#ad ${term}`).claims).toContain(term));
  it('flags discriminatory language', () => expect(auditScript('#ad backward community').cultural).toContain('backward community'));
  it('repairs disclosures and claims', () => expect(auditScript(fixOffline('100% cure')).score).toBe(100));
});
it('filters by language, niche, and minimum trust', () => expect(filterCreators('Tamil', 'Tech', 96).map(c => c.name)).toEqual(['Arjun Kumar']));
it('preserves language reach breakdown', () => expect(languageReach.map(l => l.value)).toEqual([40, 35, 25]));
it('generates Telugu offline content', () => expect(mockScript({title:'Test',brief:'Offer',niche:'Tech',language:'Telugu',style:'Storytelling'}).hook).toContain('ఒక్కసారి'));
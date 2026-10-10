import { MapPin, BadgeCheck, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Creator } from '@/lib/omnipulse';
import p0 from '@/assets/creator-0.jpg';
import p1 from '@/assets/creator-1.jpg';
import p2 from '@/assets/creator-2.jpg';
import p3 from '@/assets/creator-3.jpg';
import p4 from '@/assets/creator-4.jpg';
import p5 from '@/assets/creator-5.jpg';
const photos = [p0,p1,p2,p3,p4,p5];
export function CreatorCard({ creator: c, compact = false, onSelect }: { creator: Creator; compact?: boolean; onSelect: () => void }) {
 return <article className={`creator-card ${compact ? 'compact' : ''}`}><div className="creator-head"><img src={photos[c.photo]} alt={c.name} width={56} height={56} loading="lazy"/><div><h3>{c.name}<BadgeCheck size={14}/></h3><p>{c.handle}</p></div><Button variant="ghost" size="icon" aria-label={`View ${c.name}`} onClick={onSelect}><ArrowUpRight size={17}/></Button></div><div className="creator-tags"><span className={`language-tag lang-${c.language.toLowerCase()}`}>{c.language}</span><span className="niche-tag">{c.niche}</span></div>{!compact && <p className="creator-location"><MapPin size={12}/>{c.location} · {c.secondary}</p>}<div className="creator-metrics"><div><strong>{c.followers}</strong><small>Followers</small></div><div><strong>{c.engagement}%</strong><small>Engagement</small></div><div><strong className="text-success">{c.trust}%</strong><small>ASCI trust</small></div></div>{!compact && <Button variant="outline" className="w-full mt-5" onClick={onSelect}>View creator <ArrowUpRight/></Button>}</article>;
}
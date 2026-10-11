import { Link, useLocation } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { Activity, LayoutDashboard, Languages, ShieldCheck, UsersRound, Settings, ChevronDown, ChevronRight, Bell, Search, Menu, X, CircleHelp, Sparkles, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const nav = [
  { to: '/', label: 'Dashboard Overview', icon: LayoutDashboard },
  { to: '/scripts', label: 'Multilingual Script Engine', icon: Languages },
  { to: '/compliance', label: 'ASCI Compliance Screener', icon: ShieldCheck },
  { to: '/creators', label: 'Regional Creator Discovery', icon: UsersRound },
  { to: '/settings', label: 'Settings', icon: Settings },
] as const;
export function OmniShell({ children }: { children: React.ReactNode }) {
  const pathname = useLocation({ select: l => l.pathname });
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const contentRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const content = contentRef.current;
    if (!content || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-reveal', 'visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });
    const registerElements = () => {
      content.querySelectorAll('.page-heading, .overview-banner, .stat-card, .analytics-grid > .panel, .section-heading, .tool-card, .creator-card, .activity-section, .form-grid > .panel, .filter-bar, .creator-count, .settings-layout').forEach(element => {
        if (element.hasAttribute('data-reveal')) return;
        element.setAttribute('data-reveal', 'pending');
        observer.observe(element);
      });
    };
    registerElements();
    const updates = new MutationObserver(registerElements);
    updates.observe(content, { childList: true, subtree: true });
    return () => { observer.disconnect(); updates.disconnect(); };
  }, [pathname]);
  const title = nav.find(n => n.to === pathname)?.label ?? 'Overview';
  return <div className="app-shell">
    {open && <div className="mobile-backdrop" onClick={() => setOpen(false)} />}
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <Link to="/" className="brand"><span className="brand-symbol"><Activity size={23} /></span><span>braco<span className="brand-product">OMNIPULSE</span></span></Link>
      <Button variant="ghost" className="workspace" onClick={() => toast.info('Braco Workspace · Regional marketing')}><span className="workspace-mark">B</span><span>Braco Workspace<small>Marketing team</small></span><ChevronDown size={15}/></Button>
      <div className="nav-label">WORKSPACE</div>
      <nav>{nav.map(n => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className={`nav-item ${pathname === n.to ? 'active' : ''}`}><n.icon size={18}/><span>{n.label}</span>{pathname === n.to && <span className="nav-dot"/>}</Link>)}</nav>
      <div className="sidebar-bottom"><div className="engine-panel"><div><span className="status-dot"/> OmniPulse Engine <span className="engine-mini">READY</span></div><p>Built for voices that matter.</p><Link to="/settings">Engine configuration <ChevronRight size={14}/></Link></div><Button variant="ghost" className="help-link" onClick={() => toast.info('Contact your workspace administrator for support.')}><CircleHelp size={17}/>Help & resources<span>↗</span></Button><div className="profile"><span className="profile-avatar">PR</span><span>P. Raju<small>Workspace admin</small></span><ChevronDown size={15}/></div></div>
    </aside>
    <div className="main-wrap"><header className="topbar"><div className="breadcrumb"><Button variant="ghost" size="icon" className="mobile-menu" aria-label="Open navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</Button><span>Workspace</span><ChevronRight size={13}/><strong>{title}</strong></div><div className="topbar-actions"><div className="search-field"><Search size={15}/><input aria-label="Search workspace" placeholder="Search anything..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => {if(e.key === 'Enter') toast.info(`Search tools from the sidebar: ${search}`);}}/><kbd>⌘ K</kbd></div><Button variant="ghost" size="icon" aria-label="Notifications" onClick={() => toast.info('You’re all caught up. No new notifications.')}><Bell size={18}/></Button><span className="top-avatar">PR</span></div></header><main ref={contentRef} key={pathname} className="page-content">{children}</main><footer className="app-footer"><span><Radio size={12}/> All systems operational</span><span>Braco OmniPulse <span className="footer-sep">/</span> Regional voices. Real impact.</span></footer></div>
  </div>;
}
export function PageHeading({ eyebrow, title, subtitle, action }: { eyebrow?: string; title: string; subtitle: string; action?: React.ReactNode }) {
  return <div className="page-heading"><div>{eyebrow && <div className="eyebrow"><Sparkles size={13}/>{eyebrow}</div>}<h1>{title}</h1><p>{subtitle}</p></div>{action && <div className="heading-action">{action}</div>}</div>;
}
export function SelectField({ label, value, onChange, options }: {label: string; value: string; onChange: (v: string) => void; options: readonly string[]}) {
  return <label className="field-label">{label}<select aria-label={label} value={value} onChange={e => onChange(e.target.value)}>{options.map(o => <option key={o}>{o}</option>)}</select></label>;
}
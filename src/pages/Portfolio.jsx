import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const NAV_LINKS = ["Services", "Pricing", "Process", "FAQ"];

const SERVICES = [
    { num: "01", name: "Web Development", desc: "Performant, accessible websites and web apps — from marketing sites to complex SaaS platforms.", tags: ["React", "TailwindCSS", "Node.js", "CMS"] },
    { num: "02", name: "Brand & Identity", desc: "Logos, visual systems, and brand guidelines crafted to give your business a presence that endures.", tags: ["Strategy", "Visual ID", "Typography"] },
    { num: "03", name: "UI / UX Design", desc: "Research-backed, beautifully refined interfaces that guide visitors toward meaningful actions.", tags: ["Figma", "Prototyping", "User Research"] },
    { num: "04", name: "E-Commerce", desc: "Custom storefronts optimised for conversion — from Shopify builds to fully headless commerce.", tags: ["Shopify", "WooCommerce", "Custom"] },
    { num: "05", name: "SEO & Growth", desc: "Technical SEO, content strategy, and CRO that compound over time and bring the right traffic.", tags: ["Technical SEO", "Analytics", "CRO"] },
    { num: "06", name: "Creative Direction", desc: "Photography, print, and visual storytelling that elevate your brand across every touchpoint.", tags: ["Photography", "Print", "Art Direction"] },
];

const PROJECTS = [
    { cat: "E-Commerce · 2024", title: "Maison Veraison", sub: "Luxury Wine Shop", color: "#f5f0e8" },
    { cat: "SaaS · 2024", title: "Fluxboard", sub: "Analytics Dashboard", color: "#e8f0f5" },
    { cat: "Brand + Web · 2023", title: "Orrery Collective", sub: "Architecture Firm", color: "#f0e8f5" },
    { cat: "Web App · 2023", title: "Nomad Supply Co.", sub: "Travel Marketplace", color: "#e8f5ee" },
];

const PLANS = [
    {
        badge: "Starter", name: "Static", tagline: "Best choice for small shops, portfolios, local businesses.",
        price: "NPR 15,000", period: "one-time project", note: "Content must be provided", featured: false,
        features: [
            { text: "Up to 3-page website", included: true }, { text: "Mobile-responsive design", included: true },
            { text: "Basic SEO setup", included: true },
            { text: "SSL setup", included: true }, { text: "Custom animations", included: false },
            { text: "Social media integration", included: false }, { text: "Priority support", included: false },
        ],
    },
    {
        badge: "Most Popular", name: "Business Package", tagline: "For growing businesses that need a serious digital presence.",
        price: "NPR 30,000", period: "one-time project", note: "Content generation is included", featured: true,
        features: [
            { text: "Up to 15-page website", included: true }, { text: "Custom UI/UX design", included: true },
            { text: "Full SEO optimisation", included: true }, { text: "CMS + blog setup", included: true },
            { text: "SSL setup", included: true }, { text: "Custom animations", included: true },
            { text: "Social media integration", included: true }, { text: "Dedicated account manager", included: false },
        ],
    },
    {
        badge: "Enterprise", name: "Premium Package", tagline: "Complex platforms, custom software, and full creative partnerships.",
        price: "Custom", period: "scoped to your project", note: "Multi-month retainers available", featured: false,
        features: [
            { text: "Unlimited pages & scope", included: true }, { text: "Full brand & visual identity", included: true },
            { text: "Advanced SEO & analytics", included: true }, { text: "Custom CMS or headless", included: true },
            { text: "Unlimited revisions", included: true }, { text: "Professional animations & interactions", included: true },
            { text: "Full database integration", included: true }, { text: "Dedicated account manager", included: true },
        ],
    },
    {
        badge: "Businesses", name: "E-commerce Package", tagline: "Choice for online stores and product-based businesses.",
        price: "NPR 50,000", period: "one-time project", note: "Content must be provided", featured: false,
        features: [
            { text: "Unlimited pages", included: true }, { text: "Product catalog management", included: true },
            { text: "SEO and security features", included: true }, { text: "Shopping cart functionality", included: true },
            { text: "Admin panel", included: true }, { text: "User authentication", included: true },
            { text: "Full database integration", included: true }, { text: "Inventory management", included: true },
        ],
    },
];

const STEPS = [
    { num: "01", name: "Discovery", desc: "We learn your business, audience, and goals through a focused kickoff session." },
    { num: "02", name: "Design", desc: "Wireframes and high-fidelity mockups refined through collaborative feedback rounds." },
    { num: "03", name: "Build", desc: "Clean, performant code with weekly progress updates and staging previews." },
    { num: "04", name: "Launch", desc: "QA, deployment, and a 30-day support window to ensure a smooth go-live." },
];

const FAQS = [
    { q: "How long does a typical project take?", a: "Most websites take 4–10 weeks depending on scope. We'll give you a precise timeline during the discovery phase before any work begins." },
    { q: "Do you work with clients outside Nepal?", a: "Absolutely. Around 40% of our clients are based overseas. We're comfortable working across time zones with async-first communication." },
    { q: "Can I update the website myself after launch?", a: "Yes — we build on intuitive CMS platforms so your team can manage content without touching code. We also offer training sessions." },
    { q: "What happens if I need changes after launch?", a: "Each plan includes a post-launch window for fixes. Ongoing changes are covered under our retainer plans, or billed hourly." },
    { q: "Do you offer payment plans?", a: "Yes. We typically split payments into milestones — 40% upfront, 40% at design sign-off, 20% on launch. Larger projects can be structured differently." },
];

const TESTIMONIALS = [
    { quote: "Working with PixelPerfect was the best investment we made that year. The site pays for itself every month.", name: "Sana Malik", company: "Maison Veraison", initials: "SM" },
    { quote: "They understood our brand in the first meeting. The result felt like it had always existed — timeless.", name: "Roshan Thapa", company: "Orrery Collective", initials: "RT" },
    { quote: "Responsive, honest, and genuinely talented. We've referred three other businesses to them.", name: "Priya Nair", company: "Nomad Supply Co.", initials: "PN" },
];

// ── responsive hook ───────────────────────────────────────────────────────────

function useBreakpoint() {
    const [width, setWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 1200
    );
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);
    return { isMobile: width < 640, isTablet: width >= 640 && width < 1024 };
}

// ── helpers ───────────────────────────────────────────────────────────────────

function Tag({ children }) {
    return (
        <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7c6a4e", background: "#f5f0e8", border: "1px solid #e8d9c0", padding: "3px 10px", borderRadius: 4, display: "inline-block" }}>
            {children}
        </span>
    );
}

function SectionLabel({ children }) {
    return (
        <p style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#a07a4a", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 24, height: 1, background: "#a07a4a", display: "inline-block" }} />
            {children}
        </p>
    );
}

function SectionTitle({ children }) {
    return (
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.9rem, 4vw, 3.6rem)", fontWeight: 400, lineHeight: 1.1, color: "#1a1714", marginBottom: 0 }}>
            {children}
        </h2>
    );
}

// ── sections ──────────────────────────────────────────────────────────────────

function Hero() {
    const { isMobile, isTablet } = useBreakpoint();
    const px = isMobile ? "24px" : isTablet ? "36px" : "60px";
    const pbExtra = isMobile ? 140 : 80; // extra bottom padding on mobile for counters

    return (
        <section id="home" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: `140px ${px} ${pbExtra}px`, background: "linear-gradient(160deg, #fdfaf4 0%, #f7f2e8 60%, #f0ebe0 100%)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(160,122,74,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(160,122,74,0.06) 1px, transparent 1px)", backgroundSize: "72px 72px", maskImage: "linear-gradient(180deg, transparent 0%, black 25%, black 75%, transparent 100%)" }} />

            <SectionLabel>Digital Agency · Est. 2019</SectionLabel>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.8rem, 9vw, 8.5rem)", fontWeight: 400, lineHeight: 0.92, letterSpacing: "-0.01em", color: "#1a1714", maxWidth: 860, position: "relative" }}>
                We build<br />
                <em style={{ color: "#a07a4a", fontStyle: "italic" }}>digital</em><br />
                experiences
            </h1>
            <p style={{ marginTop: 40, maxWidth: 460, fontSize: 15, lineHeight: 1.85, color: "#7a7168", position: "relative" }}>
                PixelPerfect is a full-service digital agency crafting bespoke web experiences, brand identities, and scalable products for businesses that mean business.
            </p>
            <div style={{ marginTop: 44, display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap", position: "relative" }}>
                <a href="#pricing" style={{ background: "#a07a4a", color: "#fff", padding: "13px 34px", fontSize: 12, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", border: "none", cursor: "pointer", textDecoration: "none", display: "inline-block", borderRadius: 2 }}>
                    View Pricing
                </a>
                <Link to="/products" style={{ color: "#7a7168", fontSize: 13, textDecoration: "none", borderBottom: "1px solid transparent", paddingBottom: 2 }}>
                    View Catalog →
                </Link>
            </div>

            {/* Counters: inline below CTA on mobile, absolute on desktop */}
            {isMobile ? (
                <div style={{ display: "flex", gap: 32, marginTop: 52, position: "relative" }}>
                    {[["20+", "Projects"], ["4", "Years"], ["98%", "Retention"]].map(([n, l]) => (
                        <div key={l}>
                            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "2rem", fontWeight: 400, color: "#a07a4a", lineHeight: 1 }}>{n}</div>
                            <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#b0a898", marginTop: 5 }}>{l}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ position: "absolute", right: px, bottom: 80, display: "flex", gap: isTablet ? 28 : 48 }}>
                    {[["20+", "Projects"], ["4", "Years"], ["98%", "Retention"]].map(([n, l]) => (
                        <div key={l} style={{ textAlign: "right" }}>
                            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: isTablet ? "2rem" : "2.8rem", fontWeight: 400, color: "#a07a4a", lineHeight: 1 }}>{n}</div>
                            <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#b0a898", marginTop: 6 }}>{l}</div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

function Services() {
    const { isMobile, isTablet } = useBreakpoint();
    const px = isMobile ? "24px" : isTablet ? "36px" : "60px";
    const cols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)";

    return (
        <section id="services" style={{ padding: `80px ${px}`, background: "#fff" }}>
            <SectionLabel>What We Do</SectionLabel>
            <SectionTitle>Full-stack digital <em style={{ fontStyle: "italic", color: "#a07a4a" }}>craft</em></SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: cols, gap: 1, marginTop: 56, background: "#ece8de" }}>
                {SERVICES.map((s) => (
                    <div key={s.num}
                        style={{ background: "#fff", padding: isMobile ? "28px 20px" : "44px 36px", transition: "background 0.3s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#fdfaf4"}
                        onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
                        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "3rem", fontWeight: 400, color: "rgba(160,122,74,0.15)", lineHeight: 1, marginBottom: 20 }}>{s.num}</div>
                        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.5rem", fontWeight: 400, marginBottom: 14, color: "#1a1714" }}>{s.name}</div>
                        <p style={{ fontSize: 14, lineHeight: 1.85, color: "#7a7168", marginBottom: 24 }}>{s.desc}</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {s.tags.map(t => <Tag key={t}>{t}</Tag>)}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function Work() {
    const [hovered, setHovered] = useState(null);
    const { isMobile, isTablet } = useBreakpoint();
    const px = isMobile ? "24px" : isTablet ? "36px" : "60px";

    return (
        <section id="work" style={{ padding: `80px ${px}`, background: "#f7f2e8" }}>
            <SectionLabel>Selected Work</SectionLabel>
            <SectionTitle>Projects we're <em style={{ fontStyle: "italic", color: "#a07a4a" }}>proud of</em></SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 2, marginTop: 56 }}>
                {PROJECTS.map((p, i) => (
                    <div key={i}
                        style={{ background: p.color, aspectRatio: "4/3", position: "relative", overflow: "hidden", cursor: "pointer" }}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}>
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" opacity="0.2">
                                <rect x="4" y="4" width="48" height="36" rx="2" stroke="#a07a4a" strokeWidth="1.5" />
                                <circle cx="16" cy="22" r="5" stroke="#a07a4a" strokeWidth="1.5" />
                                <path d="M26 26 L38 18 L48 26" stroke="#a07a4a" strokeWidth="1.5" />
                                <path d="M4 40 L52 40 L48 52 L8 52 Z" stroke="#a07a4a" strokeWidth="1.5" />
                            </svg>
                        </div>
                        {/* Always visible on mobile, hover-triggered on desktop */}
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,23,20,0.88) 0%, transparent 55%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: isMobile ? 20 : 28, opacity: isMobile ? 1 : hovered === i ? 1 : 0, transition: "opacity 0.35s ease", transform: `translateY(${!isMobile && hovered !== i ? 8 : 0}px)` }}>
                            <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4aa78", marginBottom: 6 }}>{p.cat}</div>
                            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: isMobile ? "1.1rem" : "1.5rem", fontWeight: 400, color: "#fff" }}>{p.title} — {p.sub}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function Pricing() {
    const { isMobile, isTablet } = useBreakpoint();
    const px = isMobile ? "24px" : isTablet ? "36px" : "60px";
    const stacked = isMobile || isTablet;

    return (
        <section id="pricing" style={{ padding: `80px ${px}`, background: "#fff" }}>
            <SectionLabel>Investment</SectionLabel>
            <SectionTitle>Transparent <em style={{ fontStyle: "italic", color: "#a07a4a" }}>pricing</em></SectionTitle>
            <p style={{ marginTop: 20, maxWidth: 560, fontSize: 15, lineHeight: 1.85, color: "#7a7168" }}>
                Every project is different, but pricing should never be a mystery. Choose a starting point — we'll refine the scope together.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: stacked ? "1fr" : "repeat(3, 1fr)", gap: stacked ? 16 : 0, marginTop: 56, ...(!stacked && { border: "1px solid #ece8de" }) }}>
                {PLANS.map((plan, i) => (
                    <div key={plan.name}
                        style={{
                            padding: isMobile ? "32px 20px" : "48px 36px",
                            background: plan.featured ? "#fdfaf4" : "#fff",
                            ...(stacked
                                ? { border: `1px solid ${plan.featured ? "#a07a4a" : "#ece8de"}`, borderRadius: 2 }
                                : { borderRight: i < 2 ? "1px solid #ece8de" : "none" }),
                            borderTop: plan.featured ? "2px solid #a07a4a" : stacked ? undefined : "2px solid transparent",
                            display: "flex", flexDirection: "column", position: "relative",
                        }}>
                        {plan.featured && (
                            <span style={{ position: "absolute", top: -1, left: isMobile ? 16 : 36, background: "#a07a4a", color: "#fff", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", padding: "4px 12px" }}>Most Popular</span>
                        )}
                        <div style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#b0a898", marginBottom: 20 }}>{plan.badge}</div>
                        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.9rem", fontWeight: 400, color: "#1a1714", marginBottom: 6 }}>{plan.name}</div>
                        <div style={{ fontSize: 13, color: "#7a7168", marginBottom: 32, lineHeight: 1.6 }}>{plan.tagline}</div>
                        <div style={{ marginBottom: 36 }}>
                            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "3rem", fontWeight: 400, color: "#a07a4a", lineHeight: 1 }}>{plan.price}</div>
                            <div style={{ fontSize: 12, color: "#b0a898", marginTop: 4 }}>{plan.period}</div>
                            <div style={{ fontSize: 11, color: "#c4a87a", marginTop: 3, fontStyle: "italic" }}>{plan.note}</div>
                        </div>
                        <ul style={{ listStyle: "none", flex: 1, marginBottom: 36 }}>
                            {plan.features.map((f) => (
                                <li key={f.text} style={{ fontSize: 13, color: f.included ? "#3a3530" : "#c4bfb8", padding: "11px 0", borderBottom: "1px solid #f0ebe0", display: "flex", alignItems: "center", gap: 10 }}>
                                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: f.included ? "#a07a4a" : "#d8d2c8", flexShrink: 0, display: "inline-block" }} />
                                    {f.text}
                                </li>
                            ))}
                        </ul>
                        <Link to={"/contact"}>
                            <button
                                style={{ display: "block", width: "100%", padding: "13px", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500, border: `1px solid ${plan.featured ? "#a07a4a" : "#d8d2c8"}`, color: plan.featured ? "#fff" : "#7a7168", background: plan.featured ? "#a07a4a" : "transparent", cursor: "pointer", fontFamily: "inherit", transition: "all 0.25s ease" }}
                                onMouseEnter={e => { if (!plan.featured) { e.currentTarget.style.borderColor = "#a07a4a"; e.currentTarget.style.color = "#a07a4a"; } else { e.currentTarget.style.background = "#8a6838"; } }}
                                onMouseLeave={e => { if (!plan.featured) { e.currentTarget.style.borderColor = "#d8d2c8"; e.currentTarget.style.color = "#7a7168"; } else { e.currentTarget.style.background = "#a07a4a"; } }}>
                                {plan.name === "Bespoke" ? "Let's Talk" : "Start a Conversation"}
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}

function Process() {
    const { isMobile, isTablet } = useBreakpoint();
    const px = isMobile ? "24px" : isTablet ? "36px" : "60px";
    // 2-col grid on mobile & tablet, 4-col on desktop
    const cols = isMobile ? "1fr 1fr" : isTablet ? "1fr 1fr" : "repeat(4, 1fr)";

    return (
        <section id="process" style={{ padding: `80px ${px}`, background: "#f7f2e8" }}>
            <SectionLabel>How We Work</SectionLabel>
            <SectionTitle>From brief to <em style={{ fontStyle: "italic", color: "#a07a4a" }}>launch</em></SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: cols, gap: 1, marginTop: 56, background: "#ece8de" }}>
                {STEPS.map((s) => (
                    <div key={s.num} style={{ background: "#fff", padding: isMobile ? "24px 18px" : "40px 30px" }}>
                        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: isMobile ? "2.2rem" : "3.5rem", fontWeight: 400, color: "rgba(160,122,74,0.12)", lineHeight: 1, marginBottom: 14 }}>{s.num}</div>
                        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: isMobile ? "1.05rem" : "1.25rem", fontWeight: 400, color: "#a07a4a", marginBottom: 10 }}>{s.name}</div>
                        <p style={{ fontSize: 13, lineHeight: 1.85, color: "#7a7168" }}>{s.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

function Testimonials() {
    const { isMobile, isTablet } = useBreakpoint();
    const px = isMobile ? "24px" : isTablet ? "36px" : "60px";
    const cols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)";

    return (
        <section style={{ padding: `80px ${px}`, background: "#fff" }}>
            <SectionLabel>What Clients Say</SectionLabel>
            <SectionTitle>Honest <em style={{ fontStyle: "italic", color: "#a07a4a" }}>words</em></SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: cols, gap: 1, marginTop: 56, background: "#ece8de" }}>
                {TESTIMONIALS.map((t) => (
                    <div key={t.name} style={{ background: "#fff", padding: isMobile ? "28px 20px" : "40px 34px" }}>
                        <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.05rem", fontWeight: 400, fontStyle: "italic", lineHeight: 1.75, color: "#3a3530", marginBottom: 28 }}>
                            <span style={{ fontFamily: "Georgia, serif", fontSize: "3rem", color: "rgba(160,122,74,0.2)", lineHeight: 0, verticalAlign: "-0.9rem", marginRight: 4 }}>"</span>
                            {t.quote}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid #f0ebe0", paddingTop: 20 }}>
                            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#f5f0e8", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', Georgia, serif", fontSize: "0.95rem", color: "#a07a4a", flexShrink: 0 }}>{t.initials}</div>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 500, color: "#3a3530" }}>{t.name}</div>
                                <div style={{ fontSize: 11, color: "#b0a898", marginTop: 2, letterSpacing: "0.04em" }}>{t.company}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function FAQ() {
    const [open, setOpen] = useState(null);
    const { isMobile, isTablet } = useBreakpoint();
    const px = isMobile ? "24px" : isTablet ? "36px" : "60px";

    return (
        <section id="faq" style={{ padding: `80px ${px}`, background: "#f7f2e8" }}>
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>Common <em style={{ fontStyle: "italic", color: "#a07a4a" }}>questions</em></SectionTitle>
            <div style={{ marginTop: 56, maxWidth: 780 }}>
                {FAQS.map((f, i) => (
                    <div key={i} style={{ borderBottom: "1px solid #ece8de" }}>
                        <button onClick={() => setOpen(open === i ? null : i)}
                            style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, textAlign: "left" }}>
                            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: isMobile ? "0.95rem" : "1.1rem", fontWeight: 400, color: "#1a1714" }}>{f.q}</span>
                            <span style={{ width: 24, height: 24, minWidth: 24, border: "1px solid #d8d2c8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, background: open === i ? "#a07a4a" : "transparent", color: open === i ? "#fff" : "#a07a4a", transition: "all 0.25s", transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
                        </button>
                        <div style={{ maxHeight: open === i ? 200 : 0, overflow: "hidden", transition: "max-height 0.4s ease", paddingBottom: open === i ? 24 : 0 }}>
                            <p style={{ fontSize: 14, lineHeight: 1.9, color: "#7a7168" }}>{f.a}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function CTA() {
    const { isMobile, isTablet } = useBreakpoint();
    const px = isMobile ? "24px" : isTablet ? "36px" : "60px";

    return (
        <section id="contact" style={{ padding: `100px ${px}`, background: "#1a1714", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(160,122,74,0.1) 0%, transparent 70%)" }} />
            <p style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#a07a4a", marginBottom: 20, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <span style={{ width: 24, height: 1, background: "#a07a4a", display: "inline-block" }} /> Let's Build Together
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 6vw, 6rem)", fontWeight: 400, lineHeight: 1.05, color: "#f5f0e8", maxWidth: 700, margin: "0 auto 20px", position: "relative" }}>
                Ready to start your <em style={{ fontStyle: "italic", color: "#d4aa78" }}>project?</em>
            </h2>
            <p style={{ fontSize: 15, color: "#7a7168", marginBottom: 48, position: "relative" }}>No lengthy forms. Just a conversation.</p>
            <div style={{ display: "flex", gap: 18, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
                <Link to="/contact" style={{ background: "#a07a4a", color: "#fff", padding: "14px 36px", fontSize: 12, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", display: "inline-block" }}>
                    Get In Touch
                </Link>
                <a href="#pricing" style={{ color: "#7a7168", fontSize: 13, textDecoration: "none", display: "inline-flex", alignItems: "center", borderBottom: "1px solid transparent", paddingBottom: 2 }}>
                    View Pricing →
                </a>
            </div>
        </section>
    );
}

function Footer() {
    const { isMobile, isTablet } = useBreakpoint();
    const px = isMobile ? "24px" : isTablet ? "36px" : "60px";

    return (
        <footer style={{ padding: `28px ${px}`, background: "#111", display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? 18 : 0, borderTop: "1px solid #2a2520" }}>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#a07a4a" }}>PixelPerfect</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: isMobile ? 14 : 28 }}>
                {NAV_LINKS.map(l => (
                    <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5a5550", textDecoration: "none" }}>{l}</a>
                ))}
            </div>
            <span style={{ fontSize: 11, color: "#3a3530" }}>© 2025 PixelPerfect Studio</span>
        </footer>
    );
}

// ── root ──────────────────────────────────────────────────────────────────────

export default function AgencyPortfolio() {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
            <div className="w-full">
                <Navbar />
            </div>
            <div style={{ paddingTop: 64 }}>
                <Hero />
                <Services />
                {/* <Work /> */}
                <Pricing />
                <Process />
                <Testimonials />
                <FAQ />
                <CTA />
                <Footer />
            </div>
        </>
    );
}
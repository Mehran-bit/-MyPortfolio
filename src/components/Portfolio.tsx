import { lazy, Suspense, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Github, Linkedin, Mail, ArrowRight, Code2, Database, Server,
  Sparkles, ExternalLink, Menu, X, Download, Rocket, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import portraitAsset from "@/assets/mehran-portrait.jpeg.asset.json";
import visionImg from "@/assets/project-vision.jpg";
import foodImg from "@/assets/project-food.jpg";

const LINKS = {
  linkedin: "https://www.linkedin.com/in/mehran-ali-1472b6333",
  github: "https://github.com/Mehran-bit",
  email: "mehrannali57@gmail.com",
};

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

const SKILLS = [
  { name: "HTML", icon: Code2, color: "from-orange-400 to-red-500", level: 95 },
  { name: "CSS", icon: Code2, color: "from-blue-400 to-cyan-500", level: 92 },
  { name: "JavaScript", icon: Zap, color: "from-yellow-300 to-amber-500", level: 90 },
  { name: "TypeScript", icon: Code2, color: "from-blue-500 to-indigo-600", level: 85 },
  { name: "React", icon: Sparkles, color: "from-cyan-400 to-blue-500", level: 92 },
  { name: "Tailwind CSS", icon: Sparkles, color: "from-teal-400 to-cyan-500", level: 95 },
  { name: "Node.js", icon: Server, color: "from-green-400 to-emerald-600", level: 82 },
  { name: "Express.js", icon: Server, color: "from-neutral-300 to-neutral-500", level: 80 },
  { name: "Next.js", icon: Rocket, color: "from-neutral-200 to-neutral-500", level: 80 },
  { name: "MongoDB", icon: Database, color: "from-green-500 to-lime-600", level: 78 },
  { name: "PostgreSQL", icon: Database, color: "from-sky-500 to-indigo-600", level: 75 },
  { name: "MySQL", icon: Database, color: "from-blue-500 to-amber-500", level: 78 },
];

const PROJECTS = [
  {
    title: "Vision UI Dashboard",
    tag: "AI • Analytics",
    desc: "A next-gen AI-powered analytics dashboard with real-time object detection, beautiful data-viz, and a fully responsive glassmorphism interface.",
    img: visionImg,
    stack: ["React", "TypeScript", "Tailwind", "Node.js"],
  },
  {
    title: "Food Delivery Platform",
    tag: "Full-Stack • Mobile",
    desc: "End-to-end food ordering experience with live tracking, secure checkout, admin dashboard and a delightful animated mobile-first UI.",
    img: foodImg,
    stack: ["React", "Express", "MongoDB", "Tailwind"],
  },
];

const BLOG = [
  { title: "Building buttery-smooth animations in React with Framer Motion", date: "Jun 24, 2026", read: "6 min", tag: "React" },
  { title: "TypeScript patterns that scale in real-world Node.js APIs", date: "May 12, 2026", read: "8 min", tag: "TypeScript" },
  { title: "From MongoDB to PostgreSQL — when to switch and why", date: "Apr 03, 2026", read: "5 min", tag: "Databases" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "glass" : "bg-transparent"}`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <button onClick={() => go("home")} className="font-display font-bold text-xl">
          <span className="text-gradient">Mehran</span>
          <span className="text-foreground">.dev</span>
        </button>
        <ul className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <li key={n.id}>
              <button
                onClick={() => go(n.id)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {n.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-neon to-neon-2 group-hover:w-full transition-all duration-300" />
              </button>
            </li>
          ))}
        </ul>
        <div className="hidden md:block">
          <Button onClick={() => go("contact")} className="bg-gradient-to-r from-neon to-neon-2 text-primary-foreground hover:opacity-90">
            Hire Me <ArrowRight />
          </Button>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass overflow-hidden"
          >
            <ul className="flex flex-col p-6 gap-4">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button onClick={() => go(n.id)} className="text-left w-full py-2 text-foreground">
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-24">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-neon/30 blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-neon-2/30 blur-3xl animate-glow-pulse" style={{ animationDelay: "1s" }} />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Badge className="mb-6 bg-neon/10 text-neon border-neon/30 hover:bg-neon/20">
            <Sparkles className="w-3 h-3 mr-1" /> Available for hire
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6">
            Hi, I'm <span className="text-gradient">Mehran Ali</span>
            <br />
            Full-Stack Developer
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mb-8">
            I craft modern, high-performance web experiences with React, TypeScript, and Node.js —
            built to impress users and convert clients across the globe.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-gradient-to-r from-neon to-neon-2 text-primary-foreground glow-primary hover:opacity-90"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
              View Projects <ArrowRight />
            </Button>
            <Button size="lg" variant="outline" className="border-neon/40 hover:bg-neon/10" asChild>
              <a href={`mailto:${LINKS.email}`}><Mail /> Contact Me</a>
            </Button>
          </div>
          <div className="flex items-center gap-4 mt-10">
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="w-11 h-11 rounded-full glass flex items-center justify-center hover:text-neon hover:scale-110 transition-all">
              <Github className="w-5 h-5" />
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="w-11 h-11 rounded-full glass flex items-center justify-center hover:text-neon hover:scale-110 transition-all">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={`mailto:${LINKS.email}`} aria-label="Email"
              className="w-11 h-11 rounded-full glass flex items-center justify-center hover:text-neon hover:scale-110 transition-all">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        <motion.div style={{ y }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
          className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-neon/40 to-neon-2/40 blur-3xl rounded-full" />
          <motion.div animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative rounded-3xl overflow-hidden glass p-2 glow-primary">
            <img src={portraitAsset.url} alt="Mehran Ali — Full-Stack Developer" width={1280} height={1280}
              className="w-full aspect-[3/4] object-cover rounded-2xl" />
          </motion.div>
          <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-4 -right-4 glass rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon to-neon-2 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Clean Code</div>
              <div className="text-sm font-semibold">Production Ready</div>
            </div>
          </motion.div>
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-4 -left-4 glass rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-2 to-neon flex items-center justify-center">
              <Rocket className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Fast Delivery</div>
              <div className="text-sm font-semibold">On Time, Every Time</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
      className="text-center max-w-2xl mx-auto mb-16">
      <div className="inline-flex items-center gap-2 text-sm text-neon font-medium mb-3">
        <span className="w-8 h-px bg-neon" /> {eyebrow} <span className="w-8 h-px bg-neon" />
      </div>
      <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
      {desc && <p className="text-muted-foreground">{desc}</p>}
    </motion.div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle eyebrow="About Me" title="Passionate about pixel-perfect web craft" />
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Code2, title: "Frontend Craft", desc: "Building elegant, accessible interfaces with React, TypeScript, and Tailwind — pixel-perfect on every device." },
            { icon: Server, title: "Backend Engineering", desc: "Designing scalable APIs and services in Node.js, Express and Next.js with clean architecture." },
            { icon: Database, title: "Data & Storage", desc: "Modeling data reliably across MongoDB, PostgreSQL and MySQL with a focus on performance." },
          ].map((c, i) => (
            <motion.div key={c.title}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass rounded-2xl p-8 group hover:border-neon/50 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon to-neon-2 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <c.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-20 glass rounded-3xl p-8 md:p-12 grid md:grid-cols-4 gap-8 text-center">
          {[
            { n: "3+", l: "Years Experience" },
            { n: "25+", l: "Projects Shipped" },
            { n: "15+", l: "Happy Clients" },
            { n: "100%", l: "Commitment" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">{s.n}</div>
              <div className="text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle eyebrow="Tech Stack" title="Skills & Technologies"
          desc="A modern toolkit for building complete, production-ready web products." />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {SKILLS.map((s, i) => (
            <motion.div key={s.name}
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -6, rotateY: 6, scale: 1.03 }}
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              className="glass rounded-2xl p-5 group cursor-pointer hover:border-neon/50 transition-colors">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <s.icon className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold mb-2">{s.name}</div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 + i * 0.05 }}
                  className={`h-full bg-gradient-to-r ${s.color}`} />
              </div>
              <div className="text-xs text-muted-foreground mt-2">{s.level}%</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle eyebrow="Selected Work" title="Featured Projects"
          desc="A glimpse of the things I've built recently — real products, real impact." />
        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((p, i) => (
            <motion.article key={p.title}
              initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group glass rounded-3xl overflow-hidden hover:border-neon/60 transition-colors">
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10" />
                <motion.img src={p.img} alt={p.title} loading="lazy" width={1024} height={768}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }} transition={{ duration: 0.6 }} />
                <Badge className="absolute top-4 left-4 z-20 bg-neon/20 text-neon border-neon/40">{p.tag}</Badge>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-gradient transition-all">{p.title}</h3>
                <p className="text-muted-foreground mb-5 leading-relaxed">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.stack.map((t) => (
                    <span key={t} className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">{t}</span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="border-neon/40 hover:bg-neon/10" asChild>
                    <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
                      <Github /> Code
                    </a>
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-neon to-neon-2 text-primary-foreground">
                    <ExternalLink /> Live Demo
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Blog() {
  return (
    <section id="blog" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle eyebrow="Latest Writing" title="From the Blog"
          desc="Thoughts on modern web development, patterns and workflows I use every day." />
        <div className="grid md:grid-cols-3 gap-6">
          {BLOG.map((post, i) => (
            <motion.article key={post.title}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl p-6 flex flex-col hover:border-neon/50 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <Badge variant="outline" className="border-neon/30 text-neon">{post.tag}</Badge>
                <span>{post.read}</span>
              </div>
              <h3 className="text-lg font-semibold leading-snug mb-4 flex-1 group-hover:text-gradient transition-all">{post.title}</h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{post.date}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionTitle eyebrow="Get In Touch" title="Let's build something great"
          desc="Have a project in mind or a role to fill? I'd love to hear from you." />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-neon/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-neon-2/20 blur-3xl" />
          <div className="relative grid md:grid-cols-3 gap-4">
            {[
              { icon: Mail, label: "Email", value: LINKS.email, href: `mailto:${LINKS.email}` },
              { icon: Linkedin, label: "LinkedIn", value: "mehran-ali", href: LINKS.linkedin },
              { icon: Github, label: "GitHub", value: "Mehran-bit", href: LINKS.github },
            ].map((c) => (
              <motion.a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass rounded-2xl p-6 flex flex-col items-center text-center hover:border-neon/60 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon to-neon-2 flex items-center justify-center mb-4 glow-primary">
                  <c.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="text-xs text-muted-foreground mb-1">{c.label}</div>
                <div className="text-sm font-semibold break-all">{c.value}</div>
              </motion.a>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button size="lg" className="bg-gradient-to-r from-neon to-neon-2 text-primary-foreground glow-primary" asChild>
              <a href={`mailto:${LINKS.email}`}>
                <Mail /> Hire Me Now <ArrowRight />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div>© {new Date().getFullYear()} Mehran Ali. Crafted with React, TypeScript & Tailwind.</div>
        <div className="flex items-center gap-4">
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-neon"><Github className="w-4 h-4" /></a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-neon"><Linkedin className="w-4 h-4" /></a>
          <a href={`mailto:${LINKS.email}`} aria-label="Email" className="hover:text-neon"><Mail className="w-4 h-4" /></a>
        </div>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-background">
        <div className="absolute inset-0" style={{ background: "var(--gradient-radial)" }} />
      </div>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}

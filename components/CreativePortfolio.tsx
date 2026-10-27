"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import GitHubActivity from "./GitHubActivity";
import { useGitHub } from "@/lib/github-client";
import { useMotionPreference } from "@/lib/use-motion-preference";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import {
  ArrowDown,
  ArrowDownLeft,
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  Download,
  Github,
  Globe2,
  Menu,
  Pause,
  Play,
  Send,
  X,
} from "lucide-react";
import {
  experience,
  profile,
  projects,
  skills,
  techMarquee,
  type Project,
} from "@/data/profile";
import { getSkillIcon } from "@/data/skills-icons";
import { useI18n } from "@/lib/i18n";
import { LangToggle, ThemeToggle } from "./Toggles";
import SculpturalScene from "./SculpturalScene";
import ProjectDevicePreview from "./ProjectDevicePreview";
import StackMarquee from "./StackMarquee";

function periodStart(period: string) {
  const year = Number(period.match(/\d{4}/)?.[0] ?? 0);
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ].indexOf(period.slice(0, 3));
  return year * 12 + Math.max(month, 0);
}

const careerTimeline = [...experience].sort(
  (a, b) => periodStart(b.periode) - periodStart(a.periode),
);

function NameLetters({ text }: { text: string }) {
  const reduced = useMotionPreference();
  return (
    <span className="name-letters" aria-hidden="true">
      {Array.from(text).map((letter, i) => (
        <motion.span
          key={i}
          initial={{
            opacity: reduced ? 1 : 0,
            y: reduced ? 0 : "65%",
            rotateX: reduced ? 0 : -65,
          }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: reduced ? 0 : 0.25 + i * 0.045,
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {letter === " " ? "\u00a0" : letter}
        </motion.span>
      ))}
    </span>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useMotionPreference();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  t,
}: {
  project: Project;
  index: number;
  t: (key: string) => string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useMotionPreference();
  return (
    <motion.article
      ref={ref}
      className="project-card"
      layout
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onPointerMove={(event) => {
        if (reduced || event.pointerType === "touch" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        ref.current.style.setProperty(
          "--tilt-x",
          `${((event.clientY - rect.top) / rect.height - 0.5) * -4}deg`,
        );
        ref.current.style.setProperty(
          "--tilt-y",
          `${((event.clientX - rect.left) / rect.width - 0.5) * 5}deg`,
        );
      }}
      onPointerLeave={() => {
        ref.current?.style.setProperty("--tilt-x", "0deg");
        ref.current?.style.setProperty("--tilt-y", "0deg");
      }}
    >
      <a
        className="project-image-link"
        href={project.demo || project.repo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.judul} — ${t(project.demo ? "projects.viewLive" : "projects.viewRepo")}`}
      >
        <ProjectDevicePreview project={project} />
        <span className="project-visit">
          <ArrowUpRight size={24} />
        </span>
      </a>
      <div className="project-meta">
        <div>
          <p className="eyebrow">{project.tech.slice(0, 2).join(" / ")}</p>
          <h3>{project.judul}</h3>
        </div>
        <span className="project-number">0{index + 1}</span>
      </div>
      <p className="project-description">{t(project.deskripsi)}</p>
      <div className="project-links">
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer">
            {t("projects.demo")} <ArrowUpRight size={14} />
          </a>
        )}
        <a href={project.repo} target="_blank" rel="noopener noreferrer">
          <Github size={14} /> {t("projects.viewRepo")}
        </a>
      </div>
    </motion.article>
  );
}

export default function CreativePortfolio() {
  const { t, lang } = useI18n();
  const github = useGitHub();
  const reduced = useMotionPreference();
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("all");
  const [word, setWord] = useState(0);
  const [paused, setPaused] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [messageReady, setMessageReady] = useState(false);
  const [year, setYear] = useState(2026);
  const root = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const id = lang === "id";
  const words = id
    ? [
        "Full-stack developer.",
        "Aplikasi web & mobile.",
        "JavaScript / TypeScript.",
      ]
    : [
        "Full-stack developer.",
        "Web & mobile apps.",
        "JavaScript / TypeScript.",
      ];
  const links = [
    { href: "#projects", text: t("nav.projects") },
    { href: "#about", text: t("nav.about") },
    { href: "#experience", text: t("nav.experience") },
    { href: "#contact", text: t("nav.contact") },
  ];
  const motionOff = !!reduced || paused;

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  useEffect(() => {
    if (motionOff) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setWord((value) => (value + 1) % 3);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [motionOff]);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progress.current)
        progress.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      navRef.current?.classList.toggle("is-scrolled", scrollY > 30);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    const observer = new ResizeObserver(onScroll);
    if (root.current) observer.observe(root.current);
    update();
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    if (!menu) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mobileNav.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
        menuButton.current?.focus();
      }
      if (event.key !== "Tab") return;
      const targets = [
        menuButton.current,
        ...Array.from(
          mobileNav.current?.querySelectorAll<HTMLAnchorElement>("a") || [],
        ),
      ].filter(Boolean) as HTMLElement[];
      const current = targets.indexOf(document.activeElement as HTMLElement);
      if (event.shiftKey && current <= 0) {
        event.preventDefault();
        targets.at(-1)?.focus();
      } else if (!event.shiftKey && current === targets.length - 1) {
        event.preventDefault();
        targets[0]?.focus();
      }
    };
    const desktop = matchMedia("(min-width: 900px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenu(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = previousOverflow;
      removeEventListener("keydown", keydown);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [menu]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyFailed(false);
    } catch {
      setCopyFailed(true);
    }
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `${id ? "Halo, saya" : "Hello, I'm"} ${data.get("nama")}.\nEmail: ${data.get("email")}\n\n${data.get("pesan")}`;
    window.open(
      `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setMessageReady(true);
  };

  return (
    <MotionConfig reducedMotion={motionOff ? "always" : "user"}>
      <div
        ref={root}
        className={`creative-site${motionOff ? " motion-paused" : ""}`}
      >
        <div className="site-grain" aria-hidden="true" />
        <header ref={navRef} className="creative-header">
          <div ref={progress} className="reading-progress" />
          <nav
            className="creative-nav site-container"
            aria-label={id ? "Navigasi utama" : "Main navigation"}
          >
            <a
              className="nav-name"
              href="#home"
              aria-label={`${profile.nama} — ${id ? "beranda" : "home"}`}
            >
              <span>Yosuanry Simbolon</span>
            </a>
            <div className="desktop-navigation">
              {links.map((link, i) => (
                <a key={link.href} href={link.href}>
                  <span>0{i + 1}</span>
                  {link.text}
                </a>
              ))}
            </div>
            <div className="nav-actions">
              <LangToggle compact />
              <ThemeToggle />
              <a className="nav-contact" href="#contact">
                {id ? "Mari ngobrol" : "Let's talk"}
                <ArrowUpRight size={17} />
              </a>
              <button
                ref={menuButton}
                className="menu-toggle icon-button"
                aria-expanded={menu}
                aria-controls="mobile-navigation"
                aria-label={t(menu ? "nav.closeMenu" : "nav.openMenu")}
                onClick={() => setMenu(!menu)}
              >
                {menu ? <X /> : <Menu />}
              </button>
            </div>
          </nav>
          {menu && (
            <nav
              ref={mobileNav}
              id="mobile-navigation"
              className="mobile-navigation"
              aria-label={id ? "Navigasi seluler" : "Mobile navigation"}
            >
              {links.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenu(false)}
                >
                  <small>0{i + 1}</small>
                  {link.text}
                  <ArrowUpRight />
                </a>
              ))}
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenu(false)}
              >
                {t("hero.downloadCv")}
                <Download />
              </a>
            </nav>
          )}
        </header>

        <main id="main">
          <section id="home" className="creative-hero site-container">
            <div className="hero-topline">
              <span className="eyebrow">
                {id ? "SOFTWARE DEVELOPER" : "SOFTWARE DEVELOPER"}
              </span>
              <span className="availability">
                <span className="status-dot" />
                {id ? "Terbuka untuk peluang" : "Open to opportunities"}
              </span>
            </div>
            <div className="hero-grid">
              <div className="hero-copy">
                <Reveal>
                  <p className="hero-intro">
                    <span className="intro-line" />
                    {id ? "Halo, saya Yosua." : "Hey, I'm Yosua."}{" "}
                    <span className="intro-wave">↗</span>
                  </p>
                </Reveal>
                <h1 aria-label={id ? profile.nama : profile.nama}>
                  <span className="headline-line">
                    <motion.span
                      initial={{ y: motionOff ? 0 : "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <NameLetters text={profile.nama.split(" ")[0]} />
                    </motion.span>
                  </span>
                  <span className="headline-line">
                    <motion.span
                      initial={{ y: motionOff ? 0 : "110%" }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 0.9,
                        delay: 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <NameLetters
                        text={profile.nama.split(" ").slice(1).join(" ")}
                      />
                      <span className="hero-period">.</span>
                    </motion.span>
                  </span>
                  <span className="rotating-word" aria-hidden="true">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={`${lang}-${word}`}
                        initial={{
                          opacity: 0,
                          y: motionOff ? 0 : 25,
                          rotateX: motionOff ? 0 : -30,
                        }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, y: motionOff ? 0 : -25 }}
                        transition={{ duration: motionOff ? 0 : 0.4 }}
                      >
                        {words[word]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </h1>
                <Reveal delay={0.3}>
                  <p className="hero-description">
                    {id
                      ? "Saya membuat aplikasi web dan mobile dengan React, Next.js, dan Laravel. Berdomisili di Bali, Indonesia."
                      : "I build web and mobile applications with React, Next.js, and Laravel. Based in Bali, Indonesia."}
                  </p>
                  <div className="hero-buttons">
                    <a href="#projects" className="pill-button primary-button">
                      {id ? "Jelajahi karya" : "Explore my work"}
                      <ArrowDown size={18} />
                    </a>
                    <a
                      href={profile.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-button"
                    >
                      {t("hero.downloadCv")}
                      <Download size={16} />
                    </a>
                  </div>
                </Reveal>
                <Reveal delay={0.45} className="hero-signoff">
                  <span>FRONTEND</span>
                  <span>BACKEND & API</span>
                </Reveal>
              </div>
              <div className="hero-visual">
                <SculpturalScene paused={motionOff} />
                <button
                  className="motion-control"
                  aria-pressed={paused}
                  aria-label={
                    id
                      ? paused
                        ? "Aktifkan animasi"
                        : "Jeda animasi"
                      : paused
                        ? "Resume animations"
                        : "Pause animations"
                  }
                  onClick={() => setPaused((value) => !value)}
                >
                  {paused ? <Play size={13} /> : <Pause size={13} />}
                  {id ? "Gerakan" : "Motion"} / {motionOff ? "OFF" : "ON"}
                </button>
              </div>
            </div>
            <div className="hero-bottom">
              <span>
                <Globe2 size={15} /> {profile.location}
                <span className="hero-timezone">UTC +08:00</span>
              </span>
              <a href="#projects">
                {id ? "Scroll untuk menjelajah" : "Scroll to discover"}
                <ArrowDown size={15} />
              </a>
              <span className="edition">PORTFOLIO / {year}</span>
            </div>
          </section>

          <StackMarquee paused={motionOff} />

          <section
            id="projects"
            className="work-section site-container section-space"
          >
            <Reveal className="section-top">
              <p className="eyebrow section-label">
                <span>01 /</span>
                {id ? "KARYA PILIHAN" : "SELECTED WORK"}
              </p>
              <span className="section-aside">
                {id
                  ? "Kode sumber dan tampilan aplikasi saya."
                  : "Source code and the applications I build."}
              </span>
            </Reveal>
            <Reveal className="section-heading">
              <h2>
                {id ? "Proyek" : "Selected"}
                <br />
                <span className="muted-heading">
                  {id ? "yang saya kerjakan" : "projects"}
                </span>
                <span className="accent-text">.</span>
              </h2>
              <ArrowDownLeft className="heading-arrow" strokeWidth={1} />
            </Reveal>
            <div className="work-toolbar">
              <div
                className="project-filters"
                aria-label={id ? "Filter proyek" : "Project filters"}
              >
                {["all", "web", "mobile"].map((value) => (
                  <button
                    key={value}
                    className={filter === value ? "active" : ""}
                    aria-pressed={filter === value}
                    onClick={() => setFilter(value)}
                  >
                    {t(`projects.filter.${value}`)}
                    <sup>
                      {value === "all"
                        ? projects.length
                        : projects.filter(
                            (project) => project.kategori === value,
                          ).length}
                    </sup>
                  </button>
                ))}
              </div>
              <span className="eyebrow">
                {id ? "REPOSITORI GITHUB" : "GITHUB REPOSITORIES"}
              </span>
            </div>
            <motion.div layout className="project-grid">
              <AnimatePresence mode="sync">
                {projects
                  .filter(
                    (project) =>
                      filter === "all" || project.kategori === filter,
                  )
                  .map((project) => (
                    <ProjectCard
                      key={project.judul}
                      project={project}
                      index={projects.indexOf(project)}
                      t={t}
                    />
                  ))}
              </AnimatePresence>
            </motion.div>
            <a
              className="work-github text-button"
              href={`https://github.com/${profile.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {id ? "Semua repositori di GitHub" : "All repositories on GitHub"}
              <ArrowUpRight size={19} />
            </a>
          </section>

          <section id="about" className="about-section section-space">
            <div className="site-container">
              <Reveal className="section-top">
                <p className="eyebrow section-label">
                  <span>02 /</span>
                  {id ? "TENTANG SAYA" : "ABOUT ME"}
                </p>
              </Reveal>
              <div className="about-grid">
                <Reveal className="portrait-block">
                  <div className="portrait-frame">
                    <Image
                      src={profile.foto}
                      alt={`${id ? "Foto" : "Portrait of"} ${profile.nama}`}
                      fill
                      sizes="(max-width: 700px) 85vw, 370px"
                      className="portrait-image"
                    />
                  </div>
                  <p className="portrait-caption">
                    <span className="status-dot" />{" "}
                    {id
                      ? "Yosuanry Simbolon / Full-stack developer"
                      : "Yosuanry Simbolon / Full-stack developer"}
                  </p>
                </Reveal>
                <Reveal delay={0.12} className="about-copy">
                  <h2>
                    {id ? "Tentang saya" : "About me"}
                    <br />
                    <span className="muted-heading">
                      {id ? "Yosuanry Simbolon." : "Yosuanry Simbolon."}
                    </span>
                  </h2>
                  <p className="about-lead">
                    {id
                      ? "Saya mengerjakan frontend, backend, dan integrasi API untuk aplikasi web dan mobile."
                      : "I work on frontend, backend, and API integrations for web and mobile applications."}
                  </p>
                  <p className="about-bio">
                    {id
                      ? "Saat ini saya kuliah di INSTIKI dan bekerja paruh waktu di NDS Guestlist setelah menyelesaikan magang. Proyek saya mencakup sistem keuangan, katalog perumahan, site plan, dan aplikasi batik."
                      : "I study at INSTIKI and work part-time at NDS Guestlist after completing my internship. My projects include finance systems, property catalogs, site plans, and a batik application."}
                  </p>
                  <div className="about-facts">
                    <div>
                      <span className="eyebrow">{id ? "FOKUS" : "FOCUS"}</span>
                      <p>Full-Stack Development</p>
                    </div>
                    <div>
                      <span className="eyebrow">
                        {id ? "TERSEDIA UNTUK" : "AVAILABLE FOR"}
                      </span>
                      <p>{profile.availability}</p>
                    </div>
                  </div>
                  <a
                    className="text-button"
                    href={profile.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {id ? "Kenali saya lebih jauh" : "A little more about me"}
                    <ArrowUpRight size={17} />
                  </a>
                </Reveal>
              </div>
              <div className="about-stats">
                {[
                  {
                    label: id ? "Repositori publik" : "Public repositories",
                    value: github.repositories.length,
                  },
                  {
                    label: id ? "Proyek ditampilkan" : "Featured projects",
                    value: projects.length,
                  },
                  {
                    label: id
                      ? "Bahasa utama repo"
                      : "Primary repository languages",
                    value: new Set(
                      github.repositories
                        .map((repo) => repo.language)
                        .filter(Boolean),
                    ).size,
                  },
                  {
                    label: id
                      ? "Kontribusi / 12 bulan"
                      : "Contributions / 12 months",
                    value: github.totalContributions,
                  },
                ].map((stat, i) => (
                  <Reveal key={stat.label} delay={i * 0.06}>
                    <span>{stat.value}</span>
                    <p>{t(stat.label)}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section
            id="skills"
            className="skills-section site-container section-space"
          >
            <Reveal className="section-top">
              <p className="eyebrow section-label">
                <span>03 /</span>
                {id ? "TEKNOLOGI" : "TECHNOLOGIES"}
              </p>
              <span className="section-aside">
                {id
                  ? "Bahasa, framework, dan alat yang saya gunakan."
                  : "Languages, frameworks, and tools I use."}
              </span>
            </Reveal>
            <Reveal>
              <h2>
                {id ? "Teknologi" : "My development"}
                <br />
                <span className="muted-heading">
                  {id ? "yang saya gunakan." : "stack."}
                </span>
              </h2>
            </Reveal>
            <div className="skill-groups">
              {skills.map((group, i) => (
                <Reveal key={group.grup} delay={i * 0.05} className="skill-row">
                  <div>
                    <span className="eyebrow">0{i + 1}</span>
                    <h3>{t(group.grup)}</h3>
                    <p>{t(group.deskripsi)}</p>
                  </div>
                  <div className="skill-items">
                    {group.items.map((name) => {
                      const Icon = getSkillIcon(name);
                      return (
                        <span className="skill-chip" key={name}>
                          <Icon size={20} />
                          {name}
                        </span>
                      );
                    })}
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="toolkit-footnote">
              <Code2 size={15} />
              {techMarquee.length}{" "}
              {id ? "teknologi dalam stack saya." : "technologies in my stack."}
            </p>
          </section>

          <section id="experience" className="experience-section section-space">
            <div className="site-container">
              <Reveal className="section-top">
                <p className="eyebrow section-label">
                  <span>04 /</span>
                  {id ? "PENGALAMAN" : "EXPERIENCE"}
                </p>
                <span className="section-aside">
                  {id
                    ? "Pendidikan, pekerjaan, dan organisasi."
                    : "Education, work, and organizations."}
                </span>
              </Reveal>
              <div className="experience-grid">
                <Reveal>
                  <h2>
                    {id ? "Pendidikan &" : "Education &"}
                    <br />
                    <span className="muted-heading">
                      {id ? "pengalaman kerja." : "work experience."}
                    </span>
                  </h2>
                  <p className="experience-intro">
                    {id
                      ? "Riwayat pendidikan, pekerjaan, dan tanggung jawab organisasi saya."
                      : "My education, employment, and organizational responsibilities."}
                  </p>
                  <a
                    className="circle-link"
                    href={profile.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("hero.downloadCv")}
                  >
                    <Download size={24} />
                    <span>CV</span>
                  </a>
                </Reveal>
                <div className="timeline">
                  {careerTimeline.map((item, i) => (
                    <Reveal
                      className="timeline-item"
                      key={`${item.posisi}-${item.periode}`}
                      delay={i * 0.04}
                    >
                      <span className="timeline-dot" />
                      <p className="eyebrow">{t(item.periode)}</p>
                      <h3>{t(item.posisi)}</h3>
                      <p className="timeline-place">{item.tempat}</p>
                      <p className="timeline-description">
                        {t(item.deskripsi)}
                      </p>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="activity-section site-container">
            <GitHubActivity />
          </div>

          <section id="contact" className="contact-section section-space">
            <div className="site-container">
              <Reveal className="section-top">
                <p className="eyebrow section-label">
                  <span>05 /</span>
                  {id ? "KONTAK" : "CONTACT"}
                </p>
                <span className="availability">
                  <span className="status-dot" />
                  {t("nav.open")}
                </span>
              </Reveal>
              <div className="contact-grid">
                <Reveal>
                  <h2>
                    {id ? "Hubungi" : "Get in"}
                    <br />
                    <span className="contact-outline">
                      {id ? "saya." : "touch."}
                    </span>
                  </h2>
                  <p className="contact-intro">
                    {id
                      ? "Untuk proyek web atau mobile dan peluang kerja, hubungi saya melalui email atau WhatsApp."
                      : "For web and mobile projects or work opportunities, reach me by email or WhatsApp."}
                  </p>
                  <a className="contact-email" href={`mailto:${profile.email}`}>
                    {profile.email}
                    <ArrowUpRight size={22} />
                  </a>
                  <button className="copy-button" onClick={copy}>
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {t(copied ? "contact.copied" : "contact.clickToCopy")}
                  </button>
                  <p className="form-status" role="status">
                    {copyFailed
                      ? id
                        ? "Salin alamat email di atas secara manual."
                        : "Please copy the email address above manually."
                      : ""}
                  </p>
                  <div className="contact-socials">
                    {profile.socials
                      .filter((social) => social.nama !== "Email")
                      .map((social) => (
                        <a
                          key={social.nama}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {social.nama}
                          <ArrowUpRight size={14} />
                        </a>
                      ))}
                  </div>
                </Reveal>
                <Reveal delay={0.12} className="contact-form-wrap">
                  <p className="eyebrow">
                    {id ? "KIRIM PESAN" : "SEND A MESSAGE"}
                  </p>
                  <form onSubmit={submit}>
                    <label htmlFor="contact-name">
                      01 / {t("contact.yourName")}
                    </label>
                    <input
                      id="contact-name"
                      name="nama"
                      autoComplete="name"
                      placeholder={t("contact.phName")}
                      required
                      maxLength={100}
                    />
                    <label htmlFor="contact-email">
                      02 / {t("contact.yourEmail")}
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={t("contact.phEmail")}
                      required
                      maxLength={254}
                    />
                    <label htmlFor="contact-message">
                      03 / {t("contact.yourMessage")}
                    </label>
                    <textarea
                      id="contact-message"
                      name="pesan"
                      placeholder={t("contact.phMessage")}
                      required
                      rows={3}
                      maxLength={2000}
                    />
                    <button
                      className="pill-button primary-button"
                      type="submit"
                    >
                      {t("contact.sendWa")}
                      <Send size={17} />
                    </button>
                    <p role="status" className="form-status">
                      {messageReady
                        ? t("contact.sent")
                        : id
                          ? "Pesan akan disiapkan di WhatsApp untuk Anda kirim."
                          : "Your message will be prepared in WhatsApp for you to send."}
                    </p>
                  </form>
                </Reveal>
              </div>
            </div>
          </section>
        </main>
        <footer className="creative-footer site-container">
          <div className="footer-bottom">
            <span>
              © {year} {profile.nama}
            </span>
            <span>
              {id
                ? "Full-stack developer / Bali, Indonesia"
                : "Full-stack developer / Bali, Indonesia"}
            </span>
            <a href="#home">
              {t("top.back")}
              <ArrowUpRight size={15} />
            </a>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}

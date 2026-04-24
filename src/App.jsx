import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Music, Mic, Disc, Calendar, Mail, Phone, ChevronRight, Play, Smartphone, X, Users, Volume2, Lightbulb, Tv, Sparkles, Clock, Gift, Headphones, Wind, Layers, Zap, Stars, Crown } from 'lucide-react';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.71.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></svg>
);

const FloatingSVG = ({ children, className, delay = 0 }) => (
  <motion.div
    animate={{
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const ServiceCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05, rotateY: 10, rotateX: 5 }}
    className="glass-dark p-8 flex flex-col items-center text-center group cursor-pointer transition-all duration-500 hover:border-brand-cyan/50"
  >
    <div className="w-16 h-16 bg-brand-purple/30 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-cyan/20 transition-colors">
      <Icon className="w-8 h-8 text-brand-cyan group-hover:text-white transition-colors" />
    </div>
    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-brand-cyan">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </motion.div>
);

const PackageCard = ({ image, name, price, tagline, ideal, description, features, isRecommended }) => {
  const [isOpen, setIsOpen] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const mxS = useSpring(mx, { stiffness: 150, damping: 20 });
  const myS = useSpring(my, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(myS, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mxS, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleMouseLeave = () => { mx.set(0); my.set(0); };

  const priceNum = price.replace(' MXN', '');
  const checkFeatures = features.slice(0, 5);

  return (
    <>
      <motion.div
        layoutId={`card-${name}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {/* Outer glow for recommended */}
        {isRecommended && (
          <div className="absolute -inset-px rounded-[2rem] bg-brand-primary/20 blur-xl pointer-events-none" />
        )}

        <div className={`relative rounded-[2rem] overflow-hidden flex flex-col border transition-all duration-300 group
          ${isRecommended
            ? 'bg-[#16160a] border-brand-primary/50 shadow-[0_0_40px_rgba(254,205,42,0.12)]'
            : 'bg-[#0f0f0f] border-white/[0.07] hover:border-white/[0.14]'
          }`}
          style={{ transform: "translateZ(0)" }}
        >
          {/* Most popular badge */}
          {isRecommended && (
            <div className="flex justify-center pt-4 pb-0">
              <span className="bg-brand-primary text-brand-dark text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                Más Popular
              </span>
            </div>
          )}

          {/* Image header */}
          <div className={`relative overflow-hidden ${isRecommended ? 'h-28 mt-3' : 'h-32'}`}>
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
            />
            <div className={`absolute inset-0 bg-gradient-to-b ${isRecommended ? 'from-transparent to-[#16160a]' : 'from-transparent to-[#0f0f0f]'}`} />
            <div className="absolute bottom-3 left-4">
              <span className="text-brand-primary text-[10px] font-black uppercase tracking-[0.25em]">{tagline}</span>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 pb-6 pt-4 flex flex-col flex-1">
            {/* Name */}
            <h4 className={`text-3xl font-black tracking-tighter leading-none mb-4 transition-colors duration-300 ${isRecommended ? 'text-brand-primary' : 'text-white group-hover:text-brand-primary'}`}>
              {name}
            </h4>

            {/* Price block */}
            <div className={`rounded-2xl p-4 mb-5 ${isRecommended ? 'bg-brand-primary/10 border border-brand-primary/20' : 'bg-white/[0.04] border border-white/[0.07]'}`}>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Precio desde</div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white leading-none">{priceNum}</span>
                <span className="text-sm font-bold text-white/40">MXN</span>
              </div>
            </div>

            {/* Feature checklist */}
            <ul className="space-y-2.5 mb-5 flex-1">
              {checkFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${isRecommended ? 'bg-brand-primary/20 border border-brand-primary/40' : 'bg-white/5 border border-white/15'}`}>
                    <svg className={`w-2.5 h-2.5 ${isRecommended ? 'text-brand-primary' : 'text-white/50'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-white/60 text-xs leading-relaxed">{f.value}</span>
                </li>
              ))}
              {features.length > 5 && (
                <li className="text-brand-primary text-[11px] font-bold pl-6.5">
                  +{features.length - 5} beneficios más →
                </li>
              )}
            </ul>

            {/* Divider */}
            <div className={`h-px mb-5 ${isRecommended ? 'bg-brand-primary/15' : 'bg-white/[0.06]'}`} />

            {/* CTA */}
            <button
              className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300
                ${isRecommended
                  ? 'bg-brand-primary text-brand-dark hover:bg-brand-secondary shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/30'
                  : 'bg-white/5 text-white border border-white/10 hover:bg-brand-primary hover:text-brand-dark hover:border-brand-primary'
                }`}
            >
              Ver detalles completos
            </button>
          </div>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[999] flex items-start justify-center overflow-y-auto custom-scrollbar p-4 md:p-10 bg-brand-dark/40 backdrop-blur-3xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-brand-dark/80"
            />
            <motion.div
              layoutId={`card-${name}`}
              className="relative w-full max-w-5xl bg-brand-dark rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col md:flex-row my-20 z-10"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8 w-14 h-14 glass rounded-full flex items-center justify-center text-brand-primary z-50 border-white/10 hover:bg-brand-primary hover:text-brand-dark transition-all"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="w-full md:w-2/5 h-64 md:h-auto relative">
                <img src={image} className="w-full h-full object-cover" alt={name} />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark md:bg-gradient-to-r md:from-transparent md:to-brand-dark" />
              </div>

              <div className="w-full md:w-3/5 p-6 md:p-12 overflow-y-auto custom-scrollbar">
                <div className="text-brand-primary font-black text-xs uppercase tracking-[0.4em] mb-4">{tagline}</div>
                <h4 className="text-4xl md:text-6xl font-black mb-2 leading-none">{name}</h4>
                <div className="text-2xl md:text-4xl font-bold text-white/30 mb-8">{price}</div>

                <div className="mb-12">
                  <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-white/10" /> Descripción
                  </h5>
                  <p className="text-white/80 text-lg md:text-xl leading-relaxed font-medium">{description}</p>
                </div>

                <div className="mb-12">
                  <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-white/10" /> Ideal para
                  </h5>
                  <p className="text-brand-primary text-xl font-black italic tracking-tight">{ideal}</p>
                </div>

                <div>
                  <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-6 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-white/10" /> ¿Qué incluye el paquete?
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature, i) => (
                      <div key={i} className="flex gap-4 items-center p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-brand-primary border-white/10 shrink-0">
                          <feature.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-0.5">{feature.label}</div>
                          <div className="text-base font-bold text-white leading-tight">{feature.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-12 bg-brand-primary text-brand-dark py-6 rounded-2xl font-black text-xl shadow-[0_0_50px_rgba(254,205,42,0.2)] hover:scale-[1.01] active:scale-95 transition-all">
                  RESERVAR ESTE PAQUETE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

function App() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fbReviews, setFbReviews] = useState(null);

  useEffect(() => {
    const token = import.meta.env.VITE_FB_ACCESS_TOKEN;
    if (!token) return;
    const CACHE_KEY = 'alt_fb_reviews';
    const CACHE_TS  = 'alt_fb_reviews_ts';
    const TTL = 6 * 60 * 60 * 1000;
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      const ts = Number(localStorage.getItem(CACHE_TS) || 0);
      if (cached && Date.now() - ts < TTL) { setFbReviews(JSON.parse(cached)); return; }
    } catch {}
    fetch(`https://graph.facebook.com/v19.0/gmalternativa/ratings?fields=reviewer,rating,review_text,created_time&limit=20&access_token=${token}`)
      .then(r => r.json())
      .then(({ data }) => {
        if (!Array.isArray(data)) return;
        const filtered = data.filter(r => r.review_text?.trim() && r.rating >= 4).slice(0, 12);
        setFbReviews(filtered);
        localStorage.setItem(CACHE_KEY, JSON.stringify(filtered));
        localStorage.setItem(CACHE_TS, String(Date.now()));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['inicio', 'quienes-somos', 'paquetes', 'galeria', 'testimonios', 'contacto'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { name: 'Inicio', id: 'inicio' },
    { name: 'Quienes Somos', id: 'quienes-somos' },
    { name: 'Paquetes', id: 'paquetes' },
    { name: 'Galería', id: 'galeria' },
    { name: 'Testimonios', id: 'testimonios' },
    { name: 'Contacto', id: 'contacto' }
  ];

  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-primary selection:text-brand-dark overflow-hidden">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'py-4' : 'py-6'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className={`flex justify-between items-center px-4 md:px-8 transition-all duration-300 ${isScrolled || isMenuOpen ? 'glass rounded-full py-3 border-white/10 shadow-xl' : 'py-2'}`}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <div className="w-32 h-14 md:w-56 md:h-20 flex items-center justify-center overflow-visible">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain scale-110 transform-gpu drop-shadow-2xl" />
              </div>
            </motion.div>

            {/* Desktop Links */}
            <div className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em]">
              {navLinks.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`transition-all duration-300 relative group ${activeSection === item.id ? 'text-brand-primary' : 'hover:text-brand-primary'}`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-primary transition-all duration-300 ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="hidden md:block bg-brand-primary text-brand-dark px-7 py-2.5 rounded-full font-black text-xs hover:bg-white transition-all transform hover:scale-105 shadow-lg shadow-brand-primary/20">
                RESERVAR
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden w-12 h-12 glass rounded-full flex items-center justify-center text-brand-primary border-white/10 z-[60]"
              >
                <div className="relative w-6 h-6">
                  <motion.span
                    animate={isMenuOpen ? { rotate: 45, y: 0, width: "100%" } : { rotate: 0, y: -6, width: "70%" }}
                    className="absolute top-1/2 left-0 h-0.5 bg-brand-primary rounded-full transition-all"
                  />
                  <motion.span
                    animate={isMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0, width: "100%" }}
                    className="absolute top-1/2 left-0 h-0.5 bg-brand-primary rounded-full"
                  />
                  <motion.span
                    animate={isMenuOpen ? { rotate: -45, y: 0, width: "100%" } : { rotate: 0, y: 6, width: "40%" }}
                    className="absolute top-1/2 left-0 h-0.5 bg-brand-primary rounded-full transition-all"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[100] bg-brand-dark/80 flex flex-col items-center justify-center"
          >
            {/* Dedicated Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 w-14 h-14 glass rounded-full flex items-center justify-center text-brand-primary border-brand-primary/20 shadow-lg shadow-brand-primary/20"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="flex flex-col items-center gap-10">
              {navLinks.map((item, idx) => (
                <motion.a
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-2xl font-black uppercase tracking-[0.3em] transition-all duration-300 ${activeSection === item.id ? 'text-brand-primary' : 'text-white/40 hover:text-brand-primary hover:scale-105'}`}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-12 glass text-brand-primary border-brand-primary/40 px-12 py-4 rounded-full font-black text-lg shadow-[0_0_50px_rgba(254,205,42,0.2)] active:scale-95 transition-all hover:bg-brand-primary hover:text-brand-dark"
              >
                RESERVAR AHORA
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/fondo.jpg"
            className="w-full h-full object-cover"
            alt="Background"
          />
          <div className="absolute inset-0 bg-black/30 bg-gradient-to-b from-transparent via-brand-dark/10 to-brand-dark/30" />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 opacity-20">
          <motion.div
            style={{ y: backgroundY }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/20 rounded-full blur-[100px] animate-pulse-glow"
          />
          <motion.div
            style={{ y: backgroundY }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] animate-pulse-glow"
          />
        </div>

        {/* 3D Floating Icons */}
        <FloatingSVG className="absolute top-[20%] left-[10%] opacity-5 md:opacity-10" delay={0}>
          <Music className="w-16 h-16 text-brand-primary" />
        </FloatingSVG>
        <FloatingSVG className="absolute bottom-[20%] right-[15%] opacity-5 md:opacity-10" delay={1}>
          <Mic className="w-20 h-20 text-brand-primary" />
        </FloatingSVG>
        <FloatingSVG className="absolute top-[15%] right-[25%] opacity-5 md:opacity-10" delay={2.5}>
          <Disc className="w-12 h-12 text-brand-primary" />
        </FloatingSVG>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-9xl font-black mb-8 leading-none tracking-tighter uppercase">
              ALTERNATIVA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-white text-glow">
                GRUPO MUSICAL
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-white text-lg md:text-xl mb-10 leading-relaxed font-bold drop-shadow-lg">
              Especialistas en Bodas, XV Años y Graduaciones en Mérida, Yucatán. <br className="hidden md:block" />
              Transformamos tu evento en una experiencia musical inolvidable.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="bg-brand-primary text-brand-dark px-10 py-4 rounded-full font-black text-lg hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20">
                VER PAQUETES <ChevronRight className="w-5 h-5" />
              </button>
              <button className="glass px-10 py-4 rounded-full font-black text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2 border-white/10">
                <Phone className="w-5 h-5" /> CONTÁCTANOS
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Quienes Somos Section - Editorial Layout */}
      <section id="quienes-somos" className="py-32 relative bg-brand-dark overflow-hidden">
        {/* Large Background Text for depth */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 select-none pointer-events-none opacity-[0.02] whitespace-nowrap hidden lg:block">
          <span className="text-[25rem] font-black tracking-tighter uppercase leading-none">
            EXPERIENCIA • PASIÓN • CALIDAD
          </span>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">

            {/* Image Block - Creative Asymmetric Frame */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full lg:w-1/2 relative group"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/5 aspect-[4/5] md:aspect-[16/10]">
                <img
                  src="/fondo2.webp"
                  className="w-full h-full object-cover transform transition-transform duration-[3s] group-hover:scale-105"
                  alt="Alternativa Show"
                />
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-brand-dark/20 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/60 via-transparent to-transparent" />
              </div>

              {/* Decorative Lines */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-brand-primary/40 rounded-tl-3xl md:block hidden" />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-brand-primary/40 rounded-br-3xl md:block hidden" />
            </motion.div>

            {/* Content Block - Sophisticated Typography */}
            <div className="w-full lg:w-1/2 lg:pl-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-5xl md:text-7xl font-black mb-10 leading-[0.95] tracking-tighter">
                  MÁS DE 15 AÑOS <br />
                  <span className="text-brand-primary">CREANDO</span> <br />
                  HISTORIAS
                </h3>

                <div className="max-w-xl space-y-8">
                  <p className="text-xl md:text-2xl text-white font-medium leading-snug">
                    Música en vivo con producción profesional para <span className="text-brand-primary italic underline decoration-1 underline-offset-4">bodas, XV años</span> y eventos sociales de alto nivel.
                  </p>

                  <div className="text-gray-400 text-lg leading-relaxed border-l-2 border-white/10 pl-8">
                    <p className="mb-6">
                      En Alternativa Grupo Musical llevamos más de una década perfeccionando el arte de la celebración. Somos una agrupación versátil especializada en transformar graduaciones y eventos sociales en experiencias memorables.
                    </p>
                    <p>
                      Nuestro compromiso trasciende lo musical: combinamos talento, pasión y un profesionalismo técnico impecable para ofrecerte un espectáculo de clase mundial en Mérida, Yucatán.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="paquetes" className="py-32 bg-brand-dark relative overflow-hidden">
        {/* Cleaner Premium Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(254,205,42,0.05),transparent_70%)]" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-primary/5 rounded-full blur-[120px]" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-primary/5 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h3 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter leading-none">PAQUETES <span className="text-brand-primary">& PRECIOS</span></h3>
            <p className="text-white/35 text-sm font-bold uppercase tracking-[0.25em] mt-2">Elige el que mejor se adapte a tu celebración</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5"
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}>
              <PackageCard
                image="/fondo4.webp"
                name="Petit"
                price="$25,000 MXN"
                tagline="La opción ideal para eventos íntimos."
                ideal="XV íntimos · Bodas pequeñas · Cumpleaños · Eventos privados"
                description="La opción ideal para eventos íntimos que buscan un gran ambiente musical con producción profesional. “Todo lo necesario para que tu evento se vea y se viva increíble.”"
                features={[
                  { icon: Users, label: "Músicos", value: "8 músicos profesionales en escena" },
                  { icon: Volume2, label: "Audio", value: "Sistema Amplificado (hasta 100 personas)" },
                  { icon: Lightbulb, label: "Iluminación", value: "Wash LED + Robóticas" },
                  { icon: Tv, label: "Video", value: "Pantalla LED" },
                  { icon: Sparkles, label: "Animación", value: "Zanquero, cabezón y show de la máscara" },
                  { icon: Music, label: "Música", value: "Playlist ambiental en recepción y descansos" },
                  { icon: Clock, label: "Tiempo", value: "5 horas de servicio" }
                ]}
              />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}>
              <PackageCard
                image="/fondo5.webp"
                name="Estándar"
                price="$35,000 MXN"
                tagline="El equilibrio perfecto."
                ideal="XV años · Bodas · Posadas · Graduaciones"
                description="Música en vivo con la fuerza perfecta para crear ambiente, diversión y un show equilibrado. “El equilibrio perfecto entre show, música y diversión.”"
                features={[
                  { icon: Users, label: "Músicos", value: "9 músicos en vivo" },
                  { icon: Volume2, label: "Audio", value: "Sistema profesional (hasta 200 personas)" },
                  { icon: Lightbulb, label: "Iluminación", value: "Wash LED + Robóticas reforzada con efectos" },
                  { icon: Tv, label: "Video", value: "Pantalla LED" },
                  { icon: Sparkles, label: "Animación", value: "Cabezones + Zanquero + personaje inflable" },
                  { icon: Headphones, label: "DJ", value: "Integrado (música continua sin silencios)" },
                  { icon: Gift, label: "Cortesías", value: "5 chisperos incluidos" },
                  { icon: Clock, label: "Tiempo", value: "6 horas de servicio" }
                ]}
              />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}>
              <PackageCard
                image="/fondo7.webp"
                name="Premium"
                price="$45,000 MXN"
                tagline="Máximo Impacto Visual."
                isRecommended={true}
                ideal="XV años · Bodas · Posadas · Graduaciones · Eventos especiales"
                description="Un espectáculo completo con mayor producción, impacto visual y momentos especiales en vivo. “Diseñado para quienes buscan calidad, impacto visual y una experiencia única.”"
                features={[
                  { icon: Users, label: "Músicos", value: "10 músicos en escena" },
                  { icon: Volume2, label: "Audio", value: "Equipo profesional (hasta 500 personas)" },
                  { icon: Wind, label: "Iluminación", value: "Equipo profesional + máquina de humo" },
                  { icon: Tv, label: "Video", value: "Pantalla LED + banners LED" },
                  { icon: Sparkles, label: "Animación", value: "Cabezones + personajes inflables + botarga" },
                  { icon: Mic, label: "Show Sax", value: "Música en vivo (45 min)" },
                  { icon: Layers, label: "Producción", value: "Escenario profesional" },
                  { icon: Gift, label: "Cortesías", value: "10 chisperos + botella para shots" },
                  { icon: Clock, label: "Tiempo", value: "6 horas de servicio" }
                ]}
              />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}>
              <PackageCard
                image="/fondo8.webp"
                name="Platinum"
                price="$70,000 MXN"
                tagline="Espectáculo Épico."
                ideal="Bodas de alto nivel · Eventos masivos · Graduaciones · Grandes celebraciones"
                description="Producción de nivel profesional que transforma tu evento en un mega espectáculo. “Un show de gran formato con músicos, tecnología y producción de primer nivel para eventos que deben sentirse épicos.”"
                features={[
                  { icon: Users, label: "Músicos", value: "12 músicos en escena" },
                  { icon: Volume2, label: "Audio", value: "Equipo profesional (hasta 1,000 personas)" },
                  { icon: Tv, label: "Video", value: "Pantalla LED de gran formato" },
                  { icon: Sparkles, label: "Animación", value: "Cabezones + personajes inflables premium" },
                  { icon: Headphones, label: "DJ", value: "Música continua durante todo el evento" },
                  { icon: Layers, label: "Producción", value: "Ground Support" },
                  { icon: Stars, label: "Efectos", value: "Bazooka CO₂, Mariposas, Chisperos" },
                  { icon: Zap, label: "Energía", value: "Planta de energía 50 KVa incluida" },
                  { icon: Clock, label: "Tiempo", value: "Servicio completo" }
                ]}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Gallery Section */}
      <section id="galeria" className="py-32 bg-brand-dark relative overflow-hidden">
        {/* Editorial Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[25rem] font-black text-white/[0.02] select-none pointer-events-none uppercase tracking-tighter">
          GALERÍA
        </div>

        <div className="container mx-auto px-6 relative z-10 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight">MOMENTOS <span className="text-brand-primary">INOLVIDABLES</span></h3>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">Un vistazo a la energía, el talento y la producción que llevamos a cada evento.</p>
          </motion.div>
        </div>

        {/* Dual Track Infinite Marquee */}
        <div className="space-y-12 relative cursor-grab active:cursor-grabbing">
          {/* Row 1: Left to Right */}
          <div className="flex overflow-hidden group">
            <motion.div
              animate={{ x: [0, -1920] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              drag="x"
              dragConstraints={{ left: -3840, right: 0 }}
              className="flex gap-8 whitespace-nowrap px-4"
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02, y: -10 }}
                  className="w-[300px] md:w-[500px] h-[350px] md:h-[500px] glass-dark flex-shrink-0 rounded-[3rem] overflow-hidden border-white/5 hover:border-brand-primary/30 transition-all duration-500 group-hover:pause"
                >
                  <div className="w-full h-full relative overflow-hidden group/img">
                    <img
                      src={`/galeria/galeria${(i % 15) + 1}.jpg`}
                      className="w-full h-full object-cover opacity-80 group-hover/img:opacity-100 group-hover/img:scale-110 transition-all duration-1000"
                      alt={`Momento ${i + 1}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60 group-hover/img:opacity-40 transition-opacity duration-500" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Row 2: Right to Left */}
          <div className="flex overflow-hidden group">
            <motion.div
              animate={{ x: [-1920, 0] }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              drag="x"
              dragConstraints={{ left: -1920, right: 1920 }}
              className="flex gap-8 whitespace-nowrap px-4"
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02, y: -10 }}
                  className="w-[300px] md:w-[500px] h-[350px] md:h-[500px] glass-dark flex-shrink-0 rounded-[3rem] overflow-hidden border-white/5 hover:border-brand-primary/30 transition-all duration-500 group-hover:pause"
                >
                  <div className="w-full h-full relative overflow-hidden group/img">
                    <img
                      src={`/galeria/galeria${((i + 5) % 15) + 1}.jpg`}
                      className="w-full h-full object-cover opacity-80 group-hover/img:opacity-100 group-hover/img:scale-110 transition-all duration-1000"
                      alt={`Momento ${i + 1}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60 group-hover/img:opacity-40 transition-opacity duration-500" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Floating Decoration */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
      </section>

      {/* Videos Section */}
      <section id="videos" className="py-20 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(254,205,42,0.04),transparent)]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              VÍ<span className="text-brand-primary">DEOS</span>
            </h3>
            <p className="text-white/25 text-[11px] font-bold uppercase tracking-[0.25em] mt-2">Mira cómo lo vivimos en vivo</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {[
              { id: "mI1u7kjlglg", title: "Show en vivo", from: -120 },
              { id: "-NaWteYRsnA", title: "Presentación", from: 120 },
            ].map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, x: video.from }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.08 }}
                className="relative rounded-2xl overflow-hidden bg-[#111111] border border-white/[0.06] group"
                style={{ aspectRatio: '16/9' }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {(() => {
        const toInitials = (n = '') => n.split(' ').slice(0, 2).map(w => w[0] || '').join('').toUpperCase();
        const relDate = (iso) => {
          const d = Math.floor((Date.now() - new Date(iso)) / 86400000);
          if (d < 1) return 'hoy';
          if (d < 7) return `hace ${d} días`;
          if (d < 30) return `hace ${Math.floor(d / 7)} sem`;
          if (d < 365) return `hace ${Math.floor(d / 30)} meses`;
          return `hace ${Math.floor(d / 365)} años`;
        };
        const FALLBACK = [
          { name: "Lourdes R.", initials: "LR", text: "Excelente grupo, muy profesionales y con un repertorio increíble. Pusieron a todos a bailar desde el primer momento.", date: "hace 2 semanas", stars: 5 },
          { name: "Alejandro V.", initials: "AV", text: "El mejor show de Mérida. La energía que transmiten es contagiosa. Altamente recomendados para cualquier evento.", date: "hace 1 mes", stars: 5 },
          { name: "Mónica G.", initials: "MG", text: "Buscábamos lo mejor para los XV años de mi hija y Alternativa superó todas las expectativas.", date: "hace 6 semanas", stars: 5 },
          { name: "Roberto C.", initials: "RC", text: "Puntualidad, talento y animación espectacular. Mis invitados no pararon de elogiar la banda toda la noche.", date: "hace 2 meses", stars: 5 },
          { name: "Elena P.", initials: "EP", text: "La mejor decisión para nuestra boda. Entienden perfecto el ambiente y fluyen con la fiesta.", date: "hace 3 meses", stars: 5 },
          { name: "Daniela M.", initials: "DM", text: "Producción impecable. La pantalla LED y el sonido se escuchan increíble en espacios grandes.", date: "hace 4 meses", stars: 5 },
          { name: "Carmen B.", initials: "CB", text: "Increíbles en todo sentido. Repertorio, luces, sonido... todo perfecto. Los recomiendo al 100%.", date: "hace 5 meses", stars: 5 },
          { name: "Jorge H.", initials: "JH", text: "Sin duda los mejores de Mérida. La graduación fue un éxito total gracias a Alternativa.", date: "hace 6 meses", stars: 5 },
        ];
        const reviews = fbReviews
          ? fbReviews.map(r => ({ name: r.reviewer?.name || 'Cliente', initials: toInitials(r.reviewer?.name), text: r.review_text, date: relDate(r.created_time), stars: r.rating }))
          : FALLBACK;
        const half = Math.ceil(reviews.length / 2);
        const base1 = reviews.slice(0, half);
        const base2 = reviews.slice(half).length ? reviews.slice(half) : reviews.slice(0, half).reverse();
        const ensure = (arr) => { let r = arr; while (r.length < 5) r = [...r, ...r]; return r; };
        const r1 = ensure(base1);
        const r2 = ensure(base2);
        const Star = () => <svg className="w-3 h-3 fill-brand-primary flex-shrink-0" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
        return (
        <section id="testimonios" className="py-20 bg-brand-dark relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(254,205,42,0.04),transparent)]" />

          {/* Header */}
          <div className="container mx-auto px-4 md:px-6 relative z-10 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
            >
              <div>
                <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                  RES<span className="text-brand-primary">EÑAS</span>
                </h3>
                <p className="text-white/25 text-[11px] font-bold uppercase tracking-[0.25em] mt-2">
                  {fbReviews ? `${fbReviews.length} reseñas de Facebook` : '+50 reseñas en Facebook'}
                </p>
              </div>
              <a
                href="https://www.facebook.com/gmalternativa/reviews/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-primary text-brand-dark px-5 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-brand-secondary transition-all self-start sm:self-auto"
              >
                Ver en Facebook
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </div>

          {/* Marquee rows */}
          <div className="relative z-10 space-y-3">
            <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
              <div className="flex gap-3 marquee-left">
                {[...r1, ...r1].map((r, i) => (
                  <div key={`r1-${i}`} className="w-64 sm:w-72 flex-shrink-0 bg-[#111111] border border-white/[0.06] rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex gap-0.5">{[...Array(r.stars || 5)].map((_, j) => <Star key={j} />)}</div>
                      <svg className="w-3.5 h-3.5 fill-white/15 flex-shrink-0" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </div>
                    <p className="text-white/50 text-xs leading-relaxed line-clamp-2 mb-3">"{r.text}"</p>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center text-brand-dark font-black text-[9px] flex-shrink-0">{r.initials}</div>
                      <div className="min-w-0">
                        <span className="text-white font-semibold text-[11px] truncate block">{r.name}</span>
                        <span className="text-white/25 text-[9px]">{r.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
              <div className="flex gap-3 marquee-right">
                {[...r2, ...r2].map((r, i) => (
                  <div key={`r2-${i}`} className="w-64 sm:w-72 flex-shrink-0 bg-[#111111] border border-white/[0.06] rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex gap-0.5">{[...Array(r.stars || 5)].map((_, j) => <Star key={j} />)}</div>
                      <svg className="w-3.5 h-3.5 fill-white/15 flex-shrink-0" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </div>
                    <p className="text-white/50 text-xs leading-relaxed line-clamp-2 mb-3">"{r.text}"</p>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center text-brand-dark font-black text-[9px] flex-shrink-0">{r.initials}</div>
                      <div className="min-w-0">
                        <span className="text-white font-semibold text-[11px] truncate block">{r.name}</span>
                        <span className="text-white/25 text-[9px]">{r.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        );
      })()}


      {/* Contact Section */}
      < section id="contacto" className="py-24 bg-brand-dark" >
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-black mb-8 leading-tight">¿Listo para hacer tu evento <span className="text-brand-primary">legendario?</span></h2>
              <p className="text-gray-400 text-lg mb-12">
                Contáctanos hoy mismo para recibir una cotización personalizada y asegurar la fecha de tu evento.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 glass flex items-center justify-center text-brand-primary border-white/10">
                    <Phone className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 uppercase font-bold tracking-wider">Llámanos</div>
                    <div className="text-xl font-bold font-mono">+52 9993317428</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 glass flex items-center justify-center text-brand-primary border-white/10">
                    <Mail className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 uppercase font-bold tracking-wider">Email</div>
                    <div className="text-xl font-bold font-mono">contacto@alternativagmusical.com.mx</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-dark p-10 border-white/5 bg-white/[0.02]">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold uppercase mb-2 text-gray-500 tracking-wider">Nombre</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:border-brand-primary outline-none transition-all text-white" placeholder="Tu nombre" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase mb-2 text-gray-500 tracking-wider">Fecha del Evento</label>
                    <input type="date" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:border-brand-primary outline-none transition-all text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase mb-2 text-gray-500 tracking-wider">Mensaje</label>
                  <textarea rows="4" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:border-brand-primary outline-none transition-all text-white" placeholder="Cuéntanos sobre tu evento..."></textarea>
                </div>
                <button className="w-full bg-brand-primary text-brand-dark py-4 rounded-xl font-black text-lg hover:shadow-[0_0_30px_rgba(254,205,42,0.4)] transition-all transform hover:-translate-y-1">
                  ENVIAR MENSAJE
                </button>
              </form>
            </div>
          </div>
        </div>
      </section >

      {/* Footer */}
      < footer className="py-16 border-t border-white/5 bg-brand-dark" >
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center">
            <div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <div className="flex gap-6">
            <a href="#" className="w-12 h-12 glass flex items-center justify-center hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300"><InstagramIcon /></a>
            <a href="#" className="w-12 h-12 glass flex items-center justify-center hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300"><FacebookIcon /></a>
            <a href="#" className="w-12 h-12 glass flex items-center justify-center hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300"><YoutubeIcon /></a>
          </div>
          <p className="text-gray-600 text-sm font-medium tracking-wide">© 2026 Alternativa Grupo Musical. Todos los derechos reservados.</p>
        </div>
      </footer >
    </div >
  );
}

export default App;

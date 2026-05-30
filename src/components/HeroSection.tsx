const HeroSection = () => {
  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
        <div className="flex gap-10">
          <a
            href="#about"
            className="text-sm font-medium tracking-[0.15em] text-[#D7E2EA]/70 uppercase hover:text-white transition-colors"
          >
            About
          </a>
          <a
            href="#projects"
            className="text-sm font-medium tracking-[0.15em] text-[#D7E2EA]/70 uppercase hover:text-white transition-colors"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="text-sm font-medium tracking-[0.15em] text-[#D7E2EA]/70 uppercase hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>
        <a
          href="mailto:Tanimagargt.g@gmail.com"
          className="text-sm font-medium tracking-[0.15em] text-white border border-white/30 px-5 py-2 rounded-full uppercase hover:bg-white hover:text-black transition-all duration-300"
        >
          Email Me
        </a>
      </nav>

      {/* Hero Section */}
      <section
        className="relative w-full min-h-screen overflow-hidden"
        style={{ background: '#0C0C0C' }}
      >
        {/* Fullscreen cinematic background avatar */}
        <div className="absolute inset-0">
          <img
            src="/hero-bg.png"
            alt="Tanima Garg — Data Analyst"
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.85 }}
          />
          {/* Gradient overlay — left-heavy so text is readable */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(12,12,12,0.92) 0%, rgba(12,12,12,0.55) 50%, rgba(12,12,12,0.15) 100%)',
            }}
          />
          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-48"
            style={{
              background: 'linear-gradient(to top, #0C0C0C 0%, transparent 100%)',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end min-h-screen pb-20 px-8 md:px-16">
          {/* Portfolio year badge */}
          <p className="text-xs font-light tracking-[0.3em] text-[#D7E2EA]/50 uppercase mb-6">
            Portfolio · 2026
          </p>

          {/* Massive stacked name */}
          <h1
            className="font-black text-white uppercase leading-[0.88] tracking-tight mb-6"
            style={{ fontSize: 'clamp(4.5rem, 16vw, 13rem)' }}
          >
            Tanima
            <br />
            <span className="hero-heading">Garg</span>
          </h1>

          {/* Tagline */}
          <p className="text-sm md:text-base font-light tracking-[0.25em] text-[#D7E2EA]/60 uppercase mb-10">
            Data Analyst&nbsp;&nbsp;·&nbsp;&nbsp;BI Specialist&nbsp;&nbsp;·&nbsp;&nbsp;SQL Expert
          </p>

          {/* Scroll indicator */}
          <div className="flex items-center gap-4">
            <p className="text-xs tracking-[0.3em] text-[#D7E2EA]/40 uppercase">Scroll</p>
            <div className="w-[1px] h-12 bg-gradient-to-b from-[#5A768E]/50 to-transparent overflow-hidden">
              <div
                className="w-full h-1/2 bg-white"
                style={{
                  animation: 'scrollLine 2s cubic-bezier(0.15, 0.41, 0.69, 0.94) infinite',
                }}
              />
            </div>
          </div>
        </div>

        <style>{`
          @keyframes scrollLine {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(200%); }
          }
        `}</style>
      </section>
    </>
  )
}

export default HeroSection

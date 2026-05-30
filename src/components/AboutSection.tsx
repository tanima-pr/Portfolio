import FadeIn from './FadeIn'
import AnimatedText from './AnimatedText'

const ABOUT_TEXT =
  "Data Analyst with 2 years of experience building SQL/Python-driven reporting workflows, Power BI/Tableau dashboards, KPI reports, and data-quality checks across operational, finance, and healthcare datasets. I improve reporting accuracy and transparency by validating metrics, automating recurring reports, and translating stakeholder needs into decision-ready insights. Open to full-time, contract, and remote opportunities across Canada."

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-5 sm:px-8 md:px-10 py-20"
    >
      {/* Corner decorative 3D images */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="pointer-events-none absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[60px] sm:w-[140px] md:w-[180px]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" alt="" className="w-full h-auto" loading="lazy" draggable={false} />
      </FadeIn>
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="pointer-events-none absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[55px] sm:w-[120px] md:w-[160px]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" alt="" className="w-full h-auto" loading="lazy" draggable={false} />
      </FadeIn>
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="pointer-events-none absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[60px] sm:w-[140px] md:w-[180px]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" alt="" className="w-full h-auto" loading="lazy" draggable={false} />
      </FadeIn>
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="pointer-events-none absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[65px] sm:w-[150px] md:w-[200px]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" alt="" className="w-full h-auto" loading="lazy" draggable={false} />
      </FadeIn>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16 text-center">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 140px)' }}>
            About me
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-12 sm:gap-16 md:gap-20">
          <AnimatedText
            text={ABOUT_TEXT}
            className="font-medium leading-relaxed text-[#D7E2EA] max-w-[600px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)' }}
          />

          {/* Skills */}
          <FadeIn delay={0.15} className="w-full max-w-3xl">
            <div className="flex flex-col gap-5 sm:gap-6">
              {[
                {
                  label: 'Analytics & Programming',
                  items: ['SQL', 'Python', 'Pandas', 'NumPy', 'Excel', 'Power Query', 'Statistical Analysis'],
                },
                {
                  label: 'BI & Reporting',
                  items: ['Power BI', 'Tableau', 'DAX', 'KPI Dashboards', 'Reporting Automation', 'Data Storytelling'],
                },
                {
                  label: 'Databases & Platforms',
                  items: ['MySQL', 'PostgreSQL', 'BigQuery', 'SQL Views', 'ETL/ELT', 'Data Warehousing'],
                },
                {
                  label: 'Tools & Quality',
                  items: ['Git', 'Jira', 'Postman', 'REST APIs', 'AWS', 'Azure', 'Data Validation'],
                },
              ].map((group) => (
                <div key={group.label} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5">
                  <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/40 sm:w-52 sm:shrink-0 sm:text-right">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.03] px-3 py-1 text-sm text-[#D7E2EA]/80 hover:border-[#D7E2EA]/40 hover:text-[#D7E2EA] transition-colors cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <a href="#contact" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-black hover:bg-[#e2e8f0] transition duration-300 font-medium text-sm shadow-lg">
              Get in Touch
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

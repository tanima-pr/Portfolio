import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import FadeIn from './FadeIn'
import { ArrowUpRight } from 'lucide-react'

interface ProjectData {
  number: string
  category: string
  name: string
  githubUrl?: string
  description: string
  tags: string[]
  img1: string
  img2: string
  img3: string
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    category: 'Healthcare Analytics · AI-Assisted',
    name: 'Connected Analytics for eHospital',
    githubUrl: 'https://github.com/tanima-pr/ehospital-kpi-pack',
    description:
      'AI-assisted warehouse-backed analytics workspace — source-data ingestion, warehouse refresh, approved MySQL views, reusable SQL KPI queries, and natural-language questions over hospital operational and billing data.',
    tags: ['MySQL', 'SQL', 'KPI Design', 'Data Warehousing', 'NLP'],
    img1: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=80',
    img2: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=700&q=80',
    img3: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=700&q=80',
  },
  {
    number: '02',
    category: 'Finance Analytics · Capstone',
    name: 'Finance Data Analytics Capstone',
    description:
      'End-to-end analytics pipeline combining SQL, Python, Excel, Tableau and Power BI for profitability and revenue-trend reporting. Automated ETL and aggregation workflows, applied data-quality checks, and designed dashboards for financial performance visibility.',
    tags: ['Python', 'SQL', 'Tableau', 'Power BI', 'ETL'],
    img1: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=700&q=80',
    img2: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80',
    img3: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80',
  },
  {
    number: '03',
    category: 'Hospital Management · Power BI',
    name: 'Hospital Operations Dashboard',
    githubUrl: 'https://github.com/tanima-pr/Hospital_Management_Project',
    description:
      'Power BI dashboard for real-time monitoring of admissions, staff utilization, and patient demographics. Enables proactive decision-making by defining metrics and interactive visuals for administrators.',
    tags: ['Power BI', 'DAX', 'Data Modelling', 'KPIs'],
    img1: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=700&q=80',
    img2: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&q=80',
    img3: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=700&q=80',
  },
]

interface ProjectCardProps {
  project: ProjectData
  index: number
  total: number
}

const ProjectCard = ({ project, index, total }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'start start'] })
  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    <div ref={cardRef} className="sticky w-full" style={{ top: `${96 + index * 28}px`, height: '85vh' }}>
      <motion.article
        style={{ scale }}
        className="origin-top mx-auto h-full w-full flex flex-col gap-4 sm:gap-6 md:gap-8 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8"
      >
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-4 sm:gap-6">
          <div className="flex flex-row items-start gap-3 sm:gap-6 md:gap-10 min-w-0 w-full">
            <div className="shrink-0 font-black text-[#D7E2EA] leading-none" style={{ fontSize: 'clamp(2.5rem, 10vw, 120px)' }}>
              {project.number}
            </div>
            <div className="flex flex-col gap-1 sm:gap-3 pt-1 sm:pt-3 md:pt-4 min-w-0 flex-1">
              <span className="font-light uppercase tracking-widest text-[#D7E2EA]/60" style={{ fontSize: 'clamp(0.65rem, 1.2vw, 1rem)' }}>
                {project.category}
              </span>
              <h3 className="font-medium uppercase text-[#D7E2EA] leading-tight" style={{ fontSize: 'clamp(1.1rem, 2.2vw, 2rem)' }}>
                {project.name}
              </h3>
              <p className="text-[#D7E2EA]/50 text-sm font-light leading-relaxed max-w-md hidden sm:block">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {project.tags.map((t) => (
                  <span key={t} className="text-xs px-2.5 py-0.5 rounded-full border border-[#D7E2EA]/15 text-[#D7E2EA]/60">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="shrink-0 self-start sm:self-auto pt-1 sm:pt-2 md:pt-3">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#D7E2EA] border border-[#D7E2EA]/20 rounded-full px-5 py-2.5 hover:border-[#D7E2EA]/60 hover:bg-[#D7E2EA]/5 transition-all duration-300">
                GitHub <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-[40%_60%] gap-3 sm:gap-4 md:gap-5 flex-1 min-h-0">
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 min-h-0">
            <div className="overflow-hidden rounded-[30px] sm:rounded-[40px]" style={{ height: 'clamp(100px, 14vw, 200px)' }}>
              <img src={project.img1} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="overflow-hidden rounded-[30px] sm:rounded-[40px] flex-1 min-h-0">
              <img src={project.img2} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
          <div className="overflow-hidden rounded-[30px] sm:rounded-[40px] min-h-0">
            <img src={project.img3} alt="" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </div>
      </motion.article>
    </div>
  )
}

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#0C0C0C] px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24">
      <FadeIn y={40}>
        <h2 className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-16 sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 140px)' }}>
          Projects
        </h2>
      </FadeIn>
      <div className="mx-auto max-w-7xl">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} total={PROJECTS.length} />
        ))}
      </div>
    </section>
  )
}

export default ProjectsSection

'use client'

import React from 'react'
import FadeIn from './FadeIn'
import { ArrowUpRight } from 'lucide-react'

const experiences = [
  {
    role: 'Data Analyst',
    org: 'University of Ottawa',
    location: 'Ottawa, ON',
    period: 'Aug 2025 – Apr 2026',
    bullets: [
      'Partnered with residence, conduct, and operations stakeholders to clarify reporting needs, define KPI logic, and convert raw operational records into Power BI dashboards, SQL extracts, and weekly decision reports.',
      'Wrote SQL transformations and Python/Excel validation checks to clean, reconcile, and validate 500+ operational records, improving reporting accuracy and reducing manual review effort.',
      'Developed dashboards and exception reports to monitor missing reports, dates, responsible staff/teams, and operational trends, improving reporting transparency by 30%.',
      'Documented metric definitions, refresh steps, known data-quality issues, and stakeholder follow-ups so reporting workflows remained repeatable and audit-ready.',
    ],
  },
  {
    role: 'Teaching Assistant',
    org: 'University of Ottawa',
    location: 'Ottawa, ON',
    period: 'Jan 2026 – Apr 2026',
    bullets: [
      'Supported instruction, grading, tutorials, and technical feedback for 50+ students, strengthening analytical communication and quality-assurance discipline.',
    ],
  },
  {
    role: 'Analyst Intern',
    org: 'Calsoft Pvt Ltd',
    location: 'India',
    period: 'Jan 2023 – Dec 2023',
    bullets: [
      'Designed MySQL schemas and ER diagrams for multi-tenant data workflows, using normalized structures and indexing concepts to improve data availability and query consistency.',
      'Developed and tested RESTful APIs for secure data integration; automated QA and validation workflows in Postman, reducing testing cycles.',
      'Analyzed SD-WAN/network performance datasets to identify bottlenecks, data anomalies, and connectivity improvement opportunities for technical stakeholders.',
    ],
  },
]

const ExperienceSection = () => {
  return (
    <section id="experience" className="relative bg-[#0C0C0C] py-32">
      <div className="section-container">
        <FadeIn y={20}>
          <div className="mb-20">
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 mb-6">Experience / Career</p>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter">Where I've worked.</h3>
          </div>
        </FadeIn>

        <div className="space-y-0 divide-y divide-white/5">
          {experiences.map((exp, index) => (
            <FadeIn key={exp.role + exp.org} delay={index * 0.15}>
              <div className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 group">
                {/* Left: meta */}
                <div className="lg:col-span-4 flex flex-col gap-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/25">{exp.period}</p>
                  <h4 className="text-xl font-bold tracking-tight">{exp.role}</h4>
                  <p className="text-sm font-semibold text-white/50">{exp.org}</p>
                  <p className="text-xs text-white/25 uppercase tracking-widest">{exp.location}</p>
                </div>

                {/* Right: bullets */}
                <div className="lg:col-span-8">
                  <ul className="space-y-3">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="text-sm font-light text-white/50 leading-relaxed pl-4 border-l border-white/5 group-hover:border-white/20 transition-colors duration-500">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeIn delay={0.6}>
          <div className="mt-16 pt-12 border-t border-white/5 flex items-center justify-between">
            <p className="text-xs text-white/25 uppercase tracking-widest">University of Ottawa · Calsoft Pvt Ltd</p>
            <a
              href="/Tanima_Garg_RESUME.pdf"
              target="_blank"
              className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
            >
              Full Resume <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export default ExperienceSection

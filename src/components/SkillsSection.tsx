'use client'

import React from 'react'
import FadeIn from './FadeIn'

const skillGroups = [
  {
    category: 'Analytics & Programming',
    skills: ['SQL', 'Python', 'Pandas', 'NumPy', 'Excel', 'Power Query', 'Statistical Analysis', 'Trend/Anomaly Analysis'],
  },
  {
    category: 'BI & Reporting',
    skills: ['Power BI', 'Tableau', 'DAX', 'KPI Dashboards', 'Interactive Reports', 'Reporting Automation', 'Data Storytelling'],
  },
  {
    category: 'Databases & Data Platforms',
    skills: ['MySQL', 'PostgreSQL', 'BigQuery', 'SQL Views', 'ETL/ELT', 'Data Warehousing', 'Data Modeling'],
  },
  {
    category: 'Data Quality & Tools',
    skills: ['Validation Checks', 'Reconciliation', 'Git', 'Jira', 'Postman', 'REST APIs', 'AWS / Azure Basics'],
  },
  {
    category: 'Business Analytics',
    skills: ['Requirements Gathering', 'Stakeholder Reporting', 'Ad Hoc Analysis', 'Operational Reporting', 'Healthcare KPI Analytics'],
  },
]

const SkillsSection = () => (
  <section id="skills" className="relative bg-[#0C0C0C] py-32">
    <div className="section-container">
      <FadeIn y={-20}>
        <div className="mb-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 mb-6">Technical / Capabilities</p>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter">Skills & Stack.</h3>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
        {skillGroups.map((group, index) => (
          <FadeIn key={group.category} delay={0.1 * index}>
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/25">{group.category}</span>
                <div className="flex-1 h-[1px] bg-white/5" />
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-white/[0.03] border border-white/8 rounded-full text-[11px] font-bold uppercase tracking-tight text-white/40 hover:bg-white/[0.07] hover:text-white hover:border-white/20 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
)

export default SkillsSection

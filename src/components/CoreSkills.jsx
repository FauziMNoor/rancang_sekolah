import React, { useState } from 'react';
import CoreSkillModal from './Modal/CoreSkillModal';
import './CoreSkills.css';

export default function CoreSkills({ data }) {
  const { coreSkillData, skillDistribution, alumniTraitData } = data || {};
  if(!coreSkillData) return null;
  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleChartBarClick = (skillKey) => {
    const skill = coreSkillData[skillKey];
    if (skill) {
      setSelectedSkill(skill);
    }
  };

  return (
    <div className="core-skills-section">
      {/* Skill Chips */}
      <div className="skills-grid">
        {skillDistribution.map((skill) => (
          <div
            key={skill.key}
            className="skill-chip"
            onClick={() => handleChartBarClick(skill.key)}
            style={{ cursor: 'pointer' }}
          >
            <div className="skill-num">{skill.percentage}%</div>
            <div>
              <div className="skill-label">{skill.label}</div>
              <div className="skill-sub">{coreSkillData[skill.key].subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Distribution Chart */}
      <div className="skills-distribution">
        <div className="chart-container">
          {skillDistribution.map((skill) => (
            <div key={skill.key} className="chart-item">
              <div className="chart-label">{skill.label}</div>
              <div className="chart-bar-wrapper">
                <div
                  className="chart-bar"
                  style={{
                    width: `${skill.percentage}%`,
                    background: skill.color,
                    cursor: 'pointer'
                  }}
                  onClick={() => handleChartBarClick(skill.key)}
                  title={`Click to view ${skill.label} details`}
                >
                  <span className="chart-value">{skill.percentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Insights — dinamis dari coreSkillData */}
        <div className="chart-insights">
          {skillDistribution.map((skill) => {
            const data = coreSkillData[skill.key];
            return (
              <div className="insight-card" key={skill.key}>
                <div className="insight-icon">{data.icon}</div>
                <div className="insight-text">
                  <strong>{data.title}</strong>
                  <p>{skill.percentage}% — {data.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alumni Profile */}
      <div className="alumni-box">
        <h3>🎓 Profil Lengkap Alumni HSIBS</h3>
        <div className="alumni-traits">
          {Object.entries(alumniTraitData).map(([key, trait]) => (
            <div
              key={key}
              className="alumni-trait"
              onClick={() => setSelectedSkill(trait)}
            >
              {trait.icon} {trait.title}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedSkill && (
        <CoreSkillModal
          data={selectedSkill}
          onClose={() => setSelectedSkill(null)}
        />
      )}
    </div>
  );
}



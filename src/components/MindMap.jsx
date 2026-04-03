import React, { useState } from 'react';
import SyllabusModal from './SyllabusModal';
import './MindMap.css';

export default function MindMap({ data }) {
  const { mindmapData, syllabusData } = data || {};
  const allSyllabusData = syllabusData ? syllabusData.allSyllabusData : null;
  if(!mindmapData) return null;
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);
  return (
    <div className="mindmap-section">
      {/* Central Node */}
      <div className="mindmap-container">
        <div className="central-node">
          <div className="icon">{mindmapData.central.icon}</div>
          <div className="label">{mindmapData.central.label}</div>
          <div className="sub">{mindmapData.central.sub}</div>
        </div>
      </div>

      {/* 4 Pilar Keunggulan */}
      <div className="section-title">
        <h2>4 Pilar Keunggulan</h2>
        <p>Identitas utama yang membedakan HSIBS dari institusi lain</p>
      </div>
      <div className="pillars">
        {mindmapData.pillars.map((pillar, idx) => (
          <div key={idx} className="pillar">
            <div className="pillar-icon">{pillar.icon}</div>
            <div className="pillar-title">{pillar.title}</div>
            <div className="pillar-desc">{pillar.desc}</div>
          </div>
        ))}
      </div>

      {/* Branches: Arsitektur Kurikulum */}
      <div className="section-title">
        <h2>Arsitektur Kurikulum</h2>
        <p>6 dimensi pembelajaran yang berevolusi setiap tahun</p>
      </div>
      <div className="branches">
        {mindmapData.branches.map((branch, idx) => (
          <div
            key={idx}
            className={`branch-card branch-${branch.color}`}
            onClick={() => setSelectedSyllabus(allSyllabusData[branch.key])}
            style={{ cursor: 'pointer' }}
          >
            <div className="branch-header">
              <div className="branch-icon">{branch.icon}</div>
              <div className="branch-title">{branch.title}</div>
            </div>
            <ul className="branch-items">
              {branch.items.map((item, itemIdx) => (
                <li key={itemIdx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedSyllabus && (
        <SyllabusModal data={selectedSyllabus} onClose={() => setSelectedSyllabus(null)} />
      )}
    </div>
  );
}



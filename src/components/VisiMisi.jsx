import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './VisiMisi.css';

function VisiPillarModal({ pillar, onClose }) {
  return ReactDOM.createPortal(
    <>
      <div className="visi-overlay" onClick={onClose} />
      <div className="visi-modal">
        <div className="visi-modal-header" style={{ borderTopColor: pillar.color }}>
          <div className="visi-modal-icon">{pillar.icon}</div>
          <div>
            <h3 style={{ color: pillar.color }}>{pillar.title}</h3>
            <p>{pillar.description}</p>
          </div>
          <button className="visi-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="visi-modal-body">
          <div className="visi-modal-label">📚 Program Pembelajaran Pendukung</div>
          <div className="visi-programs-grid">
            {pillar.programs.map((prog, i) => (
              <div key={i} className="visi-program-item">
                <div className="visi-program-name" style={{ color: pillar.color }}>{prog.label}</div>
                <div className="visi-program-detail">{prog.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

export default function VisiMisi({ data }) {
  const { visiMisiData } = data || {};
  if(!visiMisiData) return null;
  const [selectedPillar, setSelectedPillar] = useState(null);
  return (
    <div className="visi-misi-section">
      {/* Visi Section */}
      <div className="visi-container">
        <h3 className="visi-title">🧭 Visi</h3>
        <blockquote className="visi-statement">
          "{visiMisiData.visi.statement}"
        </blockquote>

        {/* Visi Pillars */}
        <div className="visi-pillars">
          {visiMisiData.visi.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="visi-pillar"
              onClick={() => setSelectedPillar(pillar)}
              style={{ cursor: 'pointer' }}
            >
              <div className="pillar-icon">{pillar.icon}</div>
              <h4 style={{ color: pillar.color }}>{pillar.title}</h4>
              <p>{pillar.description}</p>
              <div className="visi-pillar-hint">Lihat program →</div>
            </div>
          ))}
        </div>
      </div>

      {selectedPillar && (
        <VisiPillarModal pillar={selectedPillar} onClose={() => setSelectedPillar(null)} />
      )}

      {/* Misi & Goals Two Column Layout */}
      <div className="misi-goals-wrapper">
        {/* Misi Section */}
        <div className="misi-container">
          <div className="section-header">
            <span className="section-icon">🎯</span>
            <h3 className="section-title">Misi</h3>
          </div>
          <div className="misi-list">
            {visiMisiData.misi.map((item, idx) => (
              <div key={idx} className="misi-item">
                <div className="misi-bullet">›</div>
                <div className="misi-text">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Goals Section */}
        <div className="goals-container">
          <div className="section-header">
            <span className="section-icon">🚀</span>
            <h3 className="section-title">Tujuan Strategis (Goals)</h3>
          </div>
          <div className="goals-list">
            {visiMisiData.goals.map((goal, idx) => (
              <div key={idx} className="goal-item">
                <div className="goal-badge">{goal.icon}</div>
                <div className="goal-content">
                  <h4>{goal.timeframe}</h4>
                  <ul className="goal-targets">
                    {goal.targets.map((target, i) => (
                      <li key={i}>{target}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="quote-section">
        <div className="closing-quote-arabic">
          <div className="bayt">
            <span className="shatr">أَخِي لَنْ تَنَالَ الْعِلْمَ إِلَّا بِسِتَّةٍ</span>
            <span className="fasilah"> , </span>
            <span className="shatr">سَأُنْبِيْكَ عَنْ تَفْصِيْلِهَا بِبَيَانِ</span>
          </div>
          <div className="bayt">
            <span className="shatr">ذَكَاءٌ وَحِرْصٌ وَاجْتِهَادٌ وَبُلْغَةٌ</span>
            <span className="fasilah"> , </span>
            <span className="shatr">وَصُحْبَةُ أُسْتَاذٍ وَطُوْلُ زَمَانِ</span>
          </div>
        </div>
        <blockquote className="closing-quote">
          "Saudaraku, ilmu tidak akan kau raih kecuali dengan enam perkara — akan kuberitahukan kepadamu secara jelas: kecerdasan, semangat, kesungguhan, bekal, bimbingan guru, dan waktu yang panjang."
        </blockquote>
        <div className="closing-quote-source">— Imam Syafi'i رحمه الله</div>
      </div>
    </div>
  );
}



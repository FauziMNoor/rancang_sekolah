import React, { useState } from 'react';
import './Timeline.css';

function LoadChart({ load, title }) {
  const [activeRef, setActiveRef] = useState(null);

  if (!load || load.length === 0) return null;

  return (
    <div className="load-chart">
      <div className="load-chart-title">{title}</div>
      {load.map((item, i) => (
        <div key={i} className="load-row">
          <div className="load-label-col">{item.label}</div>
          <div
            className="load-bar-track"
            onClick={() => setActiveRef(activeRef === i ? null : i)}
            title="Klik untuk lihat referensi"
          >
            <div
              className="load-bar-fill"
              style={{ width: `${item.pct}%`, background: item.color }}
            />
            <span className="load-pct-inline">{item.pct}%</span>
          </div>

          {activeRef === i && (
            <div className="load-ref-popup" style={{ borderLeftColor: item.color }}>
              <div className="load-ref-header" style={{ color: item.color }}>
                📐 Dasar Perhitungan — {item.label}
              </div>
              <div className="load-ref-text">{item.ref}</div>
              <button className="load-ref-close" onClick={() => setActiveRef(null)}>✕ Tutup</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function GenderToggle({ active, onChange }) {
  return (
    <div className="gender-toggle">
      <button
        className={`gender-btn ikhwan ${active === 'ikhwan' ? 'active' : ''}`}
        onClick={() => onChange('ikhwan')}
      >
        Ikhwan
      </button>
      <button
        className={`gender-btn akhwat ${active === 'akhwat' ? 'active' : ''}`}
        onClick={() => onChange('akhwat')}
      >
        Akhwat
      </button>
    </div>
  );
}

export default function Timeline({ data }) {
  const { timelineData } = data || {};
  const [activeGender, setActiveGender] = useState('ikhwan');

  if (!timelineData) return null;

  return (
    <div className="timeline-section">
      {/* Global Gender Toggle */}
      <div className="gender-toggle-wrapper">
        <GenderToggle active={activeGender} onChange={setActiveGender} />
      </div>

      <div className="timeline-container">
        {timelineData.map((year, idx) => (
          <div key={idx} className="timeline-year" data-year={year.year}>
            {/* Year Badge */}
            <div className="year-badge">{year.badge}</div>

            {/* Phase Section */}
            <div className="phase-section">
              <h3 className="phase-label">{year.phase}</h3>
              <p className="phase-description">{year.description}</p>
            </div>

            {/* Semesters */}
            <div className="semesters-wrapper">
              {year.semesters.map((semester, semIdx) => (
                <div key={semIdx} className={`semester-card gender-${activeGender}`}>
                  <div className="semester-card-header">
                    <div className="semester-badge">SEMESTER {semester.sem}</div>
                    <div className="semester-gender-labels">
                      <span className={`semester-gender-label ikhwan ${activeGender === 'ikhwan' ? 'active' : ''}`}
                        onClick={() => setActiveGender('ikhwan')}
                      >Ikhwan</span>
                      <span className={`semester-gender-label akhwat ${activeGender === 'akhwat' ? 'active' : ''}`}
                        onClick={() => setActiveGender('akhwat')}
                      >Akhwat</span>
                    </div>
                  </div>
                  <h4 className="semester-title">{semester.title}</h4>
                  <ul className="semester-items">
                    {semester.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <span className="item-emoji">{item.emoji}</span>
                        <span className="item-text">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  {semester.load && (
                    <LoadChart
                      load={semester.load}
                      title="⏱️ Distribusi Beban — Klik bar untuk detail"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Output Section */}
            <div className="output-section">
              <div className="output-label">✅ Output Kelas {year.year}</div>
              <div className="output-tags">
                {year.outputs.map((output, outIdx) => (
                  <span key={outIdx} className="output-tag">{output}</span>
                ))}
              </div>
              {year.outputLoad && (
                <LoadChart
                  load={year.outputLoad}
                  title="📊 Total Beban Setahun — Klik bar untuk detail"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

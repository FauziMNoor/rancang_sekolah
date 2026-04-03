import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

export default function CoreSkillModal({ data, onClose }) {
  if (!data) return null;

  return ReactDOM.createPortal(
    <>
      <div className="syllabus-overlay" onClick={onClose} />
      <div className="syllabus-modal">
        <div className="syl-header">
          <div className="syl-header-icon" style={{ background: data.bgColor }}>
            {data.icon}
          </div>
          <div className="syl-header-text">
            <h2 style={{ color: data.color }}>{data.title}</h2>
            <p>{data.subtitle}</p>
          </div>
          <button className="syl-close" onClick={onClose}>✕</button>
        </div>
        <div className="syl-body">
          <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.9)' }}>
            {data.description}
          </p>
          <h3 style={{ marginBottom: '1rem', color: data.color, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Mata Pelajaran Pendukung:
          </h3>
          <div className="syl-grid">
            {data.subjects.map((sub, idx) => (
              <div key={idx} className="syl-item">
                <div className="syl-item-title">{sub.t}</div>
                <div className="syl-item-desc">{sub.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}



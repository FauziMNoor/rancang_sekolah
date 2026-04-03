import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './SyllabusModal.css';

export default function SyllabusModal({ data, onClose }) {
  const [activeTab, setActiveTab] = useState(data.tabs[0].key);

  if (!data) return null;

  const currentContent = data.content[activeTab];

  return ReactDOM.createPortal(
    <>
      {/* Overlay */}
      <div className="syllabus-overlay" onClick={onClose} />

      {/* Modal */}
      <div className="syllabus-modal">
        {/* Header */}
        <div className="syl-header" style={{ backgroundColor: data.bgColor }}>
          <div className="syl-header-icon" style={{ background: data.bgColor, color: data.color }}>
            {data.icon}
          </div>
          <div className="syl-header-text">
            <h2 style={{ color: data.color }}>{data.title}</h2>
            <p>{data.subtitle}</p>
          </div>
          <button className="syl-close" onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div className="syl-tabs">
          {data.tabs.map((tab) => (
            <button
              key={tab.key}
              className={`syl-tab ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
              style={{
                borderBottomColor: activeTab === tab.key ? data.color : 'transparent'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="syl-body">
          {currentContent.sections.map((section, idx) => (
            <div key={idx} className="syl-section">
              <div className="syl-section-title">{section.title}</div>
              <div className="syl-grid">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="syl-item">
                    <div className="syl-item-title">{item.t}</div>
                    <div className="syl-item-desc">{item.d}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Output */}
          {currentContent.output && (
            <div className="syl-output">
              <div className="syl-output-label">🎓 Output & Capaian</div>
              <div className="syl-output-tags">
                {currentContent.output.map((output, idx) => (
                  <span key={idx} className="syl-output-tag">{output}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>,
    document.body
  );
}



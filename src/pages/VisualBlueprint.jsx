import React, { useState, useRef, useEffect } from 'react';
import CoreSkills from '../components/CoreSkills';
import VisiMisi from '../components/VisiMisi';
import Timeline from '../components/Timeline';
import MindMap from '../components/MindMap';
import Slogan from '../components/Slogan';
import { getYearData } from '../data';
import '../styles/VisualBlueprint.css';

const TABS = ['visi-misi', 'mindmap', 'core-skills', 'timeline', 'slogan'];
const YEARS = ['2025/2026', '2026/2027', '2027/2028'];

export default function VisualBlueprint() {
  const [activeTab, setActiveTab] = useState('slogan');
  const [activeYear, setActiveYear] = useState('2026/2027');
  const dragStartX = useRef(null);

  const activeData = getYearData(activeYear);

  const goToTab = (tab) => setActiveTab(tab);

  const navigate = (direction) => {
    setActiveTab(prev => {
      const i = TABS.indexOf(prev);
      if (direction === 'next' && i < TABS.length - 1) return TABS[i + 1];
      if (direction === 'prev' && i > 0) return TABS[i - 1];
      return prev;
    });
  };

  // Mouse drag on window so mouseup always fires
  useEffect(() => {
    const onMouseUp = (e) => {
      if (dragStartX.current === null) return;
      const diff = dragStartX.current - e.clientX;
      if (Math.abs(diff) >= 80) {
        diff > 0 ? navigate('next') : navigate('prev');
      }
      dragStartX.current = null;
    };
    window.addEventListener('mouseup', onMouseUp);
    return () => window.removeEventListener('mouseup', onMouseUp);
  }, []);

  // Touch
  const handleTouchStart = (e) => { dragStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (dragStartX.current === null) return;
    const diff = dragStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) >= 80) diff > 0 ? navigate('next') : navigate('prev');
    dragStartX.current = null;
  };

  // Mouse
  const handleMouseDown = (e) => { dragStartX.current = e.clientX; };

  return (
    <div className="visual-blueprint">
      {/* Ambient Background */}
      <div className="ambient">
        <div className="ambient-orb"></div>
        <div className="ambient-orb"></div>
        <div className="ambient-orb"></div>
        <div className="ambient-orb"></div>
      </div>

      {/* Primary Navigation (Years) */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-brand">HSI BOARDING SCHOOL</div>
          <div className="nav-tabs">
            {YEARS.map(year => (
              <button 
                key={year}
                className={`nav-tab ${activeYear === year ? 'active' : ''}`} 
                onClick={() => setActiveYear(year)}
              >
                Kurikulum {year}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Secondary Navigation (Sections) */}
      <div className="secondary-nav">
        <div className="nav-tabs centered-tabs">
          <button className={`nav-tab ${activeTab === 'visi-misi' ? 'active' : ''}`} onClick={() => goToTab('visi-misi')}>Visi & Misi</button>
          <button className={`nav-tab ${activeTab === 'mindmap' ? 'active' : ''}`} onClick={() => goToTab('mindmap')}>Mind Map</button>
          <button className={`nav-tab ${activeTab === 'core-skills' ? 'active' : ''}`} onClick={() => goToTab('core-skills')}>Core Skills</button>
          <button className={`nav-tab ${activeTab === 'timeline' ? 'active' : ''}`} onClick={() => goToTab('timeline')}>Timeline</button>
          <button className={`nav-tab ${activeTab === 'slogan' ? 'active' : ''}`} onClick={() => goToTab('slogan')}>Slogan</button>
        </div>
      </div>

      {/* Main Container — swipeable on touch */}
      <div
        className="container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Hero Section — hidden on slogan tab */}
        {activeTab !== 'slogan' && (
          <div className="hero">
            <div className="hero-badge">🏫 VISUAL BLUEPRINT {activeYear}</div>
            <h1>HSI Boarding School</h1>
            <div className="hero-arabic">بسم الله الرحمن الرحيم</div>
            <p>Peta visual kurikulum 3 tahun — Terwujudnya Generasi Bertauhid, Berakhlaq Qurani, serta Berdaya Saing Global.</p>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'mindmap' && (
          <div className="view-section active">
            <div className="section-title"><h2>Peta Jalan Pembelajaran</h2><p>Struktur holistik HSI Boarding School</p></div>
            <MindMap data={activeData} />
          </div>
        )}
        {activeTab === 'core-skills' && (
          <div className="view-section active">
            <div className="section-title"><h2>4 Pilar Kompetensi</h2><p>Distribusi kurikulum yang fokus dan terukur</p></div>
            <CoreSkills data={activeData} />
          </div>
        )}
        {activeTab === 'slogan' && (
          <div className="view-section active">
            <Slogan data={activeData} />
          </div>
        )}
        {activeTab === 'visi-misi' && (
          <div className="view-section active">
            <div className="section-title"><h2>Filosofi Inti</h2><p>Arah dan tujuan utama HSI Boarding School</p></div>
            <VisiMisi data={activeData} />
          </div>
        )}
        {activeTab === 'timeline' && (
          <div className="view-section active">
            <div className="section-title"><h2>Perjalanan 3 Tahun</h2><p>Dari nol menuju alumni yang siap memimpin</p></div>
            <Timeline data={activeData} />
          </div>
        )}

        {/* Swipe indicator dots */}
        <div className="swipe-dots">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`swipe-dot ${activeTab === tab ? 'active' : ''}`}
              onClick={() => goToTab(tab)}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 HSI Boarding School. Semua hak dilindungi.</p>
      </footer>
    </div>
  );
}



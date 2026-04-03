import React from 'react';
import './Slogan.css';

export default function Slogan({ data }) {
  return (
    <div className="slogan-section">

      {/* Session 1 — Slogan */}
      <div className="slogan-hero">
        <div className="slogan-label">✦ Slogan HSI Boarding School ✦</div>
        <div className="slogan-words">
          <div className="slogan-line1">
            <span className="slogan-word word-school">HSI Boarding School</span>
          </div>
          <div className="slogan-line2">
            <span className="slogan-word word-tagline">Sekolahnya Generasi Unggul</span>
          </div>
        </div>
      </div>

      {/* Session 2 — Penjelasan */}
      <div className="slogan-explanation single">
        <div className="slogan-card single-card">
          <div className="slogan-card-desc single-desc">
            <p>
              <em>Generasi Unggul</em> bukan sekadar pintar atau berprestasi.
              Di HSI Boarding School, unggul berarti <em>utuh</em> — aqidahnya lurus bermanhaj Salaf,
              hafalannya mutqin 6-9 Juz, akhlaqnya terbentuk dari 50 Hadits Arba'in yang diamalkan setiap hari,
              bahasanya fasih Arab dan Inggris, dan tangannya mampu membangun teknologi nyata
              hingga Marketplace Islami yang live di internet.
            </p>
            <p>
              Tiga tahun. Satu tujuan. Satu generasi yang siap memimpin dunia
              tanpa meninggalkan akhirat.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}



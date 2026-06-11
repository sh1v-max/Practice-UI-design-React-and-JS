import { useState, useCallback } from 'react';
import { useContrastState } from '../hooks/useContrastState';
import { usePalettes } from '../hooks/usePalettes';
import { useUrlSync } from '../hooks/useUrlSync';
import ColorSelector from './contrast/ColorSelector';
import ContrastRatioCard from './contrast/ContrastRatioCard';
import WCAGResultsCard from './contrast/WCAGResultsCard';
import AutoFixSuggestions from './contrast/AutoFixSuggestions';
import LivePreview from './contrast/LivePreview';
import ColorBlindnessSimulator from './contrast/ColorBlindnessSimulator';
import SavedPalettes from './contrast/SavedPalettes';
import ColorFormatConverter from './contrast/ColorFormatConverter';
import DeveloperOutput from './contrast/DeveloperOutput';

export default function ContrastCheckerApp() {
  const {
    fgHex, bgHex, setFgHex, setBgHex,
    fgRgb, bgRgb,
    ratio, wcag, quality, meterColor,
    suggestions, tailwindClasses,
    activeBlindType, setActiveBlindType,
    swapColors,
  } = useContrastState();

  const { palettes, savePalette, deletePalette } = usePalettes();
  useUrlSync(fgHex, bgHex);

  const [toast, setToast] = useState('');
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  }, []);

  const handleLoadPalette = useCallback((id: string) => {
    const palette = palettes.find((p) => p.id === id);
    if (!palette) return;
    setFgHex(palette.fg);
    setBgHex(palette.bg);
  }, [palettes, setFgHex, setBgHex]);

  const handleSavePalette = useCallback(() => {
    savePalette(fgHex, bgHex);
    showToast('Palette saved');
  }, [fgHex, bgHex, savePalette, showToast]);

  const handleCopy = useCallback(() => {
    showToast('Copied to clipboard!');
  }, [showToast]);

  return (
    <section
      id="checker"
      style={{ padding: '48px 24px', maxWidth: '1200px', margin: '0 auto' }}
    >
      {/* Section heading */}
      <div style={{ marginBottom: '32px' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--color-ink)',
            marginBottom: '6px',
          }}
        >
          Contrast Checker
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-mute)' }}>
          Pick your foreground and background colors to check WCAG 2.2 compliance.
        </p>
      </div>

      {/* Main 2-column grid */}
      <div className="checker-grid">
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ColorSelector label="Foreground" color={fgHex} onChange={setFgHex} />

          {/* Swap button */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={swapColors}
              aria-label="Swap foreground and background colors"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 16px',
                borderRadius: '8px',
                border: '1px solid var(--color-hairline)',
                background: 'var(--color-canvas-soft)',
                color: 'var(--color-mute)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-canvas-soft-2)';
                e.currentTarget.style.color = 'var(--color-ink)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-canvas-soft)';
                e.currentTarget.style.color = 'var(--color-mute)';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 16V4m0 0L3 8m4-4 4 4" />
                <path d="M17 8v12m0 0 4-4m-4 4-4-4" />
              </svg>
              Swap colors
            </button>
          </div>

          <ColorSelector label="Background" color={bgHex} onChange={setBgHex} />
          <ContrastRatioCard ratio={ratio} quality={quality} meterColor={meterColor} />
          <WCAGResultsCard wcag={wcag} />
          <AutoFixSuggestions suggestions={suggestions} onApply={setFgHex} />
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <LivePreview fgHex={fgHex} bgHex={bgHex} />
          <ColorBlindnessSimulator
            fgRgb={fgRgb}
            bgRgb={bgRgb}
            activeBlindType={activeBlindType}
            onChangeBlindType={setActiveBlindType}
          />
          <SavedPalettes
            palettes={palettes}
            onSave={handleSavePalette}
            onLoad={handleLoadPalette}
            onDelete={deletePalette}
          />
        </div>
      </div>

      {/* Bottom full-width row */}
      <div className="checker-bottom" style={{ marginTop: '24px' }}>
        <ColorFormatConverter fgRgb={fgRgb} onCopy={handleCopy} />
        <DeveloperOutput
          fgRgb={fgRgb}
          bgRgb={bgRgb}
          tailwindClasses={tailwindClasses}
          onCopy={handleCopy}
        />
      </div>

      {/* Toast notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 20px',
            borderRadius: '8px',
            background: 'var(--color-ink)',
            color: 'var(--color-canvas)',
            fontSize: '0.875rem',
            fontWeight: 600,
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            zIndex: 9999,
            pointerEvents: 'none',
            animation: 'fadeInUp 0.2s ease',
          }}
        >
          {toast}
        </div>
      )}
    </section>
  );
}

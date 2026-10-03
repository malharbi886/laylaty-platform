* {
  box-sizing: border-box;
}

:root {
  --bg: #f7f2ee;
  --panel: #fffdfc;
  --panel-soft: #f5ece6;
  --primary: #3a1030;
  --primary-2: #5c1f42;
  --gold: #c9a227;
  --gold-soft: rgba(201, 162, 39, 0.18);
  --muted: #6a5868;
  --text: #2b1830;
  --shadow: 0 18px 50px rgba(58, 16, 48, 0.12);
  --border: rgba(58, 16, 48, 0.08);
}

html, body {
  margin: 0;
  min-height: 100%;
  background: var(--bg);
  color: var(--text);
  font-family: "Cairo", "Tahoma", sans-serif;
}

body {
  min-height: 100vh;
}

button {
  font: inherit;
}

#app {
  min-height: 100vh;
}

.app-shell {
  min-height: 100vh;
  background: linear-gradient(180deg, #f7f2ee 0%, #f4ece7 100%);
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 12px;
  height: 62px;
  padding: 0 18px;
  background: linear-gradient(135deg, var(--primary), var(--primary-2));
  border-bottom: 2px solid var(--gold);
  box-shadow: 0 6px 24px rgba(58, 16, 48, 0.12);
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.brand-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: var(--gold);
  color: var(--primary);
  font-size: 1.25rem;
  font-weight: 900;
}

.brand span {
  color: #fff;
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.page-switch {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  max-width: 360px;
  padding: 8px 12px;
  border: 1px solid rgba(201, 162, 39, 0.7);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  cursor: pointer;
  transition: 0.2s ease;
}

.page-switch:hover {
  background: rgba(255, 255, 255, 0.15);
}

.page-switch__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 8px;
  background: rgba(201, 162, 39, 0.16);
  color: var(--gold);
}

.page-switch__label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.8rem;
  font-weight: 700;
}

.page-switch__chevron {
  margin-right: auto;
  font-size: 0.9rem;
  color: var(--gold);
}

.counter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 9px;
  background: var(--gold);
  color: var(--primary);
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 800;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-right: auto;
}

.btn, .icon-btn, .inline-button, .service-row button {
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  padding: 0 14px;
  font-size: 0.76rem;
  font-weight: 800;
}

.btn-primary {
  background: var(--gold);
  color: var(--primary);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.08);
  color: #f7efe8;
  border: 1px solid rgba(201, 162, 39, 0.5);
}

.icon-btn {
  width: 34px;
  height: 34px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(201, 162, 39, 0.45);
  color: var(--gold);
  font-size: 1rem;
}

.menu-panel {
  position: absolute;
  top: 68px;
  right: 18px;
  z-index: 40;
  width: min(320px, calc(100vw - 36px));
  max-height: calc(100vh - 90px);
  overflow-y: auto;
  display: none;
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: var(--shadow);
}

.menu-panel.is-open {
  display: block;
}

.menu-group + .menu-group {
  margin-top: 8px;
}

.menu-group__label {
  padding: 8px 10px 6px;
  color: #8f6a28;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.menu-item {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
  padding: 10px 12px;
  border: none;
  border-radius: 12px;
  background: transparent;
  color: var(--text);
  font-weight: 700;
  cursor: pointer;
  text-align: right;
}

.menu-item:hover {
  background: rgba(138, 47, 94, 0.05);
}

.menu-item.is-active {
  background: rgba(201, 162, 39, 0.15);
}

.menu-item__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 9px;
  background: var(--panel-soft);
  font-size: 1rem;
}

.menu-item__label {
  flex: 1;
}

.menu-item__index {
  min-width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #f1ece7;
  color: var(--muted);
  border-radius: 8px;
  font-size: 0.68rem;
  font-weight: 800;
}

.workspace {
  max-width: 1360px;
  margin: 0 auto;
  padding: 22px 18px 36px;
}

.hero-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 24px 26px;
  border: 1px solid var(--border);
  border-radius: 22px;
  background: linear-gradient(135deg, rgba(58, 16, 48, 0.96), rgba(110, 26, 76, 0.92));
  color: #fff;
  box-shadow: var(--shadow);
}

.eyebrow {
  display: inline-flex;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(201, 162, 39, 0.12);
  color: #f3d375;
  font-size: 0.72rem;
  font-weight: 800;
}

.hero-panel h1 {
  margin: 12px 0 8px;
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  line-height: 1.2;
}

.hero-panel p {
  margin: 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.92rem;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 130px;
  padding: 12px 18px;
  border-radius: 999px;
  background: rgba(201, 162, 39, 0.18);
  border: 1px solid rgba(201, 162, 39, 0.55);
  color: var(--gold);
  font-size: 0.8rem;
  font-weight: 800;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 22px;
}

.metric-card {
  padding: 18px 18px 16px;
  border: 1px solid var(--border);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 6px 18px rgba(58, 16, 48, 0.04);
}

.metric-card__label {
  color: var(--muted);
  font-size: 0.72rem;
  font-weight: 700;
}

.metric-card__value {
  margin-top: 12px;
  font-size: clamp(1.4rem, 2vw, 2rem);
  font-weight: 900;
  color: var(--primary);
}

.metric-card__trend {
  margin-top: 8px;
  color: #268e59;
  font-size: 0.72rem;
  font-weight: 800;
}

.content-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 18px;
  margin-top: 22px;
}

.panel {
  padding: 18px;
  border: 1px solid var(--border);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 6px 18px rgba(58, 16, 48, 0.04);
}

.panel-large {
  grid-row: span 2;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.panel-header h2 {
  margin: 0;
  font-size: 1.1rem;
}

.inline-button {
  padding: 7px 12px;
  background: #f5efe9;
  color: var(--primary);
  font-size: 0.72rem;
  font-weight: 800;
}

.timeline {
  display: grid;
  gap: 18px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(58, 16, 48, 0.06);
}

.timeline-item:last-child {
  border-bottom: none;
}

.timeline-dot {
  width: 10px;
  height: 10px;
  margin-top: 7px;
  border-radius: 50%;
  background: var(--gold);
  box-shadow: 0 0 0 4px rgba(201, 162, 39, 0.15);
}

.timeline-item strong {
  display: block;
  margin-bottom: 5px;
  font-size: 0.96rem;
}

.timeline-item small {
  color: var(--muted);
  font-size: 0.7rem;
}

.service-list {
  display: grid;
  gap: 12px;
}

.service-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid rgba(58, 16, 48, 0.05);
  border-radius: 12px;
  background: #fdf9f7;
}

.service-row strong {
  display: block;
  font-size: 0.9rem;
}

.service-row span {
  display: block;
  color: var(--muted);
  font-size: 0.7rem;
}

.service-row button {
  padding: 8px 12px;
  background: var(--gold-soft);
  color: var(--primary);
  font-size: 0.7rem;
  font-weight: 800;
}

.notes-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 12px;
}

.notes-list li {
  position: relative;
  padding: 12px 14px 12px 18px;
  border-radius: 12px;
  background: #f9f4ef;
  color: var(--text);
  font-size: 0.82rem;
  line-height: 1.6;
}

.notes-list li::before {
  content: "";
  position: absolute;
  right: 10px;
  top: 18px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--gold);
}

@media (max-width: 980px) {
  .metrics-grid { grid-template-columns: repeat(2, minmax(160px, 1fr)); }
  .content-grid { grid-template-columns: 1fr; }
  .panel-large { grid-row: auto; }
}

@media (max-width: 700px) {
  .brand span { display: none; }
  .counter { display: none; }
  .topbar { gap: 8px; }
  .page-switch { max-width: 210px; }
  .topbar-actions { gap: 6px; }
  .btn.btn-secondary span, .btn.btn-primary span { display: none; }
  .btn { min-width: 34px; padding: 0 10px; }
}

@media (max-width: 560px) {
  .workspace { padding: 16px 12px 28px; }
  .hero-panel { flex-direction: column; align-items: flex-start; }
  .page-switch__label { max-width: 150px; }
  .metrics-grid { grid-template-columns: 1fr; }
}

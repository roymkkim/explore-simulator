// panel.jsx — The control panel on the left

const TAB_DESCRIPTIONS = {
  'Now':    'A live pulse of the market — top movers, high-volatility names, earnings, trending lists, and news. Refreshes throughout the day.',
  'Macro':  'Big-picture economic view — indexes, commodities, rates, currencies, and macro drivers.',
  'RWAs':   'Real-world assets — tokenized stocks today; treasuries, real estate, and commodities to come.',
  'Crypto': 'Crypto-native discovery — trending tokens, chains, movers, sectors, and on-chain activity.',
  'Sports': 'Prediction markets and event contracts across leagues and games.',
  'Sites':  'Curated apps and sites across the ecosystem — DeFi, games, social, tools.',
};

function Toggle({ on, onChange }) {
  return (
    <button
      type="button"
      className={`toggle ${on ? 'on' : ''}`}
      aria-pressed={on}
      onClick={() => onChange(!on)}
    />
  );
}

// Stacked row: label on top, control below (full width)
function Row({ label, hint, children }) {
  return (
    <div className="row">
      <div className="row-label-wrap">
        <div className="row-label">{label}</div>
        {hint && <div className="row-hint">{hint}</div>}
      </div>
      {children}
    </div>
  );
}

// Inline row: label on the left, control on the right (used for toggles)
function InlineRow({ label, hint, children }) {
  return (
    <div className="row row-inline">
      <div className="row-label-wrap">
        <div className="row-label">{label}</div>
        {hint && <div className="row-hint">{hint}</div>}
      </div>
      {children}
    </div>
  );
}

function Segmented({ value, options, onChange }) {
  return (
    <div className="seg">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          className={`seg-btn ${value === o.value ? 'active' : ''}`}
          onClick={() => onChange(o.value)}
        >{o.label}</button>
      ))}
    </div>
  );
}

function Chips({ value, options, onChange }) {
  return (
    <div className="chips">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          className={`chip ${value === o.value ? 'active' : ''}`}
          onClick={() => onChange(o.value)}
        >{o.label}</button>
      ))}
    </div>
  );
}

function Section({ title, right, children, collapsible, defaultCollapsed = false }) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
  const toggle = () => collapsible && setCollapsed((c) => !c);
  return (
    <div className="section">
      {title && (
        <div
          className="section-title"
          onClick={toggle}
          style={collapsible ? { cursor: 'pointer', userSelect: 'none' } : undefined}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {collapsible && (
              <span style={{
                display: 'inline-block',
                transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
                transition: 'transform 150ms ease',
                fontSize: 10,
                color: 'var(--color-text-alternative)',
              }}>▼</span>
            )}
            {title}
          </span>
          {right}
        </div>
      )}
      {!collapsed && children}
    </div>
  );
}

// Compact icon segmented control — shows icon only, label in tooltip
function IconSeg({ value, options, onChange }) {
  return (
    <div className="seg seg-icon">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          title={o.label}
          className={`seg-btn seg-btn-icon ${value === o.value ? 'active' : ''}`}
          onClick={() => onChange(o.value)}
          aria-label={o.label}
        >
          <span style={{ fontSize: 14, lineHeight: 1 }}>{o.icon}</span>
        </button>
      ))}
    </div>
  );
}

function Panel({ state, setState, reset, setTabFlag, setExperiment }) {
  const activeTab = state.activeTab;
  const sections = TAB_SECTIONS[activeTab] || [];
  const experiments = (TAB_EXPERIMENTS && TAB_EXPERIMENTS[activeTab]) || [];
  const globalExperiments = (TAB_EXPERIMENTS && TAB_EXPERIMENTS.Global) || [];
  const activeFlags = state.tabFlags?.[activeTab] || {};
  const activeExp = state.experiments?.[activeTab] || {};
  const globalExp = state.experiments?.Global || {};
  const onCount = sections.filter(([k]) => activeFlags[k] !== false).length;

  // Tabs visible depend on Traders experiment
  const version = state.version === 'prod' ? 'prod' : 'next';
  const tradersOn = globalExp.tradersTab === true;
  const visibleTabs = TABS.filter((t) => {
    if (t === 'Traders') return version !== 'prod' && tradersOn;
    if (t === 'Sports' && version === 'prod') return false;
    return true;
  });

  // If user turns Traders off while on the Traders tab, bounce back to Now
  React.useEffect(() => {
    if (activeTab === 'Traders' && !tradersOn) setState({ activeTab: 'Now' });
  }, [tradersOn, activeTab]);

  // Bulk toggle helpers for the active tab
  const allOn  = () => sections.forEach(([k]) => setTabFlag(activeTab, k, true));
  const allOff = () => sections.forEach(([k]) => setTabFlag(activeTab, k, false));

  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-title">Explore Simulator</div>
        <div className="panel-sub">MetaMask · 393 × 852</div>
      </div>

      <div className="panel-body panel-scroll">

        <Section title="Version">
          <Segmented
            value={version}
            onChange={(v) => setState({ version: v })}
            options={[
              { value: 'prod', label: 'V1' },
              { value: 'next', label: 'V2' },
            ]}
          />
          <div className="tab-description">
            <b>{({ next: 'V2.', prod: 'V1.' })[version]}</b>{' '}
            {({
              next: 'Fully explored vision — every section, experiment, and differentiating feature.',
              prod: 'Shipped Explore — sliding underline tabs, search + badge, movers, perps, footer nav.',
            })[version]}
          </div>
        </Section>

        <Section title="Active tab">
          <Chips
            value={state.activeTab}
            onChange={(v) => setState({ activeTab: v })}
            options={visibleTabs.map((t) => ({ value: t, label: t }))}
          />
          <div className="tab-description">
            <b>{activeTab}.</b> {TAB_DESCRIPTIONS[activeTab] || 'No description yet.'}
          </div>
        </Section>

        {version === 'next' && (
        <Section
          title={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 13 }}>🧪</span>
            Differentiating features
          </span>}
          right={experiments.length > 0 && (
            <span className="section-title-count">
              {experiments.filter((e) => {
                const [k, , , type = 'bool'] = e;
                return type === 'bool' && activeExp[k] === true;
              }).length}/{experiments.filter((e) => (e[3] || 'bool') === 'bool').length}
            </span>
          )}
        >
          {/* Global experiments — visible on every tab */}
          {globalExperiments.length > 0 && (
            <>
              <div style={{
                fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em',
                color: 'var(--color-text-alternative)', fontWeight: 600,
                padding: '4px 0 2px',
              }}>Global</div>
              {globalExperiments.map((entry) => {
                const [k, label, hint, type = 'bool', def, options] = entry;
                const value = (k in globalExp) ? globalExp[k] : def;
                if (type === 'choice') {
                  return (
                    <InlineRow key={`g-${k}`} label={label} hint={hint}>
                      <Segmented
                        value={value}
                        options={options || []}
                        onChange={(v) => setExperiment('Global', k, v)}
                      />
                    </InlineRow>
                  );
                }
                return (
                  <InlineRow key={`g-${k}`} label={label} hint={hint}>
                    <Toggle
                      on={value === true}
                      onChange={(v) => setExperiment('Global', k, v)}
                    />
                  </InlineRow>
                );
              })}
              <div style={{
                fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em',
                color: 'var(--color-text-alternative)', fontWeight: 600,
                padding: '10px 0 2px',
              }}>{activeTab}</div>
            </>
          )}
          {experiments.length === 0 ? (
            <div style={{
              fontSize: 12, color: 'var(--color-text-alternative)',
              lineHeight: '18px',
            }}>
              No experiments defined yet for <b style={{ color: 'var(--color-text-default)' }}>{activeTab}</b>.
            </div>
          ) : (
            experiments.map((entry) => {
              const [k, label, hint, type = 'bool', def, options] = entry;
              const value = (k in activeExp) ? activeExp[k] : def;
              // Gate tradeCtaStyle visibility on tradeCta being on
              if (k === 'tradeCtaStyle' && activeExp.tradeCta !== true) return null;
              if (type === 'choice') {
                return (
                  <InlineRow key={k} label={label} hint={hint}>
                    <Segmented
                      value={value}
                      options={options || []}
                      onChange={(v) => setExperiment(activeTab, k, v)}
                    />
                  </InlineRow>
                );
              }
              return (
                <InlineRow key={k} label={label} hint={hint}>
                  <Toggle
                    on={value === true}
                    onChange={(v) => setExperiment(activeTab, k, v)}
                  />
                </InlineRow>
              );
            })
          )}
        </Section>
        )}

        {version === 'next' && (
        <Section
          title={`${activeTab} sections`}
          right={sections.length > 0 && (
            <span className="section-title-count">{onCount}/{sections.length}</span>
          )}
        >
          {sections.length === 0 ? (
            <div style={{
              fontSize: 12, color: 'var(--color-text-alternative)',
              lineHeight: '18px',
            }}>
              No sections defined yet for <b style={{ color: 'var(--color-text-default)' }}>{activeTab}</b>.
              Share mocks and I’ll wire them up.
            </div>
          ) : (
            <>
              {sections.map(([k, label, hint]) => (
                <InlineRow key={k} label={label} hint={hint}>
                  <Toggle
                    on={activeFlags[k] !== false}
                    onChange={(v) => setTabFlag(activeTab, k, v)}
                  />
                </InlineRow>
              ))}
              <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}>
                <button className="btn-ghost" style={{ padding: '6px 10px', fontSize: 11 }} onClick={allOn}>All on</button>
                <button className="btn-ghost" style={{ padding: '6px 10px', fontSize: 11 }} onClick={allOff}>All off</button>
              </div>
            </>
          )}
        </Section>
        )}

        {/* Appearance — compact, collapsible */}
        <Section title="Appearance" collapsible defaultCollapsed={true}>
          <InlineRow label="Theme">
            <IconSeg
              value={state.theme}
              onChange={(v) => setState({ theme: v })}
              options={[
                { value: 'light', label: 'Light', icon: '☀' },
                { value: 'dark',  label: 'Dark',  icon: '☾' },
              ]}
            />
          </InlineRow>
          <InlineRow label="Device chrome">
            <Toggle on={state.showChrome} onChange={(v) => setState({ showChrome: v })} />
          </InlineRow>
          <InlineRow label="Pill style">
            <IconSeg
              value={state.pillStyle}
              onChange={(v) => setState({ pillStyle: v })}
              options={[
                { value: 'filled',  label: 'Filled',  icon: '●' },
                { value: 'outline', label: 'Outline', icon: '○' },
              ]}
            />
          </InlineRow>
          <InlineRow label="Card style">
            <IconSeg
              value={state.cardStyle}
              onChange={(v) => setState({ cardStyle: v })}
              options={[
                { value: 'filled',  label: 'Filled',  icon: '●' },
                { value: 'outline', label: 'Outline', icon: '○' },
              ]}
            />
          </InlineRow>
        </Section>

        {/* Screen state — compact, collapsible */}
        <Section title="Screen state" collapsible defaultCollapsed={true}>
          <IconSeg
            value={state.contentState}
            onChange={(v) => setState({ contentState: v })}
            options={[
              { value: 'loaded',  label: 'Loaded',  icon: '◉' },
              { value: 'loading', label: 'Loading', icon: '◌' },
              { value: 'empty',   label: 'Empty',   icon: '○' },
              { value: 'error',   label: 'Error',   icon: '!' },
            ]}
          />
        </Section>

        {/* Global chrome — compact, collapsible */}
        <Section title="Global chrome" collapsible defaultCollapsed={true}>
          <InlineRow label="Search bar">
            <Toggle on={state.showSearch} onChange={(v) => setState({ showSearch: v })} />
          </InlineRow>
          <InlineRow label="Category tabs">
            <Toggle on={state.showTabs} onChange={(v) => setState({ showTabs: v })} />
          </InlineRow>
        </Section>

        <Section title="Copy variant" collapsible defaultCollapsed={true}>
          <Chips
            value={state.copyVariant}
            onChange={(v) => setState({ copyVariant: v })}
            options={[
              { value: 'default', label: 'Default' },
              { value: 'plainspoken', label: 'Plain-spoken' },
              { value: 'pro', label: 'Pro' },
            ]}
          />
        </Section>

        <Section title="Market data" collapsible defaultCollapsed={true}>
          <Chips
            value={state.dataVariant}
            onChange={(v) => setState({ dataVariant: v })}
            options={[
              { value: 'default', label: 'Mixed' },
              { value: 'greenday', label: 'Green day' },
              { value: 'redday', label: 'Red day' },
            ]}
          />
        </Section>

      </div>

      <div className="panel-footer">
        <button className="btn-ghost" onClick={reset}>Reset all</button>
      </div>
    </div>
  );
}

Object.assign(window, { Panel });

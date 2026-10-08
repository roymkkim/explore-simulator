// app.jsx — root

if (new URLSearchParams(location.search).get('embed') === '1') {
  document.documentElement.classList.add('embed');
}

function StageTabs({ value, onChange }) {
  const tabs = [
    { value: 'ui',         label: 'UI',         hint: 'Full simulator' },
    { value: 'components', label: 'Components', hint: 'Primitives grid' },
  ];
  const links = [
    { label: 'Concepts', href: 'https://mm-read-github-mobile-codebase-zm4a.vercel.app/' },
    { label: 'Miro',     href: 'https://miro.com/app/board/uXjVHfXNDi8=/' },
  ];
  return (
    <div className="stage-tabs" role="tablist" aria-label="Stage view">
      {tabs.map((t) => {
        const active = t.value === value;
        return (
          <button
            key={t.value}
            role="tab"
            aria-selected={active}
            className={`stage-tab ${active ? 'is-active' : ''}`}
            onClick={() => onChange(t.value)}
          >
            {t.label}
          </button>
        );
      })}
      <div className="stage-links">
        {links.map((l) => (
          <a
            key={l.label}
            className="stage-link"
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {l.label}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [state, setState, reset, setTabFlag, setExperiment] = useSimState();
  const stageView = state.stageView || 'ui';

  React.useEffect(() => {
    document.documentElement.classList.toggle('embed', !!state.embed);
  }, [state.embed]);

  if (state.embed) {
    return <Simulator state={state} setState={setState} />;
  }

  return (
    <>
      <Panel state={state} setState={setState} reset={reset} setTabFlag={setTabFlag} setExperiment={setExperiment} />
      <div className="stage">
        <StageTabs value={stageView} onChange={(v) => setState({ stageView: v })} />
        <div className="stage-canvas">
          {stageView === 'ui'
            ? <Simulator state={state} setState={setState} />
            : <ComponentGallery state={state} />
          }
        </div>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

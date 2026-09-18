// simulator.jsx — Wraps ExploreScreen in either a bare 393x852 box or iOS chrome

function Simulator({ state, setState }) {
  const W = 393, H = 852;

  // Apply theme to the phone container only (not the whole page).
  const themeClass = state.theme === 'light' ? 'light' : 'dark';
  const bareInset = state.embed ? (state.embedInset || 0) : 0;

  if (!state.showChrome) {
    return (
      <div
        className={`bare-phone ${themeClass}`}
        data-theme={state.theme}
        data-screen-label="Explore (bare)"
        style={{ width: W, height: H }}
      >
        <ExploreScreen state={state} setState={setState} topInset={bareInset} />
      </div>
    );
  }

  // iOS chrome version. IOSDevice adds its own chrome + status bar; we need the
  // content area to be the Explore screen. IOSDevice renders children into the
  // flex-1 area under the status bar.
  // We override the status bar to be transparent-over-dark content by using
  // dark={true} status bar when theme is dark, else light.
  return (
    <div
      data-theme={state.theme}
      className={themeClass}
      data-screen-label="Explore (iOS chrome)"
      style={{
        width: W, height: H,
        color: 'var(--color-text-default)',
      }}
    >
      <IOSDevice
        width={W}
        height={H}
        dark={state.theme === 'dark'}
      >
        <div style={{
          height: '100%',
          background: 'var(--color-background-default)',
        }}>
          <ExploreScreen state={state} setState={setState} topInset={62} />
        </div>
      </IOSDevice>
    </div>
  );
}

Object.assign(window, { Simulator });

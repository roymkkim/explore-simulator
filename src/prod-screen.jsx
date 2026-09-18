// prod-screen.jsx — shipped Explore, composed from screenshots + MMDS.
// HeaderSearch (search + trailing control), Tab (underline), AssetCell,
// FilterButton, Mobile / Footer navigation (Explore selected).

const PROD_TABS = ['Now', 'Macro', 'RWAs', 'Crypto', 'Sites'];

const PROD_CRYPTO_MOVERS = [
  { t: 'SOCK',     p: 50.25, net: '#2775CA' },
  { t: 'BASECAT',  p:  1.96, net: '#0052FF' },
  { t: 'PIEVERSE', p:  1.01, net: '#627EEA' },
  { t: 'MARSCOIN', p:  4.75, net: '#F3BA2F' },
  { t: 'COLLECT',  p:  1.82, net: '#0052FF' },
  { t: 'PUMP',     p:  0.92, net: '#9945FF' },
  { t: 'BONK',     p:  0.74, net: '#F8A21B' },
  { t: 'WIF',      p:  0.61, net: '#9945FF' },
  { t: 'PENGU',    p:  0.48, net: '#1D4ED8' },
];

const PROD_PERPS_MOVERS_UP = [
  { t: 'VVV',  p: 33.58 },
  { t: 'ATOM', p: 12.40 },
  { t: 'NBIS', p:  8.82 },
  { t: 'DOT',  p: 18.66 },
  { t: 'LITE', p:  9.59 },
  { t: 'SOPH', p:  7.10 },
  { t: 'SUI',  p:  5.42 },
  { t: 'HYPE', p:  4.18 },
  { t: 'JUP',  p:  3.05 },
];

const PROD_PERPS_MOVERS_DOWN = [
  { t: 'VVV',  p: -8.12 },
  { t: 'ATOM', p: -4.22 },
  { t: 'NBIS', p: -2.91 },
  { t: 'DOT',  p: -5.40 },
  { t: 'LITE', p: -3.18 },
  { t: 'SOPH', p: -1.64 },
  { t: 'SUI',  p: -1.21 },
  { t: 'HYPE', p: -0.88 },
  { t: 'JUP',  p: -0.54 },
];

const PROD_STOCKS = [
  { name: 'FuelCell Energy Inc NEW (DE)', ticker: 'FCEL', cap: '$1B',   vol: '$13.9M', price: 17.70,  change: 18.61, color: '#7B3FF2', initials: 'FC' },
  { name: 'NuScale Power Corporation',    ticker: 'SMR',  cap: '$5B',   vol: '$53.7M', price: 11.11,  change: 14.77, color: '#2563EB', initials: 'NS' },
  { name: 'CoreWeave, Inc. Class A',      ticker: 'CRWV', cap: '$55B',  vol: '$50.9M', price: 100.09, change: 12.39, color: '#3B82F6', initials: 'CW' },
];

const PROD_MACRO_PERPS = {
  Stocks: [
    { name: 'SK Hynix',         ticker: 'SKHX', leverage: 10, vol: '$452.41M', price: 1352.3, change:  1.13, color: '#F97316', initials: 'SK' },
    { name: 'SanDisk',          ticker: 'SNDK', leverage: 10, vol: '$255.21M', price: 1743.2, change: -2.16, color: '#DC2626', initials: 'S' },
    { name: 'Micron Technology',ticker: 'MU',   leverage: 10, vol: '$199.47M', price: 1004.5, change: -3.17, color: '#7C3AED', initials: 'm' },
  ],
  'Pre-IPO': [
    { name: 'SpaceX',  ticker: 'SPCX', leverage: 10, vol: '$88.2M',  price: 212.4, change: 2.10, color: '#111827', initials: 'SX' },
    { name: 'OpenAI',  ticker: 'OAI',  leverage: 10, vol: '$64.1M',  price: 148.0, change: 1.42, color: '#10A37F', initials: 'OA' },
  ],
  Commodities: [
    { name: 'Gold', ticker: 'XAU', leverage: 20, vol: '$712.5M', price: 2734.2, change: -0.32, color: '#D4AF37', initials: 'Au' },
    { name: 'Oil',  ticker: 'CL',  leverage: 20, vol: '$306.4M', price: 94.49,  change:  6.33, color: '#1A1A1A', initials: 'CL' },
  ],
  Indices: [
    { name: 'S&P 500', ticker: 'SPX', leverage: 50, vol: '$1.1B', price: 7125.7, change: 0.87, color: '#E31937', initials: 'S&P' },
  ],
};

const PROD_CRYPTO_ASSETS = [
  { name: 'BORT', cap: '$3.3M', vol: '$9.3M', price: 0.0034, change: 355.49, color: '#6D28D9', initials: 'BO', net: '#F59E0B' },
  { name: 'iNu',  cap: '—',     vol: '$5.2M', price: 0.0072, change: 192.24, color: '#E8D5C4', initials: 'iN', net: '#22C55E', initialsColor: '#3F2A1D' },
  { name: 'AKE',  cap: '$588.4M', vol: '$14.9M', price: 0.0263, change: 71.86, color: '#4C1D95', initials: '△', net: '#F59E0B', verified: true },
];

const PROD_CRYPTO_PERPS = [
  { name: 'Saga', leverage: 3, price: 0.02063, color: '#111827', initials: 'S' },
  { name: 'HYPE', leverage: 10, price: 48.12, change: 4.18, color: '#22C55E', initials: 'HY' },
];

const PROD_SITE_RECENTS = [
  { name: 'Explore Tokens – Base', host: 'portfolio.metamask.io', kind: 'fox' },
  { name: 'Explore Tokens – Linea', host: 'portfolio.metamask.io', kind: 'fox' },
  { name: 'MetaMask Portfolio', host: 'portfolio.metamask.io', kind: 'fox' },
];

const PROD_SITE_ECOSYSTEMS = [
  { name: 'Linea', subtitle: 'Linea Hub', kind: 'linea' },
  { name: 'Sei', subtitle: 'Sei Hub', kind: 'sei' },
  { name: 'Solana', subtitle: 'Solana Hub', kind: 'sol' },
];

const PROD_SITE_POPULAR = [
  { name: 'MetaMask Portfolio', host: 'portfolio.metamask.io', kind: 'fox' },
  { name: 'Ondo Global Markets', host: 'metamask.io', kind: 'ondo' },
  { name: 'MetaLend', host: 'metalend.tech', kind: 'metalend' },
];

const PROD_RWA_PERPS = {
  Stocks: [
    { name: 'CoreWeave', ticker: 'CRWV', leverage: 10, vol: '$50.9M',  price: 99.681, change: 9.76, color: '#3B82F6', initials: 'CW' },
    { name: 'Lumentum',  ticker: 'LITE', leverage: 10, vol: '$41.2M',  price: 977.18, change: 9.59, color: '#22C55E', initials: 'L' },
    { name: 'Nebius Group', ticker: 'NBIS', leverage: 10, vol: '$28.4M', price: 243.79, change: 8.82, color: '#EAB308', initials: 'N' },
  ],
  'Pre-IPO': [
    { name: 'Stripe', ticker: 'STRP', leverage: 10, vol: '$22.0M', price: 86.4, change: 1.20, color: '#635BFF', initials: 'S' },
  ],
  Forex: [
    { name: 'Euro / USD', ticker: 'EURUSD', leverage: 100, vol: '$412.3M', price: 1.0854, change: 0.14, color: '#003399', initials: '€' },
  ],
  Indices: [
    { name: 'Nasdaq 100', ticker: 'NDX', leverage: 50, vol: '$880M', price: 26829.1, change: 1.32, color: '#111827', initials: 'Q' },
  ],
  ETFs: [
    { name: 'SPDR S&P 500', ticker: 'SPY', leverage: 10, vol: '$1.4B', price: 572.18, change: 0.64, color: '#2563EB', initials: 'SP' },
  ],
};

function ProdChevron() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ color: 'var(--color-text-alternative)' }}>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ProdSectionTitle({ title, action, chevron = true }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 8,
      padding: '0 16px 12px',
      color: 'var(--color-text-default)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, minWidth: 0 }}>
        <h2 style={{
          margin: 0,
          fontFamily: 'var(--font-family-default)',
          fontSize: 18, fontWeight: 500, lineHeight: '24px',
        }}>{title}</h2>
        {chevron && !action && (
          <span style={{ color: 'var(--color-text-alternative)', display: 'inline-flex' }}>
            <ProdChevron />
          </span>
        )}
      </div>
      {action && (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 2,
          color: 'var(--color-text-alternative)',
          fontFamily: 'var(--font-family-default)',
          fontSize: 14, fontWeight: 500, lineHeight: '22px',
          flex: '0 0 auto',
        }}>
          {action}
          <ProdChevron />
        </span>
      )}
    </div>
  );
}

function ProdFlashIcon() {
  return (
    <svg width="12" height="20" viewBox="0 0 12 20" aria-hidden="true">
      <path
        fill="currentColor"
        d="M 5 13.6 L 8.2 9 L 5.35 9 L 7.35 2 L 2 2 L 2 10 L 5 10 L 5 13.6 Z M 3 20 L 3 12 L 0 12 L 0 0 L 10 0 L 8 7 L 12 7 L 3 20 Z"
      />
    </svg>
  );
}

function ProdVerified() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" style={{ flex: '0 0 14px' }}>
      <circle cx="7" cy="7" r="7" fill="var(--color-primary-default)" />
      <path d="M4 7.1 6.1 9.2 10 4.8" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProdFoxMark({ size = 40 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 999, flex: `0 0 ${size}px`,
      background: 'var(--color-background-alternative)',
      overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <img
        src="assets/mm-fox.png?v=2"
        width={size}
        height={size}
        alt=""
        style={{ display: 'block', width: size, height: size, objectFit: 'contain', imageRendering: 'auto' }}
      />
    </div>
  );
}

function ProdBrandMark({ kind, size = 40 }) {
  if (kind === 'fox') return <ProdFoxMark size={size} />;
  const networkSrc = {
    linea: 'assets/networks/linea.png',
    sei: 'assets/networks/sei.png',
    sol: 'assets/networks/solana.png',
  }[kind];
  if (networkSrc) {
    return (
      <div style={{
        width: size, height: size, borderRadius: 999, flex: `0 0 ${size}px`,
        background: 'var(--color-background-alternative)',
        overflow: 'hidden',
      }}>
        <img
          src={networkSrc}
          width={size}
          height={size}
          alt=""
          style={{ display: 'block', width: size, height: size, objectFit: 'cover' }}
        />
      </div>
    );
  }
  if (kind === 'ondo') {
    return (
      <div style={{
        width: size, height: size, borderRadius: 999, background: '#111',
        border: '1px solid var(--color-border-muted)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxSizing: 'border-box',
        flex: `0 0 ${size}px`,
      }}>
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="none" stroke="#fff" strokeWidth="2" />
          <circle cx="12" cy="12" r="4.5" fill="none" stroke="#fff" strokeWidth="2" />
        </svg>
      </div>
    );
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: 999, background: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#5B4CFF', fontSize: size * 0.42, fontWeight: 800, flex: `0 0 ${size}px`,
    }}>A</div>
  );
}

function ProdSiteCard({ site }) {
  return (
    <div style={{
      flex: '0 0 calc((100% - 16px - 12px - 40px) / 2)',
      boxSizing: 'border-box',
      padding: 16,
      borderRadius: 12,
      background: 'var(--color-background-muted)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      minWidth: 0,
    }}>
      <ProdBrandMark kind={site.kind} size={40} />
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontSize: 16, fontWeight: 500, lineHeight: '24px',
          color: 'var(--color-text-default)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{site.name}</div>
        <div style={{
          fontSize: 14, fontWeight: 500, lineHeight: '22px',
          color: 'var(--color-text-alternative)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{site.host || site.subtitle}</div>
      </div>
    </div>
  );
}

function ProdSiteRail({ items }) {
  return (
    <div style={{
      display: 'flex',
      gap: 12,
      padding: '0 16px',
      overflowX: 'auto',
      scrollbarWidth: 'none',
      WebkitOverflowScrolling: 'touch',
    }}>
      {items.map((site) => <ProdSiteCard key={site.name} site={site} />)}
    </div>
  );
}

function ProdPopularRow({ site }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '8px 16px',
    }}>
      <ProdBrandMark kind={site.kind} size={40} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 16, fontWeight: 500, lineHeight: '24px',
          color: 'var(--color-text-default)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{site.name}</div>
        <div style={{
          fontSize: 14, fontWeight: 500, lineHeight: '22px',
          color: 'var(--color-text-alternative)',
        }}>{site.host}</div>
      </div>
    </div>
  );
}

function ProdHeader({
  activeTab, onTabChange, topInset = 0, showSearch = true, showTabs = true,
  searchOpen = false, searchQuery = '', onSearchQuery, onSearchOpen, onSearchCancel,
  searchFilter = 'All', onSearchFilter,
}) {
  const rowRef = React.useRef(null);
  const tabRefs = React.useRef({});
  const inputRef = React.useRef(null);
  const [bar, setBar] = React.useState({ left: 0, width: 0 });
  const ease = '280ms cubic-bezier(0.32, 0.72, 0, 1)';

  const measureBar = React.useCallback(() => {
    const row = rowRef.current;
    const el = tabRefs.current[activeTab];
    if (!row || !el) return;
    const rowBox = row.getBoundingClientRect();
    const tabBox = el.getBoundingClientRect();
    setBar({
      left: tabBox.left - rowBox.left + row.scrollLeft,
      width: tabBox.width,
    });
  }, [activeTab]);

  React.useLayoutEffect(() => {
    measureBar();
  }, [measureBar, showTabs, searchOpen]);

  React.useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    row.addEventListener('scroll', measureBar, { passive: true });
    window.addEventListener('resize', measureBar);
    return () => {
      row.removeEventListener('scroll', measureBar);
      window.removeEventListener('resize', measureBar);
    };
  }, [measureBar]);

  React.useEffect(() => {
    if (searchOpen && inputRef.current) inputRef.current.focus();
  }, [searchOpen]);

  return (
    <div style={{
      flex: '0 0 auto',
      background: 'var(--color-background-default)',
      paddingTop: topInset + (searchOpen ? 4 : 8),
      transition: `padding-top ${ease}`,
    }}>
      <div style={{
        maxHeight: searchOpen ? 0 : 44,
        opacity: searchOpen ? 0 : 1,
        overflow: 'hidden',
        transform: searchOpen ? 'translateY(-8px)' : 'translateY(0)',
        padding: searchOpen ? '0 16px' : '4px 16px 0',
        transition: `max-height ${ease}, opacity 200ms ease, transform ${ease}, padding ${ease}`,
        pointerEvents: searchOpen ? 'none' : 'auto',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-family-default)',
          fontSize: 24, fontWeight: 600, lineHeight: '32px',
          color: 'var(--color-text-default)', margin: 0,
        }}>Explore</h1>
      </div>

      {showSearch && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: searchOpen ? '8px 16px 0' : '16px 16px 0',
          transition: `padding ${ease}`,
        }}>
          <div
            onClick={() => onSearchOpen && onSearchOpen()}
            style={{
            flex: 1, minWidth: 0,
            height: 40,
            display: 'flex', alignItems: 'center', gap: 12,
            padding: searchOpen ? '0 16px 0 16px' : '0 16px',
            background: 'var(--color-background-muted)',
            borderRadius: 999,
            border: searchOpen ? '1px solid var(--color-border-default)' : '1px solid transparent',
            color: 'var(--color-text-default)',
            transition: `border-color ${ease}`,
            boxSizing: 'border-box',
            cursor: 'text',
          }}>
            <svg
              width={20}
              height={20}
              viewBox="0 0 24 24"
              aria-hidden="true"
              style={{ display: 'block', flexShrink: 0, color: '#FFFFFF' }}
            >
              <path fill="#FFFFFF" d="m19.6 21-6.3-6.3c-.5.4-1.075.7167-1.725.95s-1.3417.35-2.075.35c-1.81667 0-3.35417-.6292-4.6125-1.8875s-1.8875-2.7958-1.8875-4.6125c0-1.81667.62917-3.35417 1.8875-4.6125s2.79583-1.8875 4.6125-1.8875c1.8167 0 3.3542.62917 4.6125 1.8875s1.8875 2.79583 1.8875 4.6125c0 .7333-.1167 1.425-.35 2.075s-.55 1.225-.95 1.725l6.3 6.3zm-10.1-7c1.25 0 2.3125-.4375 3.1875-1.3125s1.3125-1.9375 1.3125-3.1875-.4375-2.3125-1.3125-3.1875-1.9375-1.3125-3.1875-1.3125-2.3125.4375-3.1875 1.3125-1.3125 1.9375-1.3125 3.1875.4375 2.3125 1.3125 3.1875 1.9375 1.3125 3.1875 1.3125z" />
            </svg>
            <input
              ref={inputRef}
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => onSearchQuery && onSearchQuery(e.target.value)}
              onFocus={() => onSearchOpen && onSearchOpen()}
              onClick={() => onSearchOpen && onSearchOpen()}
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                color: 'var(--color-text-default)',
                caretColor: 'var(--color-text-default)',
                fontFamily: 'inherit', fontSize: 16, fontWeight: 400, lineHeight: '24px',
              }}
            />
          </div>
          <div style={{
            position: 'relative',
            flex: '0 0 auto',
            width: searchOpen ? 72 : 32,
            height: searchOpen ? 48 : 32,
            overflow: 'hidden',
            transition: `width ${ease}, height ${ease}`,
          }}>
            <button
              type="button"
              aria-label="1 notification"
              tabIndex={searchOpen ? -1 : 0}
              style={{
                position: 'absolute', top: 0, left: 0,
                width: 32, height: 32,
                border: 'none',
                borderRadius: 8,
                background: 'var(--color-background-muted)',
                color: 'var(--color-text-default)',
                fontFamily: 'inherit', fontSize: 16, fontWeight: 500,
                cursor: 'pointer',
                opacity: searchOpen ? 0 : 1,
                transform: searchOpen ? 'scale(0.92)' : 'scale(1)',
                pointerEvents: searchOpen ? 'none' : 'auto',
                transition: `opacity 180ms ease, transform ${ease}`,
              }}
            >1</button>
            <button
              type="button"
              onClick={() => {
                if (inputRef.current) inputRef.current.blur();
                onSearchCancel && onSearchCancel();
              }}
              tabIndex={searchOpen ? 0 : -1}
              style={{
                appearance: 'none',
                position: 'absolute',
                top: 0,
                right: 0,
                height: 48,
                padding: '0 2px 0 8px',
                border: 'none',
                background: 'transparent',
                color: 'var(--color-text-default)',
                fontFamily: 'inherit',
                fontSize: 16, fontWeight: 500, lineHeight: '24px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                opacity: searchOpen ? 1 : 0,
                transform: searchOpen ? 'translateX(0)' : 'translateX(8px)',
                pointerEvents: searchOpen ? 'auto' : 'none',
                transition: `opacity 200ms ease 40ms, transform ${ease}`,
              }}
            >Cancel</button>
          </div>
        </div>
      )}

      {showTabs && (
        <div style={{
          maxHeight: searchOpen ? 0 : 48,
          opacity: searchOpen ? 0 : 1,
          overflow: 'hidden',
          transform: searchOpen ? 'translateY(-6px)' : 'translateY(0)',
          transition: `max-height ${ease}, opacity 180ms ease, transform ${ease}`,
          pointerEvents: searchOpen ? 'none' : 'auto',
        }}>
          <div
            ref={rowRef}
            style={{
              position: 'relative',
              display: 'flex', gap: 16,
              padding: '12px 16px 0',
              overflowX: 'auto',
              overflowY: 'hidden',
              scrollbarWidth: 'none',
            }}
          >
            {PROD_TABS.map((t) => {
              const active = t === activeTab;
              return (
                <button
                  key={t}
                  ref={(el) => { tabRefs.current[t] = el; }}
                  type="button"
                  onClick={() => onTabChange(t)}
                  style={{
                    appearance: 'none', background: 'transparent', border: 'none',
                    padding: '4px 0 8px',
                    color: active ? 'var(--color-text-default)' : 'var(--color-text-alternative)',
                    fontFamily: 'inherit',
                    fontSize: 16, lineHeight: '24px',
                    fontWeight: 400,
                    cursor: 'pointer', whiteSpace: 'nowrap',
                    boxShadow: active ? 'inset 0 -2px 0 var(--color-icon-default)' : 'none',
                  }}
                >{t}</button>
              );
            })}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: 0,
                left: bar.left,
                width: bar.width,
                height: 2,
                background: 'var(--color-icon-default)',
                pointerEvents: 'none',
                transition: 'left 180ms ease, width 180ms ease',
              }}
            />
          </div>
        </div>
      )}

      <div style={{
        maxHeight: searchOpen ? 56 : 0,
        opacity: searchOpen ? 1 : 0,
        overflow: 'hidden',
        transform: searchOpen ? 'translateY(0)' : 'translateY(-8px)',
        paddingTop: searchOpen ? 12 : 0,
        transition: `max-height ${ease}, opacity 220ms ease, transform ${ease}, padding ${ease}`,
        pointerEvents: searchOpen ? 'auto' : 'none',
      }}>
        <FilterBar filters={['All', 'Crypto', 'Perps', 'Stocks', 'Prediction'].map((label) => ({
          label, hideChevron: true,
          active: searchFilter === label,
          onClick: () => onSearchFilter && onSearchFilter(label),
        }))} />
      </div>
    </div>
  );
}

function FooterGlyph({ name, active }) {
  const fill = active ? 'var(--color-icon-default)' : 'var(--color-text-alternative)';
  if (name === 'home') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill={fill}
          fillRule="evenodd"
          d="M6 19h3v-6h6v6h3V10l-6-4.5L6 10v9Zm-2 2V9l8-6 8 6v12h-7v-6H11v6H4Z"
        />
      </svg>
    );
  }
  if (name === 'explore') {
    return (
      <span
        className="material-symbols-outlined"
        aria-hidden="true"
        style={{
          fontSize: 24,
          lineHeight: 1,
          color: fill,
          fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
        }}
      >trending_up</span>
    );
  }
  if (name === 'activity') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <g fill={fill} fillRule="evenodd" transform="translate(2 2)">
          <path d="M13.3 14.7 14.7 13.3 11 9.6V5H9v5.4l4.3 4.3Z" />
          <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20Zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
        </g>
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill={fill}
        fillRule="evenodd"
        transform="translate(2 2)"
        d="M20 6.44 18.64 10.06 20 14.59l-.11.29-1.64 4.38-4.05-1.02L11.15 20H8.86L5.8 18.25 1.75 19.26.01 14.6l1.35-4.97L.13 6.75 0 6.46 1.76 0l6.69 4.13h3.1L18.24 0 20 6.44ZM12.07 5.94H7.94L2.87 2.81l-.96 3.52 1.36 3.17-1.36 5.01.97 2.6 3.19-.8L9.34 18.19h1.33l3.27-1.88 3.19.8.97-2.59-1.36-4.53.11-.29 1.25-3.35-.96-3.54-5.07 3.13Z"
      />
    </svg>
  );
}

function ProdFooter({ hidden = false }) {
  const tabs = [
    { key: 'home', label: 'Home' },
    { key: 'explore', label: 'Explore', active: true },
    { key: 'trade', label: 'Trade' },
    { key: 'activity', label: 'Activity' },
    { key: 'rewards', label: 'Rewards' },
  ];
  return (
    <div style={{
      flex: hidden ? '0 0 0' : '0 0 auto',
      maxHeight: hidden ? 0 : 120,
      opacity: hidden ? 0 : 1,
      overflow: hidden ? 'hidden' : 'visible',
      pointerEvents: hidden ? 'none' : 'auto',
      transition: 'max-height 280ms cubic-bezier(0.32, 0.72, 0, 1), opacity 200ms ease',
      background: 'var(--color-background-default)',
      borderTop: hidden ? 'none' : '1px solid var(--color-border-muted)',
      position: 'relative',
      zIndex: 40,
    }}>
      <div style={{
        display: 'flex', alignItems: 'flex-end',
        padding: '8px 8px 8px 16px',
      }}>
        {tabs.map((t) => {
          if (t.key === 'trade') {
            return (
              <div key={t.key} style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'flex-end', gap: 4,
                minHeight: 45,
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: 21,
                  transform: 'translateX(-50%)',
                  width: 56, height: 56, borderRadius: 999,
                  background: '#4459FF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#FFFFFF',
                  zIndex: 50,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
                  pointerEvents: 'auto',
                }}>
                  <span
                    className="material-symbols-outlined"
                    aria-hidden="true"
                    style={{
                      fontSize: 32,
                      lineHeight: 1,
                      color: '#FFFFFF',
                      fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                    }}
                  >add</span>
                </div>
                <span style={{
                  fontFamily: 'var(--font-family-default)',
                  fontSize: 12, fontWeight: 500, lineHeight: '17px',
                  color: 'var(--color-text-alternative)',
                }}>{t.label}</span>
              </div>
            );
          }
          return (
            <button
              key={t.key}
              type="button"
              style={{
                flex: 1, appearance: 'none', border: 'none', background: 'transparent',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', gap: 4, minHeight: 45, cursor: 'pointer',
                padding: 0,
              }}
            >
              <FooterGlyph name={t.key} active={!!t.active} />
              <span style={{
                fontFamily: 'var(--font-family-default)',
                fontSize: 12, fontWeight: 500, lineHeight: '17px',
                color: t.active ? 'var(--color-text-default)' : 'var(--color-text-alternative)',
              }}>{t.label}</span>
            </button>
          );
        })}
      </div>
      <div style={{ height: 16 }} />
    </div>
  );
}

function ProdMoverGrid({ items }) {
  return <PillRow items={items} rows={2} pillStyle="filled" />;
}

function ProdSeg({ value, options, onChange }) {
  // MMDS SegmentedControl size=Sm, isFullWidth=true — FilterButton variant=secondary
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      padding: 4,
      margin: '0 16px 12px',
      boxSizing: 'border-box',
      width: 'calc(100% - 32px)',
      borderRadius: 12,
      border: '1px solid var(--color-border-muted)',
    }}>
      {options.map((o) => {
        const selected = value === o;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            style={{
              appearance: 'none', border: 'none',
              flex: 1,
              height: 32,
              padding: '0 12px',
              borderRadius: 8,
              background: selected ? 'var(--color-background-muted)' : 'transparent',
              color: 'var(--color-text-default)',
              fontFamily: 'inherit', fontSize: 14, fontWeight: 500, lineHeight: '22px',
              cursor: 'pointer',
            }}
          >{o}</button>
        );
      })}
    </div>
  );
}

function ProdFlashButton() {
  return (
    <div style={{
      width: 32, height: 32, borderRadius: 999, flex: '0 0 32px',
      background: 'var(--color-background-muted)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--color-icon-default)',
    }}>
      <span style={{ display: 'flex', transform: 'scale(0.7)', transformOrigin: 'center' }}>
        <ProdFlashIcon />
      </span>
    </div>
  );
}

function formatProdPrice(price) {
  if (price >= 1) {
    return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  const abs = String(price);
  const decimals = Math.min(6, Math.max(4, (abs.split('.')[1] || '').length));
  return price.toFixed(decimals);
}

function ProdStockRow({ item, lightning, first }) {
  const up = item.change >= 0;
  const color = up ? 'var(--color-success-default)' : 'var(--color-error-default)';
  const hasChange = item.change != null;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: first ? '0 16px 8px' : '8px 16px',
    }}>
      <div style={{ position: 'relative', width: 40, height: 40, flex: '0 0 40px' }}>
        <AssetMark
          keys={[item.ticker, item.name, item.initials]}
          size={40}
          color={item.color}
          initials={item.initials}
          initialsColor={item.initialsColor}
        />
        {item.net && (
          <div style={{
            position: 'absolute', right: 0, bottom: 0,
            width: 12, height: 12, borderRadius: 4,
            background: item.net,
            border: '2px solid var(--color-background-default)',
            boxSizing: 'content-box',
          }} />
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, minWidth: 0 }}>
          <span style={{
            fontSize: 16, fontWeight: 500, lineHeight: '24px',
            color: 'var(--color-text-default)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{item.name}</span>
          {item.verified && <ProdVerified />}
          {item.leverage != null && (
            <span style={{
              fontSize: 12, fontWeight: 500, lineHeight: '17px',
              color: 'var(--color-text-alternative)',
              background: 'var(--color-background-muted)',
              borderRadius: 4, padding: '2px 4px',
            }}>{item.leverage}x</span>
          )}
        </div>
        {(item.cap || item.vol) && (
          <div style={{
            fontSize: 14, fontWeight: 500, lineHeight: '22px',
            color: 'var(--color-text-alternative)',
          }}>{item.cap} cap • {item.vol} vol</div>
        )}
      </div>
      <div style={{ textAlign: 'right', flex: '0 0 auto' }}>
        <div style={{
          fontSize: 16, fontWeight: 500, lineHeight: '24px',
          color: 'var(--color-text-default)', fontVariantNumeric: 'tabular-nums',
        }}>${formatProdPrice(item.price)}</div>
        {hasChange && (
          <div style={{
            fontSize: 14, fontWeight: 500, lineHeight: '22px',
            color, fontVariantNumeric: 'tabular-nums',
          }}>{up ? '+' : ''}{item.change.toFixed(2)}%</div>
        )}
      </div>
      {lightning && <ProdFlashButton />}
    </div>
  );
}

function ProdPerpRow({ item }) {
  const up = item.change >= 0;
  const color = up ? 'var(--color-success-default)' : 'var(--color-error-default)';
  const priceStr = item.price >= 100
    ? item.price.toLocaleString(undefined, { maximumFractionDigits: 1 })
    : item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '8px 16px',
    }}>
      <div style={{ width: 40, height: 40, flex: '0 0 40px' }}>
        <AssetMark
          keys={[item.ticker, item.name]}
          size={40}
          color={item.color}
          initials={item.initials}
        />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{
            fontSize: 16, fontWeight: 500, lineHeight: '24px',
            color: 'var(--color-text-default)',
          }}>{item.name}</span>
          <span style={{
            fontSize: 12, fontWeight: 500, lineHeight: '17px',
            color: 'var(--color-text-alternative)',
            background: 'var(--color-background-muted)',
            borderRadius: 4, padding: '2px 4px',
          }}>{item.leverage}x</span>
        </div>
        <div style={{
          fontSize: 14, fontWeight: 500, lineHeight: '22px',
          color: 'var(--color-text-alternative)',
        }}>{item.ticker} · {item.vol} Vol</div>
      </div>
      <div style={{ textAlign: 'right', flex: '0 0 auto' }}>
        <div style={{
          fontSize: 16, fontWeight: 500, lineHeight: '24px',
          color: 'var(--color-text-default)', fontVariantNumeric: 'tabular-nums',
        }}>${priceStr}</div>
        <div style={{
          fontSize: 14, fontWeight: 500, lineHeight: '22px',
          color, fontVariantNumeric: 'tabular-nums',
        }}>{up ? '+' : ''}{item.change.toFixed(2)}%</div>
      </div>
    </div>
  );
}

function ProdPlaceholder({ tab }) {
  return (
    <div style={{ padding: '48px 24px', textAlign: 'center' }}>
      <h3 style={{
        margin: 0, fontSize: 18, fontWeight: 500,
        color: 'var(--color-text-default)',
      }}>{tab}</h3>
      <p style={{
        margin: '8px 0 0', fontSize: 14,
        color: 'var(--color-text-alternative)',
      }}>No production screenshot for this tab yet.</p>
    </div>
  );
}

function ProdDiscoverResults({ filter, onFilter, query = '', showFilters = true }) {
  const q = query.trim().toLowerCase();
  const showCrypto = filter === 'All' || filter === 'Crypto';
  const showPerps = filter === 'All' || filter === 'Perps';
  const showStocks = filter === 'Stocks';
  const showPred = filter === 'Prediction';
  const match = (name) => !q || String(name).toLowerCase().includes(q);
  const crypto = PROD_CRYPTO_ASSETS.filter((s) => match(s.name));
  const perps = PROD_CRYPTO_PERPS.filter((s) => match(s.name));
  const stocks = PROD_STOCKS.filter((s) => match(s.name));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: showFilters ? '32px 0 8px' : '8px 0 8px', gap: 16 }}>
      {showFilters && (
        <FilterBar filters={['All', 'Crypto', 'Perps', 'Stocks', 'Prediction'].map((label) => ({
          label, hideChevron: true,
          active: filter === label,
          onClick: () => onFilter(label),
        }))} />
      )}
      {showCrypto && (
        <section style={{ paddingTop: 16 }}>
          <ProdSectionTitle title="Crypto" action="View all" chevron={false} />
          {crypto.map((s, i) => <ProdStockRow key={s.name} item={s} lightning first={i === 0} />)}
        </section>
      )}
      {showPerps && (
        <section>
          <ProdSectionTitle title="Perps" action="View all" chevron={false} />
          {perps.map((s, i) => <ProdStockRow key={s.name} item={s} first={i === 0} />)}
        </section>
      )}
      {showStocks && (
        <section>
          <ProdSectionTitle title="Stocks" action="View all" chevron={false} />
          {stocks.map((s, i) => <ProdStockRow key={s.name} item={s} lightning first={i === 0} />)}
        </section>
      )}
      {showPred && (
        <section>
          <ProdSectionTitle title="Prediction" action="View all" chevron={false} />
          <div style={{
            padding: '8px 16px 16px',
            fontSize: 14, fontWeight: 500, lineHeight: '22px',
            color: 'var(--color-text-alternative)',
          }}>No prediction markets in this view.</div>
        </section>
      )}
    </div>
  );
}

function ProdSections({ state, setState }) {
  const tab = state.activeTab;
  const moversSide = state.prodPerpsSide || 'Gainers';
  const macroFilter = state.prodMacroPerpFilter || 'Stocks';
  const rwaFilter = state.prodRwaPerpFilter || 'Stocks';

  const wrap = (nodes) => (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '32px 0 8px' }}>
      {nodes.map((node, i) => (
        <React.Fragment key={node.key || i}>
          {i > 0 && (
            <div style={{
              height: 1,
              margin: '32px 0',
              background: 'var(--color-border-muted)',
            }} />
          )}
          {node}
        </React.Fragment>
      ))}
    </div>
  );

  if (tab === 'Now') {
    return wrap([
      <section key="cm">
        <ProdSectionTitle title="Crypto movers" />
        <ProdMoverGrid items={PROD_CRYPTO_MOVERS} />
      </section>,
      <section key="pm">
        <ProdSectionTitle title="Perps movers" />
        <ProdSeg
          value={moversSide}
          options={['Gainers', 'Losers']}
          onChange={(v) => setState({ prodPerpsSide: v })}
        />
        <ProdMoverGrid items={moversSide === 'Losers' ? PROD_PERPS_MOVERS_DOWN : PROD_PERPS_MOVERS_UP} />
      </section>,
      <section key="stocks">
        <ProdSectionTitle title="Stocks" />
        {PROD_STOCKS.map((s, i) => <ProdStockRow key={s.name} item={s} first={i === 0} />)}
      </section>,
    ]);
  }

  if (tab === 'Macro') {
    return wrap([
      <section key="perps">
        <ProdSectionTitle title="Perps" />
        <FilterBar filters={['Stocks', 'Pre-IPO', 'Commodities', 'Indices'].map((label) => ({
          label, hideChevron: true,
          active: macroFilter === label,
          onClick: () => setState({ prodMacroPerpFilter: label }),
        }))} />
        <div style={{ height: 8 }} />
        {(PROD_MACRO_PERPS[macroFilter] || []).map((item) => (
          <ProdPerpRow key={item.ticker} item={item} />
        ))}
      </section>,
    ]);
  }

  if (tab === 'RWAs') {
    return wrap([
      <section key="stocks">
        <ProdSectionTitle title="Stocks" />
        {PROD_STOCKS.map((s, i) => <ProdStockRow key={s.name} item={s} lightning first={i === 0} />)}
      </section>,
      <section key="perps">
        <ProdSectionTitle title="Perps" />
        <FilterBar filters={['Stocks', 'Pre-IPO', 'Forex', 'Indices', 'ETFs'].map((label) => ({
          label, hideChevron: true,
          active: rwaFilter === label,
          onClick: () => setState({ prodRwaPerpFilter: label }),
        }))} />
        <div style={{ height: 8 }} />
        {(PROD_RWA_PERPS[rwaFilter] || []).map((item) => (
          <ProdPerpRow key={item.ticker} item={item} />
        ))}
      </section>,
    ]);
  }

  if (tab === 'Crypto') {
    return (
      <ProdDiscoverResults
        filter={state.prodCryptoFilter || 'All'}
        onFilter={(v) => setState({ prodCryptoFilter: v })}
      />
    );
  }

  if (tab === 'Sites') {
    return wrap([
      <section key="recents">
        <ProdSectionTitle title="Recents" chevron={false} />
        <ProdSiteRail items={PROD_SITE_RECENTS} />
      </section>,
      <section key="eco">
        <div style={{ padding: '0 16px 12px' }}>
          <h2 style={{
            margin: 0,
            fontFamily: 'var(--font-family-default)',
            fontSize: 18, fontWeight: 500, lineHeight: '24px',
            color: 'var(--color-text-default)',
          }}>Ecosystems</h2>
          <p style={{
            margin: '4px 0 0',
            fontFamily: 'var(--font-family-default)',
            fontSize: 14, fontWeight: 400, lineHeight: '22px',
            color: 'var(--color-text-alternative)',
          }}>Explore dApps, tokens, and NFTs across chains on MetaMask Portfolio</p>
        </div>
        <ProdSiteRail items={PROD_SITE_ECOSYSTEMS} />
      </section>,
      <section key="popular">
        <ProdSectionTitle title="Popular" />
        {PROD_SITE_POPULAR.map((s) => <ProdPopularRow key={s.name} site={s} />)}
      </section>,
    ]);
  }

  return <ProdPlaceholder tab={tab} />;
}

Object.assign(window, { ProdSections, ProdHeader, ProdFooter, ProdDiscoverResults, PROD_TABS });

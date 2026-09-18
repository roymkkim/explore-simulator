// explore-screen.jsx — Robinhood-style "Now" tab for MetaMask Explore

const TABS = ['Now', 'Macro', 'RWAs', 'Crypto', 'Traders', 'Sports', 'Sites'];

const TRADERS = [
  { name: 'aparjey',       avatar: '#1a1a1a', pct:  50.2, pnl: 45900, status: 'follow' },
  { name: 'kien',          avatar: '#6e7681', pct:  91.2, pnl: 41800, status: 'follow' },
  { name: 'dragonkittdefi',avatar: '#2d3748', pct:  86.1, pnl: 40670, status: 'follow' },
  { name: 'raggedandrusty',avatar: '#8b6f47', pct:  92.2, pnl: 35010, status: 'follow' },
  { name: 'sorak',         avatar: '#556b5e', pct:  82.2, pnl: 33900, status: 'following' },
  { name: 'vynora',        avatar: '#2c3e50', pct:  96.2, pnl: 30674, status: 'following' },
  { name: 'kaelith',       avatar: '#3e2723', pct:  51.2, pnl: 22090, status: 'follow' },
  { name: 'xandros',       avatar: '#1e3a5f', pct:  76.2, pnl: 21170, status: 'follow' },
  { name: 'dutchiono',     avatar: '#c2185b', pct:  92.8, pnl: 20610, status: 'follow' },
  { name: 'lumenbyte',     avatar: '#5d4037', pct:  67.4, pnl: 18420, status: 'follow' },
  { name: 'noctura',       avatar: '#37474f', pct:  43.9, pnl: 15830, status: 'follow' },
  { name: 'pixelmoth',     avatar: '#6a1b9a', pct:  55.1, pnl: 14200, status: 'follow' },
];

const DENSITY = {
  compact:     { sectionGap: 20, rowPad: 10, cardPad: 10 },
  default:     { sectionGap: 26, rowPad: 14, cardPad: 14 },
  comfortable: { sectionGap: 32, rowPad: 18, cardPad: 18 },
};

const RADIUS = {
  sharp:   { sm: 2, md: 4,  lg: 6,  pill: 9999, tile: 6 },
  default: { sm: 6, md: 10, lg: 14, pill: 9999, tile: 12 },
  soft:    { sm: 10, md: 16, lg: 22, pill: 9999, tile: 20 },
};

const COPY = {
  default: {
    searchPlaceholder: 'Search tokens, stocks, sites',
    market: 'Market',
    topMovers: 'Top movers',
    cryptoMovers: 'Crypto movers',
    earnings: 'Large cap stocks',
    highVol: 'Highest implied volatility',
    screeners: 'Screeners',
    trending: 'Trending lists',
    news: 'Market news',
    showMore: 'Show more',
    create: 'Create',
    beat: 'Beat expectations',
    emptyTitle: 'Nothing here yet',
    emptyBody: 'Add something to track to get started.',
    errorTitle: 'Couldn’t load Explore',
    errorBody: 'Check your connection and try again.',
  },
  plainspoken: {
    searchPlaceholder: 'Find anything',
    market: 'Markets today',
    topMovers: 'Biggest moves',
    cryptoMovers: 'Crypto moves',
    earnings: 'Large cap stocks',
    highVol: 'Most volatile',
    screeners: 'Shortcuts',
    trending: 'What people watch',
    news: 'Today’s news',
    showMore: 'Show more',
    create: 'New',
    beat: 'Beat',
    emptyTitle: 'Nothing to show',
    emptyBody: 'Pick a token or stock to start tracking it.',
    errorTitle: 'Something went wrong',
    errorBody: 'Try again in a bit.',
  },
  pro: {
    searchPlaceholder: 'Ticker, contract, or URL',
    market: 'Indices',
    topMovers: 'Movers — 24h',
    cryptoMovers: 'Crypto — 24h',
    earnings: 'Large caps',
    highVol: 'IV — Highest',
    screeners: 'Screeners',
    trending: 'Watchlists',
    news: 'Newsfeed',
    showMore: 'More',
    create: 'New',
    beat: 'Beat est.',
    emptyTitle: 'No instruments',
    emptyBody: 'Add tickers to populate.',
    errorTitle: 'Data unavailable',
    errorBody: 'Retry the request.',
  },
};

// ─── Data ───
const MARKET_CARDS = [
  { name: 'S&P 500',    value: 7125.71, trend: 'up',   change: 0.87, icon: null },
  { name: 'Nasdaq 100', value: 26829.1, trend: 'up',   change: 1.32, icon: null },
  { name: 'Bitcoin',    value: 78855.4, trend: 'up',   change: 4.18, icon: 'btc' },
  { name: 'Ethereum',   value: 3421.55, trend: 'up',   change: 2.40, icon: 'eth' },
  { name: 'Gold',       value: 2734.20, trend: 'down', change: -0.32, icon: 'gold' },
];

const TOP_MOVERS_BASE = [
  { t: 'BTC',   icon: 'btc', p:  16.96 }, { t: 'GEV',   p:  13.29 }, { t: 'MAS',   p:  12.47 },
  { t: 'SFTBY', p:  16.20 }, { t: 'QXO',   p: -12.76 }, { t: 'AAOI',  p: -11.24 },
  { t: 'NVDA',  p:   8.42 }, { t: 'TSLA',  p:   6.78 }, { t: 'PLTR',  p:  -5.12 },
  { t: 'RIVN',  p:  -4.87 },
];
const CRYPTO_MOVERS_BASE = [
  { t: 'CHIP',  p: 84.90 }, { t: 'AVNT',  p: 11.04 }, { t: 'AERO',  p:  9.56 },
  { t: 'PENGU', p: 13.04 }, { t: 'SEI',   p:  9.62 }, { t: 'SKY',   p:  9.16 },
  { t: 'ETH',   icon: 'eth', p: 5.41 }, { t: 'SOL',  p:  7.22 }, { t: 'ARB',  p:  -3.48 },
  { t: 'OP',    p:   -2.91 },
];
const HIGH_VOL_BASE = [
  { t: 'CAR',  p:  17.38 }, { t: 'RGC',  p:  2.14 }, { t: 'BE',   p:  6.90 }, { t: 'SNDK', p: 12.10 },
  { t: 'QXO',  p: -11.44 }, { t: 'SMMT', p: -3.58 }, { t: 'VFS',  p:  6.67 }, { t: 'FIG',  p:  4.22 },
];

const LARGE_CAPS = [
  { name: 'Texas Instruments', ticker: 'TXN',  network: 'ETH', price: 263.82, change:  12.31, cap: '$212B', vol: '$11.5M' },
  { name: 'Apple',             ticker: 'AAPL', network: 'SOL', price: 248.11, change:   1.82, cap: '$3.7T',  vol: '$8.2B'  },
  { name: 'Microsoft',         ticker: 'MSFT', network: 'BASE',price: 512.04, change:  -0.47, cap: '$3.8T',  vol: '$6.4B'  },
];

const EARNINGS = [
  { name: 'GE Vernova',          t: 'GEV', p: 13.29, eps: 2.06 },
  { name: 'Rogers Communications', t: 'RCI', p: 9.56,  eps: 0.74 },
  { name: 'Masco',               t: 'MAS', p: 12.47, eps: 1.04 },
];

const SCREENERS = [
  { title: 'Daily price jumps', desc: 'Stocks with the biggest price increases today',  color: '#7CC47A', icon: '↗' },
  { title: 'Daily price dips',  desc: 'Stocks with the biggest price decreases today',  color: '#F2C46A', icon: '↘' },
  { title: 'Upcoming earnings', desc: 'Companies reporting earnings in the next 2 weeks', color: '#E8C591', icon: '📅' },
];

const TRENDING_LISTS = [
  { label: 'Newly Listed Crypto', color: '#7FD89E' },
  { label: 'Altcoins',            color: '#B6F23D' },
  { label: 'Early Dividend Stocks', color: '#1C1C1C' },
  { label: '100 Most Popular',    color: '#F5A3B8' },
  { label: 'Tradable Crypto',     color: '#6C5CE7' },
  { label: 'IPO Access',          color: '#BEE33A' },
  { label: 'Daily Movers',        color: '#E89C6A' },
];

const NEWS = [
  {
    kind: 'news',
    source: 'NewsBTC', time: '2h',
    headline: 'XRP network heats up after 75 million transfer drives activity higher',
    tickers: [{ t: 'XRP', p: 0.94 }],
  },
  {
    kind: 'insights', aiGenerated: true,
    source: 'Market insights', time: '13h',
    headline: 'Bitcoin is struggling continuing a sharp downtrend due to extreme fear of US and Iran relations',
    tickers: [{ t: 'BTC', p: 0.94, icon: 'btc' }],
  },
  {
    kind: 'news',
    source: 'Bloomberg', time: '12h',
    headline: 'Bond Market Weathers Warsh Hawkish Hint: 3-Minutes MLIV',
    image: true,
    tickers: [{ t: 'RAA', p: 0.94 }, { t: 'TSPY', p: 4.12 }],
  },
  {
    kind: 'news',
    source: 'The Motley Fool', time: '3h',
    headline: 'Ranking the "Magnificent Seven" From Most to Least Attractive, Based on Future Cash Flow',
    tickers: [{ t: 'TSLA', p: -0.54 }, { t: 'AMZN', p: 1.85 }],
  },
  {
    kind: 'insights', aiGenerated: true,
    source: 'Market insights', time: '5h',
    headline: 'Ethereum ETF inflows accelerate as institutional demand rotates from BTC to ETH',
    tickers: [{ t: 'ETH', p: 2.40, icon: 'eth' }],
  },
  {
    kind: 'news',
    source: 'TipRanks', time: '4h',
    headline: 'Last-Minute Analyst Warning: ‘Sell’ Tesla Stock; Predicts Big Earnings Miss',
    tickers: [{ t: 'TSLA', p: -0.54 }],
  },
];

// ─── Macro data ───
// Sectors: each has name, overall %, and a list of tickers with weight (size) + % change.
// Weights drive treemap cell size; p drives color on green→yellow→red scale.
const SECTORS = [
  {
    name: 'Technology', overall: 0.80,
    items: [
      { t: 'NVDA',  w: 36, p:  0.21 },
      { t: 'GOOGL', w: 20, p:  0.81 },
      { t: 'GOOG',  w: 18, p:  0.89 },
      { t: 'AAPL',  w: 24, p:  1.94 },
      { t: 'MSFT',  w: 22, p: -0.02 },
      { t: 'AMZN',  w: 18, p:  1.08 },
      { t: 'AVGO',  w: 14, p:  3.81 },
      { t: 'TSM',   w: 12, p:  2.33 },
      { t: 'META',  w: 12, p: -0.20 },
      { t: 'TCEHY', w:  6, p: -1.00 },
      { t: 'ASML',  w:  6, p: -0.84 },
      { t: 'MU',    w:  5, p:  1.72 },
      { t: 'ORCL',  w:  5, p: -0.08 },
      { t: 'AMD',   w:  5, p:  1.45 },
      { t: 'NFLX',  w:  5, p: -0.62 },
    ],
  },
  {
    name: 'Finance', overall: -0.54,
    items: [
      { t: 'BRK.A', w: 22, p: -0.67 },
      { t: 'BRK.B', w: 20, p: -0.43 },
      { t: 'JPM',   w: 18, p: -0.32 },
      { t: 'V',     w: 14, p:  0.25 },
      { t: 'TCEHY', w: 12, p: -1.00 },
      { t: 'MA',    w: 10, p: -0.28 },
      { t: 'BAC',   w:  9, p: -0.95 },
      { t: 'IDCBY', w:  8, p: -1.31 },
      { t: 'ACGBY', w:  8, p: -0.61 },
      { t: 'HSBC',  w:  8, p:  0.84 },
      { t: 'MS',    w:  8, p:  0.20 },
      { t: 'CICHY', w:  5, p: -0.72 },
      { t: 'GS',    w:  5, p:  0.44 },
      { t: 'BACHY', w:  4, p: -1.08 },
      { t: 'WFC',   w:  4, p: -0.04 },
      { t: 'RY',    w:  4, p:  0.51 },
      { t: 'AXP',   w:  4, p:  0.31 },
      { t: 'C',     w:  4, p: -0.88 },
    ],
  },
  {
    name: 'Healthcare', overall: 0.32,
    items: [
      { t: 'LLY',   w: 22, p:  1.12 },
      { t: 'NVO',   w: 18, p: -0.88 },
      { t: 'UNH',   w: 18, p:  0.45 },
      { t: 'JNJ',   w: 16, p:  0.18 },
      { t: 'ABBV',  w: 12, p:  0.92 },
      { t: 'MRK',   w: 10, p: -1.40 },
      { t: 'TMO',   w: 10, p:  0.66 },
      { t: 'AZN',   w:  9, p: -0.05 },
      { t: 'PFE',   w:  8, p: -2.12 },
      { t: 'ABT',   w:  8, p:  0.33 },
      { t: 'DHR',   w:  6, p:  1.88 },
      { t: 'AMGN',  w:  6, p: -0.71 },
      { t: 'NVS',   w:  5, p:  0.10 },
      { t: 'BMY',   w:  5, p: -3.04 },
      { t: 'SYK',   w:  5, p:  0.58 },
    ],
  },
  {
    name: 'Energy', overall: -1.12,
    items: [
      { t: 'XOM',   w: 24, p: -1.42 },
      { t: 'CVX',   w: 20, p: -0.88 },
      { t: 'SHEL',  w: 16, p: -1.91 },
      { t: 'TTE',   w: 12, p: -2.04 },
      { t: 'BP',    w: 10, p: -2.66 },
      { t: 'COP',   w: 10, p:  0.12 },
      { t: 'EOG',   w:  8, p: -0.54 },
      { t: 'PBR',   w:  8, p: -3.10 },
      { t: 'ENB',   w:  8, p:  0.41 },
      { t: 'SLB',   w:  6, p: -4.22 },
      { t: 'EQNR',  w:  6, p: -1.18 },
      { t: 'PSX',   w:  5, p:  0.88 },
      { t: 'MPC',   w:  5, p: -0.33 },
      { t: 'OXY',   w:  4, p: -2.70 },
      { t: 'VLO',   w:  4, p:  0.22 },
    ],
  },
];

const CURRENCY_FUTURES = [
  { t: 'EUR Futures', p: -0.04 },
  { t: 'JPY Futures', p: -0.02 },
  { t: 'AUD Futures', p: -0.18 },
  { t: 'CAD Futures', p: -0.03 },
  { t: 'GBP Futures', p: -0.07 },
  { t: 'CHF Futures', p:  0.11 },
  { t: 'CNH Futures', p: -0.09 },
  { t: 'MXN Futures', p:  0.42 },
];

const COMMODITY_FUTURES = [
  { t: 'Gold Futures',     p: -0.57 },
  { t: 'Copper Futures',   p: -1.13 },
  { t: 'Crude Oil Futures', p:  1.27 },
  { t: 'Silver Futures',   p: -1.76 },
  { t: 'Platinum Futures', p:  0.33 },
  { t: 'Natural Gas Futures', p: -2.44 },
  { t: 'Corn Futures',     p:  0.18 },
  { t: 'Wheat Futures',    p: -0.92 },
];

// Tint the whole list red/green based on market condition
function tintMovers(list, variant) {
  if (variant === 'greenday') return list.map(x => ({ ...x, p: Math.abs(x.p) }));
  if (variant === 'redday')   return list.map(x => ({ ...x, p: -Math.abs(x.p) }));
  return list;
}

// ─── Atoms ───
function Icon({ name, size = 20, style }) {
  return <img src={`mmds/icons/${name}.svg`} width={size} height={size} style={{ display: 'block', ...style }} alt="" />;
}

function Triangle({ up, size = 8, color }) {
  return null;
}

// Seeded color for placeholder token circles — picks from a small palette
// with good contrast on both light and dark backgrounds.
const PLACEHOLDER_TOKEN_COLORS = [
  '#3B82F6', // blue-500
  '#8B5CF6', // violet-500
  '#EC4899', // pink-500
  '#F59E0B', // amber-500
  '#10B981', // emerald-500
  '#EF4444', // red-500
  '#14B8A6', // teal-500
  '#6366F1', // indigo-500
  '#F97316', // orange-500
];
function placeholderTokenColor(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return PLACEHOLDER_TOKEN_COLORS[h % PLACEHOLDER_TOKEN_COLORS.length];
}

function TickerPill({ t, p, icon, radius, pillStyle = 'filled' }) {
  const up = p >= 0;
  const color = up ? 'var(--color-success-default)' : 'var(--color-error-default)';
  const outline = pillStyle === 'outline';
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '6px 12px 6px 6px',
      borderRadius: 9999,
      background: outline ? 'transparent' : 'var(--color-background-muted)',
      border: outline ? '1px solid var(--color-border-muted)' : '1px solid transparent',
      fontSize: 14, lineHeight: '22px', fontWeight: 500,
      whiteSpace: 'nowrap', flex: '0 0 auto',
    }}>
      {icon || t
        ? <span style={{ marginRight: 2 }}><AssetMark keys={[icon === 'btc' ? 'BTC' : icon === 'eth' ? 'ETH' : icon, t]} size={22} /></span>
        : <span style={{
            width: 22, height: 22, borderRadius: '50%',
            background: placeholderTokenColor(t), flex: '0 0 22px',
            marginRight: 2,
          }} />}
      <span style={{ color: 'var(--color-text-alternative)' }}>{t}</span>
      <span style={{ color }}>
        {up ? '+' : '-'}{Math.abs(p).toFixed(2)}%
      </span>
    </div>
  );
}

function InlineTicker({ t, p }) {
  const up = p >= 0;
  const color = up ? 'var(--color-success-default)' : 'var(--color-error-default)';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: 12, fontFamily: 'var(--font-family-default)', fontWeight: 600,
    }}>
      <span style={{ color: 'var(--color-text-default)' }}>{t}</span>
      <span style={{ color }}>{up ? '+' : '-'}{Math.abs(p).toFixed(2)}%</span>
    </span>
  );
}

function Sparkline({ trend = 'up', width = '100%', height = 40, seed = 1 }) {
  // Generate a volatile, jagged series with an overall trend.
  // Seeded PRNG so cards have distinct but stable shapes.
  const rand = (() => {
    let s = seed * 9301 + 49297;
    return () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  })();
  const N = 48;
  const W = 120;
  const H = 40;
  const pad = 3;
  const slope = trend === 'up' ? -0.45 : 0.45; // negative y = up visually
  const pts = [];
  for (let i = 0; i < N; i++) {
    const x = (i / (N - 1)) * W;
    const base = H / 2 + slope * (i - N / 2);
    const jitter = (rand() - 0.5) * 22;
    let y = base + jitter;
    if (y < pad) y = pad;
    if (y > H - pad) y = H - pad;
    pts.push([x, y]);
  }
  const points = pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
  const end = pts[pts.length - 1];
  // Percentage position of the end point (for HTML overlay — keeps dots truly circular regardless of SVG stretch)
  const endXpct = (end[0] / W) * 100;
  const endYpct = (end[1] / H) * 100;
  const color = trend === 'up'
    ? 'var(--color-success-default)'
    : 'var(--color-error-default)';
  return (
    <div style={{ position: 'relative', width, height, lineHeight: 0 }}>
      <svg
        width="100%" height="100%"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        fill="none"
        style={{ display: 'block' }}
      >
        <polyline
          points={points}
          fill="none" stroke={color}
          strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* Radiating pulse (16x16, perfect circle via HTML) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: `${endXpct}%`, top: `${endYpct}%`,
          width: 16, height: 16,
          marginLeft: -8, marginTop: -8,
          borderRadius: '50%',
          background: color,
          opacity: 0.4,
          animation: 'sparklinePulse 2.4s ease-out infinite',
          pointerEvents: 'none',
        }}
      />
      {/* Solid end dot (4x4, perfect circle) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: `${endXpct}%`, top: `${endYpct}%`,
          width: 4, height: 4,
          marginLeft: -2, marginTop: -2,
          borderRadius: '50%',
          background: color,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

// ─── Header ───
function Header({ copy, showSearch, showTabs, activeTab, onTabChange, radius, topInset = 0, tabs = TABS }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 5,
      background: 'var(--color-background-default)',
      paddingTop: topInset + 8,
    }}>
      <div style={{ padding: '4px 20px 0' }}>
        <h1 style={{
          fontFamily: 'var(--font-family-default)',
          fontSize: 24, fontWeight: 600, letterSpacing: '0',
          color: 'var(--color-text-default)', margin: 0,
          lineHeight: '32px',
        }}>Explore</h1>
      </div>
      {showSearch && (
        <div style={{ padding: '16px 16px 0' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 18px',
            background: 'var(--color-background-muted)',
            borderRadius: 9999,
            color: 'var(--color-text-default)',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
              <path d="m19.6 21-6.3-6.3c-.5.4-1.075.7167-1.725.95s-1.3417.35-2.075.35c-1.81667 0-3.35417-.6292-4.6125-1.8875s-1.8875-2.7958-1.8875-4.6125c0-1.81667.62917-3.35417 1.8875-4.6125s2.79583-1.8875 4.6125-1.8875c1.8167 0 3.3542.62917 4.6125 1.8875s1.8875 2.79583 1.8875 4.6125c0 .7333-.1167 1.425-.35 2.075s-.55 1.225-.95 1.725l6.3 6.3zm-10.1-7c1.25 0 2.3125-.4375 3.1875-1.3125s1.3125-1.9375 1.3125-3.1875-.4375-2.3125-1.3125-3.1875-1.9375-1.3125-3.1875-1.3125-2.3125.4375-3.1875 1.3125-1.3125 1.9375-1.3125 3.1875.4375 2.3125 1.3125 3.1875 1.9375 1.3125 3.1875 1.3125z"/>
            </svg>
            <input
              placeholder={copy.searchPlaceholder}
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                color: 'var(--color-text-default)',
                fontFamily: 'inherit', fontSize: 16, fontWeight: 400,
              }}
            />
          </div>
        </div>
      )}
      {showTabs && (
        <div style={{
          display: 'flex', gap: 8,
          padding: '16px 16px 8px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}>
          {tabs.map((t) => {
            const active = t === activeTab;
            return (
              <button
                key={t}
                onClick={() => onTabChange(t)}
                style={{
                  padding: '8px 16px', border: 'none',
                  background: active ? 'var(--color-icon-default)' : 'var(--color-background-muted)',
                  borderRadius: 12,
                  fontFamily: 'inherit',
                  fontSize: 14, lineHeight: '22px',
                  fontWeight: 500,
                  color: active ? 'var(--color-icon-inverse)' : 'var(--color-text-default)',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  transition: 'color 120ms ease, background 120ms ease',
                }}
              >{t}</button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Section header ───
function SectionHeader({ title, right, chevron = false }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 16px 12px',
    }}>
      <h2 style={{
        fontSize: 18, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: '24px', margin: 0,
        color: 'var(--color-text-default)',
        display: 'flex', alignItems: 'center', gap: 4,
      }}>
        {title}
        {chevron && (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--color-text-alternative)' }}>
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </h2>
      {right && <span style={{
        fontSize: 14, fontWeight: 500,
        color: 'var(--color-text-default)',
        borderBottom: '1px solid var(--color-text-default)',
        paddingBottom: 1,
      }}>{right}</span>}
    </div>
  );
}

// ─── Token icon ───
function TokenIcon({ kind, size = 22, ticker }) {
  const key = kind === 'btc' ? 'BTC' : kind === 'eth' ? 'ETH' : kind === 'gold' ? 'XAU' : kind;
  return (
    <AssetMark
      keys={[key, ticker]}
      size={size}
      initials={kind === 'gold' ? 'Au' : undefined}
      color={kind === 'gold' ? '#E6B800' : undefined}
    />
  );
}

// ─── Market card carousel ───
function MarketCarousel({ items, dataVariant, radius, cardStyle = 'filled' }) {
  const source = items || MARKET_CARDS;
  const cards = source.map((c) => {
    if (dataVariant === 'redday') return { ...c, trend: 'down', change: -Math.abs(c.change || 0.5) };
    if (dataVariant === 'greenday') return { ...c, trend: 'up', change: Math.abs(c.change || 0.5) };
    return c;
  });
  return (
    <div style={{
      display: 'flex', gap: 12, padding: '0 16px', overflowX: 'auto',
      scrollbarWidth: 'none',
    }}>
      {cards.map((c) => {
        const up = c.change >= 0;
        const color = up ? 'var(--color-success-default)' : 'var(--color-error-default)';
        const showDollar = c.icon === 'btc' || c.icon === 'eth' || c.icon === 'gold' || c.name === 'S&P 500' || c.name === 'Nasdaq 100';
        return (
          <div key={c.name} style={{
            flex: '0 0 120px',
            padding: '16px 16px 18px',
            borderRadius: 12,
            background: cardStyle === 'outline' ? 'transparent' : 'var(--color-background-muted)',
            border: cardStyle === 'outline' ? '1px solid var(--color-border-muted)' : '1px solid transparent',
            display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 14, lineHeight: '22px', fontWeight: 500,
              color: 'var(--color-text-alternative)',
            }}>
              {<TokenIcon kind={c.icon} ticker={c.ticker || c.name} size={16} />}
              <span>{c.name}</span>
            </div>
            <div style={{ height: 44, display: 'flex', alignItems: 'stretch' }}>
              <Sparkline trend={up ? 'up' : 'down'} width="100%" height={44} seed={c.name.length * 7 + c.change * 3} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{
                fontSize: 16, fontWeight: 500, lineHeight: '22px',
                color: 'var(--color-text-default)',
              }}>
                {showDollar ? '$' : ''}{c.value.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
              </div>
              <div style={{
                fontSize: 14, lineHeight: '22px', fontWeight: 500, color,
              }}>
                {up ? '+' : '-'}{Math.abs(c.change).toFixed(2)}%
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Pill rows (N horizontal scroll rows, content-hugging pills) ───
function PillRow({ items, radius, pillStyle, rows = 1 }) {
  const perRow = Math.ceil(items.length / rows);
  const rowsData = Array.from({ length: rows }, (_, r) => items.slice(r * perRow, (r + 1) * perRow));
  return (
    <div style={{
      overflowX: 'auto',
      scrollbarWidth: 'none',
      WebkitOverflowScrolling: 'touch',
    }}>
      <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 8, padding: '0 16px' }}>
        {rowsData.map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: 8, flex: '0 0 auto' }}>
            {row.map((x, i) => (
              <TickerPill key={x.t + i} t={x.t} p={x.p} icon={x.icon} radius={radius} pillStyle={pillStyle} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Pill grid (2 per row) ───
function PillGrid({ items, radius, pillStyle }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: 8,
      padding: '0 16px',
    }}>
      {items.map((x, i) => (
        <TickerPill key={x.t + i} t={x.t} p={x.p} icon={x.icon} radius={radius} pillStyle={pillStyle} />
      ))}
    </div>
  );
}

function PillScrollRows({ items, radius, rows = 2, pillStyle }) {
  return <PillRow items={items} radius={radius} rows={rows} pillStyle={pillStyle} />;
}

// ─── Trade CTA (per-row swap/long/short button) ───
function TradeCTA({ kinds = ['swap'], style = 'text' }) {
  // kinds: 'swap' | 'long' | 'short'
  // style: 'text' | 'icon'
  const config = {
    swap:  { label: 'Swap',  icon: '⇅', color: 'var(--color-text-default)', bg: 'var(--color-background-muted)', fg: 'var(--color-text-default)' },
    long:  { label: 'Long',  icon: '↑', color: '#fff', bg: 'var(--color-success-default)', fg: '#fff' },
    short: { label: 'Short', icon: '↓', color: '#fff', bg: 'var(--color-error-default)',   fg: '#fff' },
  };
  return (
    <div style={{ display: 'flex', gap: 6, flex: '0 0 auto' }}>
      {kinds.map((k) => {
        const c = config[k];
        if (!c) return null;
        const iconMode = style === 'icon';
        return (
          <button
            key={k}
            type="button"
            onClick={(e) => e.stopPropagation()}
            aria-label={c.label}
            style={{
              appearance: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', fontWeight: 600,
              background: c.bg, color: c.fg,
              borderRadius: 9999,
              ...(iconMode
                ? { width: 32, height: 32, fontSize: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0 }
                : { padding: '6px 12px', fontSize: 13, lineHeight: '20px', minHeight: 32 }
              ),
            }}
          >
            {iconMode ? c.icon : c.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Large cap stocks list ───
function LargeCapRow({ item, showBorder, showCta, ctaStyle, ctaKinds = ['swap'], rowStyle = 'default' }) {
  const up = item.change >= 0;
  const color = up ? 'var(--color-success-default)' : 'var(--color-error-default)';
  const iconColor = placeholderTokenColor(item.name);
  const netColor = placeholderTokenColor(item.network + '_net');
  // Truncate title w/ network suffix in parens
  const title = `${item.name} (${item.network === 'ETH' ? 'Ondo' : item.network})`;
  const sparkline = rowStyle === 'sparkline';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '8px 16px',
      borderTop: showBorder ? '1px solid var(--color-border-muted)' : 'none',
    }}>
      {/* Asset icon + network badge — hidden in sparkline style */}
      {!sparkline && (
        <div style={{ position: 'relative', flex: '0 0 44px', width: 44, height: 44 }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            overflow: 'hidden', flex: '0 0 44px',
          }}>
            <AssetMark keys={[item.ticker, item.name]} size={44} color={iconColor} initials={item.name.slice(0, 2).toUpperCase()} />
          </div>
          <div style={{
            position: 'absolute', right: 0, bottom: 0,
            width: 12, height: 12, borderRadius: 4,
            background: netColor,
            border: '2px solid var(--color-background-default)',
            boxSizing: 'content-box',
          }} />
        </div>
      )}

      {/* Title + subtitle */}
      <div style={{ flex: '1 1 auto', minWidth: 0 }}>
        <div style={{
          fontSize: 16, lineHeight: '24px', fontWeight: 500,
          color: 'var(--color-text-default)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{title}</div>
        <div style={{
          marginTop: 2,
          fontSize: 14, lineHeight: '22px', fontWeight: 500,
          color: 'var(--color-text-alternative)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{item.cap} cap · {item.vol} vol</div>
      </div>

      {/* Inline sparkline in the middle (sparkline style only) */}
      {sparkline && (
        <div style={{ flex: '0 0 auto', width: 72, height: 32, display: 'flex', alignItems: 'center' }}>
          <Sparkline trend={up ? 'up' : 'down'} width={72} height={32} seed={item.name.charCodeAt(0)} />
        </div>
      )}

      {/* Right: price + change */}
      <div style={{ textAlign: 'right', flex: '0 0 auto' }}>
        <div style={{
          fontSize: 16, lineHeight: '24px', fontWeight: 500,
          color: 'var(--color-text-default)',
        }}>${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        <div style={{
          marginTop: 2,
          fontSize: 14, lineHeight: '22px', fontWeight: 500, color,
        }}>{up ? '+' : '-'}{Math.abs(item.change).toFixed(2)}%</div>
      </div>
      {showCta && <TradeCTA kinds={ctaKinds} style={ctaStyle} />}
    </div>
  );
}

function LargeCapList({ dataVariant, showCta, ctaStyle, rowStyle }) {
  const list = LARGE_CAPS.map((e) => {
    if (dataVariant === 'redday') return { ...e, change: -Math.abs(e.change) };
    if (dataVariant === 'greenday') return { ...e, change: Math.abs(e.change) };
    return e;
  });
  return (
    <div>
      {list.map((item, i) => (
        <LargeCapRow key={item.name} item={item} showBorder={false} showCta={showCta} ctaStyle={ctaStyle} ctaKinds={['swap']} rowStyle={rowStyle} />
      ))}
    </div>
  );
}

// ─── Earnings list ───
function EarningsList({ copy, dataVariant, rowPad }) {
  const list = EARNINGS.map((e) => {
    if (dataVariant === 'redday') return { ...e, p: -Math.abs(e.p) };
    return e;
  });
  return (
    <div style={{ padding: '0 16px' }}>
      {list.map((e, i) => {
        const up = e.p >= 0;
        const color = up ? 'var(--color-success-default)' : 'var(--color-error-default)';
        return (
          <div key={e.t} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            padding: `${rowPad}px 0`,
            borderTop: i === 0 ? 'none' : '1px solid var(--color-border-muted)',
          }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-text-default)' }}>{e.name}</div>
              <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-family-default)', fontSize: 13, fontWeight: 600 }}>
                <span style={{ color: 'var(--color-text-alternative)' }}>{e.t}</span>
                <Triangle up={up} color={color} size={8} />
                <span style={{ color }}>{e.p >= 0 ? '+' : '-'}{Math.abs(e.p).toFixed(2)}%</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 14, color: 'var(--color-text-default)' }}>{copy.beat}</div>
              <div style={{ fontSize: 13, color: 'var(--color-text-alternative)', marginTop: 4 }}>EPS: ${e.eps.toFixed(2)}</div>
            </div>
          </div>
        );
      })}
      <ShowMore label={copy.showMore} />
    </div>
  );
}

function ShowMore({ label }) {
  return (
    <div style={{ padding: '12px 0 4px' }}>
      <span style={{
        fontSize: 14, fontWeight: 500,
        color: 'var(--color-text-default)',
        borderBottom: '1px solid var(--color-text-default)',
        paddingBottom: 1,
      }}>
        {label} ▾
      </span>
    </div>
  );
}

// ─── Screeners ───
function Screeners({ copy, radius, rowPad }) {
  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px 12px',
      }}>
        <h2 style={{
          fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', margin: 0,
          color: 'var(--color-text-default)', display: 'flex', alignItems: 'center', gap: 6,
        }}>
          {copy.screeners}
          <Icon name="info" size={14} style={{ opacity: 0.6 }} />
        </h2>
        <span style={{
          fontSize: 14, fontWeight: 500, color: 'var(--color-text-default)',
          borderBottom: '1px solid var(--color-text-default)', paddingBottom: 1,
        }}>{copy.create}</span>
      </div>
      <div style={{ padding: '0 16px' }}>
        {SCREENERS.map((s, i) => (
          <div key={s.title} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: `${rowPad}px 0`,
            borderTop: i === 0 ? 'none' : '1px solid var(--color-border-muted)',
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: radius.tile,
              background: s.color, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22,
            }}>{s.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-text-default)' }}>{s.title}</div>
              <div style={{ fontSize: 13, color: 'var(--color-text-alternative)', marginTop: 2, textWrap: 'pretty' }}>{s.desc}</div>
            </div>
            <div style={{ color: 'var(--color-text-alternative)', fontSize: 18 }}>›</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '0 16px' }}>
        <ShowMore label={copy.showMore} />
      </div>
    </div>
  );
}

// ─── Trending lists (avatar + text chip, or list rows) ───
function TrendingListsGrid({ radius, style = 'pill' }) {
  if (style === 'list') {
    return (
      <div style={{ padding: '0 16px' }}>
        {TRENDING_LISTS.map((l) => (
          <div key={l.label} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '8px 0',
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 9999,
              background: l.color, flexShrink: 0,
            }} />
            <span style={{
              flex: 1, minWidth: 0,
              color: 'var(--color-text-default)',
              fontSize: 15, fontWeight: 500,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{l.label}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                 style={{ color: 'var(--color-icon-alternative)', flexShrink: 0 }}>
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', gap: 8, padding: '0 16px',
    }}>
      {TRENDING_LISTS.map((l) => (
        <div key={l.label} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 14px 6px 6px',
          borderRadius: radius.pill,
          background: 'var(--color-background-muted)',
          fontSize: 13, fontWeight: 500,
          whiteSpace: 'nowrap',
        }}>
          <div style={{
            width: 24, height: 24, borderRadius: 9999,
            background: l.color, flexShrink: 0,
          }} />
          <span style={{ color: 'var(--color-text-default)' }}>{l.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── News ───
// ─── News ticker pill (compact) ───
function NewsTickerPill({ t, p, icon }) {
  const up = p >= 0;
  const color = up ? 'var(--color-success-default)' : 'var(--color-error-default)';
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '4px 10px 4px 4px',
      borderRadius: 9999,
      background: 'var(--color-background-muted)',
      fontSize: 13, lineHeight: '18px', fontWeight: 500,
      whiteSpace: 'nowrap',
    }}>
      {icon
        ? <span style={{ marginRight: 2 }}><TokenIcon kind={icon} size={18} /></span>
        : <span style={{
            width: 18, height: 18, borderRadius: '50%',
            background: placeholderTokenColor(t),
            marginRight: 2,
          }} />}
      <span style={{ color: 'var(--color-text-default)' }}>{t}</span>
      <span style={{ color }}>{up ? '+' : '-'}{Math.abs(p).toFixed(2)}%</span>
    </div>
  );
}

// ─── News filter pills + list ───
function NewsList({ rowPad, showInsights = false }) {
  const [filter, setFilter] = React.useState('news');
  // If insights experiment off, force News and hide pills (there's only one option)
  const effectiveFilter = showInsights ? filter : 'news';
  const filtered = NEWS.filter(n => n.kind === effectiveFilter);
  const filters = showInsights ? [
    { value: 'news',     label: 'News' },
    { value: 'insights', label: 'Market insights' },
  ] : [];
  return (
    <div>
      {/* Filter pills — only when experiment on */}
      {filters.length > 0 && (
      <div style={{
        display: 'flex', gap: 8,
        padding: '0 16px 16px',
        overflowX: 'auto', scrollbarWidth: 'none',
      }}>
        {filters.map(f => {
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              style={{
                appearance: 'none', border: 'none', cursor: 'pointer',
                padding: '8px 16px',
                borderRadius: 12,
                fontFamily: 'inherit', fontSize: 14, lineHeight: '22px', fontWeight: 500,
                whiteSpace: 'nowrap', flex: '0 0 auto',
                background: active ? 'var(--color-icon-default)' : 'var(--color-background-muted)',
                color: active ? 'var(--color-background-default)' : 'var(--color-text-alternative)',
              }}
            >{f.label}</button>
          );
        })}
      </div>
      )}

      {/* News rows */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column' }}>
        {filtered.map((n, i) => (
          <article key={i} style={{ padding: '12px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {/* Source line */}
            <div style={{
              fontSize: 14, lineHeight: '22px', fontWeight: 500,
              color: 'var(--color-text-alternative)',
              display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap',
              marginBottom: -4,
            }}>
              <span>{n.source}</span>
              <span>·</span>
              {n.aiGenerated && <>
                <span>AI generated</span>
                <span>·</span>
              </>}
              <span>{n.time}</span>
            </div>

            {/* Headline (body/md regular) */}
            <div style={{
              fontSize: 16, lineHeight: '24px', fontWeight: 400,
              color: 'var(--color-text-default)',
              textWrap: 'pretty',
              marginTop: 0,
            }}>{n.headline}</div>

            {/* Image (if any) */}
            {n.image && (
              <div style={{
                width: '100%', aspectRatio: '16 / 10',
                borderRadius: 12,
                background: `linear-gradient(135deg, var(--color-primary-muted), var(--color-background-section))`,
              }} />
            )}

            {/* Ticker pills */}
            {n.tickers && n.tickers.length > 0 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {n.tickers.map(tk => (
                  <NewsTickerPill key={tk.t} t={tk.t} p={tk.p} icon={tk.icon} />
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

// ─── Other tab placeholder ───
function OtherTabPlaceholder({ tab }) {
  return (
    <div style={{ padding: '48px 32px', textAlign: 'center' }}>
      <div style={{
        width: 56, height: 56, margin: '0 auto 16px',
        borderRadius: 9999, background: 'var(--color-background-section)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22, fontWeight: 600, color: 'var(--color-text-alternative)',
      }}>{tab[0]}</div>
      <h3 style={{ fontSize: 17, fontWeight: 600, margin: 0, marginBottom: 6 }}>{tab}</h3>
      <p style={{ fontSize: 14, color: 'var(--color-text-alternative)', margin: 0, textWrap: 'pretty' }}>
        Content for this tab is coming soon.
      </p>
    </div>
  );
}

// ─── State views ───
function LoadingSkeleton() {
  return (
    <div style={{ padding: '16px' }}>
      <div style={{ height: 18, width: 120, background: 'var(--color-background-muted)', borderRadius: 4, marginBottom: 14 }} />
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        {[0,1,2].map((i) => (
          <div key={i} style={{ flex: 1, height: 130, background: 'var(--color-background-muted)', borderRadius: 12 }} />
        ))}
      </div>
      <div style={{ height: 18, width: 120, background: 'var(--color-background-muted)', borderRadius: 4, marginBottom: 14 }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {[0,1,2,3,4,5].map((i) => (
          <div key={i} style={{ height: 36, background: 'var(--color-background-muted)', borderRadius: 9999 }} />
        ))}
      </div>
    </div>
  );
}

function EmptyState({ copy }) {
  return (
    <div style={{ padding: '64px 32px', textAlign: 'center' }}>
      <div style={{
        width: 56, height: 56, margin: '0 auto 16px',
        borderRadius: 9999, background: 'var(--color-background-muted)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="search" size={24} />
      </div>
      <h3 style={{ fontSize: 17, fontWeight: 600, margin: 0, marginBottom: 6 }}>{copy.emptyTitle}</h3>
      <p style={{ fontSize: 14, color: 'var(--color-text-alternative)', margin: 0, textWrap: 'pretty' }}>{copy.emptyBody}</p>
    </div>
  );
}

function ErrorState({ copy }) {
  return (
    <div style={{ padding: '64px 32px', textAlign: 'center' }}>
      <div style={{
        width: 56, height: 56, margin: '0 auto 16px',
        borderRadius: 9999, background: 'var(--color-error-muted)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--color-error-default)', fontSize: 28, fontWeight: 600,
      }}>!</div>
      <h3 style={{ fontSize: 17, fontWeight: 600, margin: 0, marginBottom: 6 }}>{copy.errorTitle}</h3>
      <p style={{ fontSize: 14, color: 'var(--color-text-alternative)', margin: 0, marginBottom: 16, textWrap: 'pretty' }}>{copy.errorBody}</p>
      <button style={{
        padding: '10px 20px', borderRadius: 9999,
        background: 'var(--color-primary-default)',
        color: 'var(--color-primary-inverse)',
        border: 'none', fontFamily: 'inherit', fontSize: 14, fontWeight: 500,
        cursor: 'pointer',
      }}>Try again</button>
    </div>
  );
}

// ─── Treemap tonal buckets ───
// Three discrete buckets using MMDS success/warning/error tokens.
// Cell bg uses the *-muted token (translucent tint).
// Ticker text uses default text color; % uses the *-default token.
function treemapBucket(p) {
  if (p >= 0.2)  return 'good';
  if (p <= -0.2) return 'bad';
  return 'warn';
}
const TREEMAP_TOKENS = {
  good: { bg: 'var(--color-success-muted)', fg: 'var(--color-success-default)' },
  warn: { bg: 'var(--color-warning-muted)', fg: 'var(--color-warning-default)' },
  bad:  { bg: 'var(--color-error-muted)',   fg: 'var(--color-error-default)'   },
};

// Squarified treemap layout.
// Returns array of { x, y, w, h, item } in the given rect (px).
function squarify(items, x, y, w, h) {
  const total = items.reduce((s, it) => s + it.w, 0);
  const area = w * h;
  const scaled = items.map((it) => ({ ...it, area: (it.w / total) * area }));
  const result = [];

  const worst = (row, len) => {
    const s = row.reduce((a, b) => a + b.area, 0);
    const rMax = Math.max(...row.map(r => r.area));
    const rMin = Math.min(...row.map(r => r.area));
    return Math.max((len * len * rMax) / (s * s), (s * s) / (len * len * rMin));
  };

  let rect = { x, y, w, h };
  let remaining = scaled.slice();
  let row = [];

  while (remaining.length) {
    const shorter = Math.min(rect.w, rect.h);
    const next = remaining[0];
    const newRow = [...row, next];
    if (row.length === 0 || worst(newRow, shorter) <= worst(row, shorter)) {
      row = newRow;
      remaining.shift();
    } else {
      // Emit the current row
      emitRow(row, rect, result);
      // Advance the rect
      const rowArea = row.reduce((s, r) => s + r.area, 0);
      const rowLen = rowArea / shorter;
      if (rect.w >= rect.h) {
        rect = { x: rect.x + rowLen, y: rect.y, w: rect.w - rowLen, h: rect.h };
      } else {
        rect = { x: rect.x, y: rect.y + rowLen, w: rect.w, h: rect.h - rowLen };
      }
      row = [];
    }
  }
  if (row.length) emitRow(row, rect, result);
  return result;
}

function emitRow(row, rect, out) {
  const shorter = Math.min(rect.w, rect.h);
  const rowArea = row.reduce((s, r) => s + r.area, 0);
  const rowLen = rowArea / shorter;
  let offset = 0;
  if (rect.w >= rect.h) {
    // Row stacked vertically, width = rowLen
    for (const r of row) {
      const cellH = r.area / rowLen;
      out.push({ x: rect.x, y: rect.y + offset, w: rowLen, h: cellH, item: r });
      offset += cellH;
    }
  } else {
    // Row stacked horizontally, height = rowLen
    for (const r of row) {
      const cellW = r.area / rowLen;
      out.push({ x: rect.x + offset, y: rect.y, w: cellW, h: rowLen, item: r });
      offset += cellW;
    }
  }
}

// Snap cell edges to a shared grid so columns/rows line up cleanly.
// Clusters near-equal edge values together and rewrites every cell so that
// its left/right/top/bottom pick the cluster representative. Preserves
// overall bounds (0..bw, 0..bh).
function snapCells(cells, bw, bh) {
  if (!cells.length) return cells;
  const tolX = Math.max(4, bw * 0.06);
  const tolY = Math.max(4, bh * 0.06);

  const cluster = (vals, tol, lo, hi) => {
    const sorted = [...new Set(vals)].sort((a, b) => a - b);
    const groups = [];
    for (const v of sorted) {
      const last = groups[groups.length - 1];
      if (last && v - last[last.length - 1] <= tol) last.push(v);
      else groups.push([v]);
    }
    // representative = mean of each group, clamp endpoints to bounds
    const reps = groups.map(g => g.reduce((s, x) => s + x, 0) / g.length);
    if (reps.length) {
      reps[0] = lo;
      reps[reps.length - 1] = hi;
    }
    // map from original value -> representative
    const map = new Map();
    groups.forEach((g, i) => g.forEach(v => map.set(v, reps[i])));
    return map;
  };

  const xs = cells.flatMap(c => [c.x, c.x + c.w]);
  const ys = cells.flatMap(c => [c.y, c.y + c.h]);
  const mapX = cluster(xs, tolX, 0, bw);
  const mapY = cluster(ys, tolY, 0, bh);

  return cells.map(c => {
    const x1 = mapX.get(c.x);
    const x2 = mapX.get(c.x + c.w);
    const y1 = mapY.get(c.y);
    const y2 = mapY.get(c.y + c.h);
    return { ...c, x: x1, y: y1, w: Math.max(0, x2 - x1), h: Math.max(0, y2 - y1) };
  });
}

// ─── Sector treemap card ───
function SectorTreemapCard({ sector, width, height, cardStyle = 'filled' }) {
  // Inner treemap area — leave room for header.
  const HEADER = 40; // text ~24 + 16 padding-bottom
  const PAD = 16;
  const innerW = width - PAD * 2;
  const innerH = height - HEADER - PAD * 2;
  // Iteratively drop the smallest-weight items until every resulting cell is
  // comfortably large enough to show a 4-char ticker + % (≥ 56x40).
  const MIN_W = 56;
  const MIN_H = 40;
  const cells = React.useMemo(() => {
    let items = [...sector.items].sort((a, b) => b.w - a.w).slice(0, 12);
    let out = squarify(items, 0, 0, innerW, innerH);
    let guard = 20;
    while (guard-- > 0 && out.some(c => c.w < MIN_W || c.h < MIN_H) && items.length > 3) {
      items = items.slice(0, -1);
      out = squarify(items, 0, 0, innerW, innerH);
    }
    return snapCells(out, innerW, innerH);
  }, [sector.name, innerW, innerH]);
  const up = sector.overall >= 0;
  const headerColor = up ? 'var(--color-success-default)' : 'var(--color-error-default)';
  const outline = cardStyle === 'outline';
  return (
    <div style={{
      flex: `0 0 ${width}px`,
      width, height,
      padding: PAD,
      boxSizing: 'border-box',
      borderRadius: 16,
      background: outline ? 'transparent' : 'var(--color-background-muted)',
      border: outline ? '1px solid var(--color-border-muted)' : '1px solid transparent',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingBottom: 16,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          fontSize: 16, fontWeight: 500, color: 'var(--color-text-default)',
        }}>
          <span>{sector.name}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--color-text-alternative)' }}>
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          fontSize: 14, fontWeight: 500, color: headerColor,
        }}>
          <Triangle up={up} size={8} color={headerColor} />
          <span>{up ? '+' : '-'}{Math.abs(sector.overall).toFixed(2)}%</span>
        </div>
      </div>
      {/* Treemap */}
      <div style={{ position: 'relative', width: innerW, height: innerH }}>
        {cells.map(({ x, y, w, h, item }) => {
          const bucket = treemapBucket(item.p);
          const { bg, fg } = TREEMAP_TOKENS[bucket];
          const up = item.p >= 0;
          return (
            <div key={item.t} style={{
              position: 'absolute',
              left: x + 1, top: y + 1,
              width: Math.max(0, w - 2),
              height: Math.max(0, h - 2),
              borderRadius: 12,
              background: bg,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
              padding: '4px 6px',
              boxSizing: 'border-box',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: 12, lineHeight: 1.25, fontWeight: 500,
                letterSpacing: '-0.01em', whiteSpace: 'nowrap',
                color: 'var(--color-text-default)',
                maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>{item.t}</div>
              <div style={{
                fontSize: 12, lineHeight: 1.25, fontWeight: 500,
                marginTop: 2, whiteSpace: 'nowrap',
                color: fg,
              }}>
                {up ? '+' : '-'}{Math.abs(item.p).toFixed(2)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Sector treemap carousel ───
function SectorTreemapCarousel({ cardStyle }) {
  return (
    <div style={{
      display: 'flex', gap: 12, padding: '0 16px', overflowX: 'auto',
      scrollbarWidth: 'none',
    }}>
      {SECTORS.map((s) => (
        <SectorTreemapCard key={s.name} sector={s} width={338} height={280} cardStyle={cardStyle} />
      ))}
    </div>
  );
}

// ─── Futures pill (full-label filled pill with triangle + %) ───
function FuturesPill({ t, p, pillStyle = 'filled' }) {
  const up = p >= 0;
  const color = up ? 'var(--color-success-default)' : 'var(--color-error-default)';
  const outline = pillStyle === 'outline';
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '8px 14px',
      borderRadius: 9999,
      background: outline ? 'transparent' : 'var(--color-background-muted)',
      border: outline ? '1px solid var(--color-border-muted)' : '1px solid transparent',
      fontSize: 14, lineHeight: '22px', fontWeight: 500,
      whiteSpace: 'nowrap', flex: '0 0 auto',
      color: 'var(--color-text-alternative)',
    }}>
      <span>{t}</span>
      <Triangle up={up} size={8} color={color} />
      <span style={{ color }}>{p >= 0 ? '+' : '-'}{Math.abs(p).toFixed(2)}%</span>
    </div>
  );
}

function FuturesPillRows({ items, rows = 2, pillStyle }) {
  const perRow = Math.ceil(items.length / rows);
  const rowsData = Array.from({ length: rows }, (_, r) => items.slice(r * perRow, (r + 1) * perRow));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {rowsData.map((row, ri) => (
        <div key={ri} style={{
          display: 'flex', gap: 8, padding: '0 16px', overflowX: 'auto',
          scrollbarWidth: 'none',
        }}>
          {row.map((x, i) => (
            <FuturesPill key={x.t + i} t={x.t} p={x.p} pillStyle={pillStyle} />
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── Crypto & RWA data ───
const CRYPTO_MARKET_CARDS = [
  { name: 'Bitcoin',  ticker: 'BTC',  value: 99824.12, trend: 'down', change: -1.24, icon: 'btc' },
  { name: 'XRP',      ticker: 'XRP',  value:     2.47, trend: 'up',   change:  3.08, iconColor: '#111' },
  { name: 'Ethereum', ticker: 'ETH',  value:  3281.44, trend: 'up',   change:  0.88, icon: 'eth' },
  { name: 'Solana',   ticker: 'SOL',  value:   156.02, trend: 'down', change: -0.64, iconColor: '#9945FF' },
];

const CRYPTO_TOP_MOVERS = [
  { t: 'CHIP',   p:  44.37 },
  { t: 'AVNT',   p:  30.06 },
  { t: 'AERO',   p:  22.93 },
  { t: 'PENGU',  p:  19.12 },
  { t: 'SEI',    p:  15.88 },
  { t: 'ZRO',    p:  12.55 },
  { t: 'MNT',    p:  10.14 },
  { t: 'POPCAT', p:   8.72 },
  { t: 'PYTH',   p:   7.38 },
  { t: 'TIA',    p:   5.21 },
];

const PREDICTION_MARKETS = [
  {
    category: 'Politics',
    question: 'Will Donald Trump pardon Sam Bankman-Fried in 2026?',
    outcomes: [
      { label: 'Yes', pct: 12, up: true },
      { label: 'No',  pct: 88, up: false },
    ],
  },
];

const TRENDING_TOKENS = {
  Tradable: [
    { name: 'Bitcoin',          ticker: 'BTC',   icon: 'btc',  network: 'ETH',  price: 99824.12, change: -1.24, cap: '$1.9T',  vol: '$38.2B' },
    { name: 'Ethereum',         ticker: 'ETH',   icon: 'eth',  network: 'ETH',  price:  3281.44, change:  0.88, cap: '$395B',  vol: '$14.1B' },
    { name: 'Solana',           ticker: 'SOL',   color: '#9945FF', network: 'SOL',  price: 156.02, change: -0.64, cap: '$72.3B', vol: '$3.4B'  },
    { name: 'Chainlink',        ticker: 'LINK',  color: '#2A5ADA', network: 'ETH',  price:  17.84, change:  2.11, cap: '$11.2B', vol: '$842M'  },
    { name: 'Arbitrum',         ticker: 'ARB',   color: '#28A0F0', network: 'ARB',  price:   0.84, change: -3.67, cap: '$3.4B',  vol: '$218M'  },
    { name: 'Aave',             ticker: 'AAVE',  color: '#B6509E', network: 'ETH',  price: 298.11, change:  5.22, cap: '$4.5B',  vol: '$312M'  },
    { name: 'Uniswap',          ticker: 'UNI',   color: '#FF007A', network: 'ETH',  price:  13.07, change:  1.48, cap: '$7.9B',  vol: '$184M'  },
    { name: 'Polygon',          ticker: 'POL',   color: '#8247E5', network: 'MATIC',price:   0.54, change: -1.02, cap: '$5.1B',  vol: '$176M'  },
  ],
  Futures: [
    { name: 'BTC Perp',   ticker: 'BTC-PERP', icon: 'btc', network: 'ETH',  price: 99824.12, change:  2.12, cap: 'OI $8.2B',   vol: '$62.4B' },
    { name: 'ETH Perp',   ticker: 'ETH-PERP', icon: 'eth', network: 'ETH',  price:  3281.44, change:  1.45, cap: 'OI $3.1B',   vol: '$19.8B' },
    { name: 'SOL Perp',   ticker: 'SOL-PERP', color: '#9945FF', network: 'SOL',  price: 156.02, change: -0.91, cap: 'OI $680M', vol: '$4.2B'  },
    { name: 'DOGE Perp',  ticker: 'DOGE-PERP', color: '#C2A633', network: 'ETH', price: 0.38, change: 3.77, cap: 'OI $420M', vol: '$2.1B' },
  ],
  'Recently added': [
    { name: 'BERA',      ticker: 'BERA',  color: '#814625', network: 'BERA', price: 4.21, change:  18.44, cap: '$510M',  vol: '$78M'  },
    { name: 'Tornado',   ticker: 'TRNDO', color: '#7C3AED', network: 'ETH',  price: 0.14, change:  -4.11, cap: '$41M',   vol: '$9.2M' },
    { name: 'Movement',  ticker: 'MOVE',  color: '#0EA5E9', network: 'MOVE', price: 1.02, change:  12.81, cap: '$220M',  vol: '$38M'  },
    { name: 'Hyperbol',  ticker: 'HYPE',  color: '#22C55E', network: 'ETH',  price: 0.62, change:   6.07, cap: '$88M',   vol: '$14M'  },
  ],
  DeFi: [
    { name: 'Aave',             ticker: 'AAVE',  color: '#B6509E', network: 'ETH',  price: 298.11, change:  5.22, cap: '$4.5B',  vol: '$312M' },
    { name: 'Uniswap',          ticker: 'UNI',   color: '#FF007A', network: 'ETH',  price:  13.07, change:  1.48, cap: '$7.9B',  vol: '$184M' },
    { name: 'Maker',            ticker: 'MKR',   color: '#1AAB9B', network: 'ETH',  price: 1912.4, change: -0.78, cap: '$1.7B',  vol: '$62M'  },
    { name: 'Compound',         ticker: 'COMP',  color: '#00D395', network: 'ETH',  price:  61.20, change:  2.04, cap: '$520M',  vol: '$28M'  },
    { name: 'Curve',            ticker: 'CRV',   color: '#FF0000', network: 'ETH',  price:   0.51, change: -1.32, cap: '$680M',  vol: '$42M'  },
    { name: 'Lido Finance',     ticker: 'LDO',   color: '#F69988', network: 'ETH',  price:   1.48, change:  0.88, cap: '$1.4B',  vol: '$48M'  },
  ],
};

const RWA_MARKET_CARDS = [
  { name: 'Apple',    ticker: 'AAPL',  value: 263.82, trend: 'up',   change:  12.31, iconColor: '#1C1C1C' },
  { name: 'NVIDIA',   ticker: 'NVDA',  value: 143.14, trend: 'up',   change:   0.21, iconColor: '#76B900' },
  { name: 'Tesla',    ticker: 'TSLA',  value: 328.44, trend: 'down', change:  -0.54, iconColor: '#E31937' },
  { name: 'Coinbase', ticker: 'COIN',  value: 308.21, trend: 'up',   change:   4.82, iconColor: '#0052FF' },
];

const RWA_TOP_MOVERS = [
  { t: 'AAPL',  p:  12.31 },
  { t: 'COIN',  p:   4.82 },
  { t: 'AMZN',  p:   1.08 },
  { t: 'GOOGL', p:   0.81 },
  { t: 'BRK.B', p:   0.32 },
  { t: 'NVDA',  p:   0.21 },
  { t: 'MSFT',  p:  -0.02 },
  { t: 'META',  p:  -0.20 },
  { t: 'TSLA',  p:  -0.54 },
  { t: 'TXN',   p:  -1.31 },
];

const RWA_STOCKS = [
  { name: 'Apple',             ticker: 'AAPL',  color: '#1C1C1C', network: 'ETH',  price: 263.82, change:  12.31, cap: '$212B', vol: '$11.5M' },
  { name: 'NVIDIA',            ticker: 'NVDA',  color: '#76B900', network: 'SOL',  price: 143.14, change:   0.21, cap: '$3.5T', vol: '$48.6M' },
  { name: 'Tesla',             ticker: 'TSLA',  color: '#E31937', network: 'ETH',  price: 328.44, change:  -0.54, cap: '$1.0T', vol: '$24.1M' },
  { name: 'Microsoft',         ticker: 'MSFT',  color: '#0078D4', network: 'ETH',  price: 417.02, change:  -0.02, cap: '$3.1T', vol: '$14.8M' },
  { name: 'Amazon',            ticker: 'AMZN',  color: '#FF9900', network: 'ETH',  price: 228.71, change:   1.08, cap: '$2.4T', vol: '$19.2M' },
  { name: 'Alphabet',          ticker: 'GOOGL', color: '#4285F4', network: 'ARB',  price: 205.14, change:   0.81, cap: '$2.5T', vol: '$12.3M' },
  { name: 'Meta',              ticker: 'META',  color: '#1877F2', network: 'ETH',  price: 612.38, change:  -0.20, cap: '$1.5T', vol: '$8.7M'  },
  { name: 'Coinbase',          ticker: 'COIN',  color: '#0052FF', network: 'ETH',  price: 308.21, change:   4.82, cap: '$77B',  vol: '$6.4M'  },
  { name: 'Texas Instruments', ticker: 'TXN',   color: '#CC0000', network: 'ETH',  price: 198.54, change:  -1.31, cap: '$182B', vol: '$4.1M'  },
  { name: 'Berkshire Hathaway',ticker: 'BRK.B', color: '#0C2340', network: 'MATIC',price: 472.11, change:   0.32, cap: '$1.0T', vol: '$3.8M'  },
];

const PERPS_COMMODITIES = [
  { ticker: 'BTC',     leverage: 40, icon: 'btc',   color: '#F7931A', price: 78121,   change:  0.26, vol: '$2.66B'   },
  { ticker: 'ETH',     leverage: 25, icon: 'eth',   color: '#FFFFFF', price: 2351.8,  change: -1.60, vol: '$936.39M' },
  { ticker: 'CL',      leverage: 20, color: '#1A1A1A', glyph: '💧',   price: 94.489,  change:  6.33, vol: '$712.53M' },
  { ticker: 'SP500',   leverage: 50, color: '#E31937', glyph: 'S&P',  price: 7105.6,  change:  0.02, vol: '$306.47M' },
  { ticker: 'BRENTOIL',leverage: 20, color: '#1A1A1A', glyph: '💧',   price: 97.433,  change:  5.26, vol: '$282.24M' },
];
const PERPS_STOCKS = [
  { ticker: 'AAPL',  leverage: 25, color: '#1C1C1C', glyph: '',   price: 263.82, change:  12.31, vol: '$112.4M' },
  { ticker: 'NVDA',  leverage: 20, color: '#76B900', glyph: '',   price: 143.14, change:   0.21, vol: '$88.1M'  },
  { ticker: 'TSLA',  leverage: 25, color: '#E31937', glyph: '',   price: 328.44, change:  -0.54, vol: '$64.2M'  },
  { ticker: 'MSFT',  leverage: 20, color: '#0078D4', glyph: '',   price: 417.02, change:  -0.02, vol: '$41.7M'  },
  { ticker: 'AMZN',  leverage: 25, color: '#FF9900', glyph: '',   price: 228.71, change:   1.08, vol: '$38.9M'  },
];
const PERPS_FOREX = [
  { ticker: 'EUR/USD', leverage: 100, color: '#003399', glyph: '€',  price: 1.0854, change:  0.14, vol: '$412.3M' },
  { ticker: 'GBP/USD', leverage: 100, color: '#C8102E', glyph: '£',  price: 1.2743, change: -0.22, vol: '$287.6M' },
  { ticker: 'USD/JPY', leverage: 100, color: '#BC002D', glyph: '¥',  price: 152.08, change:  0.31, vol: '$198.4M' },
  { ticker: 'AUD/USD', leverage: 50,  color: '#FFD700', glyph: 'A$', price: 0.6521, change: -0.08, vol: '$94.1M'  },
  { ticker: 'USD/CHF', leverage: 50,  color: '#D52B1E', glyph: '₣',  price: 0.9012, change:  0.18, vol: '$76.5M'  },
];

// ─── Sites data ───
const RECENT_SITES = [
  { name: 'Uniswap',        host: 'app.uniswap.org',       category: 'DEX',      color: '#FF007A', glyph: 'U' },
  { name: 'Aave',           host: 'app.aave.com',          category: 'Lending',  color: '#B6509E', glyph: 'A' },
  { name: 'OpenSea',        host: 'opensea.io',            category: 'NFT',      color: '#2081E2', glyph: 'O' },
  { name: 'Lido',           host: 'stake.lido.fi',         category: 'Staking',  color: '#00A3FF', glyph: 'L' },
  { name: 'Polymarket',     host: 'polymarket.com',        category: 'Markets',  color: '#3B82F6', glyph: 'P' },
];

const RANKED_SITES = [
  { rank: 1,  name: 'Uniswap',     host: 'app.uniswap.org',    category: 'DEX',       network: 'ETH', color: '#FF007A', glyph: 'U', users: '1.2M',  change:  4.2 },
  { rank: 2,  name: 'Aave',        host: 'app.aave.com',       category: 'Lending',   network: 'ETH', color: '#B6509E', glyph: 'A', users: '612K',  change:  1.8 },
  { rank: 3,  name: 'Lido',        host: 'stake.lido.fi',      category: 'Staking',   network: 'ETH', color: '#00A3FF', glyph: 'L', users: '548K',  change: -0.6 },
  { rank: 4,  name: 'OpenSea',     host: 'opensea.io',         category: 'NFT',       network: 'ETH', color: '#2081E2', glyph: 'O', users: '431K',  change:  8.3 },
  { rank: 5,  name: 'PancakeSwap', host: 'pancakeswap.finance',category: 'DEX',       network: 'BSC', color: '#F9A81C', glyph: 'P', users: '389K',  change:  2.1 },
  { rank: 6,  name: 'Polymarket',  host: 'polymarket.com',     category: 'Markets',   network: 'POL', color: '#3B82F6', glyph: 'P', users: '276K',  change: 12.4 },
  { rank: 7,  name: 'Jupiter',     host: 'jup.ag',             category: 'Aggregator',network: 'SOL', color: '#C2A56C', glyph: 'J', users: '241K',  change:  5.7 },
  { rank: 8,  name: 'Curve',       host: 'curve.fi',           category: 'DEX',       network: 'ETH', color: '#FF0000', glyph: 'C', users: '204K',  change: -1.2 },
  { rank: 9,  name: 'Blur',        host: 'blur.io',            category: 'NFT',       network: 'ETH', color: '#FF6B00', glyph: 'B', users: '178K',  change:  3.4 },
  { rank: 10, name: 'GMX',         host: 'gmx.io',             category: 'Perps',     network: 'ARB', color: '#2D42FC', glyph: 'G', users: '154K',  change:  6.8 },
];

// Network badge colors (placeholder)
const NETWORK_COLORS = {
  ETH:   '#627EEA',
  SOL:   '#9945FF',
  ARB:   '#28A0F0',
  MATIC: '#8247E5',
  BERA:  '#814625',
  MOVE:  '#0EA5E9',
  Ondo:  '#F4B323',
};

// ─── Filter pill (dropdown-style with caret) ───
// ─── MMDS FilterButton (variant primary|secondary, size Sm|Md|Lg) ───
function FilterButton({
  label,
  onClick,
  isSelected = false,
  variant = 'primary',
  size = 'Md',
  endIcon = false,
}) {
  const height = size === 'Lg' ? 48 : size === 'Sm' ? 32 : 40;
  const radius = size === 'Sm' ? 8 : 12;
  const fontSize = size === 'Sm' ? 14 : 16;
  const lineHeight = size === 'Sm' ? '22px' : '24px';
  const primaryOn = variant === 'primary' && isSelected;
  const secondaryOn = variant === 'secondary' && isSelected;
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        appearance: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        height,
        padding: endIcon ? '0 12px 0 14px' : '0 12px',
        boxSizing: 'border-box',
        border: 'none',
        borderRadius: radius,
        background: primaryOn
          ? 'var(--color-icon-default)'
          : secondaryOn
            ? 'var(--color-background-muted)'
            : 'transparent',
        color: primaryOn ? 'var(--color-icon-inverse)' : 'var(--color-text-default)',
        fontFamily: 'var(--font-family-default)',
        fontSize,
        lineHeight,
        fontWeight: 500,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      <span>{label}</span>
      {endIcon && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
}

function FilterPill({ label, onClick, hideChevron, active, selected, size = 'Sm' }) {
  const on = active || selected;
  return (
    <FilterButton
      label={label}
      onClick={onClick}
      size={size}
      variant={on ? 'primary' : 'secondary'}
      isSelected
      endIcon={!hideChevron}
    />
  );
}

function FilterBar({ filters, size = 'Sm' }) {
  return (
    <div style={{
      display: 'flex', gap: 8, padding: '0 16px',
      overflowX: 'auto', scrollbarWidth: 'none',
    }}>
      {filters.map((f, i) => (
        <FilterButton
          key={i}
          label={f.label}
          onClick={f.onClick}
          size={f.size || size}
          variant={f.active ? 'primary' : 'secondary'}
          isSelected
        />
      ))}
    </div>
  );
}

// ─── Token row (crypto + RWA) ───
function TokenRow({ item, showBorder, showCta, ctaStyle, rowStyle = 'default' }) {
  const up = item.change >= 0;
  const color = up ? 'var(--color-success-default)' : 'var(--color-error-default)';
  const netColor = NETWORK_COLORS[item.network] || placeholderTokenColor(item.network || 'x');
  const iconBg = item.color || placeholderTokenColor(item.name);
  const sparkline = rowStyle === 'sparkline';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '8px 16px',
      borderTop: showBorder ? '1px solid var(--color-border-muted)' : 'none',
    }}>
      {/* Asset icon + network badge — hidden in sparkline style */}
      {!sparkline && (
        <div style={{ position: 'relative', flex: '0 0 40px', width: 40, height: 40 }}>
          <AssetMark
            keys={[item.icon === 'btc' ? 'BTC' : item.icon === 'eth' ? 'ETH' : item.icon, item.ticker, item.name]}
            size={40}
            color={iconBg}
            initials={item.ticker.slice(0, 3)}
          />
          <div style={{
            position: 'absolute', right: 0, bottom: 0,
            width: 12, height: 12, borderRadius: 4,
            background: netColor,
            border: '2px solid var(--color-background-default)',
            boxSizing: 'content-box',
          }} />
        </div>
      )}
      {/* Middle: name + cap/vol */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{
          fontSize: 16, lineHeight: '24px', fontWeight: 500,
          color: 'var(--color-text-default)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{item.name}{item.suffix ? ` (${item.suffix})` : ''}</div>
        <div style={{
          fontSize: 14, lineHeight: '22px', fontWeight: 500,
          color: 'var(--color-text-alternative)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {item.cap} • {item.vol}
        </div>
      </div>
      {/* Inline sparkline */}
      {sparkline && (
        <div style={{ flex: '0 0 auto', width: 72, height: 32, display: 'flex', alignItems: 'center' }}>
          <Sparkline trend={up ? 'up' : 'down'} width={72} height={32} seed={item.ticker.charCodeAt(0)} />
        </div>
      )}
      {/* Trailing: price + % */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
        <div style={{
          fontSize: 16, lineHeight: '24px', fontWeight: 500,
          color: 'var(--color-text-default)',
        }}>
          ${item.price.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
        </div>
        <div style={{
          fontSize: 14, lineHeight: '22px', fontWeight: 500, color,
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <Triangle up={up} size={8} color={color} />
          <span>{item.change >= 0 ? '+' : '-'}{Math.abs(item.change).toFixed(2)}%</span>
        </div>
      </div>
      {showCta && <TradeCTA kinds={['swap']} style={ctaStyle} />}
    </div>
  );
}

// ─── Token list (stack of TokenRows with dividers) ───
function TokenList({ items, showCta, ctaStyle, rowStyle }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {items.map((item, i) => (
        <TokenRow key={item.ticker + i} item={item} showBorder={false} showCta={showCta} ctaStyle={ctaStyle} rowStyle={rowStyle} />
      ))}
    </div>
  );
}

// ─── Perpetuals row + list ───
function PerpRow({ item, showCta, ctaStyle, rowStyle = 'default' }) {
  const up = item.change >= 0;
  const color = up ? 'var(--color-success-default)' : 'var(--color-error-default)';
  const sign = up ? '+' : '';
  const priceStr = item.price >= 1000
    ? item.price.toLocaleString(undefined, { maximumFractionDigits: 1 })
    : item.price.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 4 });
  const sparkline = rowStyle === 'sparkline';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '8px 16px',
    }}>
      {!sparkline && (
        <div style={{ flex: '0 0 40px', width: 40, height: 40 }}>
          <AssetMark
            keys={[item.icon === 'btc' ? 'BTC' : item.icon === 'eth' ? 'ETH' : item.icon, item.ticker, item.name]}
            size={40}
            color={item.color || '#1A1A1A'}
            initials={item.glyph || item.ticker.slice(0, 1)}
          />
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16, lineHeight: '24px', fontWeight: 500, color: 'var(--color-text-default)' }}>
            {item.ticker}
          </span>
          <span style={{
            fontSize: 12, fontWeight: 500,
            color: 'var(--color-text-alternative)',
            background: 'var(--color-background-muted)',
            padding: '2px 8px', borderRadius: 9999,
            lineHeight: '16px',
          }}>
            {item.leverage}x
          </span>
        </div>
        <div style={{ fontSize: 14, lineHeight: '22px', fontWeight: 500, color: 'var(--color-text-alternative)' }}>
          {item.vol} Vol
        </div>
      </div>
      {sparkline && (
        <div style={{ flex: '0 0 auto', width: 72, height: 32, display: 'flex', alignItems: 'center' }}>
          <Sparkline trend={up ? 'up' : 'down'} width={72} height={32} seed={item.ticker.charCodeAt(0)} />
        </div>
      )}
      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ fontSize: 16, lineHeight: '24px', fontWeight: 500, color: 'var(--color-text-default)', fontVariantNumeric: 'tabular-nums' }}>
          ${priceStr}
        </div>
        <div style={{ fontSize: 14, lineHeight: '22px', color, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
          {sign}{item.change.toFixed(2)}%
        </div>
      </div>
      {showCta && <TradeCTA kinds={['long', 'short']} style={ctaStyle} />}
    </div>
  );
}

function PerpList({ items, showCta, ctaStyle, rowStyle }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {items.map((it, i) => <PerpRow key={it.ticker + i} item={it} showCta={showCta} ctaStyle={ctaStyle} rowStyle={rowStyle} />)}
    </div>
  );
}

// ─── Sites ───
function SiteIcon({ site, size = 48 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 12,
      background: site.color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontSize: size * 0.45, fontWeight: 700, flexShrink: 0,
    }}>
      {site.glyph || site.name.slice(0, 1)}
    </div>
  );
}

function RecentSiteCard({ site, cardStyle = 'filled' }) {
  const outline = cardStyle === 'outline';
  return (
    <div style={{
      flex: '0 0 160px',
      padding: 12,
      borderRadius: 16,
      background: outline ? 'transparent' : 'var(--color-background-muted)',
      border: outline ? '1px solid var(--color-border-muted)' : '1px solid transparent',
      display: 'flex', flexDirection: 'column', gap: 10,
      cursor: 'pointer',
    }}>
      <SiteIcon site={site} size={48} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
        <div style={{
          fontSize: 16, lineHeight: '24px', fontWeight: 500,
          color: 'var(--color-text-default)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {site.name}
        </div>
        <div style={{
          fontSize: 14, lineHeight: '22px', fontWeight: 500,
          color: 'var(--color-text-alternative)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {site.category}
        </div>
      </div>
    </div>
  );
}

function RecentSitesCarousel({ sites, cardStyle }) {
  return (
    <div style={{
      display: 'flex', gap: 12, padding: '0 16px',
      overflowX: 'auto', scrollbarWidth: 'none',
    }}>
      {sites.map((s) => <RecentSiteCard key={s.name} site={s} cardStyle={cardStyle} />)}
    </div>
  );
}

function SiteRow({ site }) {
  const up = site.change >= 0;
  const color = up ? 'var(--color-success-default)' : 'var(--color-error-default)';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '8px 16px',
    }}>
      <div style={{ width: 20, fontSize: 14, lineHeight: '22px', fontWeight: 500, color: 'var(--color-text-alternative)', fontVariantNumeric: 'tabular-nums' }}>
        {site.rank}
      </div>
      <SiteIcon site={site} size={40} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{
          fontSize: 16, lineHeight: '24px', fontWeight: 500,
          color: 'var(--color-text-default)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {site.name}
        </div>
        <div style={{
          fontSize: 14, lineHeight: '22px', fontWeight: 500,
          color: 'var(--color-text-alternative)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {site.category} · {site.users} users
        </div>
      </div>
      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ fontSize: 14, lineHeight: '22px', fontWeight: 500, color, fontVariantNumeric: 'tabular-nums' }}>
          {up ? '+' : ''}{site.change.toFixed(1)}%
        </div>
      </div>
    </div>
  );
}

function SiteList({ sites }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {sites.map((s) => <SiteRow key={s.rank + s.name} site={s} />)}
    </div>
  );
}

// ─── Sub-tab bar (Tradable / Futures / Recently added / DeFi) ───
function SubTabBar({ tabs, active, onChange }) {
  return (
    <div style={{
      display: 'flex', gap: 8, padding: '0 16px 16px',
      overflowX: 'auto', scrollbarWidth: 'none',
    }}>
      {tabs.map((t) => {
        const isActive = t === active;
        return (
          <button
            key={t}
            type="button"
            onClick={() => onChange(t)}
            style={{
              padding: '8px 16px',
              borderRadius: 12,
              border: 'none',
              background: isActive ? 'var(--color-icon-default)' : 'var(--color-background-muted)',
              color: isActive ? 'var(--color-background-default)' : 'var(--color-text-default)',
              fontFamily: 'var(--font-family-default)',
              fontSize: 14, lineHeight: '22px', fontWeight: 500,
              cursor: 'pointer', whiteSpace: 'nowrap',
            }}
          >{t}</button>
        );
      })}
    </div>
  );
}

// ─── Prediction market card ───
function PredictionMarketEmpty({ cardStyle = 'filled' }) {
  const outline = cardStyle === 'outline';
  return (
    <div style={{
      margin: '0 16px',
      padding: '28px 20px',
      borderRadius: 16,
      background: outline ? 'transparent' : 'var(--color-background-muted)',
      border: outline ? '1px dashed var(--color-border-muted)' : '1px dashed var(--color-border-muted)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      textAlign: 'center',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 12,
        background: 'var(--color-background-default)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid var(--color-border-muted)',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-icon-alternative)' }}/>
        </svg>
      </div>
      <div style={{
        fontSize: 15, lineHeight: '22px', fontWeight: 500,
        color: 'var(--color-text-default)',
      }}>No markets yet</div>
      <div style={{
        fontSize: 13, lineHeight: '18px', fontWeight: 500,
        color: 'var(--color-text-alternative)',
        maxWidth: 260, textWrap: 'pretty',
      }}>Featured prediction markets will appear here once they're defined.</div>
    </div>
  );
}

function PredictionMarketCard({ market, cardStyle = 'filled' }) {
  const outline = cardStyle === 'outline';
  return (
    <div style={{
      margin: '0 16px',
      padding: 16,
      borderRadius: 16,
      background: outline ? 'transparent' : 'var(--color-background-muted)',
      border: outline ? '1px solid var(--color-border-muted)' : '1px solid transparent',
    }}>
      <div style={{
        fontSize: 12, lineHeight: '16px', fontWeight: 500,
        color: 'var(--color-text-alternative)',
        textTransform: 'uppercase', letterSpacing: '0.04em',
        marginBottom: 8,
      }}>{market.category}</div>
      <div style={{
        fontSize: 16, lineHeight: '24px', fontWeight: 500,
        color: 'var(--color-text-default)',
        marginBottom: 14, textWrap: 'pretty',
      }}>{market.question}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {market.outcomes.map((o, i) => {
          const color = o.up ? 'var(--color-success-default)' : 'var(--color-error-default)';
          const track = o.up ? 'var(--color-success-muted)' : 'var(--color-error-muted)';
          return (
            <div key={i} style={{ position: 'relative', height: 36, borderRadius: 10, overflow: 'hidden', background: 'var(--color-background-default)', border: '1px solid var(--color-border-muted)' }}>
              <div style={{
                position: 'absolute', inset: 0,
                width: `${o.pct}%`, background: track,
              }} />
              <div style={{
                position: 'relative', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 12px',
                fontSize: 14, lineHeight: '22px', fontWeight: 500,
                color: 'var(--color-text-default)',
              }}>
                <span>{o.label}</span>
                <span style={{ color }}>{o.pct}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Traders ───
function TraderAvatar({ trader, size = 64 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `radial-gradient(circle at 30% 30%, ${trader.avatar}aa, ${trader.avatar} 70%)`,
      flexShrink: 0,
    }} />
  );
}

function FollowButton({ status, onClick }) {
  const following = status === 'following';
  return (
    <button onClick={onClick} style={{
      padding: '8px 16px', borderRadius: 12, border: 'none',
      fontFamily: 'var(--font-family-default)',
      fontSize: 14, lineHeight: '22px', fontWeight: 500,
      background: following ? 'var(--color-background-muted)' : '#4459FF',
      color: following ? 'var(--color-text-alternative)' : '#FFFFFF',
      cursor: 'pointer', whiteSpace: 'nowrap',
    }}>{following ? 'Following' : 'Follow'}</button>
  );
}

function TopTradersCarousel({ traders, cardStyle = 'filled', onToggle }) {
  return (
    <div style={{ display: 'flex', gap: 12, padding: '0 16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
      {traders.map((t) => (
        <div key={t.name} style={{
          flex: '0 0 140px',
          padding: 16, borderRadius: 12,
          background: cardStyle === 'outline' ? 'transparent' : 'var(--color-background-muted)',
          border: cardStyle === 'outline' ? '1px solid var(--color-border-muted)' : '1px solid transparent',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        }}>
          <TraderAvatar trader={t} size={64} />
          <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--color-text-default)' }}>{t.name}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, fontSize: 14, fontWeight: 500 }}>
            <span style={{ color: 'var(--color-success-default)' }}>+${(t.pnl/1000).toFixed(1)}K</span>
            <span style={{ color: 'var(--color-text-alternative)', fontSize: 12 }}>30D</span>
          </div>
          <FollowButton status={t.status} onClick={() => onToggle && onToggle(t.name)} />
        </div>
      ))}
    </div>
  );
}

function TradersList({ traders, onToggle }) {
  return (
    <div style={{ padding: '0 16px' }}>
      {traders.map((t, i) => (
        <div key={t.name} style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0',
        }}>
          <div style={{ width: 20, fontSize: 14, color: 'var(--color-text-alternative)', fontVariantNumeric: 'tabular-nums' }}>{i + 1}.</div>
          <TraderAvatar trader={t} size={40} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--color-text-default)' }}>{t.name}</div>
            <div style={{ fontSize: 13, display: 'flex', alignItems: 'baseline', gap: 4, flexWrap: 'wrap' }}>
              <span style={{ color: 'var(--color-success-default)', fontWeight: 500 }}>+{t.pct.toFixed(1)}%</span>
              <span style={{ color: 'var(--color-text-alternative)' }}>·</span>
              <span style={{ color: 'var(--color-success-default)', fontWeight: 500 }}>+${(t.pnl/1000).toFixed(2)}K</span>
              <span style={{ color: 'var(--color-text-alternative)', fontSize: 12 }}>30D</span>
            </div>
          </div>
          <FollowButton status={t.status} onClick={() => onToggle && onToggle(t.name)} />
        </div>
      ))}
    </div>
  );
}

// ─── The Explore screen ───
function ExploreScreen({ state, setState, topInset = 0 }) {
  const copy = COPY[state.copyVariant] || COPY.default;
  const density = DENSITY[state.density] || DENSITY.default;
  const radius = RADIUS[state.radius] || RADIUS.default;
  const isProd = state.version === 'prod';
  const nextTabs = TABS.filter((t) => t !== 'Traders' || getExperiment(state, 'Global', 'tradersTab'));
  const searchOpen = isProd && !!state.prodSearchOpen;

  React.useEffect(() => {
    if (isProd && (state.activeTab === 'Traders' || !PROD_TABS.includes(state.activeTab))) {
      setState({ activeTab: 'Now' });
    }
  }, [isProd, state.activeTab]);

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: 'var(--color-background-default)',
      color: 'var(--color-text-default)',
      fontFamily: 'var(--font-family-default)',
    }}>
      {isProd ? (
        <ProdHeader
          activeTab={state.activeTab}
          onTabChange={(t) => setState({ activeTab: t })}
          topInset={topInset}
          showSearch={state.showSearch}
          showTabs={state.showTabs}
          searchOpen={searchOpen}
          searchQuery={state.prodSearchQuery || ''}
          onSearchQuery={(v) => setState({ prodSearchQuery: v })}
          onSearchOpen={() => setState({ prodSearchOpen: true, prodSearchFilter: state.prodSearchFilter || 'All' })}
          onSearchCancel={() => setState({ prodSearchOpen: false, prodSearchQuery: '' })}
          searchFilter={state.prodSearchFilter || 'All'}
          onSearchFilter={(v) => setState({ prodSearchFilter: v })}
        />
      ) : (
        <Header
          copy={copy}
          showSearch={state.showSearch}
          showTabs={state.showTabs}
          activeTab={state.activeTab}
          onTabChange={(t) => setState({ activeTab: t })}
          radius={radius}
          topInset={topInset}
          tabs={nextTabs}
        />
      )}
      <div className="phone-scroll" style={{
        flex: 1, minHeight: 0, overflowY: 'auto',
        paddingBottom: isProd ? 28 : 40,
        position: 'relative',
        zIndex: 1,
      }}>

      {state.contentState === 'loading' && <LoadingSkeleton />}
      {state.contentState === 'empty' && <EmptyState copy={copy} />}
      {state.contentState === 'error' && <ErrorState copy={copy} />}

      {state.contentState === 'loaded' && state.version === 'mvp' && (
        <MVPSections state={state} setState={setState} />
      )}

      {state.contentState === 'loaded' && state.version === 'prod' && (
        searchOpen
          ? (
            <ProdDiscoverResults
              filter={state.prodSearchFilter || 'All'}
              onFilter={(v) => setState({ prodSearchFilter: v })}
              query={state.prodSearchQuery || ''}
              showFilters={false}
            />
          )
          : <ProdSections state={state} setState={setState} />
      )}

      {state.contentState === 'loaded' && state.version === 'next' && state.activeTab === 'Traders' && (() => {
        const SectionDivider = () => (
          <div style={{ height: 1, background: 'var(--color-border-muted)' }} />
        );
        const sections = [];
        if (getFlag(state, 'Traders', 'topTraders')) sections.push(
          <section>
            <SectionHeader title="Top traders" />
            <TopTradersCarousel traders={TRADERS.slice(0, 6)} cardStyle={state.cardStyle}
              onToggle={(name) => {
                const idx = TRADERS.findIndex(t => t.name === name);
                if (idx >= 0) TRADERS[idx].status = TRADERS[idx].status === 'follow' ? 'following' : 'follow';
                setState({ _tradersTick: (state._tradersTick || 0) + 1 });
              }}
            />
          </section>
        );
        if (getFlag(state, 'Traders', 'tradersList')) sections.push(
          <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <FilterBar filters={[
              { label: 'All', hideChevron: true, active: (state.traderNetwork || 'All') === 'All', onClick: () => setState({ traderNetwork: 'All' }) },
              { label: 'Ethereum', hideChevron: true, active: state.traderNetwork === 'Ethereum', onClick: () => setState({ traderNetwork: 'Ethereum' }) },
              { label: 'Base',     hideChevron: true, active: state.traderNetwork === 'Base',     onClick: () => setState({ traderNetwork: 'Base' }) },
              { label: 'Solana',   hideChevron: true, active: state.traderNetwork === 'Solana',   onClick: () => setState({ traderNetwork: 'Solana' }) },
            ]} />
            <TradersList traders={TRADERS}
              onToggle={(name) => {
                const idx = TRADERS.findIndex(t => t.name === name);
                if (idx >= 0) TRADERS[idx].status = TRADERS[idx].status === 'follow' ? 'following' : 'follow';
                setState({ _tradersTick: (state._tradersTick || 0) + 1 });
              }}
            />
          </section>
        );
        return (
          <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 16 }}>
            {sections.map((node, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div style={{ padding: '32px 0' }}><SectionDivider /></div>}
                {node}
              </React.Fragment>
            ))}
          </div>
        );
      })()}

      {state.contentState === 'loaded' && state.version === 'next' && state.activeTab !== 'Now' && state.activeTab !== 'Macro' && state.activeTab !== 'Crypto' && state.activeTab !== 'RWAs' && state.activeTab !== 'Traders' && state.activeTab !== 'Sites' && (
        <OtherTabPlaceholder tab={state.activeTab} />
      )}

      {state.contentState === 'loaded' && state.version === 'next' && state.activeTab === 'Sites' && (() => {
        const SectionDivider = () => (
          <div style={{ height: 1, background: 'var(--color-border-muted)' }} />
        );
        const sections = [];
        if (getFlag(state, 'Sites', 'recentlyVisited')) sections.push(
          <section>
            <SectionHeader title="Recently visited" />
            <RecentSitesCarousel sites={RECENT_SITES} cardStyle={state.cardStyle} />
          </section>
        );
        if (getFlag(state, 'Sites', 'ranked')) {
          const rank = state.siteRank || 'Top';
          const network = state.siteNetwork || 'All networks';
          const timeframe = state.siteTime || '24H';
          sections.push(
            <section style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <SectionHeader title="Ranked sites" chevron />
              <FilterBar filters={[
                { label: rank, onClick: () => {
                  const order = ['Top','Trending','New'];
                  const i = order.indexOf(rank);
                  setState({ siteRank: order[(i+1) % order.length] });
                }},
                { label: network, onClick: () => {
                  const order = ['All networks','Ethereum','Solana','Base','Arbitrum'];
                  const i = order.indexOf(network);
                  setState({ siteNetwork: order[(i+1) % order.length] });
                }},
                { label: timeframe, onClick: () => {
                  const order = ['24H','7D','30D'];
                  const i = order.indexOf(timeframe);
                  setState({ siteTime: order[(i+1) % order.length] });
                }},
              ]} />
              <div style={{ height: 12 }} />
              <SiteList sites={RANKED_SITES} />
            </section>
          );
        }
        return (
          <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 16 }}>
            {sections.map((node, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div style={{ padding: '32px 0' }}><SectionDivider /></div>}
                {node}
              </React.Fragment>
            ))}
          </div>
        );
      })()}

      {state.contentState === 'loaded' && state.version === 'next' && state.activeTab === 'Crypto' && (() => {
        const SectionDivider = () => (
          <div style={{ height: 1, background: 'var(--color-border-muted)' }} />
        );
        const cryptoMarket = CRYPTO_MARKET_CARDS.map((c) => {
          if (state.dataVariant === 'redday')   return { ...c, trend: 'down', change: -Math.abs(c.change) };
          if (state.dataVariant === 'greenday') return { ...c, trend: 'up',   change:  Math.abs(c.change) };
          return c;
        });
        const sections = [];
        if (getFlag(state, 'Crypto', 'market')) sections.push(
          <section>
            <SectionHeader title={copy.market} />
            <MarketCarousel items={cryptoMarket} dataVariant={state.dataVariant} radius={radius} cardStyle={state.cardStyle} />
          </section>
        );
        if (getFlag(state, 'Crypto', 'topMovers')) sections.push(
          <section>
            <SectionHeader title="Top movers" />
            <PillRow
              items={tintMovers(CRYPTO_TOP_MOVERS, state.dataVariant)}
              radius={radius}
              pillStyle={state.pillStyle}
              rows={2}
            />
          </section>
        );
        if (getFlag(state, 'Crypto', 'trending')) {
          const subTabs = ['Tradable', 'Futures', 'Recently added', 'DeFi'];
          const active = state.cryptoSubTab || 'Tradable';
          const list = TRENDING_TOKENS[active] || TRENDING_TOKENS.Tradable;
          const tinted = list.map((t) => {
            if (state.dataVariant === 'redday')   return { ...t, change: -Math.abs(t.change) };
            if (state.dataVariant === 'greenday') return { ...t, change:  Math.abs(t.change) };
            return t;
          });
          sections.push(
            <section>
              <SectionHeader title="Trending tokens" />
              <SubTabBar tabs={subTabs} active={active} onChange={(t) => setState({ cryptoSubTab: t })} />
              <TokenList items={tinted} showCta={getExperiment(state, 'RWAs', 'tradeCta')} ctaStyle={getExperimentValue(state, 'RWAs', 'tradeCtaStyle')} rowStyle={getExperimentValue(state, 'RWAs', 'assetRowStyle')} />
            </section>
          );
        }

        return (
          <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 16 }}>
            {sections.map((node, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <div style={{ padding: '32px 0' }}>
                    <SectionDivider />
                  </div>
                )}
                {node}
              </React.Fragment>
            ))}
          </div>
        );
      })()}

      {state.contentState === 'loaded' && state.version === 'next' && state.activeTab === 'RWAs' && (() => {
        const SectionDivider = () => (
          <div style={{ height: 1, background: 'var(--color-border-muted)' }} />
        );
        const rwaMarket = RWA_MARKET_CARDS.map((c) => {
          if (state.dataVariant === 'redday')   return { ...c, trend: 'down', change: -Math.abs(c.change) };
          if (state.dataVariant === 'greenday') return { ...c, trend: 'up',   change:  Math.abs(c.change) };
          return c;
        });
        const sections = [];
        if (getFlag(state, 'RWAs', 'market')) sections.push(
          <section>
            <SectionHeader title={copy.market} />
            <MarketCarousel items={rwaMarket} dataVariant={state.dataVariant} radius={radius} cardStyle={state.cardStyle} />
          </section>
        );
        if (getFlag(state, 'RWAs', 'topMovers')) sections.push(
          <section>
            <SectionHeader title="Top movers" />
            <PillRow
              items={tintMovers(RWA_TOP_MOVERS, state.dataVariant)}
              radius={radius}
              pillStyle={state.pillStyle}
              rows={2}
            />
          </section>
        );
        if (getFlag(state, 'RWAs', 'predictionMarkets')) sections.push(
          <section>
            <SectionHeader title="Prediction markets" />
            <PredictionMarketEmpty cardStyle={state.cardStyle} />
          </section>
        );
        if (getFlag(state, 'RWAs', 'stocks')) {
          const tinted = RWA_STOCKS.slice(0, 5).map((t) => {
            if (state.dataVariant === 'redday')   return { ...t, change: -Math.abs(t.change) };
            if (state.dataVariant === 'greenday') return { ...t, change:  Math.abs(t.change) };
            return t;
          });
          const perpFilter = state.rwaPerpFilter || 'Commodities';
          const perpsData = perpFilter === 'Stocks' ? PERPS_STOCKS
                         : perpFilter === 'Forex'  ? PERPS_FOREX
                         : PERPS_COMMODITIES;
          const tintedPerps = perpsData.map((p) => {
            if (state.dataVariant === 'redday')   return { ...p, change: -Math.abs(p.change) };
            if (state.dataVariant === 'greenday') return { ...p, change:  Math.abs(p.change) };
            return p;
          });
          sections.push(
            <section style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <SectionHeader title="Perpetuals" chevron />
              <FilterBar filters={[
                { label: 'Commodities', hideChevron: true, radius: 12, active: perpFilter === 'Commodities', onClick: () => setState({ rwaPerpFilter: 'Commodities' }) },
                { label: 'Stocks',      hideChevron: true, radius: 12, active: perpFilter === 'Stocks',      onClick: () => setState({ rwaPerpFilter: 'Stocks' }) },
                { label: 'Forex',       hideChevron: true, radius: 12, active: perpFilter === 'Forex',       onClick: () => setState({ rwaPerpFilter: 'Forex' }) },
              ]} />
              <div style={{ height: 12 }} />
              <PerpList items={tintedPerps} showCta={getExperiment(state, 'RWAs', 'tradeCta')} ctaStyle={getExperimentValue(state, 'RWAs', 'tradeCtaStyle')} rowStyle={getExperimentValue(state, 'RWAs', 'assetRowStyle')} />
            </section>
          );
          sections.push(
            <section style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <SectionHeader title="Tokenized stocks" chevron />
              <FilterBar filters={[
                { label: state.rwaPriceChange + ' price change', onClick: () => {
                  const order = ['1D','1W','1M','1Y'];
                  const i = order.indexOf(state.rwaPriceChange);
                  setState({ rwaPriceChange: order[(i+1) % order.length] });
                }},
                { label: state.rwaNetwork, onClick: () => {
                  const order = ['All networks','Ethereum','Solana','Arbitrum'];
                  const i = order.indexOf(state.rwaNetwork);
                  setState({ rwaNetwork: order[(i+1) % order.length] });
                }},
              ]} />
              <div style={{ height: 12 }} />
              <TokenList items={tinted} showCta={getExperiment(state, 'Crypto', 'tradeCta')} ctaStyle={getExperimentValue(state, 'Crypto', 'tradeCtaStyle')} rowStyle={getExperimentValue(state, 'Crypto', 'assetRowStyle')} />
            </section>
          );
        }

        return (
          <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 16 }}>
            {sections.map((node, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <div style={{ padding: '32px 0' }}>
                    <SectionDivider />
                  </div>
                )}
                {node}
              </React.Fragment>
            ))}
          </div>
        );
      })()}

      {state.contentState === 'loaded' && state.version === 'next' && state.activeTab === 'Macro' && (() => {
        const SectionDivider = () => (
          <div style={{ height: 1, background: 'var(--color-border-muted)' }} />
        );
        const sections = [];
        if (getFlag(state, 'Macro', 'sectors')) sections.push(
          <section>
            <SectorTreemapCarousel cardStyle={state.cardStyle} />
          </section>
        );
        if (getFlag(state, 'Macro', 'market')) sections.push(
          <section>
            <SectionHeader title={copy.market} />
            <MarketCarousel dataVariant={state.dataVariant} radius={radius} cardStyle={state.cardStyle} />
          </section>
        );
        if (getFlag(state, 'Macro', 'currency')) sections.push(
          <section>
            <SectionHeader title="Currency" />
            <FuturesPillRows items={CURRENCY_FUTURES} rows={2} pillStyle={state.pillStyle} />
          </section>
        );
        if (getFlag(state, 'Macro', 'commodities')) sections.push(
          <section>
            <SectionHeader title="Commodities" />
            <FuturesPillRows items={COMMODITY_FUTURES} rows={2} pillStyle={state.pillStyle} />
          </section>
        );
        if (getFlag(state, 'Macro', 'predictionMarkets')) sections.push(
          <section>
            <SectionHeader title="Prediction markets" />
            <PredictionMarketEmpty cardStyle={state.cardStyle} />
          </section>
        );
        if (getFlag(state, 'Macro', 'news')) sections.push(
          <section>
            <SectionHeader title="Latest in the market" />
            <NewsList rowPad={density.rowPad} />
          </section>
        );

        return (
          <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 16 }}>
            {sections.map((node, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <div style={{ padding: '32px 0' }}>
                    <SectionDivider />
                  </div>
                )}
                {node}
              </React.Fragment>
            ))}
          </div>
        );
      })()}

      {state.contentState === 'loaded' && state.version === 'next' && state.activeTab === 'Now' && (() => {
        const SectionDivider = () => (
          <div style={{ height: 1, background: 'var(--color-border-muted)' }} />
        );
        const sections = [];
        if (getFlag(state, 'Now', 'market')) sections.push(
          <section>
            <SectionHeader title={copy.market} />
            <MarketCarousel dataVariant={state.dataVariant} radius={radius} cardStyle={state.cardStyle} />
          </section>
        );
        if (getFlag(state, 'Now', 'topMovers')) sections.push(
          <section>
            <SectionHeader title={copy.topMovers} />
            <PillRow
              items={tintMovers(TOP_MOVERS_BASE, state.dataVariant)}
              radius={radius}
              pillStyle={state.pillStyle}
              rows={2}
            />
          </section>
        );
        if (getFlag(state, 'Now', 'cryptoMovers')) sections.push(
          <section>
            <SectionHeader title={copy.cryptoMovers} />
            <PillRow
              items={tintMovers(CRYPTO_MOVERS_BASE, state.dataVariant)}
              radius={radius}
              pillStyle={state.pillStyle}
              rows={2}
            />
          </section>
        );
        if (getFlag(state, 'Now', 'earnings')) sections.push(
          <section>
            <SectionHeader title={copy.earnings} chevron />
            <LargeCapList dataVariant={state.dataVariant} showCta={getExperiment(state, 'Now', 'tradeCta')} ctaStyle={getExperimentValue(state, 'Now', 'tradeCtaStyle')} rowStyle={getExperimentValue(state, 'Now', 'assetRowStyle')} />
          </section>
        );
        if (getFlag(state, 'Now', 'highVol')) sections.push(
          <section>
            <SectionHeader title={copy.highVol} />
            <PillScrollRows
              items={tintMovers(HIGH_VOL_BASE, state.dataVariant)}
              radius={radius}
              rows={2}
              pillStyle={state.pillStyle}
            />
          </section>
        );
        if (getFlag(state, 'Now', 'screeners')) sections.push(
          <section>
            <Screeners copy={copy} radius={radius} rowPad={density.rowPad} />
          </section>
        );
        if (getFlag(state, 'Now', 'trendingLists')) sections.push(
          <section>
            <SectionHeader title={copy.trending} />
            <TrendingListsGrid
              radius={radius}
              style={getExperimentValue(state, 'Now', 'trendingListStyle')}
            />
          </section>
        );
        if (getFlag(state, 'Now', 'predictionMarkets')) sections.push(
          <section>
            <SectionHeader title="Prediction markets" />
            <PredictionMarketEmpty cardStyle={state.cardStyle} />
          </section>
        );
        if (getFlag(state, 'Now', 'news')) sections.push(
          <section>
            <SectionHeader title={copy.news} />
            <NewsList rowPad={density.rowPad} showInsights={getExperiment(state, 'Now', 'marketInsights')} />
          </section>
        );

        return (
          <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 16 }}>
            {sections.map((node, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <div style={{ padding: '32px 0' }}>
                    <SectionDivider />
                  </div>
                )}
                {node}
              </React.Fragment>
            ))}
          </div>
        );
      })()}
      </div>
      {isProd && <ProdFooter hidden={searchOpen} />}
      {isProd && searchOpen && (
        <div style={{ flex: '0 0 auto', zIndex: 2 }}>
          <IOSKeyboard dark={state.theme !== 'light'} />
        </div>
      )}
    </div>
  );
}

Object.assign(window, {
  ExploreScreen, TABS,
  // Utilities
  placeholderTokenColor, tintMovers,
  COPY, RADIUS, DENSITY, NETWORK_COLORS,
  // Component gallery exports
  Icon, Triangle, TickerPill, InlineTicker, Sparkline,
  SectionHeader, TokenIcon, MarketCarousel, PillGrid, PillRow,
  TradeCTA, LargeCapRow, LargeCapList, Screeners, TrendingListsGrid, NewsList,
  LoadingSkeleton, EmptyState, ErrorState,
  SectorTreemapCard, SectorTreemapCarousel, FuturesPill, FuturesPillRows, FilterButton, FilterPill, FilterBar,
  TokenRow, TokenList, PerpRow, PerpList, RecentSiteCard, RecentSitesCarousel, SiteRow, SiteList, SubTabBar,
  PredictionMarketCard, PredictionMarketEmpty,
  TraderAvatar, FollowButton, TopTradersCarousel,
  // Sample data
  MARKET_CARDS, TOP_MOVERS_BASE, CRYPTO_MOVERS_BASE, HIGH_VOL_BASE,
  LARGE_CAPS, EARNINGS, SCREENERS, TRENDING_LISTS, NEWS,
  SECTORS, CURRENCY_FUTURES, COMMODITY_FUTURES, TRADERS,
  CRYPTO_MARKET_CARDS, CRYPTO_TOP_MOVERS, PREDICTION_MARKETS, TRENDING_TOKENS,
  RWA_MARKET_CARDS, RWA_TOP_MOVERS, RWA_STOCKS,
  PERPS_COMMODITIES, PERPS_STOCKS, PERPS_FOREX,
  RECENT_SITES, RANKED_SITES,
});

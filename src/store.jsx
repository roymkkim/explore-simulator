// store.jsx — shared state + localStorage persistence
// Per-tab feature flags so toggles are scoped to the active tab.

const STORAGE_KEY = 'mm_explore_sim_v3';

// Section definitions per tab. Each entry: [key, label, hint]
// Keys are stable — used in state.tabFlags[tab][key].
const TAB_SECTIONS = {
  Now: [
    ['market',         'Market carousel',      'S&P, Nasdaq, BTC cards'],
    ['topMovers',      'Top movers',           'Pill grid of tickers'],
    ['cryptoMovers',   'Crypto movers',        'Pill grid of tokens'],
    ['earnings',       'Large cap stocks',     'Asset rows with network badge'],
    ['highVol',        'Implied volatility',   'Scrolling pill rows'],
    ['screeners',      'Screeners',            'Icon tile rows'],
    ['trendingLists',  'Trending lists',       'Avatar chips'],
    ['predictionMarkets','Prediction markets', 'Featured question (empty for now)'],
    ['news',           'Market news',          'Article rows'],
  ],
  Macro:  [
    ['sectors',      'Sector treemap',       'Horizontally swipeable sector cards'],
    ['market',       'Market carousel',      'S&P, Nasdaq, BTC cards'],
    ['currency',     'Currency',             'Futures pills'],
    ['commodities',  'Commodities',          'Futures pills'],
    ['predictionMarkets','Prediction markets', 'Featured question (empty for now)'],
    ['news',         'Latest in the market', 'Article rows'],
  ],
  RWAs:   [
    ['market',       'Market carousel',      'Featured tokenized assets'],
    ['topMovers',    'Top movers',           'Pill grid of tokenized stocks'],
    ['predictionMarkets','Prediction markets', 'Featured question (empty for now)'],
    ['stocks',       'Tokenized stocks',     'Asset rows with network badge'],
  ],
  Traders: [
    ['topTraders',    'Top traders carousel', 'Featured traders with Follow CTA'],
    ['tradersList',   'Traders list',         'Ranked list with network filter'],
  ],
  Crypto: [
    ['market',           'Market carousel',      'BTC, XRP, ETH cards'],
    ['topMovers',        'Top movers',           'Pill grid of tokens'],
    ['trending',         'Trending tokens',      'Token rows (Tradable / Futures / Recent / DeFi)'],
  ],
  Sports: [],
  Sites:  [
    ['recentlyVisited', 'Recently visited', 'Horizontal carousel of site cards'],
    ['ranked',          'Ranked sites list', 'List with rank / network / time filters'],
  ],
};

// Build default flag map (all on) for every tab/section.
function buildDefaultTabFlags() {
  const out = {};
  for (const [tab, sections] of Object.entries(TAB_SECTIONS)) {
    out[tab] = {};
    for (const [key] of sections) out[tab][key] = true;
  }
  return out;
}

// Per-tab experimental/differentiating features. Off by default.
// Each entry: [key, label, hint, type, defaultValue, options?]
//   type: 'bool'   — simple toggle; defaultValue false (unless specified)
//   type: 'choice' — segmented control; defaultValue is one of options[i].value
const TAB_EXPERIMENTS = {
  Global: [
    ['tradersTab',     'Traders tab',         'Adds "Traders" to the category tabs', 'bool', false],
  ],
  Now: [
    ['marketInsights', 'Market insights tab', 'Adds a "Market insights" filter pill under Market news', 'bool', false],
    ['tradeCta',       'Row trade CTAs',      'Adds Swap / Long / Short buttons at the end of asset rows', 'bool', false],
    ['tradeCtaStyle',  'CTA style',           'How the row CTAs render', 'choice', 'text',
      [{ value: 'text', label: 'Text' }, { value: 'icon', label: 'Icon' }]],
    ['trendingListStyle', 'Trending list style', 'How trending lists render', 'choice', 'pill',
      [{ value: 'pill', label: 'Pill' }, { value: 'list', label: 'List' }]],
    ['assetRowStyle',  'Asset row style',     'Swap the leading icon for an inline sparkline', 'choice', 'default',
      [{ value: 'default', label: 'Icon' }, { value: 'sparkline', label: 'Sparkline' }]],
  ],
  Macro:   [],
  RWAs:    [
    ['tradeCta',       'Row trade CTAs',      'Adds Swap / Long / Short buttons at the end of asset rows', 'bool', false],
    ['tradeCtaStyle',  'CTA style',           'How the row CTAs render', 'choice', 'text',
      [{ value: 'text', label: 'Text' }, { value: 'icon', label: 'Icon' }]],
    ['assetRowStyle',  'Asset row style',     'Swap the leading icon for an inline sparkline', 'choice', 'default',
      [{ value: 'default', label: 'Icon' }, { value: 'sparkline', label: 'Sparkline' }]],
  ],
  Traders: [],
  Crypto:  [
    ['tradeCta',       'Row trade CTAs',      'Adds Swap / Long / Short buttons at the end of asset rows', 'bool', false],
    ['tradeCtaStyle',  'CTA style',           'How the row CTAs render', 'choice', 'text',
      [{ value: 'text', label: 'Text' }, { value: 'icon', label: 'Icon' }]],
    ['assetRowStyle',  'Asset row style',     'Swap the leading icon for an inline sparkline', 'choice', 'default',
      [{ value: 'default', label: 'Icon' }, { value: 'sparkline', label: 'Sparkline' }]],
  ],
  Sports:  [],
  Sites:   [],
};

function buildDefaultExperiments() {
  const out = {};
  for (const [tab, list] of Object.entries(TAB_EXPERIMENTS)) {
    out[tab] = {};
    for (const entry of list) {
      const [key, , , type, def] = entry;
      out[tab][key] = type === 'bool' ? (def === true) : def;
    }
  }
  return out;
}

const DEFAULTS = {
  // Visual treatment
  theme: 'light',
  showChrome: true,
  density: 'default',
  radius: 'default',
  pillStyle: 'filled',
  cardStyle: 'filled',

  // Active tab
  activeTab: 'Now',

  // Version: 'prod' (V1 shipped) or 'next' (V2 vision)
  version: 'next',

  // Global chrome flags (apply to every tab)
  showSearch: true,
  showTabs: true,
  showScanIcon: true,

  // Per-tab section flags
  tabFlags: buildDefaultTabFlags(),

  // Screen state
  contentState: 'loaded',

  // Content variants
  copyVariant: 'default',
  dataVariant: 'default',

  // Crypto Discover sub-tab
  cryptoSubTab: 'Tradable',

  // Stage view: 'ui' (the full simulator) or 'components' (gallery grid)
  stageView: 'ui',

  // RWAs filters
  rwaPriceChange: '1D',
  rwaNetwork: 'All networks',

  // Per-tab experiments (differentiating features) — off by default
  experiments: buildDefaultExperiments(),
};

function embedQuery() {
  const q = new URLSearchParams(location.search);
  if (q.get('embed') !== '1') return null;
  const version = q.get('version') === 'next' ? 'next' : 'prod';
  const theme = q.get('theme') === 'light' ? 'light' : 'dark';
  const rawInset = q.get('inset');
  const inset = rawInset == null || rawInset === '' ? 52 : Number(rawInset);
  return {
    embed: true,
    version,
    theme,
    showChrome: q.get('chrome') === '1',
    stageView: 'ui',
    activeTab: q.get('tab') || 'Now',
    embedInset: Number.isFinite(inset) ? inset : 52,
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULTS, tabFlags: buildDefaultTabFlags(), experiments: buildDefaultExperiments() };
    const parsed = JSON.parse(raw);
    // Merge tabFlags deeply so new sections added later default to on.
    const mergedTabFlags = buildDefaultTabFlags();
    if (parsed.tabFlags) {
      for (const tab of Object.keys(mergedTabFlags)) {
        mergedTabFlags[tab] = { ...mergedTabFlags[tab], ...(parsed.tabFlags[tab] || {}) };
      }
    }
    const mergedExp = buildDefaultExperiments();
    if (parsed.experiments) {
      for (const tab of Object.keys(mergedExp)) {
        mergedExp[tab] = { ...mergedExp[tab], ...(parsed.experiments[tab] || {}) };
      }
    }
    return { ...DEFAULTS, ...parsed, tabFlags: mergedTabFlags, experiments: mergedExp };
  } catch (e) {
    return { ...DEFAULTS, tabFlags: buildDefaultTabFlags(), experiments: buildDefaultExperiments() };
  }
}
function saveState(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
}

function useSimState() {
  const [state, setState] = React.useState(() => {
    const base = loadState();
    const embed = embedQuery();
    return embed ? { ...base, ...embed } : base;
  });
  React.useEffect(() => {
    if (state.embed) return;
    saveState(state);
  }, [state]);

  const update = React.useCallback((patch) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  const setTabFlag = React.useCallback((tab, key, value) => {
    setState((prev) => ({
      ...prev,
      tabFlags: {
        ...prev.tabFlags,
        [tab]: { ...(prev.tabFlags[tab] || {}), [key]: value },
      },
    }));
  }, []);

  const setExperiment = React.useCallback((tab, key, value) => {
    setState((prev) => ({
      ...prev,
      experiments: {
        ...prev.experiments,
        [tab]: { ...(prev.experiments && prev.experiments[tab] || {}), [key]: value },
      },
    }));
  }, []);

  const reset = React.useCallback(() => {
    setState({ ...DEFAULTS, tabFlags: buildDefaultTabFlags(), experiments: buildDefaultExperiments() });
  }, []);

  return [state, update, reset, setTabFlag, setExperiment];
}

// Helper for components: get a section flag for the active tab (defaults true).
function getFlag(state, tab, key) {
  const tf = state.tabFlags && state.tabFlags[tab];
  if (!tf) return true;
  return tf[key] !== false;
}

// Helper: get experiment flag (defaults false).
function getExperiment(state, tab, key) {
  const e = state.experiments && state.experiments[tab];
  if (!e) return false;
  return e[key] === true;
}

// Helper: get experiment value (any type). Falls back to TAB_EXPERIMENTS default.
function getExperimentValue(state, tab, key) {
  const e = state.experiments && state.experiments[tab];
  if (e && key in e) return e[key];
  const list = TAB_EXPERIMENTS[tab] || [];
  const entry = list.find(x => x[0] === key);
  return entry ? entry[4] : undefined;
}

Object.assign(window, { useSimState, DEFAULTS, TAB_SECTIONS, TAB_EXPERIMENTS, getFlag, getExperiment, getExperimentValue });

// mvp-screen.jsx — MVP layout; stripped launch surface per tab.
// Uses primitives already defined in explore-screen.jsx (shared via window).

// ─── Sparkline card (carousel item) ───────────────────────────────────────
// Spec:
//   Corner radius 12, padding 8, gap 8
//   Name       → Body/Sm/Medium (.t-body-sm-medium)
//   Price      → Body/Md        (.t-body-md)
//   % change   → Body/Sm        (.t-body-sm)
//   Front icon 24px, back bubble 12px (stacked, top-right)
function SparklineCard({ item, cardStyle = 'filled' }) {
  const up = (item.change ?? 0) >= 0;
  const color = up ? 'var(--color-success-default)' : 'var(--color-error-default)';
  const iconBg = item.color || placeholderTokenColor(item.name || item.ticker || 'x');
  const netColor = (window.NETWORK_COLORS && window.NETWORK_COLORS[item.network])
    || placeholderTokenColor((item.network || item.ticker || 'n') + '_net');
  const isImg = item.icon === 'btc' || item.icon === 'eth';
  const displayName = item.name || item.ticker || '';
  const FRONT = 24;
  const BACK  = 12;

  return (
    <div style={{
      flex: '0 0 164px',
      padding: 8,
      borderRadius: 12,
      background: cardStyle === 'outline' ? 'transparent' : 'var(--color-background-default)',
      border: cardStyle === 'outline' ? '1px solid var(--color-border-muted)' : '1px solid var(--color-border-muted)',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      {/* Header row: name + stacked icon */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        gap: 8,
      }}>
        <div
          className="t-body-sm-medium"
          style={{
            color: 'var(--color-text-alternative)',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            minWidth: 0, flex: 1,
          }}
        >{displayName}</div>
        {/* Stacked icon — front 24px token, back 12px network bubble (2px canvas border, 3px from token right) */}
        <div style={{
          position: 'relative',
          width: FRONT, height: FRONT,
          flex: '0 0 auto',
        }}>
          {/* Front icon (24px) */}
          {isImg ? (
            <img
              src={`assets/tokens/${item.icon === 'btc' ? 'bitcoin' : 'ethereum'}.png`}
              width={FRONT} height={FRONT}
              style={{
                display: 'block', borderRadius: '50%',
                position: 'absolute', left: 0, top: 0,
              }}
              alt=""
            />
          ) : (
            <div style={{
              position: 'absolute', left: 0, top: 0,
              width: FRONT, height: FRONT, borderRadius: '50%',
              background: iconBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 9, fontWeight: 700, letterSpacing: '-0.02em',
            }}>{(item.ticker || displayName).slice(0, 3)}</div>
          )}
          {/* Back bubble — 12px rounded-square network badge, 2px canvas border, right-aligned to token */}
          <div style={{
            position: 'absolute',
            right: 0, bottom: 0,
            width: BACK, height: BACK, borderRadius: 4,
            background: netColor,
            border: '2px solid var(--color-background-default)',
            boxSizing: 'content-box',
          }} />
        </div>
      </div>

      {/* Sparkline */}
      <div style={{ height: 40 }}>
        <Sparkline
          trend={up ? 'up' : 'down'}
          width="100%"
          height={40}
          seed={(item.ticker || displayName || 'x').charCodeAt(0) + Math.round((item.change || 0) * 10)}
        />
      </div>

      {/* Price — Body/Md */}
      <div
        className="t-body-md"
        style={{
          color: 'var(--color-text-default)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        ${item.price != null
          ? item.price.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })
          : (item.value != null
            ? item.value.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })
            : '—')}
      </div>

      {/* % change — Body/Sm */}
      <div
        className="t-body-sm"
        style={{
          color,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {up ? '+' : '-'}{Math.abs(item.change ?? 0).toFixed(2)}%
      </div>
    </div>
  );
}

function SparklineCarousel({ items, cardStyle, dataVariant }) {
  const tinted = (items || []).map((c) => {
    if (dataVariant === 'redday')   return { ...c, change: -Math.abs(c.change ?? 0.5) };
    if (dataVariant === 'greenday') return { ...c, change:  Math.abs(c.change ?? 0.5) };
    return c;
  });
  return (
    <div style={{
      display: 'flex', gap: 12, padding: '0 16px', overflowX: 'auto',
      scrollbarWidth: 'none',
    }}>
      {tinted.map((c, i) => <SparklineCard key={(c.ticker || c.name) + i} item={c} cardStyle={cardStyle} />)}
    </div>
  );
}

// ─── Prediction card placeholder (carousel item) ──────────────────────────
// No design yet — render a neutral placeholder card so the carousel reads
// as "prediction markets".
function PredictionCardPlaceholder({ cardStyle = 'filled', tone }) {
  const PLACEHOLDERS = [
    { q: 'Will BTC close above $120k by year end?',      meta: '$4.2M Vol' },
    { q: 'Fed rate cut by September?',                    meta: '$1.8M Vol' },
    { q: 'Will ETH flip $5k before Q4?',                  meta: '$2.1M Vol' },
    { q: 'US election margin over 2%?',                   meta: '$9.4M Vol' },
  ];
  const data = tone || PLACEHOLDERS[0];
  return (
    <div style={{
      flex: '0 0 232px',
      padding: 14,
      borderRadius: 12,
      background: cardStyle === 'outline' ? 'transparent' : 'var(--color-background-muted)',
      border: cardStyle === 'outline' ? '1px solid var(--color-border-muted)' : '1px solid transparent',
      display: 'flex', flexDirection: 'column', gap: 14,
      minHeight: 132,
    }}>
      <div style={{
        fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em',
        fontWeight: 600, color: 'var(--color-text-alternative)',
      }}>Prediction</div>
      <div style={{
        fontSize: 14, lineHeight: '20px', fontWeight: 500,
        color: 'var(--color-text-default)', flex: 1,
        textWrap: 'pretty',
      }}>{data.q}</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{
          flex: 1, textAlign: 'center',
          padding: '6px 0',
          borderRadius: 8,
          background: 'rgba(46,160,67,0.14)',
          color: 'var(--color-success-default)',
          fontSize: 13, fontWeight: 600,
        }}>Yes</div>
        <div style={{
          flex: 1, textAlign: 'center',
          padding: '6px 0',
          borderRadius: 8,
          background: 'rgba(248,81,73,0.12)',
          color: 'var(--color-error-default)',
          fontSize: 13, fontWeight: 600,
        }}>No</div>
      </div>
      <div style={{
        fontSize: 11, color: 'var(--color-text-alternative)',
      }}>{data.meta}</div>
    </div>
  );
}

function PredictionCarousel({ cardStyle, theme }) {
  const set = theme === 'politics'
    ? [
        { q: 'Next US president — party in 2028?', meta: '$22M Vol' },
        { q: 'Fed rate cut by September?',         meta: '$1.8M Vol' },
        { q: 'CPI prints below 2.5% in Q3?',       meta: '$840K Vol' },
        { q: 'SCOTUS strikes down EO before 2027?', meta: '$610K Vol' },
      ]
    : [
        { q: 'Will BTC close above $120k by year end?', meta: '$4.2M Vol' },
        { q: 'Will ETH flip $5k before Q4?',             meta: '$2.1M Vol' },
        { q: 'Any L2 TVL above $20B this year?',         meta: '$1.3M Vol' },
        { q: 'Solana ETF approved before 2027?',         meta: '$3.7M Vol' },
      ];
  return (
    <div style={{
      display: 'flex', gap: 12, padding: '0 16px', overflowX: 'auto',
      scrollbarWidth: 'none',
    }}>
      {set.map((p, i) => <PredictionCardPlaceholder key={i} tone={p} cardStyle={cardStyle} />)}
    </div>
  );
}

// ─── Network dropdown pill (square, with chevron) ─────────────────────────
function NetworkDropdownPill({ value, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '8px 10px 8px 12px',
        borderRadius: 8,
        border: '1px solid var(--color-border-muted)',
        background: 'var(--color-background-default)',
        color: 'var(--color-text-default)',
        fontFamily: 'var(--font-family-default)',
        fontSize: 14, lineHeight: '20px', fontWeight: 500,
        cursor: 'pointer', whiteSpace: 'nowrap',
      }}
      aria-label="Filter by network"
    >
      <span style={{
        width: 14, height: 14, borderRadius: 3,
        background: 'var(--color-icon-muted, #9aa3ad)',
        display: 'inline-block',
      }} />
      <span>{value}</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

// ─── The MVP renderer ─────────────────────────────────────────────────────
function MVPSections({ state, setState }) {
  const copy = (window.COPY && (window.COPY[state.copyVariant] || window.COPY.default)) || {};
  const cardStyle = state.cardStyle;
  const pillStyle = state.pillStyle;
  const radius = (window.RADIUS && (window.RADIUS[state.radius] || window.RADIUS.default)) || {};
  const dataVariant = state.dataVariant;

  const SectionDivider = () => (
    <div style={{ height: 1, background: 'var(--color-border-muted)' }} />
  );

  const tintList = (list) => (list || []).map((t) => {
    if (dataVariant === 'redday')   return { ...t, change: -Math.abs(t.change ?? 0.5) };
    if (dataVariant === 'greenday') return { ...t, change:  Math.abs(t.change ?? 0.5) };
    return t;
  });

  const tab = state.activeTab;
  const sections = [];

  if (tab === 'Now') {
    sections.push(
      <section>
        <SectionHeader title="Predictions" chevron />
        <PredictionCarousel cardStyle={cardStyle} />
      </section>
    );
    sections.push(
      <section>
        <SectionHeader title="Trending tokens" chevron />
        <SparklineCarousel items={TRENDING_TOKENS.Tradable} cardStyle={cardStyle} dataVariant={dataVariant} />
      </section>
    );
    sections.push(
      <section>
        <SectionHeader title="Crypto movers" chevron />
        <PillRow
          items={tintMovers(CRYPTO_MOVERS_BASE, dataVariant)}
          radius={radius}
          pillStyle={pillStyle}
          rows={2}
        />
      </section>
    );
    sections.push(
      <section>
        <SectionHeader title="Perps" chevron />
        <SparklineCarousel items={PERPS_COMMODITIES} cardStyle={cardStyle} dataVariant={dataVariant} />
      </section>
    );
    sections.push(
      <section>
        <SectionHeader title="Stocks" chevron />
        <LargeCapList dataVariant={dataVariant} />
      </section>
    );
  }

  if (tab === 'Macro') {
    sections.push(
      <section>
        <SectorTreemapCarousel cardStyle={cardStyle} />
      </section>
    );
    sections.push(
      <section>
        <SectionHeader title="Politics predictions" chevron />
        <PredictionCarousel cardStyle={cardStyle} theme="politics" />
      </section>
    );
    const perpFilter = state.mvpMacroPerpFilter || 'Stocks';
    const perpsData = perpFilter === 'Commodities' ? PERPS_COMMODITIES : PERPS_STOCKS;
    sections.push(
      <section style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <SectionHeader title="Perps" chevron />
        <FilterBar filters={[
          { label: 'Stocks',      hideChevron: true, radius: 12, active: perpFilter === 'Stocks',      onClick: () => setState({ mvpMacroPerpFilter: 'Stocks' }) },
          { label: 'Commodities', hideChevron: true, radius: 12, active: perpFilter === 'Commodities', onClick: () => setState({ mvpMacroPerpFilter: 'Commodities' }) },
        ]} />
        <div style={{ height: 12 }} />
        <SparklineCarousel items={perpsData} cardStyle={cardStyle} dataVariant={dataVariant} />
      </section>
    );
  }

  if (tab === 'RWAs') {
    const rwaMarket = RWA_MARKET_CARDS.map((c) => {
      if (dataVariant === 'redday')   return { ...c, trend: 'down', change: -Math.abs(c.change) };
      if (dataVariant === 'greenday') return { ...c, trend: 'up',   change:  Math.abs(c.change) };
      return c;
    });
    sections.push(
      <section>
        <SectionHeader title={copy.market || 'Market'} />
        <MarketCarousel items={rwaMarket} dataVariant={dataVariant} radius={radius} cardStyle={cardStyle} />
      </section>
    );
    sections.push(
      <section>
        <SectionHeader title="Stocks" chevron />
        <TokenList items={tintList(RWA_STOCKS.slice(0, 5))} />
      </section>
    );
    const perpFilter = state.mvpRwaPerpFilter || 'Commodities';
    const perpsData = perpFilter === 'Stocks' ? PERPS_STOCKS
                    : perpFilter === 'Forex'  ? PERPS_FOREX
                    : PERPS_COMMODITIES;
    sections.push(
      <section style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <SectionHeader title="Perps" chevron />
        <FilterBar filters={[
          { label: 'Commodities', hideChevron: true, radius: 12, active: perpFilter === 'Commodities', onClick: () => setState({ mvpRwaPerpFilter: 'Commodities' }) },
          { label: 'Stocks',      hideChevron: true, radius: 12, active: perpFilter === 'Stocks',      onClick: () => setState({ mvpRwaPerpFilter: 'Stocks' }) },
          { label: 'Forex',       hideChevron: true, radius: 12, active: perpFilter === 'Forex',       onClick: () => setState({ mvpRwaPerpFilter: 'Forex' }) },
        ]} />
        <div style={{ height: 12 }} />
        <PerpList items={tintList(perpsData)} />
      </section>
    );
  }

  if (tab === 'Crypto') {
    sections.push(
      <section>
        <SectionHeader title="Trending tokens" chevron />
        <SparklineCarousel items={TRENDING_TOKENS.Tradable} cardStyle={cardStyle} dataVariant={dataVariant} />
      </section>
    );
    sections.push(
      <section>
        <SectionHeader title="Crypto movers" chevron />
        <TokenList items={tintList(TRENDING_TOKENS.Tradable.slice(0, 5))} />
      </section>
    );
    sections.push(
      <section>
        <SectionHeader title="Perps" chevron />
        <SparklineCarousel items={TRENDING_TOKENS.Futures || TRENDING_TOKENS.Tradable} cardStyle={cardStyle} dataVariant={dataVariant} />
      </section>
    );
    sections.push(
      <section>
        <SectionHeader title="Predictions" chevron />
        <PredictionCarousel cardStyle={cardStyle} />
      </section>
    );
  }

  if (tab === 'Sports') {
    return (
      <div style={{ padding: '60px 32px', textAlign: 'center' }}>
        <div style={{
          fontSize: 15, fontWeight: 600, color: 'var(--color-text-default)',
          marginBottom: 6,
        }}>Sports — no MVP design yet</div>
        <div style={{
          fontSize: 13, lineHeight: '20px', color: 'var(--color-text-alternative)',
        }}>Carousel of game-level prediction cards, leaderboard lists.</div>
      </div>
    );
  }

  if (tab === 'Sites') {
    const rank = state.siteRank || 'Top';
    const network = state.mvpSiteNetwork || 'All networks';
    const timeframe = state.siteTime || '24H';
    sections.push(
      <section>
        <SectionHeader title="Recently visited" />
        <RecentSitesCarousel sites={RECENT_SITES} cardStyle={cardStyle} />
      </section>
    );
    sections.push(
      <section style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <SectionHeader title="Ranked sites" chevron />
        <div style={{
          display: 'flex', gap: 8, padding: '0 16px',
          overflowX: 'auto', scrollbarWidth: 'none',
        }}>
          <FilterPill label={rank} onClick={() => {
            const order = ['Top','Trending','New'];
            const i = order.indexOf(rank);
            setState({ siteRank: order[(i+1) % order.length] });
          }} />
          <NetworkDropdownPill value={network} onClick={() => {
            const order = ['All networks','Ethereum','Solana','Base','Arbitrum'];
            const i = order.indexOf(network);
            setState({ mvpSiteNetwork: order[(i+1) % order.length] });
          }} />
          <FilterPill label={timeframe} onClick={() => {
            const order = ['24H','7D','30D'];
            const i = order.indexOf(timeframe);
            setState({ siteTime: order[(i+1) % order.length] });
          }} />
        </div>
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
}

Object.assign(window, {
  MVPSections,
  SparklineCard, SparklineCarousel,
  PredictionCardPlaceholder, PredictionCarousel,
  NetworkDropdownPill,
});

// components-gallery.jsx — Grid view of primitive components for inspection.
// Receives the same `state` so visual-treatment tweaks (theme, density, radius,
// pill/card style) apply live. Experiments and section flags are IGNORED here
// so each component renders in its canonical form.

// ─── Small helpers ─────────────────────────────────────────────────

function GalleryCard({ name, width = 393, children }) {
  return (
    <div className="gallery-card">
      <div className="gallery-card-name">{name}</div>
      <div className="gallery-card-body" style={{ '--preview-w': `${width}px` }}>
        {children}
      </div>
    </div>
  );
}

function Variant({ label, width = 393, children }) {
  return (
    <div className="gallery-variant">
      <div className="gallery-variant-label">{label}</div>
      <div className="gallery-variant-preview" style={{ width }}>
        {children}
      </div>
    </div>
  );
}

// Narrow wrapper that forces the phone-width preview surface so components
// that assume full phone width render correctly. Transparent — inherits the
// gallery's flat background so components sit directly on the app surface.
function PhoneWidthPreview({ children, width = 393, pad = 16 }) {
  return (
    <div style={{
      width,
      padding: `${pad}px`,
      color: 'var(--color-text-default)',
    }}>
      {children}
    </div>
  );
}

// ─── Data helpers ──────────────────────────────────────────────────

function upDownMarketCards() {
  return [
    { ...MARKET_CARDS[0], trend: 'up',   change:  1.32 },
    { ...MARKET_CARDS[2], trend: 'down', change: -2.14, icon: 'btc' },
  ];
}

// Build synthetic "up" and "down" asset rows using LARGE_CAPS shape.
const UP_TOKEN   = { name: 'Texas Instruments', ticker: 'TXN',  network: 'ETH', price: 263.82, change:  12.31, cap: '$212B', vol: '$11.5M', color: '#CC0000' };
const DOWN_TOKEN = { name: 'Tesla',             ticker: 'TSLA', network: 'SOL', price: 328.44, change:  -0.54, cap: '$1.0T', vol: '$24.1M', color: '#E31937' };

// ─── The gallery itself ────────────────────────────────────────────

function ComponentGallery({ state }) {
  // Derived visual props that match ExploreScreen
  const RADIUS_MAP = {
    sharp:   { sm: 2, md: 4,  lg: 6,  pill: 9999, tile: 6 },
    default: { sm: 6, md: 10, lg: 14, pill: 9999, tile: 12 },
    soft:    { sm: 10, md: 16, lg: 22, pill: 9999, tile: 20 },
  };
  const radius = RADIUS_MAP[state.radius] || RADIUS_MAP.default;
  const pillStyle = state.pillStyle || 'filled';
  const cardStyle = state.cardStyle || 'filled';
  const density   = state.density === 'compact' ? { rowPad: 10 } : { rowPad: 16 };

  const themeClass = state.theme === 'light' ? 'light' : 'dark';

  // Click-and-drag pan on the stage-canvas scroller (ancestor).
  const rootRef = React.useRef(null);
  React.useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const scroller = node.closest('.stage-canvas');
    if (!scroller) return;
    let down = false, sx = 0, sy = 0, sl = 0, st = 0;
    const onDown = (e) => {
      // Don't hijack clicks on interactive elements
      if (e.target.closest('button, a, input, select, textarea, [role="button"]')) return;
      down = true;
      sx = e.clientX; sy = e.clientY;
      sl = scroller.scrollLeft; st = scroller.scrollTop;
      scroller.classList.add('is-panning');
      e.preventDefault();
    };
    const onMove = (e) => {
      if (!down) return;
      scroller.scrollLeft = sl - (e.clientX - sx);
      scroller.scrollTop  = st - (e.clientY - sy);
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      scroller.classList.remove('is-panning');
    };
    scroller.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    scroller.classList.add('is-pannable');
    return () => {
      scroller.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      scroller.classList.remove('is-pannable');
      scroller.classList.remove('is-panning');
    };
  }, []);

  return (
    <div
      ref={rootRef}
      data-theme={state.theme}
      className={`gallery-root ${themeClass}`}
    >
      <div className="gallery-grid">

        {/* ─────────── Primitives ─────────── */}

        <GalleryCard name="Sparkline" description="Volatile price line with radiating end dot.">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: 16 }}>
            <Variant label="Up trend" width={180}>
              <div style={{ padding: 12 }}>
                <Sparkline trend="up" width={156} height={48} seed={3} />
              </div>
            </Variant>
            <Variant label="Down trend" width={180}>
              <div style={{ padding: 12 }}>
                <Sparkline trend="down" width={156} height={48} seed={7} />
              </div>
            </Variant>
          </div>
        </GalleryCard>

        <GalleryCard name="Triangle" description="Direction indicator used inline with deltas.">
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', padding: 16 }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: 'var(--color-success-default)' }}>
              <Triangle up size={10} color="var(--color-success-default)" />
              <span style={{ fontSize: 14 }}>+2.13%</span>
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: 'var(--color-error-default)' }}>
              <Triangle up={false} size={10} color="var(--color-error-default)" />
              <span style={{ fontSize: 14 }}>−1.04%</span>
            </div>
          </div>
        </GalleryCard>

        <GalleryCard name="TokenIcon" description="Logo badge with fallback color + letter.">
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 16 }}>
            <TokenIcon icon="btc" size={36} />
            <TokenIcon icon="eth" size={36} />
            <TokenIcon icon="gold" size={36} />
            <TokenIcon letter="T" color="#CC0000" size={36} />
            <TokenIcon letter="M" color="#0078D4" size={36} />
          </div>
        </GalleryCard>

        <GalleryCard name="TickerPill" description="Compact ticker chip with % delta.">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: 12 }}>
            <Variant label="Up" width="auto">
              <TickerPill t="BTC" p={4.18} pillStyle={pillStyle} />
            </Variant>
            <Variant label="Down" width="auto">
              <TickerPill t="TSLA" p={-2.14} pillStyle={pillStyle} />
            </Variant>
            <Variant label="With icon" width="auto">
              <TickerPill t="ETH" p={2.40} icon="eth" pillStyle={pillStyle} />
            </Variant>
            <Variant label="Outlined" width="auto">
              <TickerPill t="NVDA" p={0.21} pillStyle="outlined" />
            </Variant>
          </div>
        </GalleryCard>

        <GalleryCard name="FuturesPill" description="Named-commodity pill used on Macro.">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: 12 }}>
            <Variant label="Down" width="auto"><FuturesPill t="Gold Futures" p={-0.57} pillStyle={pillStyle} /></Variant>
            <Variant label="Up" width="auto"><FuturesPill t="Crude Oil Futures" p={1.27} pillStyle={pillStyle} /></Variant>
          </div>
        </GalleryCard>

        <GalleryCard name="FilterButton" description="MMDS FilterButton · size Sm · _radii/md 8.">
          <div style={{ display: 'flex', gap: 8, padding: 12, flexWrap: 'wrap' }}>
            <FilterButton label="Stocks" size="Sm" variant="primary" isSelected />
            <FilterButton label="Pre-IPO" size="Sm" variant="secondary" isSelected />
            <FilterButton label="Commodities" size="Sm" variant="secondary" isSelected />
            <FilterButton label="Indices" size="Sm" variant="secondary" isSelected />
          </div>
        </GalleryCard>

        <GalleryCard name="TradeCTA" description="Inline row CTA: swap / long / short.">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: 12 }}>
            <Variant label="Swap · text" width="auto"><TradeCTA kinds={['swap']} style="text" /></Variant>
            <Variant label="Swap · icon" width="auto"><TradeCTA kinds={['swap']} style="icon" /></Variant>
            <Variant label="Long + Short · text" width="auto"><TradeCTA kinds={['long','short']} style="text" /></Variant>
            <Variant label="Long + Short · icon" width="auto"><TradeCTA kinds={['long','short']} style="icon" /></Variant>
          </div>
        </GalleryCard>

        {/* ─────────── Chrome ─────────── */}

        <GalleryCard name="Sub-tab bar" description="Secondary tabs (used on Crypto Discover).">
          <PhoneWidthPreview>
            <SubTabBar
              tabs={['Tradable', 'Futures', 'Recently added', 'DeFi']}
              active="Tradable"
              onChange={() => {}}
            />
          </PhoneWidthPreview>
        </GalleryCard>

        <GalleryCard name="Section header" description="Title + optional See all.">
          <PhoneWidthPreview>
            <SectionHeader title="Market news" actionLabel="See all" />
            <div style={{ height: 12 }} />
            <SectionHeader title="Top movers" />
          </PhoneWidthPreview>
        </GalleryCard>

        {/* ─────────── Cards & carousels ─────────── */}

        <GalleryCard name="Market carousel card" description="Market-level asset card with sparkline.">
          <PhoneWidthPreview pad={0}>
            <MarketCarousel
              items={upDownMarketCards()}
              dataVariant="default"
              radius={radius}
              cardStyle={cardStyle}
            />
          </PhoneWidthPreview>
        </GalleryCard>

        <GalleryCard name="Pill grid" description="Top movers pill grid.">
          <PhoneWidthPreview>
            <PillGrid items={TOP_MOVERS_BASE.slice(0, 8)} radius={radius} pillStyle={pillStyle} />
          </PhoneWidthPreview>
        </GalleryCard>

        <GalleryCard name="Pill row" description="Single horizontal row (implied volatility).">
          <PhoneWidthPreview>
            <PillRow items={HIGH_VOL_BASE} radius={radius} pillStyle={pillStyle} rows={1} />
          </PhoneWidthPreview>
        </GalleryCard>

        {/* ─────────── Rows ─────────── */}

        <GalleryCard name="Asset row (Large cap)" description="Name + network badge + price + Δ.">
          <PhoneWidthPreview>
            <LargeCapRow item={LARGE_CAPS[0]} showBorder={false} />
            <div style={{ height: 1, background: 'var(--color-border-muted)' }} />
            <LargeCapRow item={LARGE_CAPS[2]} showBorder={false} />
            <div style={{ height: 1, background: 'var(--color-border-muted)' }} />
            <LargeCapRow item={LARGE_CAPS[0]} showBorder={false} showCta kinds={['swap']} ctaStyle="text" />
          </PhoneWidthPreview>
        </GalleryCard>

        <GalleryCard name="TokenRow (RWA / Crypto)" description="Tokenized asset row.">
          <PhoneWidthPreview>
            <TokenRow item={RWA_STOCKS[0]} showBorder={false} />
            <div style={{ height: 1, background: 'var(--color-border-muted)' }} />
            <TokenRow item={RWA_STOCKS[2]} showBorder={false} />
            <div style={{ height: 1, background: 'var(--color-border-muted)' }} />
            <TokenRow item={RWA_STOCKS[0]} showBorder={false} showCta ctaStyle="icon" />
          </PhoneWidthPreview>
        </GalleryCard>

        <GalleryCard name="PerpRow" description="Perpetual market row with leverage tag.">
          <PhoneWidthPreview>
            <PerpRow item={PERPS_STOCKS[0]} />
            <div style={{ height: 1, background: 'var(--color-border-muted)' }} />
            <PerpRow item={PERPS_COMMODITIES[2]} />
            <div style={{ height: 1, background: 'var(--color-border-muted)' }} />
            <PerpRow item={PERPS_COMMODITIES[0]} showCta ctaStyle="text" />
          </PhoneWidthPreview>
        </GalleryCard>

        <GalleryCard name="News list" description="Market news rows with tickers.">
          <PhoneWidthPreview pad={0}>
            <NewsList rowPad={density.rowPad} showInsights={false} />
          </PhoneWidthPreview>
        </GalleryCard>

        <GalleryCard name="Screeners" description="Icon tile rows.">
          <PhoneWidthPreview pad={0}>
            <Screeners copy={{}} radius={radius} rowPad={density.rowPad} />
          </PhoneWidthPreview>
        </GalleryCard>

        <GalleryCard name="Trending lists" description="Horizontal avatar chips.">
          <PhoneWidthPreview pad={0}>
            <TrendingListsGrid radius={radius} />
          </PhoneWidthPreview>
        </GalleryCard>

        <GalleryCard name="Prediction market card" description="Featured question card.">
          <PhoneWidthPreview>
            <PredictionMarketCard market={PREDICTION_MARKETS[0]} cardStyle={cardStyle} />
          </PhoneWidthPreview>
        </GalleryCard>

        <GalleryCard name="Sector treemap card" description="Sector grid used on Macro.">
          <PhoneWidthPreview>
            <SectorTreemapCard sector={SECTORS[0]} width={340} height={220} cardStyle={cardStyle} />
          </PhoneWidthPreview>
        </GalleryCard>

        <GalleryCard name="Recent site card" description="Site carousel card used on Sites.">
          <div style={{ display: 'flex', gap: 12, padding: 16, overflow: 'hidden' }}>
            <RecentSiteCard site={RECENT_SITES[0]} cardStyle={cardStyle} />
            <RecentSiteCard site={RECENT_SITES[1]} cardStyle={cardStyle} />
          </div>
        </GalleryCard>

        <GalleryCard name="Site row" description="Ranked site list row.">
          <PhoneWidthPreview>
            <SiteRow site={RANKED_SITES[0]} />
            <div style={{ height: 1, background: 'var(--color-border-muted)' }} />
            <SiteRow site={RANKED_SITES[4]} />
          </PhoneWidthPreview>
        </GalleryCard>

        <GalleryCard name="Trader card / Follow" description="Top trader carousel.">
          <PhoneWidthPreview pad={0}>
            <TopTradersCarousel traders={TRADERS.slice(0, 5)} onToggle={() => {}} />
          </PhoneWidthPreview>
        </GalleryCard>

        {/* ─────────── States ─────────── */}

        <GalleryCard name="Loading skeleton">
          <PhoneWidthPreview pad={0}>
            <LoadingSkeleton />
          </PhoneWidthPreview>
        </GalleryCard>

        <GalleryCard name="Empty state">
          <PhoneWidthPreview pad={0}>
            <EmptyState copy={{}} />
          </PhoneWidthPreview>
        </GalleryCard>

        <GalleryCard name="Error state">
          <PhoneWidthPreview pad={0}>
            <ErrorState copy={{}} />
          </PhoneWidthPreview>
        </GalleryCard>

      </div>
    </div>
  );
}

Object.assign(window, { ComponentGallery });

// token-logos.jsx — local CoinGecko + equity marks
const TOKEN_LOGOS = {
  "AAOI": "assets/tokens/aaoi.png",
  "AAPL": "assets/tokens/aapl.png",
  "AAVE": "assets/tokens/aave.png",
  "AERO": "assets/tokens/aero.png",
  "AKE": "assets/tokens/ake.png",
  "APPLE": "assets/tokens/aapl.png",
  "ARB": "assets/tokens/arb.jpg",
  "ATOM": "assets/tokens/atom.png",
  "AVNT": "assets/tokens/avnt.png",
  "BASECAT": "assets/tokens/basecat.png",
  "BE": "assets/tokens/be.png",
  "BERA": "assets/tokens/bera.png",
  "BITCOIN": "assets/tokens/btc.png",
  "BONK": "assets/tokens/bonk.jpg",
  "BORT": "assets/tokens/bort.png",
  "BTC": "assets/tokens/btc.png",
  "BTC-PERP": "assets/tokens/btc.png",
  "CAR": "assets/tokens/car.png",
  "CHIP": "assets/tokens/chip.png",
  "COIN": "assets/tokens/coin.png",
  "COINBASE": "assets/tokens/coin.png",
  "COLLECT": "assets/tokens/collect.png",
  "COMP": "assets/tokens/comp.png",
  "CRV": "assets/tokens/crv.png",
  "CRWV": "assets/tokens/crwv.png",
  "CW": "assets/tokens/crwv.png",
  "DOGE": "assets/tokens/doge.png",
  "DOGE-PERP": "assets/tokens/doge.png",
  "DOT": "assets/tokens/dot.jpg",
  "ETH": "assets/tokens/eth.png",
  "ETH-PERP": "assets/tokens/eth.png",
  "ETHEREUM": "assets/tokens/eth.png",
  "FC": "assets/tokens/fcel.png",
  "FCEL": "assets/tokens/fcel.png",
  "FIG": "assets/tokens/fig.png",
  "GEV": "assets/tokens/gev.png",
  "HYPE": "assets/tokens/hype.jpg",
  "JUP": "assets/tokens/jup.png",
  "LDO": "assets/tokens/ldo.png",
  "LINK": "assets/tokens/link.png",
  "LITE": "assets/tokens/lite.png",
  "MARSCOIN": "assets/tokens/marscoin.png",
  "MAS": "assets/tokens/mas.png",
  "MICROSOFT": "assets/tokens/msft.png",
  "MKR": "assets/tokens/mkr.png",
  "MNT": "assets/tokens/mnt.png",
  "MOVE": "assets/tokens/move.png",
  "MSFT": "assets/tokens/msft.png",
  "MU": "assets/tokens/mu.png",
  "NBIS": "assets/tokens/nbis.png",
  "NS": "assets/tokens/smr.png",
  "NVDA": "assets/tokens/nvda.png",
  "NVIDIA": "assets/tokens/nvda.png",
  "OP": "assets/tokens/op.png",
  "PENGU": "assets/tokens/pengu.png",
  "PIEVERSE": "assets/tokens/pieverse.png",
  "PLTR": "assets/tokens/pltr.png",
  "POL": "assets/tokens/pol.png",
  "POPCAT": "assets/tokens/popcat.jpg",
  "PUMP": "assets/tokens/pump.jpg",
  "PYTH": "assets/tokens/pyth.png",
  "QXO": "assets/tokens/qxo.png",
  "RGC": "assets/tokens/rgc.png",
  "RIVN": "assets/tokens/rivn.png",
  "SAGA": "assets/tokens/saga.jpg",
  "SEI": "assets/tokens/sei.png",
  "SFTBY": "assets/tokens/sftby.png",
  "SMMT": "assets/tokens/smmt.png",
  "SMR": "assets/tokens/smr.png",
  "SNDK": "assets/tokens/sndk.png",
  "SOCK": "assets/tokens/sock.png",
  "SOL": "assets/tokens/sol.png",
  "SOL-PERP": "assets/tokens/sol.png",
  "SOLANA": "assets/tokens/sol.png",
  "SOPH": "assets/tokens/soph.png",
  "SPY": "assets/tokens/spy.png",
  "SUI": "assets/tokens/sui.png",
  "TESLA": "assets/tokens/tsla.png",
  "TIA": "assets/tokens/tia.jpg",
  "TSLA": "assets/tokens/tsla.png",
  "TXN": "assets/tokens/txn.png",
  "UNI": "assets/tokens/uni.png",
  "VFS": "assets/tokens/vfs.png",
  "VVV": "assets/tokens/vvv.png",
  "WIF": "assets/tokens/wif.jpg",
  "XRP": "assets/tokens/xrp.png",
  "ZRO": "assets/tokens/zro.png",
};

function tokenLogoSrc(raw) {
  if (raw == null || raw === '') return null;
  const k = String(raw).trim().toUpperCase().replace(/-PERP$/, '');
  if (k.length > 12 || k.includes(' ')) return null;
  return TOKEN_LOGOS[k] || null;
}

function AssetMark({ keys, size = 22, color, initials, initialsColor }) {
  const list = Array.isArray(keys) ? keys : [keys];
  const src = list.map(tokenLogoSrc).find(Boolean) || null;
  const [failed, setFailed] = React.useState(false);
  if (src && !failed) {
    return (
      <img
        src={src}
        width={size}
        height={size}
        alt=""
        onError={() => setFailed(true)}
        style={{ display: 'block', width: size, height: size, borderRadius: '50%', objectFit: 'cover', flex: `0 0 ${size}px` }}
      />
    );
  }
  const label = (initials || String(list[0] || '?').slice(0, 2)).toString();
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flex: `0 0 ${size}px`,
      background: color || placeholderTokenColor(String(list[0] || 'x')),
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: initialsColor || '#fff', fontSize: Math.max(9, Math.round(size * 0.32)), fontWeight: 700,
    }}>{label}</div>
  );
}

Object.assign(window, { TOKEN_LOGOS, tokenLogoSrc, AssetMark });

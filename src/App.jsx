import React, { useState, useEffect } from 'react';
import './App.css';

/*
  Clothes Shop - Student Project
  Simple names: header, hero, products, product, cart, cart-item, btn, input, size-select
*/

const PRODUCTS = [
  { id: 1, name: 'Classic Tee', price: 799, category: 'T-Shirts', desc: 'Soft cotton crew-neck.', colors: ['black','white','blue'], sizes: ['S','M','L','XL'] },
  { id: 2, name: 'Striped Shirt', price: 1299, category: 'Shirts', desc: 'Casual striped button-up.', colors: ['white','navy'], sizes: ['M','L','XL'] },
  { id: 3, name: 'Slim Jeans', price: 1999, category: 'Jeans', desc: 'Stretch denim, slim fit.', colors: ['blue','black'], sizes: ['30','32','34','36'] },
  { id: 4, name: 'Denim Jacket', price: 2999, category: 'Jackets', desc: 'Classic denim jacket.', colors: ['blue'], sizes: ['M','L','XL'] },
  { id: 5, name: 'Summer Dress', price: 2499, category: 'Dresses', desc: 'Lightweight midi dress.', colors: ['red','yellow'], sizes: ['S','M','L'] },
  { id: 6, name: 'Hoodie', price: 1799, category: 'Hoodies', desc: 'Cozy pullover hoodie.', colors: ['grey','black'], sizes: ['S','M','L','XL'] }
];

function App() {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem('clothes_cart_v1');
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular'); // popular | price-asc | price-desc
  const [notice, setNotice] = useState('');
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme_v1');
      if (saved) return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    } catch {}
    return 'light';
  });

  useEffect(() => {
    try { localStorage.setItem('clothes_cart_v1', JSON.stringify(cart)); } catch {}
  }, [cart]);

  // responsive cart drawer state (for small screens)
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    // toggle page scroll when cart drawer is open on small screens
    try {
      if (cartOpen) document.body.style.overflow = 'hidden';
      else document.body.style.overflow = '';
    } catch {}
  }, [cartOpen]);

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme_v1', theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(''), 2200);
    return () => clearTimeout(t);
  }, [notice]);

  function addToCart(product, opts = {}) {
    // opts: size, color
    const key = `${product.id}_${opts.size || ''}_${opts.color || ''}`;
    setCart(prev => {
      const found = prev.find(p => p.key === key);
      if (found) {
        return prev.map(p => p.key === key ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { key, id: product.id, name: product.name, price: product.price, size: opts.size || '', color: opts.color || '', qty: 1 }];
    });
    setNotice(`${product.name} added`);
  }

  function removeFromCart(key) {
    setCart(prev => prev.filter(p => p.key !== key));
    setNotice('Item removed');
  }

  function updateQty(key, qty) {
    qty = Number(qty);
    if (!Number.isFinite(qty) || qty <= 0) {
      removeFromCart(key);
      return;
    }
    if (qty > 99) qty = 99;
    setCart(prev => prev.map(p => p.key === key ? { ...p, qty } : p));
  }

  function clearCart() {
    setCart([]);
    setNotice('Cart cleared');
  }

  function checkout() {
    if (cart.length === 0) {
      setNotice('Cart is empty');
      return;
    }
    setNotice('Checkout demo — Thank you!');
    // In a real project, send cart to backend / payment gateway
  }

  // derive product list
  let list = PRODUCTS.filter(p => {
    const q = query.trim().toLowerCase();
    if (q && !(p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))) return false;
    if (category !== 'All' && p.category !== category) return false;
    return true;
  });

  if (sortBy === 'price-asc') list = list.slice().sort((a,b)=>a.price-b.price);
  if (sortBy === 'price-desc') list = list.slice().sort((a,b)=>b.price-a.price);

  const total = cart.reduce((s,i)=> s + i.price * i.qty, 0);
  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p=>p.category)))];

  return (
    <div id="main">
      <header id="header">
        <div className="wrap header-row">
          <div id="brand">Clothify</div>
          <div className="header-right">
            <div className="cart-toggle">
              <button
                className="cart-toggle-btn"
                type="button"
                aria-label="Open cart"
                onClick={() => setCartOpen(true)}
              >Cart ({cart.reduce((s,c)=>s+c.qty,0)})</button>
            </div>
           <nav id="nav">
              <a href="#products">Products</a>
              <a href="#cart">Cart ({cart.reduce((s,c)=>s+c.qty,0)})</a>
              <a href="#about">About</a>
              <button className="theme-toggle" id="themetoggle"
                type="button"
                aria-label="Toggle theme"
                onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              >{theme === 'dark' ? '🌙' : '☀️'}</button>
              
            </nav>
          </div>
        </div>
      </header>

      <section id="hero">
        <div className="wrap hero-row">
          <div className="hero-left">
            <h1>Clothify — Shop trendy clothes</h1>
            <p className="lead">Simple student project: search, filter, choose size & color, add to cart.</p>

            <div className="controls-row">
              <input className="input" placeholder="Search clothing..." value={query} onChange={e=>setQuery(e.target.value)} />
              <select className="input" value={category} onChange={e=>setCategory(e.target.value)}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select className="input" value={sortBy} onChange={e=>setSortBy(e.target.value)}>
                <option value="popular">Sort: Popular</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
              </select>
            </div>
          </div>

          <div className="hero-right">
            <div className="box small">
              <div style={{fontWeight:700}}>Student Notes</div>
              <ul>
                <li>Each product has sizes and colors</li>
                <li>Cart items are grouped by product+size+color</li>
                <li>LocalStorage keeps cart after reload</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <main className="wrap content">
        <section id="products" className="products-section">
          <h2 className="sectionTitle">Products</h2>
          <div className="products-grid">
            {list.map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} />)}
            {list.length === 0 && <div className="box">No products found.</div>}
          </div>
        </section>

        <aside id="cart" className={`cart-panel ${cartOpen ? 'open' : ''}`} aria-hidden={!cartOpen && window.innerWidth <= 900}>
          <h2 className="sectionTitle">Cart</h2>
          {/* small-screen close button */}
          <div className="cart-header-actions">
            <button className="cart-close-btn" onClick={() => setCartOpen(false)} aria-label="Close cart">Close</button>
          </div>

          {cart.length === 0 ? (
            <div className="box">Cart is empty.</div>
          ) : (
            <>
              <div className="cart-list">
                {cart.map(item => (
                  <div className="cart-item" key={item.key}>
                    <div className="cart-left">
                      <div className="cart-name">{item.name}</div>
                      <div className="cart-meta">Size: {item.size || '-'} • Color: {item.color || '-'}</div>
                      <div className="cart-price">₹{item.price} each</div>
                    </div>

                    <div className="cart-right">
                      <div className="qty">
                        <button className="small-btn" onClick={()=>updateQty(item.key, item.qty-1)}>-</button>
                        <input className="qty-input" type="number" min="1" max="99" value={item.qty} onChange={e=>updateQty(item.key, Number(e.target.value))} />
                        <button className="small-btn" onClick={()=>updateQty(item.key, item.qty+1)}>+</button>
                      </div>

                      <div className="subtotal">₹{item.price * item.qty}</div>
                      <button className="remove" onClick={()=>removeFromCart(item.key)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div>Total: <strong>₹{total}</strong></div>
                <div className="cart-actions">
                  <button className="btn ghost" onClick={clearCart}>Clear</button>
                  <button className="btn" onClick={checkout}>Checkout</button>
                </div>
              </div>
            </>
          )}
        </aside>
      </main>

      {/* backdrop for mobile drawer */}
      {cartOpen && <div className="cart-backdrop" onClick={() => setCartOpen(false)} />}

      <footer id="footer">
        <div className="wrap footer-row">
          <div>© Clothify - Student Project</div>
          <div>Contact: student@example.com</div>
        </div>
      </footer>

      <section id="about" className="wrap content about-section">
        <h2 className="sectionTitle">About Clothify</h2>
        <p className="about-desc">
          Clothify is a compact demo shopping app built as a student project to
          showcase a clean, responsive UI and core e-commerce interactions — search,
          filtering, size & color selection, and a lightweight cart persisted to
          localStorage. It's intentionally minimal and focused on clarity and
          accessibility so you can understand and extend it quickly.
        </p>

        <div className="about-grid">
          <div className="about-bio">
            <h3>About the Author</h3>
            <p className="post-body">Ved is a web developer who enjoys crafting
              clean, functional interfaces and learning new frontend patterns.
              This project is a small learning exercise combining React state
              management and responsive CSS.</p>
          </div>

          <div className="about-social">
            <h3>Social</h3>
            <a className="social-link" href="https://github.com/Veddd018" target="_blank" rel="noopener noreferrer">
              <svg className="social-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="social-text">@Veddd018</span>
            </a>
          </div>
        </div>
      </section>

      {notice && <div id="notice">{notice}</div>}
    </div>
  );
}

/* Product card component with inline controls for size/color selections */
function ProductCard({ product, onAdd }) {
  const [size, setSize] = useState(product.sizes?.[0] || '');
  const [color, setColor] = useState(product.colors?.[0] || '');

  return (
    <article className="product">
      <div className="product-top">
        <div className="product-img">{product.name.split(' ').map(w=>w[0]).slice(0,2).join('')}</div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-desc">{product.desc}</div>
          <div className="meta">Category: {product.category}</div>
        </div>
      </div>

      <div className="product-options">
        <div className="option">
          <label className="small">Size</label>
          <select className="input size-select" value={size} onChange={e=>setSize(e.target.value)}>
            {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="option">
          <label className="small">Color</label>
          <div className="color-row">
            {product.colors.map(c => (
              <button
                key={c}
                className={`color-dot ${color===c ? 'active' : ''}`}
                title={c}
                onClick={() => setColor(c)}
                style={{ background: colorDotColor(c) }}
                type="button"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="product-bottom">
        <div className="price">₹{product.price}</div>
        <button className="btn" onClick={() => onAdd(product, { size, color })}>Add</button>
      </div>
    </article>
  );
}

/* Small helper to map simple color names to CSS colors */
function colorDotColor(name) {
  const map = { black:'#111827', white:'#ffffff', blue:'#3b82f6', navy:'#1e40af', red:'#ef4444', yellow:'#f59e0b', grey:'#9ca3af' };
  return map[name] || '#ccc';
}

export default App;

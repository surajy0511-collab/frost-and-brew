import { useEffect, useMemo, useState } from 'react'
import { menuCategories } from './menuData'
import { getWhatsAppUrl, siteConfig } from './siteConfig'

const photos = [
  { src: '/images/cafe-interior.jpg', alt: 'Warm wooden tables and botanical mural inside Frost & Brew', caption: 'A seat in the sunshine' },
  { src: '/images/signature-dessert.jpg', alt: 'Frost & Brew branded coffee with dessert and a savoury bake', caption: 'A little something sweet' },
  { src: '/images/latte.jpg', alt: 'Latte art in a ceramic Frost & Brew cup', caption: 'Coffee, made for a pause' },
  { src: '/images/brownie.jpg', alt: 'Rich chocolate brownie in the café', caption: 'Chocolate kind of day' },
  { src: '/images/cafe-interior-seating.jpg', alt: 'Comfortable café seating with warm wood and pendant lighting', caption: 'Come as you are' },
]

function BrandMark({ compact = false }) {
  return (
    <a className={`brand ${compact ? 'brand-compact' : ''}`} href="#home" aria-label="Frost & Brew, home">
      <img className="brand-photo" src="/images/frost-brew-mark.jpg" alt="Frost & Brew Café logo" />
      <span className="brand-name">
        <strong>Frost <i>&amp;</i> Brew</strong>
        <small>CAFÉ · ICE CREAM · DESSERTS</small>
      </span>
    </a>
  )
}

function Navigation({ cartCount, onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const links = [
    ['Our story', '#story'],
    ['Menu', '#menu'],
    ['Gallery', '#gallery'],
    ['Find us', '#find-us'],
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen)
    return () => document.body.classList.remove('nav-open')
  }, [menuOpen])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header-inner">
        <BrandMark />
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} id="mobile-menu" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a className="nav-visit" href="#find-us" onClick={() => setMenuOpen(false)}>Visit us <span aria-hidden="true">↗</span></a>
        </nav>
        <button
          className="nav-cart"
          type="button"
          onClick={onCartClick}
          aria-label={`Open shopping cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
        >
          Cart <span>{cartCount}</span>
        </button>
        <button
          className={`nav-toggle ${menuOpen ? 'is-open' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
      </div>
    </header>
  )
}

function WhatsAppCTA({ floating = false }) {
  const url = getWhatsAppUrl()
  if (floating && !url) return null

  if (!url) {
    return (
      <button className={`button button-outline ${floating ? 'whatsapp-float' : ''}`} type="button" disabled title="WhatsApp number will be added when provided">
        WhatsApp coming soon
      </button>
    )
  }
  return (
    <a className={`button button-outline ${floating ? 'whatsapp-float' : ''}`} href={url} target="_blank" rel="noreferrer">
      {floating ? 'WhatsApp' : 'Say hello on WhatsApp'} <span aria-hidden="true">↗</span>
    </a>
  )
}

function AddMenuButton({ label, onClick }) {
  return (
    <button className="add-menu-button" type="button" aria-label={label} onClick={onClick}>
      <span aria-hidden="true">+</span>
    </button>
  )
}

function PriceAction({ itemName, variant, price, categoryName, onAdd }) {
  if (price == null) return <Price value={price} />

  const label = `${itemName}${variant ? `, ${variant.toLowerCase()}` : ''}`
  return (
    <span className="price-action">
      <Price value={price} />
      <AddMenuButton
        label={`Add ${label} to cart`}
        onClick={() => onAdd({ category: categoryName, name: itemName, variant, price })}
      />
    </span>
  )
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="eyebrow"><span /> A NEIGHBOURHOOD CAFÉ IN BENGALURU</p>
        <h1>Take the long way to <em>something lovely.</em></h1>
        <p className="hero-description">Coffee worth slowing down for, scoops worth sharing, and a table that’s yours for as long as you like.</p>
        <div className="hero-actions">
          <a className="button button-dark" href="#menu">Explore the menu <span aria-hidden="true">↗</span></a>
          <a className="text-link" href="#find-us">Come find us <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <div className="hero-visual">
        <img className="hero-image" src="/images/cafe-interior.jpg" alt="The warmly lit Frost & Brew café, with timber tables and leafy walls" fetchPriority="high" />
        <div className="hero-image-caption">
          <span>FROST &amp; BREW, BENGALURU</span>
          <span>Come in, stay awhile <i aria-hidden="true">↗</i></span>
        </div>
      </div>
      <div className="hero-footnote"><span>COFFEE</span><i>·</i><span>ICE CREAM</span><i>·</i><span>GOOD COMPANY</span></div>
    </section>
  )
}

function Story() {
  return (
    <section className="story section-pad" id="story">
      <div className="story-image-wrap reveal">
        <img src="/images/cafe-interior-seating.jpg" alt="The café's wooden tables, comfortable seats and warm pendant lights" loading="lazy" />
        <span className="image-note">A little place to linger</span>
      </div>
      <div className="story-copy reveal">
        <p className="eyebrow"><span /> A TABLE WITH YOUR NAME ON IT</p>
        <h2>Make room<br />for <em>the good stuff.</em></h2>
        <p className="story-body">A welcoming seat, the glow of a pendant light, and something lovely to sip or savour. Frost &amp; Brew brings coffee, ice cream and desserts together in a space made for catching up—or taking a moment for yourself.</p>
        <a className="text-link" href="#gallery">Take a look around <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  )
}

function Price({ value }) {
  return <span className="price">{value == null ? '—' : `₹${value}`}</span>
}

function MenuItemRow({ item, type, categoryName, onAdd }) {
  if (type === 'hot-cold') {
    return (
      <div className="menu-row menu-row-coffee">
        <span className="menu-item-name">{item.name}</span>
        <span className="menu-price">
          <small>HOT</small>
          <PriceAction itemName={item.name} variant="Hot" price={item.hot} categoryName={categoryName} onAdd={onAdd} />
        </span>
        <span className="menu-price">
          <small>COLD</small>
          <PriceAction itemName={item.name} variant="Cold" price={item.cold} categoryName={categoryName} onAdd={onAdd} />
        </span>
      </div>
    )
  }
  return (
    <div className="menu-row">
      <span className="menu-item-name">{item.name}</span>
      <span className="menu-price">
        <PriceAction itemName={item.name} price={item.price} categoryName={categoryName} onAdd={onAdd} />
      </span>
    </div>
  )
}

function IceCreamFlavorRow({ tier, flavor, categoryName, onAdd }) {
  const [scoopCount, setScoopCount] = useState(0)
  const sizeNames = ['Single scoop', 'Double scoop', 'Triple scoop']
  const price = tier.prices[scoopCount]

  return (
    <div className="ice-flavour-row">
      <span className="ice-flavour-name">{flavor}</span>
      <label className="sr-only" htmlFor={`scoop-${tier.name}-${flavor}`}>Scoop size for {flavor}</label>
      <select id={`scoop-${tier.name}-${flavor}`} value={scoopCount} onChange={(event) => setScoopCount(Number(event.target.value))}>
        {sizeNames.map((size, index) => <option value={index} key={size}>{size}</option>)}
      </select>
      <span className="ice-flavour-price"><Price value={price} /></span>
      <AddMenuButton
        label={`Add ${flavor}, ${sizeNames[scoopCount].toLowerCase()}, to cart`}
        onClick={() => onAdd({ category: categoryName, name: flavor, variant: sizeNames[scoopCount], price })}
      />
    </div>
  )
}

function IceCreamTiers({ tiers, categoryName, onAdd }) {
  return (
    <div className="ice-cream-tiers">
      {tiers.map((tier) => (
        <section className="ice-tier" key={tier.name} aria-label={`${tier.name} ice cream`}>
          <h4 className="tier-label">{tier.name}</h4>
          <div className="ice-tier-items">
            {tier.flavours.map((flavor) => (
              <IceCreamFlavorRow
                tier={tier}
                flavor={flavor}
                categoryName={categoryName}
                onAdd={onAdd}
                key={flavor}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function Menu({ onAddToCart }) {
  const [categoryId, setCategoryId] = useState(menuCategories[0].id)
  const [search, setSearch] = useState('')
  const category = menuCategories.find(({ id }) => id === categoryId) ?? menuCategories[0]
  const query = search.trim().toLowerCase()
  const filteredItems = useMemo(() => {
    if (!query || category.type === 'tiers') return category.items?.filter((item) => item.name.toLowerCase().includes(query)) ?? []
    return category.items?.filter((item) => item.name.toLowerCase().includes(query)) ?? []
  }, [category, query])
  const filteredTiers = category.type === 'tiers'
    ? category.tiers.map((tier) => ({ ...tier, flavours: tier.flavours.filter((flavour) => flavour.toLowerCase().includes(query)) })).filter((tier) => tier.flavours.length)
    : []

  return (
    <section className="menu-section section-pad" id="menu">
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow"><span /> GOOD THINGS, MADE FOR YOUR MOMENT</p>
          <h2>A menu to<br /><em>make a moment.</em></h2>
        </div>
        <p className="section-intro">Find your familiar favourite, or take the scenic route through coffee, coolers, sundaes and more.</p>
      </div>
      <div className="menu-shell reveal">
        <div className="menu-controls">
          <div className="category-tabs" role="tablist" aria-label="Menu categories">
            {menuCategories.map(({ id, name }) => (
              <button
                type="button"
                role="tab"
                id={`tab-${id}`}
                aria-controls={`panel-${id}`}
                aria-selected={id === categoryId}
                className={`category-tab ${id === categoryId ? 'is-active' : ''}`}
                key={id}
                onClick={() => setCategoryId(id)}
              >
                {name}
              </button>
            ))}
          </div>
          <label className="menu-search">
            <span className="sr-only">Search this category</span>
            <span aria-hidden="true" className="search-icon">⌕</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a favourite" />
            {search && <button type="button" aria-label="Clear search" onClick={() => setSearch('')}>×</button>}
          </label>
        </div>

        <div className="menu-content" role="tabpanel" id={`panel-${category.id}`} aria-labelledby={`tab-${category.id}`} key={category.id}>
          <div className="menu-panel-heading">
            <div>
              <p className="eyebrow">THE FROST &amp; BREW MENU</p>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
            {category.type === 'hot-cold' && <span className="menu-currency">ALL PRICES IN INR</span>}
          </div>
          {category.type === 'tiers' && (
            <IceCreamTiers tiers={filteredTiers} categoryName={category.name} onAdd={onAddToCart} />
          )}
          {category.type === 'hot-cold' && (
            <>
              <div className="coffee-head"><span>YOUR CUP</span><span>HOT</span><span>COLD</span></div>
              <div className="menu-rows">{filteredItems.map((item) => <MenuItemRow item={item} type={category.type} categoryName={category.name} onAdd={onAddToCart} key={item.name} />)}</div>
            </>
          )}
          {category.type === 'price' && <div className="menu-rows">{filteredItems.map((item) => <MenuItemRow item={item} categoryName={category.name} onAdd={onAddToCart} key={item.name} />)}</div>}
          {category.type === 'placeholder' && <div className="menu-note">We’re confirming this part of the menu. Please ask us in café for today’s selection.</div>}
          {category.type !== 'placeholder' && category.type !== 'tiers' && filteredItems.length === 0 && <p className="empty-search">No matches in this category. Try another search.</p>}
          {category.type === 'tiers' && filteredTiers.length === 0 && <p className="empty-search">No matching flavours. Try another search.</p>}
          <p className="menu-footnote">Menu selections and availability may vary in café.</p>
        </div>
      </div>
    </section>
  )
}

function CartDrawer({ open, items, onClose, onQuantityChange, onRemove }) {
  useEffect(() => {
    if (!open) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.classList.add('cart-open')
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.classList.remove('cart-open')
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [open, onClose])

  if (!open) return null

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const orderMessage = [
    'Hi Frost & Brew! I would like to place this order:',
    '',
    ...items.map(({ name, variant, quantity, price }) => (
      `- ${quantity} x ${name}${variant ? ` (${variant})` : ''} - ₹${price * quantity}`
    )),
    '',
    `Total: ₹${total}`,
    '',
    'Please confirm availability and pickup or delivery details.',
  ].join('\n')
  const whatsappUrl = items.length ? getWhatsAppUrl(orderMessage) : ''

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" onClick={(event) => event.stopPropagation()}>
        <div className="cart-header">
          <div>
            <p className="eyebrow"><span /> YOUR LITTLE ORDER</p>
            <h2 id="cart-title">Your cart</h2>
          </div>
          <button className="cart-close" type="button" aria-label="Close cart" onClick={onClose}>×</button>
        </div>

        {items.length ? (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <article className="cart-item" key={item.id}>
                  <div className="cart-item-details">
                    <p>{item.name}</p>
                    <span>{[item.category, item.variant].filter(Boolean).join(' · ')}</span>
                    <strong>₹{item.price * item.quantity}</strong>
                  </div>
                  <div className="cart-item-controls" aria-label={`Quantity for ${item.name}`}>
                    <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => onQuantityChange(item.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => onQuantityChange(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="cart-remove" type="button" aria-label={`Remove ${item.name} from cart`} onClick={() => onRemove(item.id)}>Remove</button>
                </article>
              ))}
            </div>
            <div className="cart-summary">
              <span>Subtotal</span>
              <strong>₹{total}</strong>
            </div>
            {whatsappUrl ? (
              <a className="button button-dark cart-checkout" href={whatsappUrl} target="_blank" rel="noreferrer">
                Checkout on WhatsApp <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <>
                <button className="button button-dark cart-checkout" type="button" disabled>
                  Checkout on WhatsApp <span aria-hidden="true">↗</span>
                </button>
                <p className="cart-config-note">WhatsApp checkout will be ready once the café number is added.</p>
              </>
            )}
          </>
        ) : (
          <div className="cart-empty">
            <span aria-hidden="true">✳</span>
            <p>Your cart is waiting for something good.</p>
            <button className="text-link" type="button" onClick={onClose}>Back to the menu <span aria-hidden="true">↓</span></button>
          </div>
        )}
      </aside>
    </div>
  )
}

function SignaturePicks() {
  const picks = [
    { title: 'Signature Gudbud', category: 'A SUNDAE FAVOURITE', photo: '/images/signature-dessert.jpg', alt: 'Café cup alongside a dessert and freshly baked treat' },
    { title: 'Ultimate Fudgy Brownie Sundae', category: 'FOR THE CHOCOLATE MOOD', photo: '/images/brownie.jpg', alt: 'Chocolate brownie dessert served at the café' },
    { title: 'Lotus Biscoff Frappe', category: 'A COOL COFFEE PICK', photo: '/images/signature-dessert.jpg', alt: 'Frost & Brew takeaway coffee beside a dessert' },
    { title: 'A coffee, your way', category: 'SOMETHING TO SIP', photo: '/images/latte.jpg', alt: 'Latte art in a Frost & Brew ceramic cup' },
  ]

  return (
    <section className="signature-section section-pad">
      <div className="section-heading signature-heading reveal">
        <div>
          <p className="eyebrow eyebrow-light"><span /> A FEW HOUSE FAVOURITES</p>
          <h2>Made for<br /><em>the little treat.</em></h2>
        </div>
        <a className="button button-cream" href="#menu">See the full menu <span aria-hidden="true">↗</span></a>
      </div>
      <div className="signature-grid">
        {picks.map((pick) => (
          <article className="signature-card reveal" key={pick.title}>
            <div className="signature-photo">
              <img src={pick.photo} alt={pick.alt} loading="lazy" />
            </div>
            <div className="signature-copy">
              <p>{pick.category}</p>
              <h3>{pick.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  useEffect(() => {
    if (!selectedPhoto) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedPhoto(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedPhoto])

  return (
    <section className="gallery-section section-pad" id="gallery">
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow"><span /> A GLIMPSE INSIDE</p>
          <h2>Good things<br /><em>happen here.</em></h2>
        </div>
        <p className="section-intro">A little look at the tables, cups and treats that make this place feel like yours.</p>
      </div>
      <div className="gallery-grid">
        {photos.map((photo, index) => (
          <button type="button" className={`gallery-tile gallery-tile-${index + 1} reveal`} key={photo.src} onClick={() => setSelectedPhoto(photo)} aria-label={`View photo: ${photo.caption}`}>
            <img src={photo.src} alt={photo.alt} loading="lazy" />
            <span className="gallery-caption">{photo.caption}<i aria-hidden="true">↗</i></span>
          </button>
        ))}
      </div>
      {selectedPhoto && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={selectedPhoto.caption} onClick={() => setSelectedPhoto(null)}>
          <button className="lightbox-close" type="button" aria-label="Close photo" onClick={() => setSelectedPhoto(null)}>×</button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={selectedPhoto.src} alt={selectedPhoto.alt} />
            <figcaption>{selectedPhoto.caption}</figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}

function VisitSection() {
  return (
    <section className="visit-section section-pad" id="find-us">
      <div className="visit-copy reveal">
        <p className="eyebrow"><span /> YOUR NEXT LITTLE BREAK</p>
        <h2>Come find<br /><em>your corner.</em></h2>
        <p>We’d love to save you a seat. Find Frost &amp; Brew on the map, or follow along for a little more café time.</p>
        <div className="visit-actions">
          <a className="button button-dark" href={siteConfig.googleMaps} target="_blank" rel="noreferrer">Get directions <span aria-hidden="true">↗</span></a>
          <a className="text-link" href={siteConfig.instagram} target="_blank" rel="noreferrer">Follow our journey <span aria-hidden="true">↗</span></a>
        </div>
        <p className="branch-note"><span aria-hidden="true">✳</span> More branches are coming soon.</p>
        <div className="visit-social">
          <span className="instagram-icon" aria-hidden="true">◎</span>
          <div><small>FIND US ON INSTAGRAM</small><a href={siteConfig.instagram} target="_blank" rel="noreferrer">@frost_n_brew.blr</a></div>
        </div>
        <WhatsAppCTA />
      </div>
      <div className="map-card reveal">
        {siteConfig.mapsEmbedUrl ? (
          <iframe
            src={siteConfig.mapsEmbedUrl}
            title="Google Maps preview for Frost & Brew"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <a className="map-preview-fallback" href={siteConfig.googleMaps} target="_blank" rel="noreferrer" aria-label="Open Frost & Brew location in Google Maps">
            <img src="/images/cafe-interior.jpg" alt="" loading="lazy" />
          </a>
        )}
        <a className="map-card-note" href={siteConfig.googleMaps} target="_blank" rel="noreferrer">
          <strong>Frost &amp; Brew</strong><span>Find your way to our corner of Bengaluru</span><i>Open map ↗</i>
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <BrandMark compact />
          <p className="footer-tagline">Good coffee. Great desserts.<br />Even better moments.</p>
        </div>
        <div className="footer-links">
          <div><small>TAKE A LOOK</small><a href="#story">Our story</a><a href="#menu">Menu</a><a href="#gallery">Gallery</a></div>
          <div><small>COME SAY HELLO</small><a href={siteConfig.googleMaps} target="_blank" rel="noreferrer">Get directions ↗</a><a href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram ↗</a><WhatsAppCTA /></div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} FROST &amp; BREW CAFÉ</span>
        <span>MADE FOR YOUR MOMENT <i>✳</i></span>
        <a href="#home">BACK TO TOP ↑</a>
      </div>
    </footer>
  )
}

function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return undefined
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  const addToCart = ({ category, name, variant, price }) => {
    const id = [category, name, variant ?? ''].join('::')
    setCart((items) => {
      const existing = items.find((item) => item.id === id)
      if (existing) {
        return items.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...items, { id, category, name, variant, price, quantity: 1 }]
    })
  }

  const changeCartQuantity = (id, quantity) => {
    setCart((items) => items.flatMap((item) => {
      if (item.id !== id) return [item]
      return quantity > 0 ? [{ ...item, quantity }] : []
    }))
  }

  const removeFromCart = (id) => setCart((items) => items.filter((item) => item.id !== id))
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <>
      <Navigation cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <main>
        <Hero />
        <Story />
        <Menu onAddToCart={addToCart} />
        <SignaturePicks />
        <Gallery />
        <VisitSection />
      </main>
      <Footer />
      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onQuantityChange={changeCartQuantity}
        onRemove={removeFromCart}
      />
      <WhatsAppCTA floating />
    </>
  )
}

export default App

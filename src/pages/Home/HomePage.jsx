import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [date, setDate] = React.useState('');
  const [selectedFilters, setSelectedFilters] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append('q', searchQuery.trim());
    if (location.trim()) params.append('location', location.trim());
    if (date.trim()) params.append('date', date.trim());
    if (selectedFilters.length > 0) params.append('filters', selectedFilters.join(','));
    navigate(`/vendor-search-discovery?${params.toString()}`);
  };

  const handleGetStarted = () => {
    navigate('/user-registration-login');
  };

  const handleVendorClick = (vendorId) => {
    navigate(`/vendor-profile-portfolio?vendor=${vendorId}`);
  };

  const handleRequestQuote = (vendorId) => {
    navigate(`/quote-request-booking-flow?vendor=${vendorId}`);
  };

  const handleBookNow = (vendorId) => {
    navigate(`/quote-request-booking-flow?vendor=${vendorId}&action=book`);
  };

  const handleFilterClick = (filter) => {
    setSelectedFilters(prev => prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]);
  };

  const handleCategoryClick = (category) => {
    setSearchQuery(category);
  };

  const handleViewCalendar = () => {
    document.getElementById('calendar').scrollIntoView({ behavior: 'smooth' });
  };

  return (

    <div className="container-fluid px-12 py-5">

      <header>
        <div className="brand">
          <div className="logo" aria-hidden>EP</div>
          <div>
            <h1>Eventnect</h1>
            <p className="muted">Pune · Maharashtra — Event Marketplace</p>
          </div>
        </div>

        <nav aria-label="Primary">
          <a href="#categories">Services</a>
          <Link to="/vendor-search-discovery">Vendors</Link>
          {/* <a href="#b2b">B2B</a>
          <a href="#how">How it works</a> */}
          <button className="cta" onClick={handleGetStarted}>Get Started</button>
        </nav>
      </header>

      {/* HERO + ASIDE */}
      <section className="hero">
        <div className="hero-card fade-in" role="region" aria-labelledby="hero-heading">
          <h2 id="hero-heading">Find trusted event vendors in Pune — fast</h2>
          <p>Compare quotes, check date availability and book verified vendors with GST-compliant invoices.</p>

          <div className="search-row" role="search" aria-label="Search services">
            <label className="search-field" aria-hidden="true">
              {/* search icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
                <path d="M21 21l-4.35-4.35" stroke="#9aa7b2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="11" cy="11" r="6" stroke="#9aa7b2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input type="text" placeholder="What are you looking for? (Caterer, Decor, Photographer)" aria-label="Service input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </label>

            <label className="search-field" aria-hidden="true">
              {/* location icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
                <path d="M12 11.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" stroke="#9aa7b2" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 21s8-4.5 8-11a8 8 0 1 0-16 0c0 6.5 8 11 8 11z" stroke="#9aa7b2" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            <input type="text" placeholder="Location — Pune, Kothrud" aria-label="Location input" value={location} onChange={(e) => setLocation(e.target.value)} />
            </label>

            <label className="search-field" aria-hidden="true">
              {/* calendar icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
                <rect x="3" y="5" width="18" height="16" rx="2" stroke="#9aa7b2" strokeWidth="1.4" />
                <path d="M16 3v4M8 3v4M3 11h18" stroke="#9aa7b2" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            <input type="date" placeholder="Date — 10 Oct 2025" aria-label="Date input" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>

            <button className="btn-primary" onClick={handleSearch} aria-label="Search">Search</button>
          </div>

          <div className="filters" aria-hidden>
            {['Eco-friendly', 'Budget ₹10k–50k', 'Wedding', 'Instant book'].map(filter => (
              <div key={filter} className={`chip ${selectedFilters.includes(filter) ? 'selected' : ''}`} onClick={() => handleFilterClick(filter)}>{filter}</div>
            ))}
          </div>

          <div className="section" id="categories">
            <h3>Popular Categories</h3>
            <div className="categories">
              {[
                { name: 'Banquet Halls', icon: '🎪', desc: 'Large & intimate venues' },
                { name: 'Catering', icon: '🍽️', desc: 'Veg / Non-veg / Fusion' },
                { name: 'Decor & Lighting', icon: '💡', desc: 'Eco & modern themes' },
                { name: 'Photographers', icon: '📷', desc: 'Pre-wedding & candid' }
              ].map(cat => (
                <div key={cat.name} className="cat" title={cat.name} onClick={() => handleCategoryClick(cat.name)}>
                  <div className="icon">{cat.icon}</div>
                  <div>
                    <strong>{cat.name}</strong>
                    <div className="muted">{cat.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="section" id="vendors">
            <h3 style={{ marginTop: '18px' }}>Featured Vendors in Pune</h3>

            <div className="vendors">
              {/* Vendor 1 */}
              <article className="vendor-card" aria-labelledby="v1-title" onClick={() => handleVendorClick('shubh-banquets')}>
                <img className="vendor-thumb"
                  src="https://media.istockphoto.com/id/1455919339/photo/the-beautiful-decorations-cultural-program.webp?a=1&b=1&s=612x612&w=0&k=20&c=sDitLq82cCHfp2HQRr8a2Z4-a9OeLSKfKdKAVNhtpZw="
                  alt="Shubh Banquets hall" />
                <div className="vendor-body">
                  <div className="vendor-info">
                    <h4 id="v1-title">Shubh Banquets</h4>
                    <p className="muted">Banquet · 200+ events · Starting ₹40,000</p>
                    <div className="badges">
                      <span className="badge">Verified</span>
                      <span className="badge">AC Halls</span>
                      <span className="badge">In-house catering</span>
                    </div>
                  </div>
                  <div className="vendor-meta">
                    <div className="rating" aria-hidden>★ 4.8</div>
                    <div className="muted" style={{ marginTop: '8px' }}>Available</div>
                  </div>
                </div>
                <div className="vendor-footer">
                  <div className="price">₹40,000+</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-outline" onClick={(e) => { e.stopPropagation(); handleRequestQuote('shubh-banquets'); }} aria-label="Request quote">Request Quote</button>
                    <button className="btn-primary" onClick={(e) => { e.stopPropagation(); handleBookNow('shubh-banquets'); }} aria-label="Book now">Book</button>
                  </div>
                </div>
              </article>

              {/* Vendor 2 */}
              <article className="vendor-card" aria-labelledby="v2-title" onClick={() => handleVendorClick('greenweds-catering')}>
                <img className="vendor-thumb"
                  src="https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=1400&auto=format&fit=crop"
                  alt="GreenWeds catering" />
                <div className="vendor-body">
                  <div className="vendor-info">
                    <h4 id="v2-title">GreenWeds Catering</h4>
                    <p className="muted">Eco-catering · Local produce · Custom menus</p>
                    <div className="badges"><span className="badge">Eco</span><span className="badge">Custom
                      Menu</span></div>
                  </div>
                  <div className="vendor-meta">
                    <div className="rating" aria-hidden>★ 4.7</div>
                    <div className="muted" style={{ marginTop: '8px' }}>Few slots</div>
                  </div>
                </div>
                <div className="vendor-footer">
                  <div className="price">₹800 / plate</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-outline" onClick={(e) => { e.stopPropagation(); handleRequestQuote('greenweds-catering'); }} aria-label="Request quote">Request Quote</button>
                    <button className="btn-primary" onClick={(e) => { e.stopPropagation(); handleBookNow('greenweds-catering'); }} aria-label="Book now">Book</button>
                  </div>
                </div>
              </article>

              {/* Vendor 3 */}
              <article className="vendor-card" aria-labelledby="v3-title" onClick={() => handleVendorClick('lumina-decor')}>
                <img className="vendor-thumb"
                  src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1400&auto=format&fit=crop"
                  alt="Lumina Decor" />
                <div className="vendor-body">
                  <div className="vendor-info">
                    <h4 id="v3-title">Lumina Decor</h4>
                    <p className="muted">Lighting & design · Sustainable themes</p>
                    <div className="badges"><span className="badge">Sustainable</span><span className="badge">Custom
                      Install</span></div>
                  </div>
                  <div className="vendor-meta">
                    <div className="rating" aria-hidden>★ 4.9</div>
                    <div className="muted" style={{ marginTop: '8px' }}>Available</div>
                  </div>
                </div>
                <div className="vendor-footer">
                  <div className="price">₹25,000+</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-outline" onClick={(e) => { e.stopPropagation(); handleRequestQuote('lumina-decor'); }} aria-label="Request quote">Request Quote</button>
                    <button className="btn-primary" onClick={(e) => { e.stopPropagation(); handleBookNow('lumina-decor'); }} aria-label="Book now">Book</button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>

        {/* RIGHT ASIDE */}
        <aside className="aside">
          <div className="card calendar fade-in" id="calendar" aria-hidden>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>October 2025</strong>
              <div className="muted">Availability snapshot — Pune</div>
            </div>

            <div className="cal-grid" aria-hidden>
              <div className="cal-day muted">Sun</div>
              <div className="cal-day muted">Mon</div>
              <div className="cal-day muted">Tue</div>
              <div className="cal-day muted">Wed</div>
              <div className="cal-day muted">Thu</div>
              <div className="cal-day muted">Fri</div>
              <div className="cal-day muted">Sat</div>
              <div className="cal-day"></div>
              <div className="cal-day"></div>
              <div className="cal-day free">1</div>
              <div className="cal-day busy">2</div>
              <div className="cal-day free">3</div>
              <div className="cal-day busy">4</div>
              <div className="cal-day free">5</div>
              <div className="cal-day free">6</div>
              <div className="cal-day busy">7</div>
              <div className="cal-day free">8</div>
              <div className="cal-day">9</div>
              <div className="cal-day free">10</div>
              <div className="cal-day busy">11</div>
              <div className="cal-day free">12</div>
              <div className="cal-day free">13</div>
              <div className="cal-day busy">14</div>
              <div className="cal-day free">15</div>
              <div className="cal-day">16</div>
              <div className="cal-day busy">17</div>
              <div className="cal-day free">18</div>
              <div className="cal-day free">19</div>
              <div className="cal-day busy">20</div>
              <div className="cal-day free">21</div>
              <div className="cal-day free">22</div>
              <div className="cal-day busy">23</div>
              <div className="cal-day free">24</div>
              <div className="cal-day free">25</div>
              <div className="cal-day busy">26</div>
              <div className="cal-day free">27</div>
              <div className="cal-day free">28</div>
              <div className="cal-day busy">29</div>
              <div className="cal-day free">30</div>
              <div className="cal-day">31</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <div className="muted">Next: 3 bookings this week</div>
              <button className="chip" onClick={handleViewCalendar}>View calendar</button>
            </div>
          </div>

          {/* <-- INSERTED AD CARD (non-invasive) --> */}
          <div className="ep-ad-card fade-in" role="region" aria-label="Sponsored Ad">
            <div className="ep-ad-media">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop"
                alt="Sponsored Event Partner"
              />
              <span className="ep-ad-badge">Sponsored</span>
            </div>

            <div className="ep-ad-body">
              <h4>Premium Venue Spotlight</h4>
              <p className="muted">Book Royal Plaza for your wedding and get a complimentary decor package. Limited slots in October.</p>
              <div className="ep-ad-actions">
                <button className="btn-outline" onClick={(e) => e.preventDefault()}>Learn More</button>
                <button className="btn-primary" onClick={(e) => e.preventDefault()}>Contact</button>
              </div>
            </div>
          </div>
          {/* <-- end ad card --> */}

          <div className="card fade-in">
            <strong>Popular Services</strong>
            <p className="muted" style={{ marginTop: '8px' }}>Curated vendor suggestions based on event type, budget and availability.</p>
          </div>

          <div className="card fade-in">
            <strong>Sustainability</strong>
            <p className="muted" style={{ marginTop: '8px' }}>
              Filter eco-friendly vendors and highlight green options for sustainable events.
            </p>
          </div>
        </aside>
      </section>

      {/* How it works */}
      <section className="how modern-steps" id="how">
        <div className="step modern-step fade-in">
          <div className="step-top">
            <div className="step-icon">🔎</div>
            <div className="step-number">1</div>
          </div>
          <h4>Search</h4>
          <p className="muted">Choose service, dates and budget — see top local vendors instantly.</p>
        </div>

        <div className="step modern-step fade-in">
          <div className="step-top">
            <div className="step-icon">💬</div>
            <div className="step-number">2</div>
          </div>
          <h4>Request or Book</h4>
          <p className="muted">Request quotes or instant book vendors — chat & negotiate if needed.</p>
        </div>

        <div className="step modern-step fade-in">
          <div className="step-top">
            <div className="step-icon">💳</div>
            <div className="step-number">3</div>
          </div>
          <h4>Pay & Confirm</h4>
          <p className="muted">Secure payments with GST-compliant invoices and automated reminders.</p>
        </div>
      </section>

      <footer>
        <div>© 2025 Eventnect · Pune / Maharashtra</div>
        <div className="muted">Terms · Privacy · Contact</div>
      </footer>

    </div>

  );
};

export default HomePage;

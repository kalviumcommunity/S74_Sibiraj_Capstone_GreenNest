import React from "react";
import "./../App.css";

function Home() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">🌿 GreenNest</div>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Seeds</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Plant Tracker</a></li>
          <li><a href="#">Eco-Points</a></li>
        </ul>
        <div className="nav-actions">
          <a href="#">Sign in</a>
          <button className="join-btn">Join GreenNest</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-inner">
          <div className="hero-left">
            <h1 className="animated-heading">
              <span className="shaking-word">Grow</span>{' '}
              <span className="shaking-word">Your</span>{' '}
              <span className="shaking-word">Garden</span>{' '}
              <span className="shaking-word">with</span>{' '}
              <span className="shaking-word">Nature's</span>{' '}
              <span className="shaking-word">Wisdom</span>
            </h1>
            <p className="hero-subtext">
              GreenNest offers everything you need to create and maintain a thriving, sustainable garden that nurtures both you and the environment.
            </p>
            <div className="hero-buttons">
              <button className="explore-btn">Organic Seeds</button>
              <button className="book-btn">Book Services</button>
            </div>
          </div>
          {/* Sage Chatbot */}
          <div className="sage-box sage-align-left">
            <div className="sage-header">
              Sage 🌿
              <span>AI Gardening Assistant</span>
            </div>
            <div className="sage-messages">
              Hi! Ask me about your plants, tools, or composting 🌱
              <span className="time">9:41 AM</span>
            </div>
            <div className="sage-input">
              <input type="text" placeholder="Ask Sage..." />
              <button className="send-btn">➤</button>
            </div>
          </div>
        </div>
      </div>

      {/* Green Summary Section */}
      <section className="green-summary-cards-section">
        <h2 className="section-title">Cultivate Your Green Summary</h2>
        <p className="section-desc">GreenNest offers everything you need to create and maintain a thriving, sustainable garden that nurtures both you and the environment</p>
        <div className="summary-cards-grid">
          <div className="summary-card">
            <div className="summary-card-icon">🌱</div>
            <h3>Organic Seeds</h3>
            <p>Discover our rich variety of organic seeds for vegetables, herbs, and flowers. Grown naturally, for a healthier garden.</p>
            <a href="#" className="summary-link">Browse Seeds</a>
          </div>
          <div className="summary-card">
            <div className="summary-card-icon">🛠️</div>
            <h3>Gardening Services</h3>
            <p>Hire local experts for soil testing, compost setup, irrigation, and more. Sustainable solutions for every garden.</p>
            <a href="#" className="summary-link">Book Services</a>
          </div>
          <div className="summary-card">
            <div className="summary-card-icon">📈</div>
            <h3>Plant Tracking</h3>
            <p>Monitor your garden's progress with our plant tracker. Get reminders, tips, and insights for every stage.</p>
            <a href="#" className="summary-link">Track Plants</a>
          </div>
          <div className="summary-card">
            <div className="summary-card-icon">🏆</div>
            <h3>Eco-Points Rewards</h3>
            <p>Earn eco-points for every sustainable action. Redeem rewards and join our green community leaderboard!</p>
            <a href="#" className="summary-link">View Rewards</a>
          </div>
        </div>
      </section>

      {/* Sustainable Gardening Tips Section */}
      <section className="tips-section">
        <h2 className="section-title">Sustainable Gardening Tips</h2>
        <p className="section-desc">Explore our collection of eco-friendly gardening practices to help your garden thrive while protecting our planet.</p>
        <div className="tips-grid">
          <div className="tip-card">
            <img src="https://in.zohocommercecdn.com/product-images/pVJwwlzjOQ.jpg/1481995000000253017/600x600?storefront_domain=www.gandhisgardentokitchen.com" alt="Vermicomposting" className="tip-img" />
            <h4>Vermicomposting: Nature's Recyclers</h4>
            <p>Let worms turn food scraps into rich soil and nutrients for your garden.</p>
            <a href="#" className="tip-link">Read Guide</a>
          </div>
          <div className="tip-card">
            <img src="https://images.finegardening.com/app/uploads/2018/07/27133136/fg183-water-wise-design-8.jpg" alt="Water-Wise Gardening" className="tip-img" />
            <h4>Water-Wise Gardening Techniques</h4>
            <p>Grow a healthy garden with smart watering, mulch, and drought-tolerant plants.</p>
            <a href="#" className="tip-link">Read Guide</a>
          </div>
          <div className="tip-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQchoWFnPEG6SEYUUekJ55BVujZzRFvquxfuA&s" alt="Pollinator Paradise" className="tip-img" />
            <h4>Creating a Pollinator Paradise</h4>
            <p>Learn how to design a garden that attracts bees, butterflies, and birds.</p>
            <a href="#" className="tip-link">Read Guide</a>
          </div>
        </div>
        <div style={{ marginTop: "30px" }}>
          <button className="summary-btn">Explore All Gardening Services</button>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Start Your Sustainable Garden Today</h2>
        <p>Join the GreenNest community and begin your journey towards a greener, more sustainable lifestyle through the joy of gardening.</p>
        <div className="cta-buttons">
          <button className="cta-create">Create Account</button>
          <button className="cta-contact">Contact Us</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div>
            <div className="footer-logo">🌿 GreenNest</div>
            <p>Nurturing nature, one seed at a time. Your trusted source for sustainable gardening, seeds, and eco-friendly services.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Seed Catalog</a></li>
              <li><a href="#">Gardening Services</a></li>
              <li><a href="#">Eco-Points</a></li>
            </ul>
          </div>
          <div>
            <h4>Learn More</h4>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Sustainability Commitment</a></li>
              <li><a href="#">Gardening Blog</a></li>
              <li><a href="#">Community Gardens</a></li>
              <li><a href="#">Education Resources</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact Us</h4>
            <ul className="footer-links">
              <li>123 Green Avenue, Garden City, QC 12345</li>
              <li>0551-123-4567</li>
              <li>support@greennest.com</li>
            </ul>
          </div>
        </div>
        <div className="copyright">© 2025 GreenNest. All rights reserved.</div>
      </footer>
    </div>
  );
}

export default Home;

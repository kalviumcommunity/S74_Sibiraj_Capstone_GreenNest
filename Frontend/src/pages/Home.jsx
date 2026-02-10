import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { chatbotApi } from "../api";
import Navbar from "./components/Navbar";
import "./../App.css";

function Home() {
  const { user } = useAuth();
  const [sageInput, setSageInput] = useState("");
  const [sageReply, setSageReply] = useState("");
  const [sageLoading, setSageLoading] = useState(false);

  const handleSageAsk = async (e) => {
    e?.preventDefault();
    if (!sageInput.trim()) return;
    setSageLoading(true);
    setSageReply("");
    try {
      const { data } = await chatbotApi.suggestFertilizer(sageInput.trim());
      setSageReply(data.suggestion);
    } catch {
      setSageReply("Sorry, I couldn't process that. Try a seed name like tomato, chilli, or brinjal.");
    } finally {
      setSageLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

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
              {user ? (
                <>
                  <Link to="/products"><button className="explore-btn">Organic Seeds</button></Link>
                  <Link to="/services"><button className="book-btn">Book Services</button></Link>
                </>
              ) : (
                <>
                  <Link to="/login"><button className="explore-btn">Organic Seeds</button></Link>
                  <a href="#our-services"><button className="book-btn">What We Offer</button></a>
                </>
              )}
            </div>
          </div>
          {/* Sage Chatbot */}
          <div className="sage-box sage-align-left">
            <div className="sage-header">
              Sage 🌿
              <span>AI Gardening Assistant</span>
            </div>
            <div className="sage-messages">
              {sageReply ? (
                <>
                  <strong>Fertilizer tip:</strong> {sageReply}
                  <span className="time">Just now</span>
                </>
              ) : (
                <>
                  Hi! Type a seed name (e.g. tomato, chilli, brinjal) for fertilizer suggestions 🌱
                  <span className="time">Sage</span>
                </>
              )}
            </div>
            <form className="sage-input" onSubmit={handleSageAsk}>
              <input
                type="text"
                placeholder="Enter seed name..."
                value={sageInput}
                onChange={(e) => setSageInput(e.target.value)}
                disabled={sageLoading}
              />
              <button type="submit" className="send-btn" disabled={sageLoading}>➤</button>
            </form>
          </div>
        </div>
      </div>

      {/* What We Offer - For guests */}
      <section id="our-services" className="green-summary-cards-section" style={{ background: '#f6fef7' }}>
        <h2 className="section-title">Gardening Services We Provide</h2>
        <p className="section-desc">Here’s what we do. Login to book these services.</p>
        <div className="summary-cards-grid">
          <div className="summary-card">
            <div className="summary-card-icon">🏠</div>
            <h3>Terrace Garden Setup</h3>
            <p>Complete terrace garden design and setup including planters, soil, and initial planting.</p>
          </div>
          <div className="summary-card">
            <div className="summary-card-icon">🪴</div>
            <h3>Balcony Garden Setup</h3>
            <p>Compact balcony garden with vertical planters and suitable plants for small spaces.</p>
          </div>
          <div className="summary-card">
            <div className="summary-card-icon">🪱</div>
            <h3>Vermicompost Setup</h3>
            <p>Vermicompost bin setup with worms and training to turn kitchen waste into rich compost.</p>
          </div>
          <div className="summary-card">
            <div className="summary-card-icon">🔧</div>
            <h3>Maintenance Visit</h3>
            <p>Regular garden maintenance including pruning, fertilizing, and pest check.</p>
          </div>
        </div>
        {!user && (
          <div style={{ marginTop: 20 }}>
            <Link to="/login" className="summary-btn" style={{ display: 'inline-block', padding: '12px 24px', textDecoration: 'none' }}>
              Login to Book Services
            </Link>
          </div>
        )}
      </section>

      {/* Green Summary Section */}
      <section id="summary" className="green-summary-cards-section">
        <h2 className="section-title">Cultivate Your Green Summary</h2>
        <p className="section-desc">GreenNest offers everything you need to create and maintain a thriving, sustainable garden that nurtures both you and the environment</p>
        <div className="summary-cards-grid">
          <div className="summary-card">
            <div className="summary-card-icon">🌱</div>
            <h3>Organic Seeds</h3>
            <p>Discover our rich variety of organic seeds for vegetables, herbs, and flowers. Grown naturally, for a healthier garden.</p>
            {user ? <Link to="/products" className="summary-link">Browse Seeds</Link> : <Link to="/login" className="summary-link">Browse Seeds</Link>}
          </div>
          <div className="summary-card">
            <div className="summary-card-icon">🛠️</div>
            <h3>Gardening Services</h3>
            <p>Hire local experts for soil testing, compost setup, irrigation, and more. Sustainable solutions for every garden.</p>
            {user ? <Link to="/services" className="summary-link">Book Services</Link> : <Link to="/login" className="summary-link">Book Services</Link>}
          </div>
          <div className="summary-card">
            <div className="summary-card-icon">📈</div>
            <h3>Plant Tracking</h3>
            <p>Monitor your garden's progress with our plant tracker. Get reminders, tips, and insights for every stage.</p>
            {user ? <Link to="/tracker" className="summary-link">Track Plants</Link> : <Link to="/login" className="summary-link">Track Plants</Link>}
          </div>
          <div className="summary-card">
            <div className="summary-card-icon">🏆</div>
            <h3>Eco-Points Rewards</h3>
            <p>Earn eco-points for every sustainable action. Redeem rewards and join our green community leaderboard!</p>
            {user ? <Link to="/rewards" className="summary-link">View Rewards</Link> : <Link to="/login" className="summary-link">View Rewards</Link>}
          </div>
          {user && (
            <div className="summary-card">
              <div className="summary-card-icon">📋</div>
              <h3>My Dashboard</h3>
              <p>View your eco points, plants, orders, and activity at a glance.</p>
              <Link to="/dashboard" className="summary-link">My Dashboard</Link>
            </div>
          )}
        </div>
      </section>

      {/* Sustainable Gardening Tips Section */}
      <section id="tips" className="tips-section">
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
          <Link to="/register"><button className="cta-create">Create Account</button></Link>
          <a href="mailto:support@greennest.com"><button className="cta-contact">Contact Us</button></a>
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

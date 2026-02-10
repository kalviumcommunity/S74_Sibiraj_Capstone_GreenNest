import React, { useState, useEffect } from 'react';
import { servicesApi, bookingsApi } from '../api';
import Navbar from './components/Navbar';

const sampleServices = [
  {
    _id: '1',
    title: 'Terrace Garden Setup',
    description: 'Complete terrace garden installation with soil, plants, and irrigation system',
    price: 15000,
    duration: '2-3 days',
    category: 'terrace'
  },
  {
    _id: '2',
    title: 'Balcony Garden Kit',
    description: 'Compact balcony garden with pots, soil mix, and easy-to-grow plants',
    price: 3500,
    duration: '4-5 hours',
    category: 'balcony'
  },
  {
    _id: '3',
    title: 'Vermicompost Setup',
    description: 'Home vermicompost system with worms, bin, and training',
    price: 2500,
    duration: '2-3 hours',
    category: 'vermicompost'
  },
  {
    _id: '4',
    title: 'Garden Maintenance Package',
    description: 'Monthly garden maintenance including pruning, fertilizing, and pest control',
    price: 1200,
    duration: '2-3 hours per visit',
    category: 'maintenance'
  },
  {
    _id: '5',
    title: 'Kitchen Garden Installation',
    description: 'Organic vegetable and herb garden setup with seasonal plants',
    price: 8000,
    duration: '1-2 days',
    category: 'terrace'
  },
  {
    _id: '6',
    title: 'Indoor Plants Setup',
    description: 'Air-purifying indoor plants with stylish pots and setup guide',
    price: 2000,
    duration: '2-3 hours',
    category: 'balcony'
  }
];

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    city: '',
    address: '',
    phone: '',
    date: '',
    time: '',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    servicesApi.getAll()
      .then(({ data }) => setServices(Array.isArray(data) && data.length > 0 ? data : sampleServices))
      .catch(() => setServices(sampleServices))
      .finally(() => setLoading(false));
  }, []);

  const handleBookNow = (service) => {
    setSelectedService(service);
    setShowBookingForm(true);
  };

  const resetBookingForm = () => {
    setBookingForm({ city: '', address: '', phone: '', date: '', time: '', notes: '' });
    setSelectedService(null);
    setShowBookingForm(false);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedService?._id) return;
    setSubmitting(true);
    try {
      const notes = [bookingForm.time, bookingForm.notes].filter(Boolean).join(' | ');
      await bookingsApi.create({
        serviceId: selectedService._id,
        date: bookingForm.date,
        city: bookingForm.city,
        address: bookingForm.address,
        phone: bookingForm.phone,
        notes: notes || ''
      });
      alert('Booking submitted! View status in My Bookings.');
      resetBookingForm();
    } catch (err) {
      alert(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-eco-light">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-eco-dark mb-2">Garden Setup Services</h1>
        <p className="text-gray-600 mb-6">Book professional gardening setup for your space</p>
        <p className="text-sm text-eco-dark mb-8">Click <strong>Book Now</strong> on any service below to open the booking form.</p>

        {loading && <p className="text-eco-dark">Loading...</p>}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="p-6">
                <span className="text-xs font-medium px-2 py-1 rounded bg-eco-light text-eco-dark">{s.category}</span>
                <h3 className="text-lg font-semibold text-eco-dark mt-2">{s.title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{s.description}</p>
                <p className="text-eco-green font-bold mt-2">₹{s.price}</p>
                {s.duration && <p className="text-xs text-gray-500">Duration: {s.duration}</p>}
                {(!/^[a-f\d]{24}$/i.test(String(s._id))) && (
                  <p className="text-xs text-amber-700 mt-2">
                    Service not yet saved in database. Ask admin to add services.
                  </p>
                )}
                <button
                  onClick={() => handleBookNow(s)}
                  disabled={!/^[a-f\d]{24}$/i.test(String(s._id))}
                  className="mt-4 inline-block w-full text-center px-4 py-2 bg-eco-green text-white rounded-lg hover:bg-eco-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
        {!loading && services.length === 0 && (
          <p className="text-center text-gray-600 py-12">No services available yet</p>
        )}

        {/* Booking Form Popup */}
        {showBookingForm && selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-eco-dark">Book Service</h2>
                    <p className="text-eco-green font-semibold">{selectedService.title}</p>
                    <p className="text-gray-600">₹{selectedService.price}</p>
                  </div>
                  <button
                    type="button"
                    onClick={resetBookingForm}
                    className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chennai"
                      value={bookingForm.city}
                      onChange={(e) => setBookingForm({ ...bookingForm, city: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-eco-green focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-eco-green focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                    <textarea
                      required
                      value={bookingForm.address}
                      onChange={(e) => setBookingForm({ ...bookingForm, address: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-eco-green focus:border-transparent"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date *</label>
                      <input
                        type="date"
                        required
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-eco-green focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time *</label>
                      <select
                        required
                        value={bookingForm.time}
                        onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-eco-green focus:border-transparent"
                      >
                        <option value="">Select time</option>
                        <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
                        <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
                        <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</option>
                        <option value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                    <textarea
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-eco-green focus:border-transparent"
                      rows={3}
                      placeholder="Any special requirements or questions..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 bg-eco-green text-white py-2 px-4 rounded-lg hover:bg-eco-dark transition disabled:opacity-50"
                    >
                      {submitting ? 'Submitting...' : 'Submit Booking'}
                    </button>
                    <button
                      type="button"
                      onClick={resetBookingForm}
                      className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

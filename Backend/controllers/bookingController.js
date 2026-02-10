/**
 * Booking controller – user: create, getMyBookings; admin: getAllBookings, updateStatus
 */
import Booking from '../models/Booking.js';
import Service from '../models/Service.js';

export const createBooking = async (req, res) => {
  try {
    const { serviceId, date, city, address, phone, notes } = req.body;
    if (!serviceId || !date || !city || !address || !phone) {
      return res.status(400).json({ message: 'serviceId, date, city, address, phone required' });
    }

    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    const booking = await Booking.create({
      userId: req.user.id,
      serviceId,
      date: new Date(date),
      city,
      address,
      phone,
      notes: notes || '',
      status: 'pending',
    });

    const populated = await Booking.findById(booking._id).populate('serviceId');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: 'Error creating booking' });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate('serviceId')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('serviceId')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const valid = ['pending', 'approved', 'completed', 'rejected'];
    if (!valid.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate('serviceId')
      .populate('userId', 'name email');

    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Error updating booking' });
  }
};

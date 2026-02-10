import User from '../models/User.js';

/**
 * Restrict access to admin role only
 */
export const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    req.user.role = user.role;
    next();
  } catch (err) {
    return res.status(500).json({ message: 'Authorization failed' });
  }
};

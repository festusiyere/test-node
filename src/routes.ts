import express from 'express';
import { hasRole, auth, requiresAuth } from './middleware';
import authRoute from './module/auth/auth.route';
import adminRoute from './module/admin/admin.route';
import ticketRoute from './module/ticket/ticket.route';

const router = express.Router();

router.route('/').get((req, res, next) => {
    res.status(200).json({ message: 'Welcome Aboard Pal' });
    next();
});
/**
 * Authentication Route
 */
router.use('/user', authRoute);

router.use('/ticket', auth, requiresAuth, ticketRoute);
/**
 * Administration
 */
router.use('/admin', auth, requiresAuth, hasRole('admin'), adminRoute);

export default router;

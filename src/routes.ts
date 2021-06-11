import express from "express";
import { registerUserHandler } from "./module/auth/user/user.controller";
import { loginUserSessionHandler } from "./module/auth/session/session.controller";
import { registerUserSchema } from "./module/auth/user/user.schema";
import { loginUserSessionSchema } from "./module/auth/session/session.schema";
import { validateRequest, requiresUser, hasRole } from "./middleware";
import { deserializeUser } from "./middleware";


//admin

import { adminCreateUserHandler } from "./module/auth/admin/admin.controller";
//ticket
import {
        createTicketHandler,
        deleteTicketHandler,
        getTicketHandler,
        getATicketHandler,
        updateTicketHandler,
        TicketMonthlyHandler,
        TicketStatistcHandler,
        TicketPdfHandler,
        TicketCsvHandler,
        TicketUserHandler
} from './module/ticket/ticket.controller';
import {
        createCommentHandler,
        deleteCommentHandler,
        getCommentHandler
} from './module/comment/comment.controller';

import { createTicketSchema } from './module/ticket/ticket.schema';
const router = express.Router();
const ticketRoutes = express.Router();
const adminRoutes = express.Router();
const reportRoutes = express.Router();
const commentRoutes = express.Router({ mergeParams: true })
// Authentication

//Register
router.post("/register", validateRequest(registerUserSchema), registerUserHandler);
// Login
router.post("/login", validateRequest(loginUserSessionSchema), loginUserSessionHandler);

router.use(deserializeUser);
router.use(requiresUser)
//only logged in user can access these routes
router.use('/admin', adminRoutes);
adminRoutes.route('/').post(validateRequest(registerUserSchema), adminCreateUserHandler)


router.use('/ticket', ticketRoutes);
ticketRoutes.route('/').get(hasRole('admin', 'agent'), getTicketHandler)
        .post(hasRole('customer'), validateRequest(createTicketSchema), createTicketHandler);
ticketRoutes.route('/:ticketId').get(getATicketHandler)
        .patch(updateTicketHandler)
        .delete(deleteTicketHandler)

//comment routes
ticketRoutes.use('/:ticketId/comment', commentRoutes);
commentRoutes.route('/').get(getCommentHandler).post(createCommentHandler);
//create comment
commentRoutes.route('/:commentId').delete(deleteCommentHandler);
//only admin can delete a comment comment




router.use('/report', reportRoutes);
//only logged in user can access any report route
reportRoutes.route('/user-ticket/:month?').get(TicketUserHandler);
//shows tikcet of only currently logged in user
reportRoutes.use(hasRole('admin'));
//only admin and agent can access these routes
reportRoutes.route('/group-statistic/:month?').get(TicketStatistcHandler);
//only admin can get all group-statistic
reportRoutes.route('/all-tickets/:month?').get(TicketMonthlyHandler);
//only admin  can get all monthly-tickets

reportRoutes.route('/print-ticket-pdf/:month?').get(TicketPdfHandler);
//print all ticket in pdf

reportRoutes .route('/print-ticket-csv/:month?').get(TicketCsvHandler);
//print all ticket in csv


////speial routes
export default router
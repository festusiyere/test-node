import express from 'express';
import { validateRequest,  requiresAuth, hasRole } from '../../middleware';
import * as ticketSchema from './ticket.schema';
import * as ticketController from './ticket.controller';
import commentRoutes from '../comment/comment.route';
const router = express.Router();


//only admin and agent can access these routes
router.route('/group-statistic/:month?').get( hasRole('admin', 'agent'), ticketController.rangeStatistic);

//only admin can get all group-statistic
router.route('/all-tickets/:month?').get( hasRole('admin', 'agent'), ticketController.monthlyTicket);
//only admin  can get all monthly-tickets

router.route('/print-ticket-pdf/:month?').get( hasRole('admin', 'agent'), ticketController.pdf);
//print all ticket in pdf

router.route('/print-ticket-csv/:month?').get( hasRole('admin', 'agent'), ticketController.csv);
//print all ticket in csv

router.route('/user-ticket/:month?').get( hasRole('admin', 'agent'), ticketController.userTicket);




//Get all ticket
router.route('/').get(ticketController.getAllTicket);

//Create new ticket
router.route('/').post( hasRole('customer'), validateRequest(ticketSchema.create), ticketController.create);

//Get a ticket
router.route('/:ticketId').get(ticketController.getTicket);

//update a ticket
router.route('/:ticketId').patch(validateRequest(ticketSchema.update), ticketController.update);

//comment routes
router.use('/:ticketId/comment', commentRoutes);

//delete a ticket
router.route('/:ticketId').delete( hasRole('admin', 'agent'), ticketController.ticketDelete);



////speial routes
export default router;

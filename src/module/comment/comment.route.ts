import express from "express";
import { validateRequest, hasRole } from '../../middleware';
import * as commentSchema from './comment.schema';
import * as commentController from './comment.controller';


const router = express.Router({ mergeParams: true });
//get ticket commet

router.route('/').get(commentController.getComment)
//comment on  a ticket

router.route('/').post(validateRequest(commentSchema.create),commentController.create);
//create comment

router.route('/:commentId').delete(hasRole('admin') , commentController.commentDelete);
//only admin can delete a comment comment

export default router
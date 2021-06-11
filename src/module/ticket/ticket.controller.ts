import { Request, Response } from "express";
import { get } from "lodash";
import {
  createTicket,
  findTicket,
  findAndUpdate,
  deleteTicket,
  getStatTicket,
  getMonthlyTicket,
} from "./ticket.service";
import PDF from '../../utils/print/pdf'
import CSV from '../../utils/print/csv'
export async function createTicketHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const body = req.body;
  const ticket = await createTicket({ ...body, user: userId });
  return res.send(ticket);
}
export async function getATicketHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const user = get(req, "user");
  const _id = get(req, "params.ticketId");
  const ticket = await findTicket({ _id });
  if (!ticket) {
    return res.sendStatus(404);
  }

  if (user.role === 'customer' && String(ticket.customer) !== userId) {
    return res.sendStatus(401);
  }
  return res.send(ticket);
}
export async function updateTicketHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const _id = get(req, "params.ticketId");
  const update = req.body;
  const ticket = await findTicket({ _id : _id});
  if (!ticket) {
    return res.sendStatus(404);
  }

  if (String(ticket.customer) !== userId) {
    return res.sendStatus(401);
  }

  const updatedTicket = await findAndUpdate({ _id }, update, { new: true });

  return res.send(updatedTicket);
}
export async function getTicketHandler(req: Request, res: Response) {
  const ticketId = get(req, "params.ticketId");
  const ticket = await findTicket({ ticketId });

  if (!ticket) {
    return res.sendStatus(404);
  }

  return res.send(ticket);
}

export async function deleteTicketHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const _id = get(req, "params.ticketId");

  const ticket = await findTicket({ _id });

  if (!ticket) {
    return res.sendStatus(404);
  }

  await deleteTicket({ _id });

  return res.sendStatus(200);
}

export async function TicketStatistcHandler(req: Request, res: Response) {
  const ticket = await getStatTicket(req, res);
  return res.status(200).json({data:ticket});
}
export async function TicketUserHandler(req: Request, res: Response) {
  const month = get(req, "params.month");
  const user   =  get(req, "user");
  let ticket;
  if(user.role == 'customer'){
    ticket = await findTicket({ customer : user._id });
  }else{
    ticket = await findTicket({ agent : user._id });
  }
  return res.status(200).json({data:ticket});
}
export async function TicketMonthlyHandler(req: Request, res: Response) {
  const month = get(req, "params.month");
  const ticket = await getMonthlyTicket(month);
  return res.status(200).json({data:ticket});
}
export async function TicketPdfHandler(req: Request, res: Response) {
  const month = get(req, "params.month");
  const ticket = await getMonthlyTicket(month);
  const ig = new PDF(res, ticket);
  return ig.generate();
}
export async function TicketCsvHandler(req: Request, res: Response) {
  const month = get(req, "params.month");
  const ticket = await getMonthlyTicket(month);
  const ig = new CSV(res, ticket);
  return ig.generate();
}

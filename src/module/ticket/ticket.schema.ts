import { object, string, ref } from "yup";

const payload = {
  body: object({
    title: string().required("Title is required"),
    description: string()
      .required("Description is required")
      .min(120, "Description is too short - should be 120 chars minimum."),
  }),
};

const params = {
  params: object({
    ticketId: string().required("ticketId is required"),
  }),
};

export const createTicketSchema = object({
  ...payload,
});

export const updateTicketSchema = object({
  ...params,
  ...payload,
});

export const deleteTicketSchema = object({
  ...params,
});

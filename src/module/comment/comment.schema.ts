import { object, string, ref } from "yup";
import yup from "yup";

const payload = {
  body: object({
    title: string().required("Title is required"),
    comment: string()
      .required("Comment is required")
      .min(120, "Comment is too short - should be 120 chars minimum."),
  }),
};

const params = {
  params: object({
    commentId: string().required("commentId is required"),
  }),
};


export const createCommentSchema = object({
  ...payload,
});

export const updateCommentSchema = object({
  ...params,
  ...payload,
});

export const deleteCommentSchema = object({
  ...params,
});

import { DocumentDefinition, FilterQuery,UpdateQuery, QueryOptions } from "mongoose";

import User, { UserDocument } from "../auth/auth.model";

import { appError } from '../../utils/error';

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    return await User.create(input);
  } catch (error) {
    throw new Error(error);
  }
}

export function findUser(query: FilterQuery<UserDocument>, options: QueryOptions = { lean: true }) {
    return User.findOne(query, {}, options);
}

export function findUsers(query: FilterQuery<UserDocument>, options: QueryOptions = { lean: true }) {
  return User.find(query, {}, options);
}

export function findAndUpdate(query: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>, options: QueryOptions) {
  console.log(query)
    return User.findOneAndUpdate(query, update, options);
}

export function deleteUser(query: FilterQuery<UserDocument>) {
    return User.deleteOne(query);
}

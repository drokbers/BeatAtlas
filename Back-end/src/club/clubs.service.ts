import { BaseClub } from "./club.interface";
import ClubModel from '../models/clubs';

export const findAll = async (): Promise<BaseClub[]> => {
  return await ClubModel.find();
};

export const find = async (id: string): Promise<BaseClub | null> => {
  return await ClubModel.findById(id);
};

export const create = async (newItem: BaseClub): Promise<BaseClub> => {
  return await ClubModel.create(newItem);
};

export const update = async (
  id: string,
  clubUpdate: Partial<BaseClub>
): Promise<BaseClub | null> => {
  return await ClubModel.findByIdAndUpdate(id, clubUpdate, { new: true });
};

export const remove = async (id: string): Promise<null | void> => {
  return await ClubModel.findByIdAndDelete(id);
};

import { ClubDocument } from "../models/clubs";
import ClubModel from "../models/clubs";


export const findAll = async (): Promise<ClubDocument[]> => {
  return await ClubModel.find();
};

export const find = async (id: string): Promise<ClubDocument> => {
  const result = await ClubModel.findById(id);

  if (!result) {
    throw new Error(`No club found with id: ${id}`);
  }
  return result;
};

export const create = async (newItem: ClubDocument): Promise<ClubDocument> => {
  return await ClubModel.create(newItem);
};

export const update = async (
  id: string,
  clubUpdate: Partial<ClubDocument>
): Promise<ClubDocument> => {
  const result = await ClubModel.findByIdAndUpdate(id, clubUpdate, {
    new: true,
  });
  if (!result) {
    throw new Error(`No club found with id: ${id}`);
  }
  return result;
};

export const remove = async (id: string): Promise<void> => {
  const result = await ClubModel.findByIdAndDelete(id);
  if (!result) {
    throw new Error(`No club found with id: ${id}`);
  }
};

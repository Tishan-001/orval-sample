import mongoose, { Schema, Document } from 'mongoose';

export interface Pet extends Document {
  name: string;
  tag: string;
}

const PetSchema: Schema = new Schema({
  name: { type: String, required: true },
  tag: { type: String, required: true },
});

export const PetModel = mongoose.model<Pet>('Pet', PetSchema);

// Get all pets
export const getAllPets = async (): Promise<Pet[]> => {
  return await PetModel.find();
};

// Get a pet by ID
export const getPetById = async (id: string): Promise<Pet | null> => {
  return await PetModel.findById(id);
};

// Create a new pet
export const createPet = async (name: string, tag: string): Promise<Pet> => {
  const newPet = new PetModel({ name, tag });
  return await newPet.save();
};

// Update a pet
export const updatePet = async (id: string, name: string, tag: string): Promise<Pet | null> => {
  return await PetModel.findByIdAndUpdate(id, { name, tag }, { new: true });
};

// Delete a pet
export const deletePet = async (id: string): Promise<boolean> => {
  const result = await PetModel.deleteOne({ _id: id });
  return result.deletedCount > 0;
};
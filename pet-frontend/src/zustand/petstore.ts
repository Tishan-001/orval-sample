import { create } from 'zustand';
import { NewPet, Pet } from '../api/models';

interface PetStore {
  pets: Pet[];
  newPet: NewPet;
  editingPet: Pet | null;
  isLoading: boolean;
  error: Error | null;
  setPets: (pets: Pet[]) => void;
  setNewPet: (newPet: NewPet) => void;
  setEditingPet: (pet: Pet | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  resetNewPet: () => void;
}

export const usePetStore = create<PetStore>((set) => ({
  pets: [],
  newPet: { name: '', tag: '' },
  editingPet: null,
  isLoading: false,
  error: null,
  setPets: (pets) => set({ pets }),
  setNewPet: (newPet) => set({ newPet }),
  setEditingPet: (pet) => set({ editingPet: pet }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  resetNewPet: () => set({ newPet: { name: '', tag: '' } }),
}));
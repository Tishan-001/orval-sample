import React, { useEffect } from "react";
import {
  useGetPets,
  usePostPets,
  usePutPetsPetId,
  useDeletePetsPetId,
} from "./api/endpoints/petsAPI";
import { usePetStore } from "./zustand/petstore";

const PetManager: React.FC = () => {
  const {
    pets,
    newPet,
    editingPet,
    isLoading,
    error,
    setPets,
    setNewPet,
    setEditingPet,
    setIsLoading,
    setError,
    resetNewPet,
  } = usePetStore();

  const {
    data: petsResponse,
    isLoading: isPetsLoading,
    isError,
    error: fetchError,
    refetch: refetchPets,
  } = useGetPets();
  const addPetMutation = usePostPets();
  const updatePetMutation = usePutPetsPetId();
  const deletePetMutation = useDeletePetsPetId();

  useEffect(() => {
    if (petsResponse) {
      setPets(petsResponse.data);
    }
    setIsLoading(isPetsLoading);
    if (isError) {
      setError(fetchError as Error);
    }
  }, [
    petsResponse,
    isPetsLoading,
    isError,
    fetchError,
    setPets,
    setIsLoading,
    setError,
  ]);

  const handleAddPet = async () => {
    if (newPet.name && newPet.tag) {
      try {
        await addPetMutation.mutateAsync({ data: newPet });
        resetNewPet();
        refetchPets();
      } catch (error) {
        setError(error as Error);
      }
    }
  };

  const handleUpdatePet = async () => {
    if (editingPet) {
      const { _id, ...updatedPet } = editingPet;
      try {
        await updatePetMutation.mutateAsync({
          petId: _id.toString(),
          data: updatedPet,
        });
        setEditingPet(null);
        refetchPets();
      } catch (error) {
        setError(error as Error);
      }
    }
  };

  const handleDeletePet = async (petId: number) => {
    try {
      await deletePetMutation.mutateAsync({ petId: petId.toString() });
      refetchPets();
    } catch (error) {
      setError(error as Error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-4"
        role="alert"
      >
        <p className="font-bold">Error</p>
        <p>{error.message || "An error occurred while fetching pets"}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Pet Manager</h2>
        <div className="mb-4 space-y-2">
          <input
            type="text"
            value={newPet.name}
            onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
            placeholder="New pet name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="text"
            value={newPet.tag}
            onChange={(e) => setNewPet({ ...newPet, tag: e.target.value })}
            placeholder="New pet tag"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            onClick={handleAddPet}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-300 ease-in-out"
          >
            Add Pet
          </button>
        </div>

        <ul className="space-y-2">
          {pets.map((pet) => (
            <li key={pet._id} className="bg-gray-100 p-4 rounded-lg shadow">
              {editingPet?._id === pet._id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editingPet.name}
                    onChange={(e) =>
                      setEditingPet({ ...editingPet, name: e.target.value })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <input
                    type="text"
                    value={editingPet.tag}
                    onChange={(e) =>
                      setEditingPet({ ...editingPet, tag: e.target.value })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={handleUpdatePet}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingPet(null)}
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-lg text-gray-800">
                      {pet.name}
                    </span>
                    <span className="ml-2 text-sm text-gray-600">
                      ({pet.tag})
                    </span>
                  </div>
                  <div>
                    <button
                      onClick={() => setEditingPet(pet)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 transition duration-300 ease-in-out"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePet(pet._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PetManager;

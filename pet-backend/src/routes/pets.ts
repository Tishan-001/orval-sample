import { Router, Request, Response } from 'express';
import { Pet, getAllPets, getPetById, createPet, updatePet, deletePet } from '../models/pet.model';

export const petsRouter = Router();

/**
 * @openapi
 * /pets:
 *   get:
 *     summary: Retrieve a list of pets
 *     description: Returns a list of all pets
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: A list of pets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 *       500:
 *         description: Server error
 */
petsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const pets = await getAllPets();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving pets' });
  }
});

/**
 * @openapi
 * /pets:
 *   post:
 *     summary: Create a new pet
 *     description: Adds a new pet to the system
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewPet'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       500:
 *         description: Server error
 */
petsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { name, tag } = req.body;
    const newPet = await createPet(name, tag);
    res.status(201).json(newPet);
  } catch (error) {
    res.status(500).json({ message: 'Error creating pet' });
  }
});

/**
 * @openapi
 * /pets/{petId}:
 *   get:
 *     summary: Get a pet by ID
 *     description: Retrieve a pet's details by its ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: petId
 *         required: true
 *         description: Numeric ID of the pet to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pet details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       404:
 *         description: Pet not found
 *       500:
 *         description: Server error
 */
petsRouter.get('/:petId', async (req: Request, res: Response) => {
  try {
    const petId = req.params.petId;
    const pet = await getPetById(petId);
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving pet' });
  }
});

/**
 * @openapi
 * /pets/{petId}:
 *   put:
 *     summary: Update a pet
 *     description: Update a pet's details by its ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: petId
 *         required: true
 *         description: Numeric ID of the pet to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewPet'
 *     responses:
 *       200:
 *         description: Updated pet details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       404:
 *         description: Pet not found
 *       500:
 *         description: Server error
 */
petsRouter.put('/:petId', async (req: Request, res: Response) => {
  try {
    const petId = req.params.petId;
    const { name, tag } = req.body;
    const updatedPet = await updatePet(petId, name, tag);
    if (updatedPet) {
      res.json(updatedPet);
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating pet' });
  }
});

/**
 * @openapi
 * /pets/{petId}:
 *   delete:
 *     summary: Delete a pet
 *     description: Delete a pet by its ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: petId
 *         required: true
 *         description: Numeric ID of the pet to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Pet successfully deleted
 *       404:
 *         description: Pet not found
 *       500:
 *         description: Server error
 */
petsRouter.delete('/:petId', async (req: Request, res: Response) => {
  try {
    const petId = req.params.petId;
    const deleted = await deletePet(petId);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pet' });
  }
});
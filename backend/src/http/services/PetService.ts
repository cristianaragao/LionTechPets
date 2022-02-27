import { getRepository, DeleteResult } from "typeorm";

import Pet from "../../database/entities/Pet";
import Owner from "../../database/entities/Owner";
import Breed from "../../database/entities/Breed";

type PetRequest = {
    id?: string;
    name: string;
    birthday: Date;
    ownerId: string;
    breedId: string;
}

export default class PetService {

    async create(data: PetRequest): Promise<Pet | Error> {

        const repo = getRepository(Pet);
        const repoBreed = getRepository(Breed);
        const repoOwner = getRepository(Owner);

        const breed = await repoBreed.findOne({ id: data.breedId });

        if(!breed) return new Error("Breed foreign key not exists");

        const owner = await repoOwner.findOne({ id: data.ownerId });

        if(!owner) return new Error("Owner foreign key not exists");

        try{
            const pet = repo.create(data);

            await repo.save(pet);
            
            return pet;
        }
        catch{
            return new Error("Error creating Pet")
        }

    }

    async update(data: PetRequest): Promise<Pet | Error> {

        const repo = getRepository(Pet);
        const repoBreed = getRepository(Breed);
        const repoOwner = getRepository(Owner);

        const { id } = data;

        const pet = await repo.findOne({ id });

        if(!pet) return new Error("Pet not exists")

        const breed = await repoBreed.findOne({ id: data.breedId });

        if(!breed) return new Error("Breed foreign key not exists");

        const owner = await repoOwner.findOne({ id: data.ownerId });

        if(!owner) return new Error("Owner foreign key not exists");

        try{

            pet.name = data.name;
            pet.birthday = data.birthday;
            pet.ownerId = data.ownerId;
            pet.breedId = data.breedId;

            await repo.save(pet);
            
            return pet;
        }
        catch{
            return new Error("Error uptading Pet")
        }

    }

    async list(): Promise<Pet[]> {
        
        const repo = getRepository(Pet);
        
        const pets = await repo.find({ 
            relations: ["owner", "breed"]
        });

        return pets;

    }

    async delete(id: string): Promise<DeleteResult | Error> {

        const repo = getRepository(Pet);

        if(!(await repo.findOne({ id }))) 
            return new Error("Pet not exists")

        try{
            const pet = await repo.delete(id);

            return pet;
        }
        catch{
            return new Error("Error deleting Pet")
        }

    }

}
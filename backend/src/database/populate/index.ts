import { getRepository } from "typeorm";

import PetEntity from "../entities/Pet";
import BreedEntity from "../entities/Breed";
import OwnerEntity from "../entities/Owner";
import UserEntity from "../entities/User";

import PetData from "../populate/pets";
import BreedData from "../populate/breeds";
import OwnerData from "../populate/owners";
import UserData from "../populate/users";


const populateGeneric = async (Create: any, label: any, dataArray: any) => {
    console.log(`Criando ${label} ...`)
    for (const data of dataArray) {
        try {
            const repository = getRepository(Create);
            const saver = await repository.create(data);
            await repository.save(saver);
        }
        catch (err) {
            console.log('Erro ao criar: ', data)
            console.log(err)
        }
    }
}

const populate = async () => {
        await populateGeneric(UserEntity, 'Users', UserData);
        await populateGeneric(BreedEntity, 'Breeds', BreedData);
        await populateGeneric(OwnerEntity, 'Owners', OwnerData);
        await populateGeneric(PetEntity, 'Pets', PetData);
}

export default populate;
import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import Breed from "./Breed";
import Owner from "./Owner";

@Entity("pets")
export default class Pet {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    birthday: Date;

    @Column()
    breedId: string;
 
    @ManyToOne(() => Breed, breed => breed.pets)
    @JoinColumn({ name: "breedId" })
    breed: Breed;

    @Column()
    ownerId: string;

    @ManyToOne(() => Owner, owner => owner.pets)
    @JoinColumn({ name: "ownerId" })
    owner: Owner;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor(){
        if(!this.id) this.id = uuid();
    }

}
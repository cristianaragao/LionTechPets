import { Entity, Column, PrimaryColumn, CreateDateColumn, OneToOne, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import Pet from "./Pet";

@Entity("breeds")
export default class Breed {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Pet, pet => pet.breed)
    pets: Pet[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor(){
        if(!this.id) this.id = uuid();
    }

}
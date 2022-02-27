import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn , OneToMany, JoinColumn} from "typeorm";
import { v4 as uuid } from "uuid";

import Pet from "./Pet";

@Entity("owners")
export default class Owner {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true, unique: true })
    phone: string;

    @OneToMany(() => Pet, pet => pet.owner)
    pets: Pet[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor(){
        if(!this.id) this.id = uuid();
    }

}
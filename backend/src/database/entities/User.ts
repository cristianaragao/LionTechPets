import { Entity, Column, PrimaryColumn, CreateDateColumn, BeforeInsert, BeforeUpdate, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import bcrypt from "bcrypt";

@Entity("users")
export default class User {

    constructor() {
        if (!this.id) this.id = uuid();
    }

    @PrimaryColumn()
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ })
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async function () {
        await bcrypt.hash(this.password, 10).then((hashed) => this.password = hashed);
    }
}
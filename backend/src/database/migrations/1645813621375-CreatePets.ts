import {MigrationInterface, QueryRunner, Table, Column } from "typeorm";

export class CreatePets1645813621375 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({ 
                name: "pets",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        generationStrategy: "uuid",
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "birthday",
                        type: "date",
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable("pets")

    }

}

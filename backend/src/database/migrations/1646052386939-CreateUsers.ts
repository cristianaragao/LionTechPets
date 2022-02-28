import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1646052386939 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        generationStrategy: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "username",
                        type: "varchar",
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "password",
                        type: "varchar",
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
                    },
                ]
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable("users")

    }

}

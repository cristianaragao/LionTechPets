import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class CreateForeignKeysOnPets1645813652280 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn(
            new Table({ name: "pets" }),
            new TableColumn({
                name: "breedId",
                type: "varchar",
                isNullable: true
            }));

        await queryRunner.createForeignKey(
            new Table({ name: "pets" }),
            new TableForeignKey({
                columnNames: ["breedId"],
                referencedColumnNames: ["id"],
                referencedTableName: "breeds",
                onDelete: "CASCADE"
            })
        )

        await queryRunner.addColumn(
            new Table({ name: "pets" }),
            new TableColumn({
                name: "ownerId",
                type: "varchar",
                isNullable: true
            }));

        await queryRunner.createForeignKey(
            new Table({ name: "pets" }),
            new TableForeignKey({
                columnNames: ["ownerId"],
                referencedColumnNames: ["id"],
                referencedTableName: "owners",
                onDelete: "CASCADE"
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        const table = await queryRunner.getTable("pets");

        if (table) {
            const foreignKeyOwner = table.foreignKeys.find(fk => fk.columnNames.indexOf("ownerId") !== -1);

            if (foreignKeyOwner) {
                await queryRunner.dropForeignKey("pets", foreignKeyOwner);
                await queryRunner.dropColumn("pets", "ownerId");
            }

            const foreignKeyBreed = table.foreignKeys.find(fk => fk.columnNames.indexOf("breedId") !== -1);

            if (foreignKeyBreed) {
                await queryRunner.dropForeignKey("pets", foreignKeyBreed);
                await queryRunner.dropColumn("pets", "breedId");
            }

        }

    }

}

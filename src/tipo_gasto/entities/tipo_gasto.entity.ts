import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Tipo_gasto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;
}

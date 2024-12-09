import { Campania } from "src/campanias/entities/campania.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Ultramsg {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Campania, { nullable: false })
  @JoinColumn({ name: "campania" })
  campania: Campania = new Campania();

  @Column()
  baseURL!: string;

  @Column()
  token!: string;
}

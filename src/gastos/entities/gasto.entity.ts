import { Campania } from "src/campanias/entities/campania.entity";
import { Caracterizacion } from "./../../caracterizacion/entities/caracterizacion.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class Gasto {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Caracterizacion, { nullable: false })
  @JoinColumn({ name: "responsable" })
  responsable: Caracterizacion = new Caracterizacion();

  @ManyToOne(() => Campania, { nullable: false })
  @JoinColumn({ name: "campania" })
  campania: Campania = new Campania();

  @Column()
  subcampania!: number;

  @Column()
  tipo_gasto!: number;

  @Column()
  valor!: number;

  @Column()
  doc_create!: number;

  @Column()
  observaciones!: string;
}

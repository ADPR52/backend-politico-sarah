import { Campania } from "src/campanias/entities/campania.entity";
import { Caracterizacion } from "./../../caracterizacion/entities/caracterizacion.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

type beneficiario = {
  nombre_beneficiario: string;
  telefono_beneficiario: string;
};
@Entity()
export class Beneficio {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  documento_verificador: number = 0;

  @Column()
  tipo_beneficio: number = 0;

  @Column()
  seleccion_beneficio: number = 0;

  @Column()
  valor: string = "";

  @Column("json", { default: [] })
  beneficiarios!: beneficiario[];

  @Column()
  observaciones: string = "";

  @ManyToOne(() => Caracterizacion, { nullable: false })
  @JoinColumn({ name: "responsable" })
  responsable: Caracterizacion | undefined;

  @Column()
  doc_create: number = 0;

  @Column()
  doc_update: number = 0;

  @ManyToOne(() => Campania, { nullable: false })
  @JoinColumn({ name: "campania" })
  campania: Campania | undefined;

  @Column()
  subcampania: number = 0;
}

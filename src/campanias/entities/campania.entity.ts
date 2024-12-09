import { Caracterizacion } from "src/caracterizacion/entities/caracterizacion.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Campania {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  nombre: string = "";

  @Column()
  lugar: string = "";

  @Column()
  fecha_inicio: Date = new Date();

  @Column()
  fecha_fin: Date = new Date();

  @Column()
  presupuesto: number = 0;

  @Column()
  fecha_adicional: Date = new Date();

  @Column()
  adicion_presupuestal: number = 0;

  @Column("json", { default: [] })
  subcampanias: any[] = [];

  @Column()
  doc_create: number = 0;

  @ManyToOne(() => Caracterizacion, { nullable: false })
  @JoinColumn({ name: "responsable" })
  responsable: Caracterizacion | undefined;
}

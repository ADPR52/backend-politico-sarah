import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Survey {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  titulo: string = "";

  @Column()
  campania: number = 0;

  @Column('json')
  survey: any[] = [];

  @Column()
  doc_create: number = 0;
}

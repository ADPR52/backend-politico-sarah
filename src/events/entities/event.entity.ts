import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column()
  fecha!: Date;

  @Column()
  lugar!: string;

  @Column()
  hora_inicio!: string;

  @Column()
  hora_fin!: string;

  @Column()
  observacion!: string;
}

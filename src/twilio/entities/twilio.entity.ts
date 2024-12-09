import { Campania } from "src/campanias/entities/campania.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Twilio {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Campania, { nullable: false })
  @JoinColumn({ name: "campania" })
  campania: Campania = new Campania();

  @Column()
  accountSid!: string;

  @Column()
  authToken!: string;

  @Column()
  fromNumber!: string;
}

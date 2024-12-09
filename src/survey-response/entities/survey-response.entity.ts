import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SurveyResponse {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column("json")
  response: any[] = [];

  @Column()
  survey_id: number = 0;
}

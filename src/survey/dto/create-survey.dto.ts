import { IsNotEmpty, IsString, IsNumber, IsJSON } from 'class-validator';

export class CreateSurveyDto {
  @IsNotEmpty()
  @IsString()
  titulo!: string;

  @IsNotEmpty()
  @IsNumber()
  campania!: number;

  @IsNotEmpty()
  @IsJSON()
  survey!: string;

  @IsNotEmpty()
  @IsNumber()
  doc_create!: number;
}

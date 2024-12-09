import { IsOptional, IsString, IsNumber, IsJSON } from 'class-validator';

export class UpdateSurveyDto {
  @IsOptional()
  @IsString()
  titulo!: string;

  @IsOptional()
  @IsNumber()
  campania!: number;

  @IsOptional()
  @IsJSON()
  survey!: string;

  @IsOptional()
  @IsNumber()
  doc_create!: number;
}

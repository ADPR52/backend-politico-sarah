import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSurveyResponseDto {
  @IsArray()
  @IsNotEmpty()
  response!: any[];

  @IsNotEmpty()
  @IsNumber()
  survey_id!: number;
}

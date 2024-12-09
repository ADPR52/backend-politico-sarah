import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUltramsgDto {
  @IsNotEmpty()
  @IsNumber()
  campania!: number;

  @IsNotEmpty()
  @IsString()
  baseURL!: string;

  @IsNotEmpty()
  @IsString()
  token!: string;
}

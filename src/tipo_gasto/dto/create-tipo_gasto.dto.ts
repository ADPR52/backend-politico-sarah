import { IsNotEmpty, IsString } from "class-validator";

export class CreateGastoDto {
  @IsNotEmpty()
  @IsString()
  nombre!: string;
}
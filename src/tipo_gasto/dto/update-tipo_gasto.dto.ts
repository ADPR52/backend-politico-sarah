import { IsNotEmpty, IsString } from "class-validator";

export class UpdateGastoDto {
  @IsNotEmpty()
  @IsString()
  nombre!: string;
}

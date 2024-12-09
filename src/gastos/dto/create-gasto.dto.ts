import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateGastoDto {
  @IsNotEmpty()
  @IsNumber()
  campania!: number;

  @IsNotEmpty()
  @IsNumber()
  responsable!: number;

  @IsNotEmpty()
  @IsNumber()
  tipo_gasto!: number;

  @IsNotEmpty()
  @IsNumber()
  subcampania!: number;

  @IsNotEmpty()
  @IsNumber()
  valor!: number;

  @IsNotEmpty()
  @IsNumber()
  doc_create!: number;

  @IsNotEmpty()
  @IsString()
  observaciones!: string;
}
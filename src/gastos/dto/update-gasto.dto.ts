import { IsOptional, IsNumber, IsString } from "class-validator";

export class UpdateGastoDto {
  @IsOptional()
  @IsNumber()
  campania!: number;

  @IsOptional()
  @IsNumber()
  responsable!: number;

  @IsOptional()
  @IsNumber()
  tipo_gasto!: number;

  @IsOptional()
  @IsNumber()
  subcampania!: number;

  @IsOptional()
  @IsNumber()
  valor!: number;

  @IsOptional()
  @IsNumber()
  doc_create!: number;

  @IsOptional()
  @IsString()
  observaciones!: string;
}

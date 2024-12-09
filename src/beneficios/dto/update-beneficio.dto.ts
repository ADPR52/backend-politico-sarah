import { Type } from "class-transformer";
import {
  IsOptional,
  IsString,
  IsNumber,
  ValidateNested,
} from "class-validator";
import { UpdateBeneficiario } from "./beneficiario";

export class UpdateBeneficioDto {
  @IsOptional()
  @IsString()
  valor?: string;

  @IsOptional()
  @IsNumber()
  tipo_beneficio?: number;

  @IsOptional()
  @IsNumber()
  documento_verificador?: number;

  @IsOptional()
  @IsNumber()
  seleccion_beneficio?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateBeneficiario)
  beneficiarios?: UpdateBeneficiario[];

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsOptional()
  @IsNumber()
  responsable?: number;

  @IsOptional()
  @IsNumber()
  doc_create!: number;

  @IsOptional()
  @IsNumber()
  doc_update!: number;

  @IsOptional()
  @IsNumber()
  campania!: number;
  
  @IsOptional()
  @IsNumber()
  subcampania!: number;
}

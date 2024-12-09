import { Campania } from 'src/campanias/entities/campania.entity';
import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  ValidateNested,
} from "class-validator";
import { CreateBeneficiario } from "./beneficiario";

export class CreateBeneficioDto {
  @IsNotEmpty()
  @IsString()
  valor!: string;

  @IsNotEmpty()
  @IsNumber()
  tipo_beneficio!: number;

  @IsNotEmpty()
  @IsNumber()
  documento_verificador!: number;

  @IsNotEmpty()
  @IsNumber()
  seleccion_beneficio!: number;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateBeneficiario)
  beneficiarios!: CreateBeneficiario[];

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsNotEmpty()
  @IsNumber()
  responsable!: number;

  @IsNotEmpty()
  @IsNumber()
  doc_create!: number;

  @IsOptional()
  @IsNumber()
  doc_update!: number;  

  @IsNotEmpty()
  @IsNumber()
  campania!: number;

  @IsNotEmpty()
  @IsNumber()
  subcampania!: number;
}

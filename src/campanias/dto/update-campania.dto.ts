import { Type } from "class-transformer";
import { IsOptional, IsString, IsDate, IsArray, IsNumber } from "class-validator";

export class UpdateCampaniaDto {
  @IsOptional()
  @IsString()
  nombre!: string;

  @IsOptional()
  @IsString()
  lugar!: string;

  @IsOptional()
  @IsDate()
  fecha_inicio!: Date;

  @IsOptional()
  @IsDate()
  fecha_fin!: Date;

  @IsOptional()
  @IsString()
  presupuesto!: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fecha_adicional!: Date;

  @IsOptional()
  @IsString()
  adicion_presupuestal!: string;

  @IsOptional()
  @IsArray()
  subcampanias?: any[];

  @IsOptional()
  @IsNumber()
  doc_create!: number;

  @IsOptional()
  @IsNumber()
  responsable!: number;

}

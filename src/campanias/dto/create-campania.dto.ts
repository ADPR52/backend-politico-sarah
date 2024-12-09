import { IsNotEmpty, IsString, IsDate, IsOptional, IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCampaniaDto {
  @IsNotEmpty()
  @IsString()
  nombre!: string;

  @IsNotEmpty()
  @IsString()
  lugar!: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  fecha_inicio!: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  fecha_fin!: Date;

  @IsNotEmpty()
  @IsNumber()
  presupuesto!: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fecha_adicional!: Date;

  @IsOptional()
  @IsNumber()
  adicion_presupuestal!: number;

  @IsArray()
  @IsNotEmpty()
  subcampanias: any[] = [];

  @IsNotEmpty()
  @IsNumber()
  doc_create!: number;

  @IsNotEmpty()
  @IsNumber()
  responsable!: number;
}

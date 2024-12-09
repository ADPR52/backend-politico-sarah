import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class Experiencia {
  @IsOptional()
  @IsString()
  empresa: string = '';

  @IsOptional()
  @IsString()
  fecha_ingreso: String = '';

  @IsOptional()
  @IsString()
  fecha_egreso: String = '';

  @IsOptional()
  @IsString()
  cargo?: string;

  @IsOptional()
  @IsString()
  referencia?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  municipio?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  estado?: number;

  @IsOptional()
  @IsString()
  seudonimo?: string;

  @IsOptional()
  @IsString()
  tiempo_laborado?: string;
}

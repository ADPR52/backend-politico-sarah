import { IsString, IsOptional } from "class-validator";

export class EducacionDto {
  @IsOptional()
  @IsString()
  lugar_estudio!: string;

  @IsOptional()
  @IsString()
  fecha_inicio!: string;

  @IsOptional()
  @IsString()
  fecha_fin!: string;

  @IsOptional()
  @IsString()
  titulo!: string;
}

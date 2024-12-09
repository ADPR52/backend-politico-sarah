import { Type } from "class-transformer";
import {
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
  IsArray,
  ValidateNested,
  IsJSON,
} from "class-validator";
import { EducacionDto } from "./educacion.dto";
import { Experiencia } from "./experiencia.dto";

export class UpdateCaracterizacionDto {
  @IsOptional()
  @IsNumber()
  numero_documento!: number;

  @IsOptional()
  @IsString()
  usuario_name!: string;

  @IsOptional()
  @IsNumber()
  tipo_documento!: number;

  @IsOptional()
  @IsString()
  nombre!: string;

  @IsOptional()
  @IsString()
  apellidos!: string;

  @IsOptional()
  @IsDateString()
  fecha_nacimiento!: Date;

  @IsOptional()
  @IsNumber()
  edad!: number;

  @IsOptional()
  @IsString()
  correo!: string;

  @IsOptional()
  @IsNumber()
  departamento!: number;

  @IsOptional()
  @IsNumber()
  municipio!: number;

  @IsOptional()
  @IsString()
  direccion!: string;

  @IsOptional()
  @IsString()
  telefono!: string;

  @IsOptional()
  @IsString()
  comuna!: string;

  @IsOptional()
  @IsString()
  mesa!: string;

  @IsOptional()
  @IsString()
  puesto!: string;

  @IsOptional()
  @IsNumber()
  rol!: number;

  @IsOptional()
  @IsNumber()
  interes_politico!: number;

  @IsOptional()
  @IsNumber()
  nivel_participacion!: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  habilidades!: number[];

  @IsOptional()
  @IsNumber()
  red_contactos!: number;

  @IsOptional()
  @IsNumber()
  motivos_personales!: number;

  @IsOptional()
  @IsNumber()
  lugar_intervencion_social!: number;

  @IsOptional()
  @IsNumber()
  competencias_tecnicas!: number;

  @IsOptional()
  @IsNumber()
  competencias_interpersonales!: number;

  @IsOptional()
  @IsNumber()
  competencias_organizacionales!: number;

  @IsOptional()
  @IsNumber()
  competencias_digitales!: number;

  @IsOptional()
  @IsString()
  titulo!: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => EducacionDto)
  educacion!: EducacionDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Experiencia)
  experiencia_laboral!: Experiencia[];

  @IsOptional()
  @IsJSON()
  idioma!: [];

  @IsOptional()
  @IsString()
  experiencia_exitos!: string;

  @IsOptional()
  @IsString()
  contrasena!: string;

  @IsOptional()
  @IsNumber()
  doc_create!: number;

  @IsOptional()
  @IsNumber()
  activo!: number;

  @IsOptional()
  @IsNumber()
  campania: number = 0;

  @IsOptional()
  @IsNumber()
  subcampania: number = 0;

  @IsOptional()
  @IsNumber()
  admin: number = 0;
}

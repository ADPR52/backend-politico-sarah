import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDateString,
  IsOptional,
  IsJSON,
  IsArray,
  IsInt,
  ValidateNested,
} from "class-validator";
import { EducacionDto } from "./educacion.dto";
import { Experiencia } from "./experiencia.dto";
import { Type } from "class-transformer";

export class CreateCaracterizacionDto {
  @IsNotEmpty()
  @IsNumber()
  numero_documento!: number;

  @IsNotEmpty()
  @IsString()
  usuario_name!: string;

  @IsNotEmpty()
  @IsNumber()
  tipo_documento!: number;

  @IsNotEmpty()
  @IsString()
  nombre!: string;

  @IsNotEmpty()
  @IsString()
  apellidos!: string;

  @IsNotEmpty()
  @IsDateString()
  fecha_nacimiento!: Date;

  @IsNotEmpty()
  @IsNumber()
  edad!: number;

  @IsNotEmpty()
  @IsString()
  correo!: string;

  @IsNotEmpty()
  @IsNumber()
  departamento!: number;

  @IsNotEmpty()
  @IsNumber()
  municipio!: number;

  @IsNotEmpty()
  @IsString()
  direccion!: string;

  @IsNotEmpty()
  @IsString()
  telefono!: string;

  @IsNotEmpty()
  @IsString()
  comuna!: string;

  @IsNotEmpty()
  @IsString()
  mesa!: string;

  @IsNotEmpty()
  @IsString()
  puesto!: string;

  @IsNotEmpty()
  @IsNumber()
  rol!: number;

  @IsNotEmpty()
  @IsNumber()
  interes_politico!: number;

  @IsNotEmpty()
  @IsNumber()
  nivel_participacion!: number;

  @IsArray()
  @IsInt({ each: true })
  habilidades!: number[];

  @IsNotEmpty()
  @IsNumber()
  red_contactos!: number;

  @IsNotEmpty()
  @IsNumber()
  motivos_personales!: number;

  @IsNotEmpty()
  @IsNumber()
  lugar_intervencion_social!: number;

  @IsNotEmpty()
  @IsNumber()
  competencias_tecnicas!: number;

  @IsNotEmpty()
  @IsNumber()
  competencias_interpersonales!: number;

  @IsNotEmpty()
  @IsNumber()
  competencias_organizacionales!: number;

  @IsNotEmpty()
  @IsNumber()
  competencias_digitales!: number;

  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsJSON()
  idioma!: [];

  @IsNotEmpty()
  @IsString()
  experiencia_exitos!: string;

  @IsNotEmpty()
  @IsString()
  contrasena!: string;
  
  @IsOptional()
  @IsNumber()
  campania: number = 0;

  @IsNotEmpty()
  @IsNumber()
  doc_create!: number;

  @IsOptional()
  @IsNumber()
  activo!: number;

  @IsOptional()
  @IsNumber()
  admin: number = 0;

  @IsOptional()
  @IsNumber()
  subcampania: number = 0;
}

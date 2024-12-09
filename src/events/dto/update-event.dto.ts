import { Type } from "class-transformer";
import { IsOptional, IsString, IsDate } from "class-validator";

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  titulo!: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fecha!: Date;

  @IsOptional()
  @IsString()
  lugar!: string;

  @IsOptional()
  @IsString()
  hora_inicio!: string;

  @IsOptional()
  @IsString()
  hora_fin!: string;

  @IsOptional()
  @IsString()
  observacion!: string;
}

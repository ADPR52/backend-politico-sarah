import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsString,
  IsDate,
} from "class-validator";

export class CreateEventDto {
    @IsNotEmpty()
    @IsString()
    titulo!: string
    
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    fecha!: Date;
    
    @IsNotEmpty()
    @IsString()
    lugar!: string;

    @IsNotEmpty()
    @IsString()
    hora_inicio!: string;

    @IsNotEmpty()
    @IsString()
    hora_fin!: string;

    @IsNotEmpty()
    @IsString()
    observacion!: string;
}

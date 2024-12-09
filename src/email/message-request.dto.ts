import { IsString, IsArray, IsEmail, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// Definición de la estructura del Usuario
export class UsuarioDto {
  @IsString()
    @IsNotEmpty()
    nombre!: string;

  @IsString()
    @IsNotEmpty()
    apellidos!: string;

  @IsString()
    @IsNotEmpty()
    telefono!: string;

  @IsEmail()
    @IsNotEmpty()
    correo!: string;

  @IsString()
    @IsNotEmpty()
    numero_documento!: string;
}

// DTO principal para la solicitud de mensajes
export class MessageRequestDto {
  @IsString()
    @IsNotEmpty()
    asunto!: string;

  @IsString()
    @IsNotEmpty()
    mensaje!: string;

  @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UsuarioDto)
    usuarios!: UsuarioDto[];
}

import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  usuario_name!: string;

  @IsNotEmpty()
  @IsString()
  contrasena!: string;
}

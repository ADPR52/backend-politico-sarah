import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBeneficiario {
  @IsNotEmpty()
  @IsString()
  nombre_beneficiario!: string;

  @IsNotEmpty()
  @IsString()
  telefono_beneficiario!: string;
}

export class UpdateBeneficiario {
  @IsOptional()
  @IsString()
  nombre_beneficiario!: string;

  @IsOptional()
  @IsString()
  telefono_beneficiario!: string;
}

import { IsOptional, IsString } from "class-validator";

export class UpdateUltramsgDto {
  @IsOptional()
  @IsString()
  baseURL!: string;

  @IsOptional()
  @IsString()
  token!: string;
}
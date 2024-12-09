import { IsOptional, IsNumber, IsString } from "class-validator";

export class UpdateTwilioDto {
  @IsOptional()
  @IsString()
  accountSid!: string;

  @IsOptional()
  @IsString()
  authToken!: string;

  @IsOptional()
  @IsString()
  fromNumber!: string;
}
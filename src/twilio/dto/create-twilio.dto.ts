import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTwilioDto {
  @IsNotEmpty()
  @IsNumber()
  campania!: number;

  @IsNotEmpty()
  @IsString()
  accountSid!: string;

  @IsNotEmpty()
  @IsString()
  authToken!: string;

  @IsNotEmpty()
  @IsString()
  fromNumber!: string;
}
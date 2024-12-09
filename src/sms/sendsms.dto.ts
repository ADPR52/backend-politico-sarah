// send-sms.dto.ts
import { IsString, IsNotEmpty } from "class-validator";

export class SendSmsDto {
  @IsString()
  @IsNotEmpty()
  to!: string;

  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsString()
  @IsNotEmpty()
  accountSid!: string;

  @IsString()
  @IsNotEmpty()
  authToken!: string;

  @IsString()
  @IsNotEmpty()
  from!: string;
}

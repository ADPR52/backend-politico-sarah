import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SmsService } from './sms.service';
import { AuthGuard } from 'src/auth/auth.service';
import { PersonalizedSmsRequestDto } from './personalized-sms-request.dto';

interface SmsRequestDto {
  usuarios: Array<{ nombre: string; apellidos: string; telefono: string; correo: string }>;
  linkMessages: string;
  accountSid: string;
  authToken: string;
  fromNumber: string;
}

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @UseGuards(AuthGuard)
  @Post('post')
  async enviarSms(@Body() smsRequestDto: SmsRequestDto): Promise<string> {
    const { usuarios, linkMessages, accountSid, authToken, fromNumber } = smsRequestDto;

    console.log('Configurando Twilio con las credenciales recibidas...');
    this.smsService.configureTwilio(accountSid, authToken);

    console.log('Enviando SMS en masa...');
    await this.smsService.sendBulkSms(
      usuarios.map((u) => ({ nombre: u.nombre, telefono: u.telefono })),
      fromNumber,
      linkMessages,
    );

    console.log('Mensajes enviados correctamente');
    return 'Mensajes enviados correctamente';
  }

  @UseGuards(AuthGuard)
  @Post('send/message-personalize')
  async enviarMensajesPersonalizados(@Body() smsRequestDto: PersonalizedSmsRequestDto): Promise<string> {
    const { usuarios, accountSid, authToken, fromNumber, mensaje } = smsRequestDto;
    this.smsService.configureTwilio(accountSid, authToken);
    await Promise.all(
      usuarios.map(async (usuario) => {
        const formattedNumber = this.smsService.formatPhoneNumber(usuario.telefono);
        const personalizedMessage = `Hola ${usuario.nombre}, ${mensaje}`; 
        try {
          await this.smsService.sendSms(formattedNumber, fromNumber, personalizedMessage);
          console.log(`Mensaje enviado correctamente a ${formattedNumber}`);
        } catch (error) {
          console.error(`Error al enviar mensaje a ${formattedNumber}:`, error);
        }
      }),
    );
    return 'Mensajes personalizados enviados correctamente';
  }
}

import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service';
import { AuthGuard } from 'src/auth/auth.service';
import { MessageRequestDto } from './message-request.dto';

interface Usuario {
  nombre: string;
  apellidos: string;
  telefono: string;
  correo: string;
}

interface EmailRequestDto {
  usuarios: Usuario[];
  linkMessages: string;
}

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @UseGuards(AuthGuard)
  @Post('send')
  async sendEmail(@Body() body: { to: string; user: string; numDoc: number}) {
    const { to, user, numDoc } = body;
    await this.emailService.sendEmail(to, user, numDoc);
    return { message: 'Correo enviado correctamente' };
  }

  @UseGuards(AuthGuard)
  @Post('send-surveys')
  async sendSurveys(@Body() body: EmailRequestDto) {
    const { usuarios, linkMessages } = body;

    for (const usuario of usuarios) {
      await this.emailService.sendSurveyEmail(
        usuario.correo,
        usuario.nombre,
        linkMessages
      );
    }

    return { message: 'Encuestas enviadas correctamente' };
  }

  @UseGuards(AuthGuard)
  @Post('message')
  async sendMessage(@Body() body: MessageRequestDto) {
    const { asunto, mensaje, usuarios } = body;

    for (const usuario of usuarios) {
      await this.emailService.sendMessageEmail(
        usuario.correo,
        usuario.nombre,
        asunto,
        mensaje
      );
    }

    return { message: 'Mensajes enviados correctamente' };
  }
}
